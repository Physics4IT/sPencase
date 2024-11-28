import { useNavigate } from "react-router-dom";

import "./loginPage.css"

import bg_img from "../../assets/img/bg_img.jpg"
import web_logo from "../../assets/img/logo.png"
import { Card, CardContent, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";

function LoginPage() {
    const nav = useNavigate()
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const handleLogin = async () => {
        const data = {
            username: username,
            password: password
        }

        const response = await fetch("http://localhost:5000/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        if (response.ok) {
            const res = await response.json()
            console.log(res)
            nav("/account")
        } else {
            console.log("Error")
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
                            <Input className="info-input-login" placeholder="sPencase" value={username} onChange={(e) => setUsername(e.target.value)}/>
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