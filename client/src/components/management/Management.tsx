// React libraries
import { useNavigate } from "react-router-dom"

// SHADCN
import { Card, CardContent, CardHeader } from "../ui/card"

// Others
import "./management.css"
import bg_img from "../../assets/img/bg_img.jpg"
import web_logo from "../../assets/img/logo.png"
import { Switch } from "../ui/switch"
import { Label } from "../ui/label"
import { ArrowUpRight } from "lucide-react"
import { useEffect, useState } from "react"

function Management() {
    const nav = useNavigate()

    const [temperature, setTemperature] = useState(24)
    const [humidity, setHumidity] = useState(40)
    const [uv, setUv] = useState(0)
    const [tilt, setTilt] = useState(1)
    const [brightness, setBrightness] = useState(255)

    useEffect(() => {
        setTemperature(temperature)
        setHumidity(humidity)
        setUv(uv)
        setTilt(tilt)
        setBrightness(brightness)
    }, [])

    return (
        <div className="overflow-hidden flex relative">
            <img src={bg_img} alt="" className="web-bg"/>
            <div className="web-content relative">
                <div className="section h-[15dvh] flex-row justify-start items-center">
                    <img src={web_logo} alt="" className="web-logo z-30" onClick={() => nav("/account")}/>
                </div>

                <div className="section absolute h-[18dvh] flex-row justify-center items-end top-0 left-0 right-0 z-20">
                    <p className="timer">12:05</p>
                </div>

                <div className="section h-[85dvh] flex-row justify-center items-center">
                    <Card className="card h-5/6 mr-8">
                        <CardHeader className="card-container h-[20%]">
                            <p className="card-header">Điều chỉnh thiết bị</p>
                        </CardHeader>
                        <CardContent className="flex flex-col justify-start p-0 h-[80%]">
                            <div className="info-frame-col h-28 mb-3">
                                <p className="info-name">Hiển thị</p>
                                <div className="info-actions">
                                    <div className="info-action w-[33%] line-after">
                                        <Label htmlFor="rgb" className="info-label">RGB</Label>
                                        <Switch id="rgb" className="info-switch"></Switch>
                                    </div>
                                    <div className="info-action w-[33%] line-after">
                                        <Label htmlFor="neopixel" className="info-label">Neopixel</Label>
                                        <Switch id="neopixel" className="info-switch"/>
                                    </div>
                                    <div className="info-action w-[33%]">
                                        <Label htmlFor="lcd" className="info-label">LCD</Label>
                                        <Switch id="lcd" className="info-switch"/>
                                    </div>
                                </div>
                            </div>

                            <div className="info-frame-col h-28 my-3">
                                <p className="info-name">Âm thanh</p>
                                <div className="info-actions">
                                    <div className="info-action w-[50%] line-after">
                                        <Label htmlFor="alarm" className="info-label">Báo thức</Label>
                                        <Switch id="alarm" className="info-switch"></Switch>
                                    </div>
                                    <div className="info-action w-[50%]">
                                        <Label className="info-label">Cài đặt</Label>
                                        <div className="info-btn">
                                            <ArrowUpRight />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="info-frame-col h-28 mt-3">
                                <p className="info-name">Khác</p>
                                <div className="info-actions">
                                    <div className="info-action w-[50%] line-after">
                                        <Label htmlFor="auto" className="info-label">Tự động đóng mở</Label>
                                        <Switch id="auto" className="info-switch"></Switch>
                                    </div>
                                    <div className="info-action w-[50%]">
                                        <Label htmlFor="vibrate" className="info-label">Rung</Label>
                                        <Switch id="vibrate" className="info-switch"/>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="card h-5/6 ml-8">
                        <CardHeader className="card-container h-[20%]">
                            <p className="card-header">Thông số</p>
                        </CardHeader>
                        <CardContent className="flex flex-col justify-start p-0 h-[80%]">
                            <div className="info-frame-row h-14 mb-3">
                                <p className="info-name-row">Nhiệt độ (C)</p>
                                <p className="info-value">{temperature}</p>
                            </div>
                            <div className="info-frame-row h-14 my-3">
                                <p className="info-name-row">Độ ẩm</p>
                                <p className="info-value">{humidity}</p>
                            </div>
                            <div className="info-frame-row h-14 my-3">
                                <p className="info-name-row">Cường độ UV</p>
                                <p className="info-value">{uv}</p>
                            </div>
                            <div className="info-frame-row h-14 my-3">
                                <p className="info-name-row">Độ nghiêng</p>
                                <p className="info-value">{tilt}</p>
                            </div>
                            <div className="info-frame-row h-14 mt-3">
                                <p className="info-name-row">Cường độ đèn</p>
                                <p className="info-value">{brightness}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default Management