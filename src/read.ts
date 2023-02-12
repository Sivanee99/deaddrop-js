import { getMessagesForUser, userExists } from "./db";
import { authenticate } from "./session";

import log4js  from "log4js";

const log = log4js.getLogger("application");

export async function readMessages(user: string) {
    try {
        if (!await userExists(user)) {
            log.error("No user exists. Message unread.");
            throw new Error("User does not exist");
        }

        if (!await authenticate(user)) {
            log.error("Unable to verify password.Message unread.");
            throw new Error("Unable to authenticate");
        }

        getMessagesForUser(user).then((messages) => {
            messages.forEach((e: string) => console.log(e, "\n"));
            log.info("Message read");
        });

    } catch (error) {
        console.error("Error occured during reading.", error);
    }
}