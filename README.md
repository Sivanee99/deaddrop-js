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

