'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const childProcess = require('node:child_process');

const originalExecFile = childProcess.execFile;
const calls = [];
const fakeExecFile = () => { throw new Error('Call the promisified CLI mock'); };
// The real execFile has a custom promisify implementation returning { stdout, stderr }.
fakeExecFile[require('node:util').promisify.custom] = async (file, args) => {
  calls.push({ file, args });
  const command = args.join(' ');
  const stdout = command === 'get regions' ? 'us-east\r\nus-west\r\n' :
    command === 'get connectionstate' ? 'Connected\r\n' : '';
  return { stdout, stderr: '' };
};
childProcess.execFile = fakeExecFile;
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
