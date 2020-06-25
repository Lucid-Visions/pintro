import io from 'socket.io-client'

const SOCKET_URI = `http://${env.host}:${env.port}`
const SOCKET_OPTIONS = { transports: ['websocket'] }

/**
 * SocketService
 * 
 * The SocketService is a singleton implementation. It will return an existing connection or get a new one
 * when its `getSocket` function is called.
 */
class SocketService {
    /**
     * 
     * getSocket
     * 
     * @param {string} roomId Room to connect to.
     * @param {string} listenForMsg Message to listen for.
     */
    getSocket = (roomId, listenForMsg, onMessageCallback) => {
        this.socket = io(SOCKET_URI, { ...SOCKET_OPTIONS, query: `roomId=${roomId}` });
        this.connectSocket(listenForMsg, onMessageCallback)

        return this.socket
    }

    connectSocket(listenForMsg, onMessageCallback) {
        this.socket.on(listenForMsg, () => {
          onMessageCallback()
        });
    }
}

export default new SocketService()