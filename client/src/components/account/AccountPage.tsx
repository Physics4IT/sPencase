// SHADCN
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";

// Others
import "./accountPage.css"
import bg_img from "../../assets/img/bg_img.jpg"
import avatar from "../../assets/img/avatar.jpg"
import InforForm from "./InforForm";
import NavSection from "./NavSection";
import { useEffect, useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

function AccountPage() {
    const [username, setUsername] = useState("sPencase")
    const [email, setEmail] = useState("spencase@gmail.com")
    const [phoneNum, setPhoneNum] = useState("0123456789")

    const [tempName, setTempName] = useState(username)
    const [tempMail, setTempMail] = useState(email)
    const [tempPhone, setTempPhone] = useState(phoneNum)

    useEffect(() => {
        // //////////////////////////////////////////////
        setUsername(username)
        setEmail(email)
        setPhoneNum(phoneNum)
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

    const handleSaveInfo = () => {
        if (tempName.trim() !== "" && tempName != username) setUsername(tempName)
        if (tempMail.trim() !== "" && tempMail != email) setEmail(tempMail)
        if (tempPhone.trim() !== "" && tempPhone != phoneNum) setPhoneNum(tempPhone)

        const layer = document.getElementById("layer-account-info")
        if (layer) layer.style.display = "none"
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
                                <NavSection content="Lịch sử dữ liệu" navigatee="/" style="mb-4"/>
                                <NavSection content="Số liệu thống kê" navigatee="/statistics"/>
                            </CardContent>
                        </Card>

                        <Card className="card h-2/5 mt-8">
                            <CardHeader className="card-container">
                                <p className="card-header">Nâng cao</p>
                            </CardHeader>
                            <CardContent className="flex flex-row justify-center">
                                <Button className="btn-logout mr-4">Đăng xuất</Button>
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
        </div>
    )
}

export default AccountPage