import React, { useEffect, useState } from "react";
import { useHttp } from "../hooks/http.hook";
import { useMessage } from "../hooks/message.hook";

export const AuthPage = () => {
    const message = useMessage()
    const { loading, error, request, clearError } = useHttp()
    const [form, setForm] = useState({
        email: '', password: ''
    })                       

    useEffect(() => {
        console.log(error)
        message(error);
        clearError()
    }, [error, message, clearError])

    const changeHandler = event => {
        setForm({ ...form, [event.target.name]: event.target.value })
}

    const registerHandler = async () => {
        try {
            const data = await request('/api/auth/register', 'POST', { ...form })
        } catch (e) { }
    }
    return (
        <div className="row">
            <div className="col s6 offset-s3">
                <div className="card blue darken-1">
                    <div className="card-content white-text">
                        <span className="card-title">Autorization</span>
                        <div>
                            <div className="input-field">
                                <input
                                    placeholder="Input email"
                                    id="email"
                                    type="text"
                                    name="email"
                                    onChange={changeHandler} />
                                <label htmlFor="email">Email</label>
                            </div>

                            <div className="input-field">
                                <input
                                    placeholder="Input password"
                                    id="password"
                                    type="text"
                                    name="password"
                                    onChange={changeHandler} />
                                <label htmlFor="password">Password</label>
                            </div>
                        </div>
                    </div>
                    <div className="card-action">
                        <button className="btn yellow darken-4">Signin</button>
                        <button className="btn grey lighten-1 black-text" onClick={registerHandler} disabled={loading}>Signup</button>
                    </div>
                </div>
            </div>
        </div>
    )
}