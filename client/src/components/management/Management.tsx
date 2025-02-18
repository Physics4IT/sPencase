// React libraries
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowUpRight, ChevronRight } from "lucide-react"

// SHADCN
import { Card, CardContent, CardHeader } from "../ui/card"
import { Switch } from "../ui/switch"
import { Label } from "../ui/label"

// Others
import "./management.css"
import bg_img from "../../assets/img/bg_img.jpg"
import web_logo from "../../assets/img/logo.png"
import AlarmLayer from "./AlarmLayer"
import { listMessage, listMessage_add, listMessage_removeAll } from "./outputMessage"
import { getPhoneTime, setPhoneTime } from "./sendPhoneTime"

function Management() {
    const nav = useNavigate()
    const [sendData, setSendData] = useState<boolean>(false)
    
    const [temperature, setTemperature] = useState(24)
    const [humidity, setHumidity] = useState(40)
    const [uv, setUv] = useState(0)
    const [tilt, setTilt] = useState(1)
    const [envLux, setEnvLux] = useState(0)
    const [brightness, setBrightness] = useState(255)

    const [distance, setDistance] = useState(255)
    
    const [rgbMsg, setRgbMsg] = useState<boolean | undefined>(false)
    const [neopixelMsg, setNeopixelMsg] = useState<boolean | undefined>(false)
    const [autoOnC, setAutoOnC] = useState<boolean | undefined>(false)
    const [servoMsg, setServoMsg] = useState(0)
    const [buzzerMsg, setBuzzerMsg] = useState<boolean | undefined>(false)
    const [lcdMsg, setLcdMsg] = useState<boolean | undefined>(false)
    const [vibrationMsg, setVibrationMsg] = useState<boolean | undefined>(false)
    
    const [time, setTime] = useState<number>(Date.now())

    useEffect(() => {
        fetch('http://127.0.0.1:1880/data', {method: 'GET'})
            .then(response => response.json())
            .then(data => {
                setTemperature(data.temperature)
                setHumidity(data.humidity)
                setUv(data.uv)
                setTilt(data.tilt)
                setDistance(data.distance)

                setBrightness(Math.round(data.brightness * 255 / 4096))

                const photoresistorVoltage = data.brightness * 5 / 4096;
                const photoresistorResistance = 10000 * (5 - photoresistorVoltage) / photoresistorVoltage;
                const photoresistorLux = Math.pow(50000 * Math.pow(10, 0.7) / photoresistorResistance, 1 / 0.7);
                setEnvLux(photoresistorLux)
            })
            .catch(error => console.error('Error:', error));

        fetch('http://localhost:5000/api/users/me', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
            .then(response => response.json())
            .then(data => data.deviceOption)
            .then(deviceOption => {
                if (envLux > 50) setRgbMsg(false)
                else setRgbMsg(deviceOption.rgb)
            
                setNeopixelMsg(deviceOption.neopixel)
                setLcdMsg(deviceOption.lcd)
                setAutoOnC(deviceOption.autoOnC)
                setServoMsg(deviceOption.previousDegree)
                setVibrationMsg(deviceOption.vibration)
                setBuzzerMsg(deviceOption.buzzer)
            })
            .then(() => {
                listMessage_add({
                    topic: "sub/rgb",
                    payload: rgbMsg ? "on" : "off"
                })
                listMessage_add({
                    topic: "sub/neopixel",
                    payload: neopixelMsg ? "on" : "off"
                })
                listMessage_add({
                    topic: "sub/lcd",
                    payload: lcdMsg ? "3 on" : "3 off"
                })
                if (autoOnC && distance < 10) {
                    if (servoMsg === 0) {
                        for (let i = 0; i < 90; i += 10) {
                            listMessage_add({
                                topic: "sub/servo",
                                payload: i.toString()
                            })
                        }
                    }
                    else {
                        for (let i = 90; i > 0; i -= 10) {
                            listMessage_add({
                                topic: "sub/servo",
                                payload: i.toString()
                            })
                        }
                    }
                }
                listMessage_add({
                    topic: "sub/vibration",
                    payload: vibrationMsg && uv > 8 ? "on" : "off"
                })
                listMessage_add({
                    topic: "sub/buzzer",
                    payload: buzzerMsg ? "on" : "off"
                })
                setSendData(true)
            })
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(Date.now())
        }, 1000);
        
        return (() => clearInterval(interval))
    }, [])

    useEffect(() => {
        const intervalGetData = setInterval(async () => {
            await fetch('http://127.0.0.1:1880/data', {method: 'GET'})
                .then(response => response.json())
                .then(data => {
                    if (data.buttonState == 1) {
                        listMessage_add({
                            topic: "sub/button",
                            payload: "clicked"
                        })
                        alert("Button clicked!")
                    }

                    const lcdDisplayValue = "2 Temp: " + String(data.temperature).padStart(10, ' ') + "Humid: " + String(data.humidity).padStart(9, ' ')
                    listMessage_add({
                        topic: "sub/lcd",
                        payload: lcdDisplayValue
                    })

                    
                    listMessage_add({
                        topic: "sub/vibration",
                        payload: vibrationMsg && uv > 8 ? "on" : "off"
                    })

                    if (autoOnC && distance < 10) {
                        if (servoMsg === 0) {
                            for (let i = 0; i < 90; i += 10) {
                                listMessage_add({
                                    topic: "sub/servo",
                                    payload: i.toString()
                                })
                            }
                        }
                        else {
                            for (let i = 90; i > 0; i -= 10) {
                                listMessage_add({
                                    topic: "sub/servo",
                                    payload: i.toString()
                                })
                            }
                        }
                    }

                    setTemperature(data.temperature)
                    setHumidity(data.humidity)
                    setUv(data.uv)
                    setTilt(data.tilt)
                    setDistance(data.distance)
    
                    setBrightness(Math.round(data.brightness * 255 / 4096))
    
                    const photoresistorVoltage = data.brightness * 5 / 4096;
                    const photoresistorResistance = 10000 * (5 - photoresistorVoltage) / photoresistorVoltage;
                    const photoresistorLux = Math.pow(50000 * Math.pow(10, 0.7) / photoresistorResistance, 1 / 0.7);
                    setEnvLux(photoresistorLux)

                    let count = 0
                    let state = 0
                    
                    if (Date.now() - getPhoneTime() > 60000) {
                        if (data.temperature > 35) {
                            // listMessage_add({
                            //     topic: "phoneMsg",
                            //     payload: "Nhiệt độ đang ở mức cao!: " + String(data.temperature) + " độ C" 
                            // })
                            count++
                            state = 1
                        }
                        if (data.humidity < 20 || data.humidity > 80) {
                            // listMessage_add({
                            //     topic: "phoneMsg",
                            //     payload: "Độ ẩm đang bất thường!: " + String(data.humidity) + "%"
                            // })
                            count++
                            state = 2
                        }
                        if (data.uv > 8) {
                            listMessage_add({
                                topic: "phoneMsg",
                                payload: "Cường độ tia UV đang rất cao!: " + String(data.uv) + " mW/cm2"
                            })
                            count++
                            state = 3
                        }
                        if (data.tilt > 0) {
                            listMessage_add({
                                topic: "phoneMsg",
                                payload: "Thiết bị đang bị rung lắc mạnh!"
                            })
                            count++
                            state = 4
                        }
                        if (count > 1) {
                            listMessage_add({
                                topic: "sub/neopixel",
                                payload: "1 5"
                            })
                        } else if (count == 1) {
                            listMessage_add({
                                topic: "sub/neopixel",
                                payload: "1 " + state.toString()
                            })
                        }
                        setPhoneTime(Date.now())
                    }
                    setSendData(true)
                    return data
                })
                .catch(error => console.error('Error:', error));
        }, 1000);

        return () => {
            clearInterval(intervalGetData)
        }
    }, [])


    useEffect(() => {
        if (sendData) {
            listMessage?.map((msg) => {
                fetch('http://127.0.0.1:1880/receiveData', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(msg)
                })
                .then(response => response.text())
                .then(result => {console.log('Success: ', result)})
                .catch(error => {console.log('Error: ', error)})
            })

            setSendData(false)
            listMessage_removeAll()
        }
    }, [sendData])

    const parseTime = (timeStamp: number) => {
        const hours = new Date(timeStamp).getHours();
        const minutes = new Date(timeStamp).getMinutes();
        const seconds = new Date(timeStamp).getSeconds();
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }

    const handleShowAlarm = () => {
        const layer = document.getElementById("layer-alarm")
        if (layer) layer.style.display = "flex"
    }

    const handleHideAlarm = () => {
        setSendData(true)
        
        const layer = document.getElementById("layer-alarm")
        if (layer) layer.style.display = "none"
    }

    return (
        <div className="overflow-hidden flex relative">
            <img src={bg_img} alt="" className="web-bg"/>
            <div className="web-content relative">
                <div className="section h-[15dvh] flex-row justify-between items-center">
                    <img src={web_logo} alt="" className="web-logo z-30" onClick={() => nav("/account")}/>
                    <div className="nav-item-cont z-30" onClick={() => nav("/statistics")}>
                        <p className="nav-item">Số liệu thống kê</p>
                        <ChevronRight className="nav-icon"/>
                    </div>
                </div>

                <div className="section absolute h-[18dvh] flex-row justify-center items-end top-0 left-0 right-0 z-20">
                    <p className="timer">{parseTime(time)}</p>
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
                                        <Switch id="rgb" className="info-switch" checked={rgbMsg} 
                                            onCheckedChange={(e) => {
                                                listMessage_add({
                                                    topic: "sub/rgb",
                                                    payload: e ? "on" : "off"
                                                })
                                                setRgbMsg(e)
                                                setSendData(true)
                                            }}
                                        />
                                    </div>
                                    <div className="info-action w-[33%] line-after">
                                        <Label htmlFor="neopixel" className="info-label">Neopixel</Label>
                                        <Switch id="neopixel" className="info-switch" checked={neopixelMsg}
                                            onCheckedChange={(e) => {
                                                listMessage_add({
                                                    topic: "sub/neopixel",
                                                    payload: e ? "on" : "off"
                                                })
                                                setNeopixelMsg(e)
                                                setSendData(true)
                                            }}
                                        />
                                    </div>
                                    <div className="info-action w-[33%]">
                                        <Label htmlFor="lcd" className="info-label">LCD</Label>
                                        <Switch id="lcd" className="info-switch" checked={lcdMsg}
                                            onCheckedChange={(e) => {
                                                listMessage_add({
                                                    topic: "sub/lcd",
                                                    payload: e ? "3 on" : "3 off"
                                                })
                                                setLcdMsg(e)
                                                setSendData(true)
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="info-frame-col h-28 my-3">
                                <p className="info-name">Âm thanh</p>
                                <div className="info-actions">
                                    <div className="info-action w-[50%] line-after">
                                        <Label htmlFor="alarm" className="info-label">Báo thức</Label>
                                        <Switch id="alarm" className="info-switch" checked={buzzerMsg}
                                        onCheckedChange={(e) => {
                                                listMessage_add({
                                                    topic: "sub/buzzer",
                                                    payload: e ? "on" : "off"
                                                })
                                                setBuzzerMsg(e)
                                                setSendData(true)
                                            }}/>
                                        
                                    </div>
                                    <div className="info-action w-[50%]">
                                        <Label className="info-label">Cài đặt</Label>
                                        <div className="info-btn">
                                            <ArrowUpRight onClick={() => handleShowAlarm()}/>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="info-frame-col h-28 mt-3">
                                <p className="info-name">Khác</p>
                                <div className="info-actions">
                                    <div className="info-action w-[50%] line-after">
                                        <Label htmlFor="auto" className="info-label">Tự động đóng mở</Label>
                                        <Switch id="auto" className="info-switch" checked={autoOnC}
                                            onCheckedChange={(e) => {
                                                if (e && distance < 10) {
                                                    if (servoMsg === 0) {
                                                        for (let i = 0; i < 90; i += 10) {
                                                            listMessage_add({
                                                                topic: "sub/servo",
                                                                payload: i.toString()
                                                            })
                                                        }
                                                    }
                                                    else {
                                                        for (let i = 90; i > 0; i -= 10) {
                                                            listMessage_add({
                                                                topic: "sub/servo",
                                                                payload: i.toString()
                                                            })
                                                        }
                                                    }
                                                }
                                                setAutoOnC(e)
                                                setSendData(true)
                                            }}
                                        />
                                    </div>
                                    <div className="info-action w-[50%]">
                                        <Label htmlFor="vibrate" className="info-label">Rung</Label>
                                        <Switch id="vibrate" className="info-switch" checked={vibrationMsg}
                                            onCheckedChange={(e) => {
                                                listMessage_add({
                                                    topic: "sub/vibration",
                                                    payload: e && uv > 8 ? "on" : "off"
                                                })
                                                setVibrationMsg(e)
                                                setSendData(true)
                                            }}
                                        />
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
                                <p className="info-name-row">Rung lắc</p>
                                <p className="info-value">{tilt == 1? "Có" : "Không"}</p>
                            </div>
                            <div className="info-frame-row h-14 mt-3">
                                <p className="info-name-row">Cường độ đèn</p>
                                <p className="info-value">{brightness}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <AlarmLayer HideAlarm={() => handleHideAlarm()}/>
        </div>
    )
}

export default Management