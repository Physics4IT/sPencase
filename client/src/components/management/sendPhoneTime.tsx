export const phoneTime = {
    time: 0
}

export function getPhoneTime() {
    return phoneTime.time
}

export function setPhoneTime(newTime: number) {
    phoneTime.time = newTime
}