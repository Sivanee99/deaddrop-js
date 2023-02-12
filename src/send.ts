import readline from "readline";
import { saveMessage, userExists } from "./db";

import log4js  from "log4js";

const log = log4js.getLogger("application");

export const sendMessage = async (user: string) => {
    try {
        if (!await userExists(user)) {
            log.error("No user exists.Message unsent.")
            throw new Error("Destination user does not exist");
        }

        getUserMessage().then(async (message) => {
            await saveMessage(message, user);
        });


    } catch (error) {
        console.error("Error occured creating a new user.", error);
    }
}

const getUserMessage = async (): Promise<string> => {
    let rl = readline.createInterface(process.stdin, process.stdout);
    let message: string = await new Promise(resolve => rl.question("Enter your message: ", resolve));
    rl.close();
    log.info("Message sent");
    return message;
}