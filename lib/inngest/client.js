import {Inngest} from "inngest";

export const inngest = new Inngest({
    id: "xpenso",
    name: "Xpenso",
    retryFunction: async (attempt) => ({
        delay: Math.pow(2,attempt) * 1000,
        maxAttempt: 2,
    })
})