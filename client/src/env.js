import Constants from "expo-constants";
import Config from 'react-native-config'
let host;
const ssl = false
const { manifest } = Constants;
const production = false
const productionHost = "34.75.14.169"
if(!production) host = manifest.debuggerHost.split(':').shift()

env = {
    protocol: ssl?"https":"http",
    host: useDevServer ? productionHost : host,
    port:ssl?"443":"3000"
}

export default env
