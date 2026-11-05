'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const childProcess = require('node:child_process');

const originalExecFile = childProcess.execFile;
const calls = [];
childProcess.execFile = (file, args, callback) => {
  calls.push({ file, args });
  if (args.join(' ') === 'get regions') return callback(null, 'us-east\r\nus-west\r\n', '');
  if (args.join(' ') === 'get connectionstate') return callback(null, 'Connected\r\n', '');
  return callback(null, '', '');
};
// Patch before requiring the module because it captures promisified execFile.
const PiaVpn = require('../index.js');
childProcess.execFile = originalExecFile;

test('regions() removes blank lines and Windows line endings', async () => {
  assert.deepEqual(await new PiaVpn().regions(), ['us-east', 'us-west']);
});

test('setRegion() accepts the first region and rejects unknown regions', async () => {
  const vpn = new PiaVpn();
  assert.equal(await vpn.setRegion('us-east'), 'us-east');
  assert.deepEqual(calls.at(-1).args, ['set', 'region', 'us-east']);
  const before = calls.length;
  await assert.rejects(vpn.setRegion('not-a-region'), RangeError);
  assert.equal(calls.length, before + 1); // only 'get regions', no setter
});

test('setRegion() supports auto and random', async () => {
  const vpn = new PiaVpn();
  assert.equal(await vpn.setRegion('AUTO'), 'auto');
  assert.ok(['us-east', 'us-west'].includes(await vpn.setRegion('random')));
});

test('status() trims the CLI output', async () => {
  assert.equal(await new PiaVpn().status(), 'Connected');
});
