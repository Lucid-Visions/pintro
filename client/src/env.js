import Constants from "expo-constants";
import Config from 'react-native-config'
const ssl = false
const { manifest } = Constants;
const production = true
const productionHost = "3.134.100.191"
const host = manifest.debuggerHost.split(':').shift()
env = {
    protocol: ssl?"https":"http",
    host: production?productionHost:host,
    port:ssl?"443":"3000"
}


export default env
