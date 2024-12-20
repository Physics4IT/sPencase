// React
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";

// SHADCN
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

// Others
import "./accountPage.css"
import bg_img from "../../assets/img/bg_img.jpg"
import avatar from "../../assets/img/avatar.jpg"
import InforForm from "./InforForm";
import NavSection from "./NavSection";
import { getEmailMsg, getEmailSend, setEmailSend } from "./emailMessage";

function AccountPage() {
    const nav = useNavigate()
    const service_id : string = import.meta.env.VITE_SERVICE_ID || ''
    const template_id : string = import.meta.env.VITE_TEMPLATE_ID || ''
    const options : string = import.meta.env.VITE_OPTIONS || ''

    const [username, setUsername] = useState("sPencase")
    const [email, setEmail] = useState("spencase@gmail.com")
    const [phoneNum, setPhoneNum] = useState("0123456789")

    const [tempName, setTempName] = useState(username)
    const [tempMail, setTempMail] = useState(email)
    const [tempPhone, setTempPhone] = useState(phoneNum)

    useEffect(() => {
        // Fetch user's data
        fetch("http://localhost:5000/api/users/me", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
            .then(response => {
                if (response.ok) {
                    console.log("Response: ", response)
                    return response.json()
                }
                throw new Error("Network response was not ok")
            })
            .catch(error => console.error("Error: ", error))
            .then(data => {
                setUsername(data.username)
                setEmail(data.email)
                setPhoneNum(data.phonenum)

                // Send email of logging in successfully
                if (getEmailSend()) {
                    emailjs.send(service_id, template_id, 
                        {
                            title: 'Tin nhắn mới',
                            mailto: data.email,
                            message: getEmailMsg()
                        }, options
                    )
                    .then(() => {
                        console.log("Email sent successfully!")
                    })
                    .catch((error) => {
                        console.error("Error sending email:", error)
                    })
                    
                    setEmailSend()
                }
            })

    }, [])

    const handleShowChangeInfo = () => {
        setTempName(username)
        setTempMail(email)
        setTempPhone(phoneNum)

        const layer = document.getElementById("layer-account-info")
        if (layer) layer.style.display = "flex"
    }

    const handleHideChangeInfo = () => {
        const layer = document.getElementById("layer-account-info")
        if (layer) layer.style.display = "none"
    }

    const handleShowLogout = () => {
        const layer = document.getElementById("layer-logout")
        if (layer) layer.style.display = "flex"
    }

    const handleHideLogout = () => {
        const layer = document.getElementById("layer-logout")
        if (layer) layer.style.display = "none"
    }

    const handleSaveInfo = () => {
        let change = false
        if (tempName.trim() !== "" && tempName != username) {
            setUsername(tempName)
            change = true
        }
        if (tempMail.trim() !== "" && tempMail != email) {
            setEmail(tempMail)
            change = true
        }
        if (tempPhone.trim() !== "" && tempPhone != phoneNum) {
            setPhoneNum(tempPhone)
            change = true
        }

        if (change) {
            emailjs.send(service_id, template_id, 
                {
                    title: 'New message',
                    mailto: email,
                    message: 'Thông tin cá nhân của bạn đã được thay đổi'
                }, options
            )
            .then(() => {
                console.log("Email sent successfully!")
            })
            .catch((error) => {
                console.error("Error sending email:", error)
            })
        }

        /////////////////////// WRITE CODE SEGMENT TO CHANGE USER'S INFORMATION IN DATABASE

        const layer = document.getElementById("layer-account-info")
        if (layer) layer.style.display = "none"
    }

    const handleLogout = () => {
        fetch("http://localhost:5000/api/users/logout", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
            .then(response => {
                if (response.ok) {
                    console.log("Response: ", response)
                    return response.json()
                }
                throw new Error("Network response was not ok")
            })
            .catch(error => console.error("Error: ", error))
            .then(data => {
                console.log(data)
            })

        const layer = document.getElementById("layer-logout")
        if (layer) layer.style.display = "none"

        nav("/")
    }

    return (
        <div className="overflow-hidden flex relative">
            <img src={bg_img} alt="" className="web-bg"/>
            <div className="web-content">
                <div className="section h-full flex-row justify-center items-center">
                    <Card className="card h-4/5 mr-8">
                        <CardHeader className="card-header-container">
                            <p className="card-header">Thông tin cá nhân</p>
                        </CardHeader>
                        <CardContent className="card-container flex-col">
                            <div className="relative w-20 h-20 rounded-full overflow-hidden mt-7">
                                <img src={avatar} alt="" className="web-bg"/>
                            </div>

                            <ul className="w-full">
                                <InforForm name="Tên người dùng" value={username} style="mt-6"/>
                                <InforForm name="Email" value={email} style="mt-6"/>
                                <InforForm name="Số điện thoại" value={phoneNum} style="mt-6"/>
                            </ul>
                        </CardContent>
                        <CardFooter className="flex justify-center">
                            <Button className="btn-1" onClick={() => handleShowChangeInfo()}>Thay đổi thông tin</Button>
                        </CardFooter>
                    </Card>

                    <div className="card-init flex flex-col justify-center h-4/5 ml-8 rounded-lg bg-none">
                        <Card className="card h-1/2 mb-8">
                            <CardHeader className="card-container">
                                <p className="card-header">Chức năng</p>
                            </CardHeader>
                            <CardContent>
                                <NavSection content="Quản lý thiết bị" navigatee="/management" style="mb-4"/>
                                <NavSection content="Lịch sử dữ liệu" navigatee="/history" style="mb-4"/>
                                <NavSection content="Số liệu thống kê" navigatee="/statistics"/>
                            </CardContent>
                        </Card>

                        <Card className="card h-2/5 mt-8">
                            <CardHeader className="card-container flex-[0.3]">
                                <p className="card-header">Nâng cao</p>
                            </CardHeader>
                            <CardContent className="flex flex-row justify-center items-center">
                                <Button className="btn-logout mr-4" onClick={() => handleShowLogout()} >Đăng xuất</Button>
                                <Button className="btn-del ml-4">Xóa tài khoản</Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            <div id="layer-account-info" className="overlay">
                <div className="layer-container w-[50%] h-[70dvh]">
                    <p className="layer-header">Thay đổi thông tin cá nhân</p>
                    <div className="layer-info-cont">
                        <Label htmlFor="input-name" className="layer-content">Tên người dùng</Label>
                        <Input id="input-name" type="text" value={tempName} onChange={(e) => setTempName(e.target.value)} className="layer-input"/>
                    </div>

                    <div className="layer-info-cont">
                        <Label htmlFor="input-mail" className="layer-content">Email</Label>
                        <Input id="input-mail" type="email" value={tempMail} onChange={(e) => setTempMail(e.target.value)} className="layer-input"/>
                    </div>

                    <div className="layer-info-cont">
                        <Label htmlFor="input-phone" className="layer-content">Số điện thoại</Label>
                        <Input id="input-phone" type="text" value={tempPhone} onChange={(e) => setTempPhone(e.target.value)} className="layer-input"/>
                    </div>

                    <div className="layer-row">
                        <div className="layer-acc-exit" onClick={() => handleHideChangeInfo()}>Thoát</div>
                        <div className="layer-acc-save" onClick={() => handleSaveInfo()}>Lưu</div>
                    </div>
                </div>
            </div>

            <div id="layer-logout" className="overlay">
                <div className="layer-container w-[50%] h-[45dvh]">
                    <p className="layer-header">Bạn có chắc chắn với sự lựa chọn này?</p>
                    <p className="layer-content">Điều này sẽ đăng xuất tài khoản của bạn khỏi hệ thống sPencase.</p>
                    <p className="layer-content">Đừng lo lắng, tài khoản của bạn sẽ không bị mất.</p>

                    <div className="layer-row">
                        <div className="layer-acc-exit mt-4" onClick={() => handleHideLogout()}>Hủy</div>
                        <div className="layer-acc-save mt-4" onClick={() => handleLogout()}>Tiếp tục</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountPage