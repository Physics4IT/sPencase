import { useNavigate } from "react-router-dom";

import "./registerPage.css"

import bg_img from "../../assets/img/bg_img.jpg"
import web_logo from "../../assets/img/logo.png"
import { Card, CardContent, CardHeader } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect, useRef, useState } from "react";

function RegisterPage() {
    const nav = useNavigate()
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const inputRef = useRef<HTMLInputElement | null>(null)

    const handleRegister = async () => {
        if (username.trim() == "" || password.trim() == "") {
            alert("Thiếu thông tin quan trọng!")
        } else {
            const data = {
                username: username,
                email: email,
                password: password,
                phonenum: ""
            }
    
            const response = await fetch("http://localhost:5000/api/users/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
    
            if (response.ok) {
                const res = await response.json()
                console.log(res)
                nav("/login")
            } else {
                console.log("Error")
                alert("Tài khoản đã tồn tại!")
            }
        }
    }

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, [])

    return (
        <div className="overflow-hidden flex relative">
            <img src={bg_img} alt="" className="web-bg-reverse"/>
            <div className="web-content">
                <div className="section h-[15dvh] flex-row justify-between items-center">
                    <img src={web_logo} alt="" className="web-logo z-30" onClick={() => nav("/")}/>
                </div>

                <div className="section h-[72dvh] mt-4 flex-col justify-center items-center">
                    <Card className="card h-full mr-8">
                        <CardHeader className="card-container-register-center h-[20%]">
                            <p className="card-header">Đăng ký tài khoản</p>
                        </CardHeader>
                        <CardContent className="card-container-register-start h-[80%]">
                            <p className="info-name-register">Tên đăng nhập</p>
                            <Input ref={inputRef} className="info-input-register" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="sPencase"/>
                            <p className="info-name-register">Email</p>
                            <Input className="info-input-register" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="example@gmail.com"/>
                            <p className="info-name-register">Mật khẩu</p>
                            <Input className="info-input-register" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••••" type="password"/>

                            <div className="flex flex-row justify-between">
                                <div className="flex flex-row justify-start items-center">
                                    <p className="text-xl text-white font-thin mr-2">Hoặc</p>
                                    <p
                                        className="text-xl text-lime-500 font-bold ml-2 underline decoration-lime-500 cursor-pointer hover:text-lime-600 hover:decoration-lime-600"
                                        onClick={() => nav("/login")}
                                    >Đăng nhập</p>
                                </div>
                                <Button
                                    className="btn-register"
                                    onClick={() => handleRegister()}
                                >Đăng ký</Button>
                            </div>
                        </CardContent>


                    </Card>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage