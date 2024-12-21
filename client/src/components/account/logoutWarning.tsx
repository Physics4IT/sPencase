function LogoutWarning({
    logOut = () => {}
}) {
    const handleHideLogout = () => {
        const layer = document.getElementById("layer-logout")
        if (layer) layer.style.display = "none"
    }

    return (
        <div id="layer-logout" className="overlay">
            <div className="layer-container w-[50%] h-[45dvh]">
                <p className="layer-header">Bạn có chắc chắn với sự lựa chọn này?</p>
                <p className="layer-content">Điều này sẽ đăng xuất tài khoản của bạn khỏi hệ thống sPencase.</p>
                <p className="layer-content">Đừng lo lắng, tài khoản của bạn sẽ không bị mất.</p>

                <div className="layer-row">
                    <div className="layer-acc-exit mt-4" onClick={() => handleHideLogout()}>Hủy</div>
                    <div className="layer-acc-save mt-4" onClick={() => logOut()}>Tiếp tục</div>
                </div>
            </div>
        </div>
    )
}

export default LogoutWarning