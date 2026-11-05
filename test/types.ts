import PiaVpn = require('../index');

const vpn = new PiaVpn();
const regions: Promise<string[]> = vpn.regions();
const region: Promise<string> = vpn.region();
const selection: Promise<string> = vpn.setRegion('us-east');
const selectionAuto: Promise<string> = vpn.setRegion(null);
const state: Promise<string> = vpn.status();
const ip: Promise<string> = vpn.ip();
const connecting: Promise<string> = vpn.connect();
const disconnecting: Promise<string> = vpn.disconnect();
const reset: Promise<string> = vpn.reset_settings();
const debugLogging: Promise<string> = vpn.set_debug_logging();
const background: Promise<string> = vpn.backgroundEnable();

// @ts-expect-error A region ID must be a string.
vpn.setRegion(123);
// @ts-expect-error No unknown methods should be exposed.
vpn.connectAndWait();

void [regions, region, selection, selectionAuto, state, ip, connecting, disconnecting, reset, debugLogging, background];
