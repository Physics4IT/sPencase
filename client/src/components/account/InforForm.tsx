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
            <p className="form-value">{value}</p>
        </li>
    )
}

export default InforForm