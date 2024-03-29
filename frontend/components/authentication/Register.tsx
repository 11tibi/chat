import React, {FormEvent} from 'react';
import classes from './register.module.css';
import {useRouter} from 'next/router'
import AxiosInstance from "../../utils/AxiosInstance";
import Link from "next/link";

interface FormElements extends HTMLFormControlsCollection {
    username: HTMLFormElement,
    email: HTMLFormElement,
    password: HTMLFormElement
}

interface FormData extends HTMLFormElement {
    readonly elements: FormElements
}

const Register = () => {
    const router = useRouter();

    const handleSubmit = (e: FormEvent<FormData>): void => {
        e.preventDefault();

        const data = {
            username: e.currentTarget.elements.username.value,
            email: e.currentTarget.elements.email.value,
            password: e.currentTarget.elements.password.value
        }
        AxiosInstance.post("/api/auth/signup/", data).then(() => {
            router.push("/auth/login/");
        }).catch(error => {
            console.error(error.reason);
        });
    }

    return (
        <div className={`vh-100 py-5 ${classes.gradient}`}>
            <div className={"container w-50 card shadow-2-strong"} style={{borderRadius: "1rem"}}>
                <div className="row">
                    <h3 className={"text-center my-5"}>
                        Create an account
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
                            <label htmlFor="email">Email</label>
                            <input className={"form-control"} id={"email"} required placeholder={"Enter Email"}
                                   type={"email"}/>
                        </div>
                        <div className="form-group mb-3">
                            <label htmlFor="password">Password</label>
                            <input className={"form-control"} id={"password"} required placeholder={"Password"}
                                   type={"password"}/>
                        </div>
                        <div className="form-group mb-3">
                            <button className={"btn btn-primary w-100 my-2"} type={"submit"}>Submit</button>
                            <Link href={"/auth/login/"}>
                                <button className={"btn btn-link"}>
                                    Already have an account? Login!
                                </button>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;