import { AlarmClockPlus, CircleMinus } from "lucide-react"
import React, { useEffect, useRef, useState } from "react"
import { Input } from "../ui/input"

export type alarmData = {
    _id?: string
    user_id: string
    hour: number
    minute: number
    state: boolean
}

export type listAlarm = Array<alarmData> | null

function AlarmLayer({
    handleHideAlarm = () => {},
}) {
    const [data, setData] = useState<listAlarm>([])
    const [reset, setReset] = useState<boolean>(false)
    const [alarm_id, setAlarm_id] = useState(-1)
    const [user, setUser] = useState<string>("")

    const inputRef = useRef<HTMLInputElement | null>(null)

    useEffect(() => {
        fetch("http://localhost:5000/api/users/me/")
            .then(data => data.json())
            .then(data => setUser(data._id))
    }, [])

    useEffect(() => {
        fetch("http://localhost:5000/api/alarms/")
            .then(data => data.json())
            .then(data => setData(data.body))
    }, [reset])

    const handleAddAlarm = async () => {
        let user: string = ""

        const newData : listAlarm = data ? [...data] : []

        newData.push({
            user_id: user,
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

    const prevAddAlarm = () => {
        const newAlarm : alarmData = {
            user_id: user,
            hour: 0,
            minute: 0,
            state: true
        }
        const newData : listAlarm = data ? [newAlarm, ...data] : [newAlarm]
        setData(newData)
    }

    const changeState = (id: string) => {
        //
    }

    return (
        <div id="layer-alarm" className="overlay">
            <div className="layer-container w-[25%] h-[70dvh]">
                <div className="w-full flex flex-row justify-between items-center">
                    <p className="layer-header">Báo thức</p>
                    <AlarmClockPlus className="h-8 w-8 text-slate-700 hover:text-slate-400 cursor-pointer" onClick={() => prevAddAlarm()}/>
                </div>
                <div className={`w-full h-[70%] flex flex-col justify-start mt-2 ${data && 'overflow-y-scroll'}`}>
                    {data?.map((value: alarmData, key: number) => {
                        return (
                            <React.Fragment>
                                <div key={key} className={`alarm-container ${value.state ? 'border-green-600' : 'border-zinc-800'}`}>
                                    {!(alarm_id == key) ?
                                        <div className="alarm-time cursor-pointer" onClick={() => setAlarm_id(key)}>
                                            <p className="alarm-time-content">
                                                {value.hour.toString().length < 2 ? "0" + value.hour.toString() : value.hour} 
                                                : 
                                                {value.minute.toString().length < 2 ? "0" + value.minute.toString() : value.minute}
                                            </p>
                                        </div> :
                                        <Input className="alarm-input" autoFocus ref={inputRef}/>
                                    }

                                    <div className="alarm-button">
                                        <p className="alarm-button-text">{value.state? "Tắt" : "Bật"}</p>
                                    </div>
                                    <div className="alarm-delete">
                                        <CircleMinus className="alarm-icon" onClick={() => handleDeleteAlarm(key)}/>
                                    </div>
                                </div>
                            </React.Fragment>
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
    )
}

export default AlarmLayer