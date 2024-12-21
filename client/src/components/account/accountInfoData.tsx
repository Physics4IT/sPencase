export const userInfoData = {
    name: "",
    mail: "",
    phone: "",
}

export function setInfoData(name: string, mail: string, phone: string) {
    userInfoData.name = name
    userInfoData.mail = mail
    userInfoData.phone = phone
}