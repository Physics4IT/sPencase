// SHADCN
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Button } from "../ui/button";

// Others
import "./accountPage.css"
import bg_img from "../../assets/img/bg_img.jpg"
import avatar from "../../assets/img/avatar.jpg"
import InforForm from "./InforForm";
import NavSection from "./NavSection";

function AccountPage() {

    return (
        <div className="overflow-hidden flex relative">
            <img src={bg_img} alt="" className="web-bg"/>
            <div className="web-content">
                <div className="section h-full flex-row justify-center items-center">
                    <Card className="card h-4/5 mr-8">
                        <CardHeader className="card-header-container">
                            <p className="card-header">Thông tin cá nhân</p>
                        </CardHeader>
                        <CardContent className="card-container flex-col">
                            <div className="relative w-20 h-20 rounded-full overflow-hidden mt-7">
                                <img src={avatar} alt="" className="web-bg"/>
                            </div>

                            <ul className="w-full">
                                <InforForm name="Tên người dùng" value="sPencase" style="mt-6"/>
                                <InforForm name="Email" value="spencase@gmail.com" style="mt-6"/>
                                <InforForm name="Số điện thoại" value="012345678" style="mt-6"/>
                            </ul>
                        </CardContent>
                        <CardFooter className="flex justify-center">
                            <Button className="btn-1">Thay đổi thông tin</Button>
                        </CardFooter>
                    </Card>

                    <div className="card-init flex flex-col justify-center h-4/5 ml-8 rounded-lg bg-none">
                        <Card className="card h-2/5 mb-8">
                            <CardHeader className="card-container">
                                <p className="card-header">Chức năng</p>
                            </CardHeader>
                            <CardContent>
                                <NavSection content="Quản lý thiết bị" navigatee="/management" style="mb-4"/>
                                <NavSection content="Lịch sử dữ liệu" navigatee="/"/>
                            </CardContent>
                        </Card>

                        <Card className="card h-2/5 mt-8">
                            <CardHeader className="card-container">
                                <p className="card-header">Nâng cao</p>
                            </CardHeader>
                            <CardContent className="flex flex-row justify-center">
                                <Button className="btn-logout mr-4">Đăng xuất</Button>
                                <Button className="btn-del ml-4">Xóa tài khoản</Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AccountPage