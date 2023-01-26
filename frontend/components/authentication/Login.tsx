import React, {FormEvent} from 'react';
import {useRouter} from "next/router";
import classes from "./register.module.css";
import Link from "next/link";
import AxiosInstance from "../../utils/AxiosInstance";

interface FormElements extends HTMLFormControlsCollection {
    username: HTMLFormElement;
    password: HTMLFormElement;
}

interface FormData extends HTMLFormElement {
    readonly elements: FormElements;
}

interface SignInResponse {
    token: string;
    type: string;
    id: number;
    username: string;
    email: string;
}

const Login = () => {
    const router = useRouter();

    const handleSubmit = (e: FormEvent<FormData>) => {
        e.preventDefault();
        const data = {
            username: e.currentTarget.elements.username.value,
            password: e.currentTarget.elements.password.value
        };
        AxiosInstance.post<SignInResponse>("/api/auth/signin/", data).then(response => {
            localStorage.setItem("access_token", response.data.token);
            localStorage.setItem("uid", response.data.id.toString());
            router.push("/chat/");
        }).catch(e => {
            console.error(e.reason);
        })
    }

    return (
        <div className={`vh-100 py-5 ${classes.gradient}`}>
            <div className={"container w-50 card shadow-2-strong"} style={{borderRadius: "1rem"}}>
                <div className="row">
                    <h3 className={"text-center my-5"}>
                        Login
                    </h3>
                </div>
                <form onSubmit={handleSubmit} className={classes.form}>
                    <div className="row d-flex justify-content-center form-group">
                        <div className="form-group mb-3">
                            <label htmlFor="username">Username</label>
                            <input className={"form-control"} id={"username"} required
                                   placeholder={"Enter Username"}
                                   type={"username"}/>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="password">Password</label>
                            <input className={"form-control"} id={"password"} required placeholder={"Password"}
                                   type={"password"}/>
                        </div>
                        <div className="form-group mb-3">
                            <button className={"btn btn-primary w-100 my-2"} type={"submit"}>Submit</button>
                            <Link href={"/auth/register/"}>
                                <button className={"btn btn-link"}>
                                    Create an account!
                                </button>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;