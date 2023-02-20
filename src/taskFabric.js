import { replaceAll } from "./stringFormatter";

export default function createTask(name) {
    return { 
        id: Date.now(),
        list: "backlog",
        name: replaceAll(replaceAll(name, /\s+/, " "), /^\s+/, ""),
        lastTransferDate: Date.now()
    }
}