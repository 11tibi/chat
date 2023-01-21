import React, {useState, useEffect, useRef} from 'react';
import connectToWS, {getDefaultHeaders} from "../../utils/WebsocketUtil";
import './chat.module.css';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import classes from "./chat.module.css";
import {Message} from "stompjs";

const Chat = () => {
    const [message, setMessage] = useState("");
    let wsConnection: any = useRef();

    useEffect(() => {
        wsConnection.current = connectToWS(() => {
            wsConnection.current.subscribe('/topic/news', (message: Message) => {
                console.log(message);
            })
            console.log("wsConnection");
            console.log(wsConnection.current);
        });
    }, [])

    const handleSend = (e: React.MouseEvent<HTMLButtonElement>) => {
        console.log("send");
        console.log(wsConnection.current);
        console.log(message);
        wsConnection.current.send("/app/news", getDefaultHeaders(), message);
        e.preventDefault();
    }

    return (
        <div className={classes.background}>
            <div className="container py-5" style={{height: "100%"}}>
                <div className="row" style={{height: "100%"}}>
                    <div className="col-md-6 col-lg-5 col-xl-4 mb-4 mb-md-0">
                        <div className="card">
                            <div className="card-body">
                                <ul className="list-unstyled mb-0">
                                    <li className="p-2 border-bottom">
                                        <div className="d-flex justify-content-between">
                                            <div className="d-flex flex-row">
                                                <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp"
                                                     alt="avatar"
                                                     className="rounded-circle d-flex align-self-center me-3 shadow-1-strong"
                                                     width="60"/>
                                                <div className="pt-1">
                                                    <p className="fw-bold mb-0">John Doe</p>
                                                    <p className="small text-muted">Hello, Are you there?</p>
                                                </div>
                                            </div>
                                            <div className="pt-1">
                                                <p className="small text-muted mb-1">Just now</p>
                                                <span className="badge bg-danger float-end">1</span>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="col-md-6 col-lg-7 col-xl-8" style={{height: "100%"}}>
                        <div className={`${classes.scrollable} mb-1`} style={{height: "95%", paddingRight: "20px"}}>
                            <ul className="list-unstyled">
                                <li className="d-flex justify-content-between mb-4">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp" alt="avatar"
                                         className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                                         width="60"/>
                                    <div className="card">
                                        <div className="card-header d-flex justify-content-between p-3">
                                            <p className="fw-bold mb-0">John Doe</p>
                                            <p className="text-muted small mb-0"><i className="far fa-clock"></i> 12
                                                mins
                                                ago</p>
                                        </div>
                                        <div className="card-body">
                                            <p className="mb-0">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                                tempor incididunt ut
                                                labore et dolore magna aliqua.
                                            </p>
                                        </div>
                                    </div>
                                </li>

                            {/*    */}

                                <li className="d-flex justify-content-between mb-4">
                                    <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp" alt="avatar"
                                         className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                                         width="60"/>
                                    <div className="card">
                                        <div className="card-header d-flex justify-content-between p-3">
                                            <p className="fw-bold mb-0">John Doe</p>
                                            <p className="text-muted small mb-0"><i className="far fa-clock"></i> 12
                                                mins
                                                ago</p>
                                        </div>
                                        <div className="card-body">
                                            <p className="mb-0">
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                                tempor incididunt ut
                                                labore et dolore magna aliqua.
                                            </p>
                                        </div>
                                    </div>
                                </li><li className="d-flex justify-content-between mb-4">
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp" alt="avatar"
                                     className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                                     width="60"/>
                                <div className="card">
                                    <div className="card-header d-flex justify-content-between p-3">
                                        <p className="fw-bold mb-0">John Doe</p>
                                        <p className="text-muted small mb-0"><i className="far fa-clock"></i> 12
                                            mins
                                            ago</p>
                                    </div>
                                    <div className="card-body">
                                        <p className="mb-0">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                            tempor incididunt ut
                                            labore et dolore magna aliqua.
                                        </p>
                                    </div>
                                </div>
                            </li><li className="d-flex justify-content-between mb-4">
                                <img src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/avatar-6.webp" alt="avatar"
                                     className="rounded-circle d-flex align-self-start me-3 shadow-1-strong"
                                     width="60"/>
                                <div className="card">
                                    <div className="card-header d-flex justify-content-between p-3">
                                        <p className="fw-bold mb-0">John Doe</p>
                                        <p className="text-muted small mb-0"><i className="far fa-clock"></i> 12
                                            mins
                                            ago</p>
                                    </div>
                                    <div className="card-body">
                                        <p className="mb-0">
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                                            tempor incididunt ut
                                            labore et dolore magna aliqua.
                                        </p>
                                    </div>
                                </div>
                            </li>

                            {/*    */}
                            </ul>
                        </div>
                        <div style={{height: "5%"}}>
                            <div className="form-outline row">
                                <div className="col-sm-10">
                                <textarea className="form-control" id="textAreaExample2" rows={1}
                                          placeholder={"Message"} style={{resize: "none"}}
                                            value={message}
                                          onChange={(e) => {setMessage((e.target.value))}}>
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