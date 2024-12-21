function DeleteAccount({
    deleteAcc = () => {}
}) {
    const handleHideDeleteAccount = () => {
        const layer = document.getElementById("layer-delete-account")
        if (layer) layer.style.display = "none"
    }

    return (
        <div id="layer-delete-account" className="overlay">
            <div className="layer-container w-[50%] h-[45dvh]">
                <p className="layer-header">Bạn có chắc chắn với sự lựa chọn này?</p>
                <p className="layer-content">Tài khoản của bạn sẽ bị xóa hoàn toàn khỏi hệ thống.</p>
                <p className="layer-content">Điều này có nghĩa toàn bộ dữ liệu của bạn sẽ bị mất.</p>

                <div className="layer-row">
                    <div className="layer-acc-exit mt-4" onClick={() => handleHideDeleteAccount()}>Hủy</div>
                    <div className="layer-acc-save mt-4" onClick={() => deleteAcc()}>Tiếp tục</div>
                </div>
            </div>
        </div>
    )
}

export default DeleteAccount