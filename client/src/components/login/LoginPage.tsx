import { useNavigate } from "react-router-dom";

import "./loginPage.css"

import bg_img from "../../assets/img/bg_img.jpg"
import web_logo from "../../assets/img/logo.png"
import { Card, CardContent, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect, useRef, useState } from "react";
import { setEmailMsg, setEmailSend } from "../account/emailMessage";

function LoginPage() {
    const nav = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const inputRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, [])

    const handleLogin = async () => {
        if (username.trim() == "" || password.trim() == "") {
            alert("Thiếu thông tin quan trọng!")
        } else {
            const data = {
                username: username,
                password: password
            }
    
            await fetch("http://localhost:5000/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify(data)
            })
                .then((response) => {
                    if (response.ok) {
                        const res = response.json()
                        console.log(res)
                        setEmailMsg("Tài khoản của bạn đã được đăng nhập.")
                        setEmailSend()
                        nav("/account")
                    } else {
                        console.log("Error")
                        alert("Tên đăng nhập hoặc mật khẩu không đúng!")
                    }
                    return response
                })
                .catch((error) => console.log(error))
        }
    }

    return (
        <div className="overflow-hidden flex relative">
            <img src={bg_img} alt="" className="web-bg-reverse"/>
            <div className="web-content">
                <div className="section h-[15dvh] flex-row justify-between items-center">
                    <img src={web_logo} alt="" className="web-logo z-30" onClick={() => nav("/")}/>
                </div>

                <div className="section h-[56dvh] mt-10 flex-col justify-center items-center">
                    <Card className="card h-full mr-8">
                        <CardHeader className="card-container-login-center h-[25%]">
                            <p className="card-header">Đăng nhập</p>
                        </CardHeader>
                        <CardContent className="card-container-login-start h-[75%]">
                            <p className="info-name-login">Tên đăng nhập</p>
                            <Input ref={inputRef} className="info-input-login" placeholder="sPencase" value={username} onChange={(e) => setUsername(e.target.value)}/>
                            <p className="info-name-login">Mật khẩu</p>
                            <Input className="info-input-login" placeholder="••••••••••" value={password} onChange={(e) => setPassword(e.target.value)} type="password"/>
                            <div className="flex flex-row justify-between">
                                <div className="flex flex-row justify-start items-center">
                                    <p className="text-xl text-white font-thin mr-2">Hoặc</p>
                                    <p
                                        className="text-xl text-lime-500 font-bold ml-2 underline decoration-lime-500 cursor-pointer hover:text-lime-600 hover:decoration-lime-600"
                                        onClick={() => nav("/register")}
                                    >Đăng ký</p>
                                </div>
                                <Button className="btn-login" onClick={handleLogin}>
                                    Đăng nhập
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default LoginPage