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

    const handleShowPrdInfo = () => {
        const layer = document.getElementById("layer-product-info")
        if (layer) layer.style.display = "flex"
    }

    const handleHidePrdInfo = () => {
        const layer = document.getElementById("layer-product-info")
        if (layer) layer.style.display = "none"
    }

    const handleShowTeamInfo = () => {
        const layer = document.getElementById("layer-team-info")
        if (layer) layer.style.display = "flex"
    }

    const handleHideTeamInfo = () => {
        const layer = document.getElementById("layer-team-info")
        if (layer) layer.style.display = "none"
    }

    return (
        <div className="overflow-hidden flex relative">
            <img src={bg_img} alt="" className="web-bg-reverse"/>
            <div className="web-content">
                <div className="section h-[15dvh] flex-row justify-between items-center">
                    <img src={web_logo} alt="" className="web-logo" onClick={() => nav("/")}/>
                    <div className="flex flex-row justify-around items-center">
                        <p className="nav-btn pr-8 line-after" onClick={() => handleShowPrdInfo()}>Về sPencase</p>
                        <p className="nav-btn pl-8" onClick={() => handleShowTeamInfo()}>Về chúng tôi</p>
                    </div>
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

            <div id="layer-product-info" className="overlay">
                <div className="layer-container w-[50%] h-[65dvh]">
                    <p className="layer-header">sPencase - Hộp bút thông minh</p>
                    <p className="layer-content">Trong môi trường hiện đại, nhu cầu tối ưu hóa không gian làm việc và quản lý thời gian hiệu quả ngày càng trở nên quan trọng. Sự ra đời của các sản phẩm thông minh đang dần hỗ trợ điều này tốt hơn, giúp người dùng không chỉ tiết kiệm thời gian mà còn kiểm soát được các yếu tố môi trường có thể ảnh hưởng đến sức khỏe và năng suất. Hộp bút thông minh ra đời với mục tiêu đáp ứng các nhu cầu trên, đặc biệt là cho học sinh - sinh viên và những người làm việc trong môi trường văn phòng, vốn là những nơi có yêu cầu cao về năng suất và sự thoải mái.</p>
                    <div className="layer-exit" onClick={() => handleHidePrdInfo()}>Thoát</div>
                </div>
            </div>

            <div id="layer-team-info" className="overlay">
                <div className="layer-container w-[75%] h-[80dvh]">
                    <p className="layer-header">Về nhóm phát triển - Nhóm 8</p>
                    <p className="layer-content">Nhóm 8 gồm có 3 thành viên, đến từ khoa Công nghệ thông tin, trường Đại học Khoa học Tự nhiên, ĐHQG HCM. Mỗi thành viên chính là một mảnh ghép quan trọng trong sự hoàn thiện của sản phẩm này.</p>
                    <div className="layer-content-row">
                        <div className="layer-row-item">
                            <div className="layer-item-avt">
                                <img className="web-bg" src={bg_img} alt=""/>
                            </div>
                            <p className="layer-content">22127121</p>
                            <p className="layer-content">Đào Việt Hoàng</p>
                        </div>

                        <div className="layer-row-item">
                            <div className="layer-item-avt">
                                <img className="web-bg" src={bg_img} alt=""/>
                            </div>
                            <p className="layer-content">22127230</p>
                            <p className="layer-content">Bùi Tá Phát</p>
                        </div>

                        <div className="layer-row-item">
                            <div className="layer-item-avt">
                                <img className="web-bg" src={bg_img} alt=""/>
                            </div>
                            <p className="layer-content">22127486</p>
                            <p className="layer-content">Đào Ngọc Thiện</p>
                        </div>
                    </div>
                    <div className="layer-exit" onClick={() => handleHideTeamInfo()}>Thoát</div>
                </div>
            </div>
        </div>
    )
}

export default Home