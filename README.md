# Robo Clone

## Usage
  - Run `npm install -g robo-clone`
  - Navigate to the directory where you would like the student repos to be cloned to
  - Get the API key from the #frontend Slack channel
  - Run `robo-clone --key APIKEYHERE`
  
## Program Overview
![Robo Clone](./package.gif)
This application was built to streamline the process of cloning down students' GH repos and running installation for each of them.  Now instead of manually grabbing each link, changing directories, and running `npm i`, you can run one command to clone all of the repos you want!  Answer the questions prompted by Robo Clone and you'll have your projects up and running in no time!

## Tech Used
- Node
- [enquirer](https://www.npmjs.com/package/enquirer)
- [shelljs](https://www.npmjs.com/package/shelljs)
- [node-fetch](https://www.npmjs.com/package/node-fetch)
- [dotenv](https://www.npmjs.com/package/dotenv)

## Troubleshooting
- If students are private, make sure to accept invitation before running `robo-clone`.
- If you run into permission errors when running `robo-clone`, run `sudo chown -R $USER <FILE PATH>` in the directory that you are running the command.
  - For example, for the error `Missing write access to /usr/local/lib/node_modules`, you can run `sudo chown -R $USER /usr/local/lib/node_modules`.
- **Note:** This tool expects the columns of the spreadsheet to be in this order:

```
Timestamp	Your name (or list all names of project pair/group):	Current Mod:	Project:	Project Manager:	GitHub Repo Link:	Deployed Project Link (if applicable):	Anything else?	Project:	Project Manager:	DTR Link (if applicable):	GitHub Repo Link:	Project Board Link:	Deployed Project Link (if applicable):	Project:	DTR Link (if applicable):	GitHub Repo Link:	Project Board Link:	Deployed Project Link (if applicable):	Any additional information to set up the project locally?	Anything else?	Project Manager:		Please note any extensions you did (if applicable):
```

## Future Iterations
- Pull from column names instead of hardcoded index
- Add more inclusive regex
- Fix user experience with API key
- Auto-test functionality
- More specific error handling for incorrectly formatted data, missing links, etc.

## Contributors
- [Travis Rollins](https://github.com/Kalikoze)
- [Cassandra Torskey](https://github.com/CassandraGoose)
- [Heather Faerber](https://github.com/hfaerber)