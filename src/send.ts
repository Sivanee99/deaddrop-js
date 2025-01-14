import readline from "readline";
import { saveMessage, userExists } from "./db";
import { authenticate } from "./session";


import log4js  from "log4js";

const log = log4js.getLogger("application");

export const sendMessage = async (user: string, author:string) => {
    try {
        if (!await userExists(user)) {
            log.error("No user exists.Message unsent.")
            throw new Error("Destination user does not exist");
        }

        if (!await userExists(author)) {
            log.error("No author exists.Message unsent.")
            throw new Error("author does not exist");
        }

        if (!await authenticate(author)) {
            log.error("Unable to verify password.Message unread.");
            throw new Error("Unable to authenticate");
        }


        getUserMessage().then(async (message) => {
            await saveMessage(message, user, author);
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