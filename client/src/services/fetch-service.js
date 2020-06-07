
import Logger from 'js-logger'

// Logger
const log = Logger.get('FetchAPIService');

const defaultHeaders = {
    "Content-Type": "application/json",
}

/**
 * 
 * Name: FetchAPIService
 * 
 * Description:
 * This class wraps the native fetch API and exposes all the common HTTP methods (GET, POST etc.) Sensible config defaults (Headers etc.) are set here
 * but extra config can still be supplied.
 * 
 */
class FetchAPIService {

    /**
     * 
     * FetchAPI.get(url: string, config: Object)
     * 
     * @param {string} url 
     * @param {string} config Headers and other settings
     */
    static async get(url, config) {
        return FetchAPIService.sendRequest(url, { method: 'GET', ...config})
    }

    // POST

    // PUT

    // DELETE

    static async sendRequest(url, addtionalConfig) {
        const userToken = await AsyncStorage.getItem("token")

        if (!userToken) {
            log.error('Authentication failed')
            return
        }

        const headers = new Headers({ ...defaultHeaders, "Authorization": userToken })
        const config = { ...addtionalConfig, headers }
        let response

        try {
            response = await fetch(`http://${env.host}:${env.port}/${url}`, config)
        }
        catch(err) {
            log.error(err.message)
            throw Error(err.message)
        }

        return response.json()
    }
}

export default FetchAPIService