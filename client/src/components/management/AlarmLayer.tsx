import { AlarmClockPlus, CircleMinus } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { Input } from "../ui/input"
import { listMessage_add } from "./outputMessage"

export type alarmData = {
    _id?: string
    user_id: string
    hour: number
    minute: number
    state: boolean
}

export type listAlarm = Array<alarmData> | null

function AlarmLayer({
    HideAlarm = () => {},
}) {
    const [data, setData] = useState<listAlarm>([])
    const [reset, setReset] = useState<boolean>(false)
    const [alarm_id, setAlarm_id] = useState(-1)
    const [user, setUser] = useState<string>("")
    const [inputValue, setInputValue] = useState<string>("")
    const [onChangeValue, setOnChangeValue] = useState<boolean>(false)

    const inputRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        fetch("http://localhost:5000/api/users/me/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
            .then(data => data.json())
            .then(data => setUser(data._id))
    }, [])

    useEffect(() => {
        fetch("http://localhost:5000/api/alarms/", {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include"
        })
            .then(data => data.json())
            .then(data => setData(data))
    }, [reset])

    const handleUpdateAlarm = async (data: listAlarm) => {
        if (data) {
            await fetch("http://localhost:5000/api/alarms/", {
                method: 'DELETE',
                credentials: "include"
            })

            await fetch("http://localhost:5000/api/alarms/", {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data),
                credentials: "include"
            })
        }
        setReset(!reset)
    }

    const prevAddAlarm = () => {
        const newAlarm : alarmData = {
            user_id: user,
            hour: 0,
            minute: 0,
            state: true
        }
        const newData : listAlarm = data ? [newAlarm, ...data] : [newAlarm]
        handleUpdateAlarm(newData)
    }

    const changeState = (id: number) => {
        let newData : listAlarm = data ? data : []
        newData = newData.map((item, key) => {
            if (key == id) return {...item, state: !item.state}
            else return item
        })
        handleUpdateAlarm(newData)
    }

    const prevDeleteAlarm = (key: number) => {
        const newData : listAlarm = data ? data : []
        newData.splice(key, 1)
        handleUpdateAlarm(newData)
    }

    const checkString = (str: string) => {
        const regex = /^\d+:\d+$/
        return regex.test(str)
    }

    const checkTimeString = (str: string) => {
        const parts = str.split(":")
        if (!(parts.every(part => /^\d+$/.test(part)))) return false
        const times = parts.map(Number)
        if (times[0] > 24 || times[1] > 60) return false
        return true
    }

    const prevHideLayer = (array: listAlarm) => {
        const seen = new Set()
        const newArray = array ? array.filter(obj => {
            if (!(obj.state)) return false
            const key = `${obj.hour}:${obj.minute}`
            if (seen.has(key)) return false
            seen.add(key)
            return true
        }) : []

        let stringMsg = "1 "
        newArray.map((alarm) => {
            stringMsg += alarm.hour.toString().padStart(2, '0') + ":" + alarm.minute.toString().padStart(2, '0')
        })

        listMessage_add({
            topic: "sub/buzzer",
            payload: stringMsg
        })

        HideAlarm()
    };

    useEffect(() => {
        if (onChangeValue) {
            if (inputValue.length < 6 && checkString(inputValue) && checkTimeString(inputValue)) {
                const parts = inputValue.split(":")
                const times = parts.map(Number)

                let newData : listAlarm = data ? data : []
                newData = newData.map((item, key) => {
                    if (key == alarm_id) return {...item, hour: times[0], minute: times[1]}
                    else return item
                })

                newData.sort((a, b) => {
                    if (a.hour !== b.hour) {
                        return a.hour - b.hour
                    }
                    return a.minute - b.minute
                })
                
                handleUpdateAlarm(newData)
            } else alert("Giá trị không hợp lệ!")
            setOnChangeValue(false)
            setAlarm_id(-1)
        }
    }, [onChangeValue])
    
    useEffect(() => {
        const handleClickOutside = (event: Event) => {
            if (alarm_id != -1 && !inputRef.current?.contains(event.target as Node)) {
                setOnChangeValue(true)
            }
        }
        
        const handlePressEnter = (event: KeyboardEvent) => {
            if (event.key === "Enter" && alarm_id != -1) {
                setOnChangeValue(true)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        document.addEventListener("keydown", handlePressEnter)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
            document.removeEventListener("keydown", handlePressEnter)
        }
    }, [alarm_id])

    return (
        <div id="layer-alarm" className="overlay">
            <div className="layer-container w-[25%] h-[70dvh]">
                <div className="w-full flex flex-row justify-between items-center">
                    <p className="layer-header">Báo thức</p>
                    <AlarmClockPlus className="h-8 w-8 text-slate-700 hover:text-slate-400 cursor-pointer" onClick={() => prevAddAlarm()}/>
                </div>
                <div className={`layer-alarm-content ${data && data.length > 0 && 'overflow-y-scroll'}`}>
                    {data?.map((value: alarmData, key: number) => {
                        return (
                            <div key={key} className={`alarm-container ${value.state ? 'border-green-600 bg-green-100' : 'border-zinc-800 bg-slate-200'}`}>
                                {!(alarm_id == key) ?
                                    <div className="alarm-time cursor-pointer" onClick={() => {
                                        setAlarm_id(key)
                                        setInputValue(value.hour + ":" + value.minute)
                                    }}>
                                        <p className="alarm-time-content">
                                            {value.hour.toString().length < 2 ? "0" + value.hour.toString() : value.hour} 
                                            : 
                                            {value.minute.toString().length < 2 ? "0" + value.minute.toString() : value.minute}
                                        </p>
                                    </div> :
                                    <Input 
                                        className={`alarm-input ${value.state ? 'border-green-600' : 'border-zinc-800'}`} 
                                        autoFocus
                                        ref={inputRef}
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                    />
                                }

                                <div className="alarm-button" onClick={() => changeState(key)}>
                                    <p className="alarm-button-text">{value.state? "Bật" : "Tắt"}</p>
                                </div>
                                <abbr title="Xóa báo thức">
                                    <div className="alarm-delete">
                                        <CircleMinus className="alarm-icon" onClick={() => prevDeleteAlarm(key)}/>
                                    </div>
                                </abbr>
                            </div>
                        )
                    })}
                    {(!data || data.length == 0) && 
                        <p className="text-2xl font-thin text-stone-700">Không có báo thức nào để hiển thị.</p>
                    }
                </div>

                <div className="layer-row">
                    <div className="layer-acc-exit" onClick={() => prevHideLayer(data)}>Thoát</div>
                </div>
            </div>
        </div>
    )
}

export default AlarmLayer