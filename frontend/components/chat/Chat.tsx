import React, {useState, useEffect, useRef} from 'react';
import {getDefaultHeaders} from "../../utils/WebsocketUtil";
import './chat.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import classes from "./chat.module.css";
import AxiosInstance from "../../utils/AxiosInstance";
import {Connections} from "../../interfaces/Connections";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import moment from "moment";

const Chat = () => {
    const [stompClient, setStompClient] = useState<Stomp.Client | null>(null);
    const [message, setMessage] = useState("");
    const [contact, setContact] = useState("");
    const [messages, setMessages] = useState<Array<any>>([]);
    const [connections, setConnection] = useState<Array<Connections>>([]);
    let currentUserId: any = useRef();
    let currentConnectionId = useRef<string>("");
    let subscription = useRef<any>(null);

    useEffect(() => {
        fetchConnections();
        currentUserId.current = localStorage.getItem("uid");

        let Sock: WebSocket = new SockJS(`${process.env.NEXT_PUBLIC_WEBSOCKET_ENDPOINT}`);
        let stomp: Stomp.Client = Stomp.over(Sock);
        let headers: any = {}
        stomp.connect(headers, () => {});
        setStompClient(stomp);
        return () => {
            if (stompClient) {
                stompClient.disconnect(() => {});
            }
        }
    }, []);

    const newWSConnection = (userId: number, connectionId: string) => {
        if (subscription.current != null) {
            subscription.current.unsubscribe();
        }
        fetchMessages(userId);
        currentConnectionId.current = connectionId;
        subscription.current = stompClient?.subscribe(`/topic/messages/${connectionId}/`, (response: any) => {
            console.log("WS response -----------");
            console.log(response);
            setMessages((prevState) => [...prevState, JSON.parse(response.body)]);
        })
    }

    const fetchConnections = (): void => {
        AxiosInstance.get("/api/connections/").then((e) => {
            setConnection(e.data);
        })
    }

    const fetchMessages = (connId: number): void => {
        AxiosInstance.get(`/api/msg/${connId}/`).then((e) => {
            setMessages(e.data);
        });
    }

    const handleSend = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const data = {message};
        stompClient?.send(`/app/messages/${currentConnectionId.current}/`, getDefaultHeaders(), JSON.stringify(data));
        setMessage("");
    }

    const handleNewContact = (e: React.MouseEvent<HTMLButtonElement>) => {
        const data = {username: contact};
        AxiosInstance.post("/api/connections/", data).then(() => {
            fetchConnections();
        }).catch((e) => {
            alert("error");
        });
    }

    return (
        <div className={classes.background}>
            <div className="container py-5" style={{height: "100%"}}>
                <div className="row" style={{height: "100%"}}>
                    <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0">
                        <div className="card">
                            <div className="card-body">
                                <div className={"input-group mb-4"}>
                                    <input type={"text"} className={"form-control"}
                                           placeholder={"Add new contact"} value={contact}
                                           onChange={(e) => {
                                               setContact((e.target.value))
                                           }}/>
                                    <button className={"btn btn-primary"} onClick={handleNewContact}>
                                        Add
                                    </button>
                                </div>
                                <ul className="list-unstyled mb-0">
                                    <li className="p-2 border-bottom">
                                        {connections.map((c, i) =>
                                            <div className="d-flex justify-content-between">
                                                { c.user1.id != currentUserId.current ?
                                                <div className="d-flex flex-row">
                                                <img src={process.env.NEXT_PUBLIC_API_ENDPOINT + c.user1.imageUrl}
                                                   className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                                                   width="60"/>
                                                <div className="pt-1"
                                                     onClick={() => {
                                                         newWSConnection(c.user1.id, c.connectionId);
                                                     }}>
                                                    <p className="fw-bold mb-0">{c.user1.username}</p>
                                                </div>
                                            </div>
                                                :
                                            <div className="d-flex justify-content-between">
                                                <img src={process.env.NEXT_PUBLIC_API_ENDPOINT + c.user2.imageUrl}
                                                   className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                                                   width="60"/>
                                                <div className="pt-1"
                                                     onClick={() => {newWSConnection(c.user2.id, c.connectionId)}}>
                                                    <p className="fw-bold mb-0">{c.user2.username}</p>
                                                </div>
                                            </div>
                                            }
                                        </div>
                                        )}
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-lg-7 col-xl-8" style={{height: "100%"}}>
                        <div className={`${classes.scrollable} mb-1`} style={{height: "95%", paddingRight: "20px"}}>
                            <ul className="list-unstyled">

                                {messages.map(msg =>
                                    <li className="d-flex justify-content-between mb-4">
                                        <img src={process.env.NEXT_PUBLIC_API_ENDPOINT + msg.sender.imageUrl} alt="user profile"
                                             className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                                             width="60"/>
                                        <div className="card w-100">
                                            <div className="card-header d-flex justify-content-between p-3">
                                                <p className="fw-bold mb-0">{msg.sender.username}</p>
                                                <p className="text-muted small mb-0"><i className="far fa-clock"></i>
                                                    {moment(msg.created_at.dateFrom).format('HH:mm  DD:MM:YY')}</p>
                                            </div>
                                            <div className="card-body">
                                                <p className="mb-0">
                                                    {msg.message}
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                )}
                            </ul>
                        </div>
                        <div style={{height: "5%"}}>
                            <div className="form-outline row">
                                <div className="col-sm-10">
                                <textarea className="form-control" id="textAreaExample2" rows={1}
                                          placeholder={"Message"} style={{resize: "none"}}
                                          value={message}
                                          onChange={(e) => {
                                              setMessage((e.target.value))
                                          }}>
                                </textarea>
                                </div>
                                <button className="btn btn-primary col-sm-2" onClick={handleSend}>Send</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;