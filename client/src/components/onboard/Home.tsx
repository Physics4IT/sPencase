// React libraries
import { useNavigate } from "react-router-dom"

// SHADCN
import { Button } from "../ui/button"

// Others
import "./home.css"
import bg_img from "../../assets/img/bg_img.jpg"
import web_logo from "../../assets/img/logo.png"

function Home() {
    const nav = useNavigate();

    return (
        <div className="overflow-hidden flex relative">
            <img src={bg_img} alt="" className="web-bg-reverse"/>
            <div className="web-content">
                <div className="section h-[15dvh] flex-row justify-between items-center">
                    <img src={web_logo} alt="" className="web-logo" onClick={() => nav("/")}/>
                    <ul className="flex flex-row justify-around items-center">
                        <li 
                            className="nav-btn pr-8 line-after"
                        >Về sPencase</li>
                        <li className="nav-btn pl-8">Về chúng tôi</li>
                    </ul>
                </div>

                <div className="section h-[35dvh] flex-col justify-end">
                    <p className="web-name">sPencase</p>
                    <p className="nav-text">Hộp bút thông minh trong kỷ nguyên Internet vạn vật</p>
                </div>

                <div className="section h-[25dvh] flex-col justify-end">
                    <div className="w-full flex-row">
                        <Button className="btn-main mr-4">Đăng nhập</Button>
                        <Button className="btn-main ml-4">Đăng ký</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home