import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

// const connectToWS = (onConnect: () => void, onError?: () => void): Stomp.Client => {
//     let Sock: WebSocket = new SockJS(`${process.env.NEXT_PUBLIC_WEBSOCKET_ENDPOINT}`);
//     let stompClient: Stomp.Client = Stomp.over(Sock);
//     let headers: any = {}
//     stompClient.connect(headers, onConnect, onError);
//     return stompClient
// }

interface DefaultHeaders {
    Authorization: string
}

export const getDefaultHeaders = (): DefaultHeaders => {
    return {
        Authorization: localStorage.getItem("access_token") || ""
    };
}

// export default connectToWS;
