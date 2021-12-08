import React, { useState } from "react";
import { useHistory, useLocation } from "react-router";
import {Input} from "antd";
import {loginWrapper, inputAndButton, loginButton, errorMessageText} from "./Login.styles";

const Login = () => {
    const history = useHistory();
    const [userId, setUserId] = useState(null);
    const [errorMessage, setErrorMessage] = useState('')
    const location = useLocation();
    const hackList = location.state?.hackList ? location.state?.hackList : [];

    const handleLogin = () => {
        if (userId == null) {
            setErrorMessage('Please provide valid Employee Id to login')
        }
        else {
            localStorage.setItem("userId", userId?.toString());
            history.push({
                pathname: '/dashboard',
                state: {
                    hackList: hackList,
                    loggedInUserId: userId
                }
            })
        }
    }

    const handleChange = (event) => { setUserId(event.target.value) }
    return(
        <div style={loginWrapper}>
            <img alt="login" src="/login.png" height="100%" width="100%"/>
            <div style={inputAndButton}>
                <h1>Enter Employee Id</h1>
                <Input type="text" name="userid" aria-label="userid-input" onChange={handleChange}/>
                {errorMessage && <div style={errorMessageText}>{errorMessage}</div>}
                <div style={loginButton}>
                    <button onClick={handleLogin}> Login </button>
                </div>
            </div>
        </div>
    )
}

export default Login;
