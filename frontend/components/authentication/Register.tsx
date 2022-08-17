import React, {FormEvent, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import classes from './register.module.css';
import {useRouter} from 'next/router'

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
        console.log(data)
    }

    return (
        <>
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
                                <button className={"btn btn-link"}>
                                    Already have an account? Login!
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Register;