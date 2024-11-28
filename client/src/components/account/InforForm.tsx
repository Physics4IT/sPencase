// Others
import "./accountPage.css"

function InforForm({
    name = "",
    value = "",
    style = ""
}) {
    const formStyles = "form-container " + style

    return (
        <li className={formStyles}>
            <p className="form-header">{name}</p>
            <p className="form-value">
                {value.length > 0 ? 
                    value.length <= 20 ? 
                        value 
                        : value.substring(0, 20) + '...' 
                    : 'Không có dữ liệu'
                }
            </p>
        </li>
    )
}

export default InforForm