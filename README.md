# PiaJS

A dependency-free runtime wrapper around the `piactl` command-line interface for the [Private Internet Access](https://www.privateinternetaccess.com/) desktop VPN client. Works in **JavaScript** and **TypeScript** through bundled TypeScript declarations.

## Requirements

- Node.js 16 or newer (see [Node.js support](https://nodejs.org/en/about/previous-releases) when choosing a maintained version).
- PIA Desktop Client installed and running.
- `piactl` accessible on your PATH on macOS/Linux. On Windows, this library uses the default install path: `C:\\Program Files\\Private Internet Access\\piactl.exe`.

Verify the executable with `piactl --version`. For details, see [PIA's command-line documentation](https://www.privateinternetaccess.com/helpdesk/kb/articles/pia-desktop-command-line-interface).

## Install

The package name in this repository's `package.json` is **`piavpnjs`**:

```sh
npm install piavpnjs
```

## JavaScript (CommonJS)

```js
const PiaVpn = require('piavpnjs');

async function main() {
  const vpn = new PiaVpn();
  console.log('Current status:', await vpn.status());
  console.log('Available regions:', await vpn.regions());

  await vpn.setRegion('auto');
  await vpn.connect(); // issues the connect command; does not wait for Connected
  console.log('Connection state:', await vpn.status());
}

main().catch(console.error);
```

## TypeScript

Bundled `index.d.ts` declarations provide type checking and editor autocomplete without changing the JavaScript runtime or requiring `@types/piavpnjs`.

```ts
import PiaVpn = require('piavpnjs');

async function main(): Promise<void> {
  const vpn = new PiaVpn();
  const regions: string[] = await vpn.regions();
  const state: string = await vpn.status();

  console.log({ regions, state });
  await vpn.setRegion('random');
}

main().catch(console.error);
```

When your TypeScript project has `esModuleInterop` enabled, you can also use `import PiaVpn from 'piavpnjs'`.

## API

All methods return promises. CLI errors reject the promise.

| Method | Description |
| --- | --- |
| `regions(): Promise<string[]>` | List available region IDs. |
| `region(): Promise<string>` | Get the selected region ID. |
| `setRegion(server?: string \| null): Promise<string>` | Select `auto` (default), `random`, or an available region ID. Invalid IDs reject with `RangeError`. |
| `status(): Promise<string>` | Get the connection state (e.g., `Disconnected`, `Connecting`, `Connected`). |
| `ip(): Promise<string>` | Read the VPN IP reported by the client. |
| `connect(): Promise<string>` | Issue a connect command; this does not wait for the connection to become ready. |
| `disconnect(): Promise<string>` | Issue a disconnect command. |
| `reset_settings(): Promise<string>` | Reset PIA daemon settings. |
| `set_debug_logging(): Promise<string>` | Run the current CLI debug-logging command. |
| `backgroundEnable(): Promise<string>` | Enable background mode. |

**Current limitations:** `connect(timeout, verbose)` accepts those arguments for compatibility, but they currently have no effect. The library does not yet implement connection waiting, a timeout, or real-time progress events. If you need to confirm a connection, check `status()`.

## Development

```sh
npm install
npm test
npm run test:types
```

Unit tests mock the `piactl` executable, so they can run without PIA installed. Actual VPN connections must be tested separately on a machine with the PIA Desktop Client.

## Contributing

Pull requests are welcome. Please open an issue first to discuss significant changes, and update tests when changing behavior.

## Disclaimer

PiaJS is an independent project, not affiliated with Private Internet Access.

## License

ISC (as declared in `package.json`).
