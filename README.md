#  deaddrop-js

A deaddrop utility written in Typescript. Put files in a database behind a password to be retrieved at a later date.

This is a part of the University of Wyoming's Secure Software Design Course (Spring 2023). This is the base repository to be forked and updated for various assignments. Alternative language versions are available in:
- [Go](https://github.com/andey-robins/deaddrop-go)
- [Rust](https://github.com/andey-robins/deaddrop-rs)

## Versioning

`deaddrop-js` is built with:
- node v18.13.0

## Usage

`npm run build && node dist/index.js --help` for instructions

Then run `node dist/index.js --new --user <username here>` and you will be prompted to create the initial password.

## Database

Data gets stored into the local database file dd.db. This file will not by synched to git repos. Delete this file if you don't set up a user properly on the first go

## Logging Strategy
 In this program, log4js is used to log activities in a log file.
 A separate folder called configuration to configure the log4js  is created where the file log.txt to log the messages is defined
 This application is then called in the files where logging is required.
 The log is then declared according to whether it is an information or error. For sending, reading and creating users, the log are declared as information while password verifications and user existence are declared as errors.

 ## Mitigation
 A change that was implemented was to be able to create more than one new user. Previously only one new user could be created and writing and reading messages could be done with just one user.
 Apart from that, the error displayed for when sending or reading message to a user that did not exist was that of "Error occured during reading".Changes were implemented so that the error that the user does not exist is returned.

 ## MAC Assignment 
A MAC is a keyed checksum of the message that is sent along with the message.A secure MAC has the property that any change to the message will render the checksum invalid. The main objective of this code was then to implement an MAC along with the original message sent without allowing any modifications to be done to the MAC itself.
The original database table only had data referencing the ID, data and recipient. In accordance with this assignment, a table that includes an MAC that could check the message was created. Since it should not be allowed to be modified, a trigger that could raise an error before any modification can be done was written. The author(Sender) was used the key point of authenicating. For an author whose id matches with the database, the appropriate message is allowed to be authenticated. This can be seen in the modification made in the messages tab, where an author and mac was created. The mac was further configured as a HMAC using sha256 functionwhich has cryptographic properties. 
Through the SQL database, if the messages were to be modified, an immidiate message that warns of a modiffication is sent. The changes to the code can be seen in the message tab.
The problem that was faced was that of not being able to log the MAC failures.

