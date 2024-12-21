import { useEffect, useState } from "react"
import { Input } from "../ui/input"
import { Label } from "../ui/label"
import { setInfoData, userInfoData } from "./accountInfoData"

function AccountInfoLayer({
    funcSaveInfo = () => {}
}) {
    const [name, setName] = useState("")
    const [mail, setMail] = useState("")
    const [phone, setPhone] = useState("")

    const preSaveInfo = () => {
        setInfoData(name, mail, phone)
        funcSaveInfo()
    }

    const handleHideChangeInfo = () => {
        const layer = document.getElementById("layer-account-info")
        if (layer) layer.style.display = "none"
    }

    useEffect(() => {
        setName(userInfoData.name)
        setMail(userInfoData.mail)
        setPhone(userInfoData.phone)
    }, [userInfoData.name])

    return (
        <div id="layer-account-info" className="overlay">
            <div className="layer-container w-[50%] h-[70dvh]">
                <p className="layer-header">Thay đổi thông tin cá nhân</p>
                <div className="layer-info-cont">
                    <Label htmlFor="input-name" className="layer-content">Tên người dùng</Label>
                    <Input id="input-name" type="text" value={name} onChange={(e) => setName(e.target.value)} className="layer-input"/>
                </div>

                <div className="layer-info-cont">
                    <Label htmlFor="input-mail" className="layer-content">Email</Label>
                    <Input id="input-mail" type="email" value={mail} onChange={(e) => setMail(e.target.value)} className="layer-input"/>
                </div>

                <div className="layer-info-cont">
                    <Label htmlFor="input-phone" className="layer-content">Số điện thoại</Label>
                    <Input id="input-phone" type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="layer-input"/>
                </div>

                <div className="layer-row">
                    <div className="layer-acc-exit" onClick={() => handleHideChangeInfo()}>Thoát</div>
                    <div className="layer-acc-save" onClick={() => preSaveInfo()}>Lưu</div>
                </div>
            </div>
        </div>
    )
}

export default AccountInfoLayer