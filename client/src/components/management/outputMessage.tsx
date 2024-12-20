export type outputMsg = {
    topic: string
    payload: string | undefined
}

export type listOutputMsg = Array<outputMsg> | null

export const listMessage: listOutputMsg = []

export function listMessage_add(message: outputMsg) {
    listMessage?.push(message)
}

export function listMessage_popHead() {
    if (listMessage && listMessage.length > 0) {
        return listMessage.shift()
    }
    return null
}

export function listMessage_removeAll() {
    listMessage?.splice(0, listMessage.length)
}