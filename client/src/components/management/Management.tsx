// React libraries
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { AlarmClockPlus, ArrowUpRight, ChevronRight, CircleMinus } from "lucide-react"

// SHADCN
import { Card, CardContent, CardHeader } from "../ui/card"
import { Switch } from "../ui/switch"
import { Label } from "../ui/label"

// Others
import "./management.css"
import bg_img from "../../assets/img/bg_img.jpg"
import web_logo from "../../assets/img/logo.png"

type alarmData = {
    _id?: string
    hour: number
    minute: number
    state: boolean
}

type listAlarm = Array<alarmData> | null

function Management() {
    const nav = useNavigate()
    const [data, setData] = useState<listAlarm>(null)
    const [reset, setReset] = useState<boolean>(false)
    const [sendData, setSendData] = useState<boolean>(false)

    const [temperature, setTemperature] = useState(24)
    const [humidity, setHumidity] = useState(40)
    const [uv, setUv] = useState(0)
    const [tilt, setTilt] = useState(1)
    const [brightness, setBrightness] = useState(255)

    const [time, setTime] = useState<number>(Date.now())

    useEffect(() => {
        setTemperature(temperature)
        setHumidity(humidity)
        setUv(uv)
        setTilt(tilt)
        setBrightness(brightness)
    }, [])

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(Date.now())
        }, 1000);
        
        return (() => clearInterval(interval))
    }, [])

    // useEffect(() => {
    //     fetch("http://localhost:5000/api/alarms/")
    //         .then(data => data.json())
    //         .then(data => setData(data.body))
            
    // }, [reset])

    useEffect(() => {
        const intervalGetData = setInterval(() => {
            fetch('http://127.0.0.1:1880/data', {method: 'GET'})
                .then(response => response.text())
                .then(data => {
                    console.log(data);
                })
                .catch(error => console.error('Error:', error));
        }, 5000);

        return () => {
            clearInterval(intervalGetData)
        }
    }, [])

    const [rgbMsg, setRgbMsg] = useState<boolean | undefined>(false)
    const [neopixelMsg, setNeopixelMsg] = useState<boolean | undefined>(false)
    const [servoMsg, setServoMsg] = useState<boolean | undefined>(false)
    const [sevenSegmentMsg, setSevenSegmentMsg] = useState<boolean | undefined>(false)
    const [buzzerMsg, setBuzzerMsg] = useState<boolean | undefined>(false)
    const [lcdMsg, setLcdMsg] = useState<boolean | undefined>(false)
    const [vibrationMsg, setVibrationMsg] = useState<boolean | undefined>(false)
    const [buttonMsg, setButtonMsg] = useState<boolean | undefined>(false)
    const [phoneMsg, setPhoneMsg] = useState<boolean | undefined>(false)
    const [topicMsg, setTopicMsg] = useState<string>("")

    useEffect(() => {
        if (sendData) {
            let bodyData;

            switch (topicMsg) {
                case "rgb":
                    bodyData = {
                        topic: "sub/rgb",
                        payload: rgbMsg ? "on" : "off"
                    }
                    break

                case "neopixel":
                    bodyData = {
                        topic: "sub/neopixel",
                        payload: neopixelMsg ? "on" : "off"
                    }
                    break

                case "servo":
                    bodyData = {
                        topic: "sub/servo",
                        payload: servoMsg
                    }
                    break

                case "sevenSegment":
                    bodyData = {
                        topic: "sub/sevenSegment",
                        payload: sevenSegmentMsg
                    }
                    break

                case "buzzer":
                    bodyData = {
                        topic: "sub/buzzer",
                        payload: buzzerMsg
                    }
                    break

                case "lcd":
                    bodyData = {
                        topic: "sub/lcd",
                        payload: lcdMsg ? "3 on" : "3 off"
                    }
                    break

                case "vibration":
                    bodyData = {
                        topic: "sub/vibration",
                        payload: vibrationMsg
                    }
                    break

                case "button":
                    bodyData = {
                        topic: "sub/button",
                        payload: buttonMsg ? "clicked" : "not clicked"
                    }
                    break

                case "phone":
                    bodyData = {
                        topic: "phoneMsg",
                        payload: phoneMsg
                    }
            }

            fetch('http://127.0.0.1:1880/receiveData', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(bodyData)
            })
            .then(response => response.text())
            .then(result => {console.log('Success: ', result)})
            .catch(error => {console.log('Error: ', error)})
            setSendData(false)
        }
    }, [sendData, topicMsg])

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
        const layer = document.getElementById("layer-alarm")
        if (layer) layer.style.display = "none"
    }

    const handleAddAlarm = async () => {
        const newData : listAlarm = data ? [...data] : []
        newData.push({
            hour: 0,
            minute: 0,
            state: false
        })

        newData.sort((a, b) => {
            if (a.hour !== b.hour) {
                return a.hour - b.hour
            }
            return a.minute - b.minute
        })

        await fetch("http://localhost:5000/api/alarms/", {
            method: 'DELETE'
        })

        await fetch("http://localhost:5000/api/alarms/", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newData)
        })

        setReset(!reset)
    }

    const handleDeleteAlarm = async (key: number) => {
        if (data) {
            const newData : listAlarm = [...data]
            newData.splice(key, 1)

            await fetch("http://localhost:5000/api/alarms/", {
                method: 'DELETE'
            })

            await fetch("http://localhost:5000/api/alarms/", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(newData)
            })
    
            setReset(!reset)
        }
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
                                                setRgbMsg(e)
                                                setTopicMsg("rgb")
                                                setSendData(true)
                                            }}
                                        />
                                    </div>
                                    <div className="info-action w-[33%] line-after">
                                        <Label htmlFor="neopixel" className="info-label">Neopixel</Label>
                                        <Switch id="neopixel" className="info-switch" checked={neopixelMsg}
                                            onCheckedChange={(e) => {
                                                setNeopixelMsg(e)
                                                setTopicMsg("neopixel")
                                                setSendData(true)
                                            }}
                                        />
                                    </div>
                                    <div className="info-action w-[33%]">
                                        <Label htmlFor="lcd" className="info-label">LCD</Label>
                                        <Switch id="lcd" className="info-switch" checked={lcdMsg}
                                            onCheckedChange={(e) => {
                                                setLcdMsg(e)
                                                setTopicMsg("lcd")
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
                                        <Switch id="alarm" className="info-switch"/>
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
                                        <Switch id="auto" className="info-switch"/>
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

            <div id="layer-alarm" className="overlay">
                <div className="layer-container w-[25%] h-[70dvh]">
                    <div className="w-full flex flex-row justify-between items-center">
                        <p className="layer-header">Báo thức</p>
                        <AlarmClockPlus className="h-8 w-8 text-slate-700 hover:text-slate-400 cursor-pointer" onClick={() => handleAddAlarm()}/>
                    </div>
                    <div className={`w-full h-[70%] flex flex-col justify-start mt-2 ${data && 'overflow-y-scroll'}`}>
                        {data?.map((value, key) => {
                            return (
                                <div key={key} className={`alarm-container ${value.state ? 'border-green-600' : 'border-zinc-800'}`}>
                                    <div className="alarm-time">
                                        <p className="alarm-time-content">{value.hour} : {value.minute}</p>
                                    </div>
                                    <div className="alarm-button">
                                        <p className="alarm-button-text">{value.state? "Tắt" : "Bật"}</p>
                                    </div>
                                    <div className="alarm-delete">
                                        <CircleMinus className="alarm-icon" onClick={() => handleDeleteAlarm(key)}/>
                                    </div>
                                </div>
                            )
                        })}
                        {!data && 
                            <p className="text-2xl font-thin text-stone-700">Không có báo thức nào để hiển thị.</p>
                        }
                    </div>

                    <div className="layer-row">
                        <div className="layer-acc-exit" onClick={() => handleHideAlarm()}>Thoát</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Management