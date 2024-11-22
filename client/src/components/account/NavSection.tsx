// React libraries
import { useNavigate } from "react-router-dom"

// Others
import "./accountPage.css"
import { ArrowUpRight } from "lucide-react";

function NavSection({
    content = "",
    navigatee = "",
    style = ""
}) {
    const nav = useNavigate();
    const newStyle = "flex flex-row items-center justify-between mx-8 " + style

    return (
        <div className={newStyle}>
            <p className="form-header">{content}</p>
            <div className="w-24 flex flex-row justify-end line-full-height">
                <div className="btn-nav" onClick={() => nav(navigatee)}>
                    <ArrowUpRight />
                </div>
            </div>
        </div>
    )
}

export default NavSection