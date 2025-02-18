// React
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import emailjs from "@emailjs/browser";

// SHADCN
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";

// Others
import "./accountPage.css"
import bg_img from "../../assets/img/bg_img.jpg"
import avatar from "../../assets/img/avatar.jpg"
import InforForm from "./InforForm";
import NavSection from "./NavSection";
import { getEmailMsg, getEmailSend, setEmailSend } from "./emailMessage";
import AccountInfoLayer from "./AccountInfoLayer";
import { setInfoData, userInfoData } from "./accountInfoData";
import LogoutWarning from "./logoutWarning";
import DeleteAccount from "./deleteWarning";

function AccountPage() {
    const nav = useNavigate()
    const service_id : string = import.meta.env.VITE_SERVICE_ID || ''
    const template_id : string = import.meta.env.VITE_TEMPLATE_ID || ''
    const options : string = import.meta.env.VITE_OPTIONS || ''

    const [username, setUsername] = useState("sPencase")
    const [email, setEmail] = useState("spencase@gmail.com")
    const [phoneNum, setPhoneNum] = useState("0123456789")

    useEffect(() => {
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
                setInfoData(data.username, data.email, data.phonenum)

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
        const layer = document.getElementById("layer-account-info")
        if (layer) layer.style.display = "flex"
    }

    const handleShowLogout = () => {
        const layer = document.getElementById("layer-logout")
        if (layer) layer.style.display = "flex"
    }

    const handleShowDelAcc = () => {
        const layer = document.getElementById("layer-delete-account")
        if (layer) layer.style.display = "flex"
    }

    const handleSaveInfo : Function = () => {
        let change = false
        if (userInfoData.name.trim() !== "" && userInfoData.name != username) {
            setUsername(userInfoData.name)
            change = true
        }
        if (userInfoData.mail.trim() !== "" && userInfoData.mail != email) {
            setEmail(userInfoData.mail)
            change = true
        }
        if (userInfoData.phone.trim() !== "" && userInfoData.phone != phoneNum) {
            setPhoneNum(userInfoData.phone)
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

        fetch("http://localhost:5000/api/users/update", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                username: userInfoData.name,
                email: userInfoData.mail,
                phonenum: userInfoData.phone
            })
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error("Network response was not ok")
            })
            .catch(error => console.error("Error: ", error))

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

    const handleDelete = () => {
        fetch("http://localhost:5000/api/users/delete", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
            .then(response => {
                if (response.ok) {
                    return response.json()
                }
                throw new Error("Network response was not ok")
            })
            .catch(error => console.error("Error: ", error))
            .then(data => {
                console.log(data)
            })

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
                                <Button className="btn-del ml-4" onClick={() => handleShowDelAcc()}>Xóa tài khoản</Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>

            <AccountInfoLayer funcSaveInfo={() => handleSaveInfo()}/>
            <LogoutWarning logOut={() => handleLogout()}/>
            <DeleteAccount deleteAcc={() => handleDelete()}/>
        </div>
    )
}

export default AccountPage