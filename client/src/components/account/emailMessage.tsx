export const emailMsg = {
    mailto: "",
    msg: "",
    send: false
}

export function getMailto() {
    return emailMsg.mailto
}

export function getEmailMsg() {
    return emailMsg.msg
}

export function getEmailSend() {
    return emailMsg.send
}

export function setMailto(email: string) {
    emailMsg.mailto = email
}

export function setEmailMsg(message: string) {
    emailMsg.msg = message
}

export function setEmailSend() {
    emailMsg.send = !emailMsg.send
}