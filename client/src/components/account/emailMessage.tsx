export const emailMsg = {
    msg: "",
    send: false
}

export function getEmailMsg() {
    return emailMsg.msg
}

export function getEmailSend() {
    return emailMsg.send
}

export function setEmailMsg(message: string) {
    emailMsg.msg = message
}

export function setEmailSend() {
    emailMsg.send = !emailMsg.send
}