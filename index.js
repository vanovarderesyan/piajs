
const util = require("node:util");
const exec_run = util.promisify(require("node:child_process").execFile);


piapath = "piactl"
if (process.platform === "win32")
    piapath = "C:\\Program Files\\Private Internet Access\\piactl.exe"

class PiaVpn {

    constructor (){

    }
    async regions() {
        /*
        get VPN servers available
        :return:
        */
        try {
            const { stdout } = await exec_run(piapath, ["get", "regions"]);
            const regions = stdout.split('\n')
            return regions
        } catch (err) {
            throw new Error(err.message)
        }
    }

    async region() {
        try {
            const { stdout } = await exec_run(piapath, ["get", "region"]);
            return stdout.replace("\n", "");
        } catch (err) {
            throw new Error(err.message)
        }
    }

    async setRegion(server = null) {
        const regions = await this.regions()
        if (server == null || server.toLowerCase === "Auto") {
            server = "auto"
        } else if (server.toLowerCase === "random") {
            server = regions[Math.floor(Math.random() * regions.length)]
        } else if (!regions.indexOf(server)) {
            return new Error(`Server must be one of: ${regions}`)
        }

        try {
            const { stdout } = await exec_run(piapath, ["set", "region", server]);
            return server;
        } catch (err) {
            throw new Error(err.message)
        }
    }

    async status() {
        try {
            const { stdout } = await exec_run(piapath, ["get", "connectionstate"]);
            return stdout.replace("\n", "");
        } catch (err) {
            throw new Error(err.message)
        }
    }

    async ip() {
        try {
            const { stdout } = await exec_run(piapath, ["get", "vpnip"]);
            return stdout.replace("\n", "");
        } catch (err) {
            throw new Error(err.message)
        }
    }

    async connect(timeout = 20, verbose = false) {
        /*

        :param timeout: int
        :param verbose: bool
        :return:
        */
        try {
            const { stdout } = await exec_run(piapath, ["connect"]);
            return stdout.replace("\n", "");
        } catch (err) {
            throw new Error(err.message)
        }
    }

    async _wait_iterator() {
        return "|/-\\"
    }

    async disconnect() {
        try {
            const { stdout } = await exec_run(piapath, ["disconnect"]);
            return stdout.replace("\n", "");
        } catch (err) {
            throw new Error(err.message)
        }
    }

    async reset_settings() {
        try {
            const { stdout } = await exec_run(piapath, ["resetsettings"]);
            return stdout.replace("\n", "");
        } catch (err) {
            throw new Error(err.message)
        }
    }

    async set_debug_logging() {
        try {
            const { stdout } = await exec_run(piapath, ["set", "debuglogging"]);
            return stdout.replace("\n", "");
        } catch (err) {
            throw new Error(err.message)
        }
    }


    async backgroundEnable() {
        try {
            const { stdout } = await exec_run(piapath, ["background", "enable"]);
            return stdout.replace("\n", "");
        } catch (err) {
            throw new Error(err.message)
        }
    }

}


module.exports = PiaVpn
