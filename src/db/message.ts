import { connect } from "./db"
import crypto from "crypto"

import log4js  from "log4js";

const log = log4js.getLogger("application");

export const getMessagesForUser = async (user: string): Promise<string[]> => {
    let db = await connect();

    let messages: string[] = [];

    await db.each(`
        SELECT data,author,(SELECT user FROM Users WHERE id = author) as author_name,mac FROM Messages
        WHERE recipient = (
            SELECT id FROM Users WHERE user = :user
        );
    `, {
        ":user": user,
    }, (err, row) => {
        if (err) {
            throw new Error(err);
        }
        const new_mac = create_mac(row.data,row.author_name)
        if (new_mac != row.mac){
            console.log("The message sent by "+row.author_name+" has been modified" )
            log.error("The message sent by "+row.author_name+" has been modified")

        }
        else{
            messages.push(row.data+ " =>Sent by: "+row.author_name);
        }
        
    });
    
    return messages;
}

export const saveMessage = async (message: string, recipient: string, author:string) => {
    let db = await connect();
    const mac = create_mac(message,author)
    await db.run(`
        INSERT INTO Messages 
            (author, recipient, data, mac)
        VALUES (
            (SELECT id FROM Users WHERE user = :author),
            (SELECT id FROM Users WHERE user = :user),
            :message,
            :mac
        )
    `, {
        ":author": author,
        ":user": recipient,
        ":message": message,
        ":mac": mac,
       
    });
}

const create_mac = (message:string,key:string) => {
    const mac = crypto.createHmac("sha256",key).update(message).digest("hex")
    return mac
}
