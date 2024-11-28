import { useNavigate } from "react-router-dom";

import "./loginPage.css"

import bg_img from "../../assets/img/bg_img.jpg"
import web_logo from "../../assets/img/logo.png"

function LoginPage() {
    const nav = useNavigate()

    return (
        <div className="overflow-hidden flex relative">
            <img src={bg_img} alt="" className="web-bg-reverse"/>
            <div className="web-content">
                <div className="section h-[15dvh] flex-row justify-between items-center">
                    <img src={web_logo} alt="" className="web-logo z-30" onClick={() => nav("/")}/>
                </div>

                <div className="section h-auto mt-4 flex-col justify-center items-center">
                </div>
            </div>
        </div>
    )
}

export default LoginPage