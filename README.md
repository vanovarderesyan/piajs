
# Piajs
Node.js wrapper around the command line interface for The Private Internet Access Desktop Client. Intended to facilitate the operation of the PIA client from within Node.js.

node >= 16, no additional dependencies.


## Installation

Use the package manager [npm](https://www.npmjs.com/) to install *piajs*.

```bash
npm install piajs
```

## Usage
- PIA Desktop client must be installed.

- Command ```piactl```  must be available from your terminal. Try running ```piactl --version```. Iif you get something like ```2.0.1+04518``` you are good to go.

  If it does not run, please check [PIA Desktop: Command Line Interface](https://www.privateinternetaccess.com/helpdesk/kb/articles/pia-desktop-command-line-interface) documentation.

- PIA client must be running to use the connect method.


### Available Methods

-  ```regions()``` Returns list of strings with available servers.

   i.e.:     ```['us-florida', 'us-atlanta', 'us-houston', 'us-washington-dc', 'us-east', 'us-chicago', 'us-new-york-city', 'us-texas', 'us-west', ...]```

- ```region()``` Returns string of current selected server name.

    i.e. ```'us-houston'```

- ```set_region(server='auto')``` Cause the client to connect to selected server next time it connects. If client is already connected will disconnect and connect to new selected server.
  * server (type: str)
      +  'auto': use client auto select feature to set server with least latency.
      + 'random': set a random server from the available list.
      + '[server name]': set the server to a specific name, must be in the available list.

 - ```connect(verbose=False, timeout=20)``` Cause the client to connect
   * verbose (type: bool) cause to display connecting status in stdout
   * timeout (type: int) will disconnect if connection not possible before timeout
 - ```disconnect()``` Cause client to disconnect
 - ```ip()``` Returns the current VPN IP address, if connected and the address is known
 - ```status()``` Returns client conection status.

   ```Disconnected, Connecting, StillConnecting, Connected, Interrupted, Reconnecting, StillReconnecting, DisconnectingToReconnect, Disconnecting```

- ```reset_settings()``` Resets settings to the defaults. As per the documentation this only resets daemon settings, no GUI settings.

- ```set_debug_logging(value=False)``` Enable client debug logging.


### Example
```node
const PiaVpn = require('piajs')


vpn = new PiaVpn()


// Get connection status
vpn.status() //equivalent to `piactl get connectionstate`

//Will connect to server, displaying status in stdout
vpn.connect()

//Disconnect
vpn.disconnect()
```
## Contributing
Pull requests are welcome. Please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.


## About this software
The *piapy* software is a personal project. I have no prior or existing relationship with [Private Internet Access](https://www.privateinternetaccess.com/)

If you have any information regarding its software, you can visit them:
*  [PIA VPN](https://www.privateinternetaccess.com/)
* [PIA Desktop: Command Line Interface](https://www.privateinternetaccess.com/helpdesk/kb/articles/pia-desktop-command-line-interface)



## License
with [MIT](https://choosealicense.com/licenses/mit/) open source license.
