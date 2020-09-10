# heat-server-sdk

This SDK was created to assist developers in creating server plugins for Heat mobile wallet app server.

## How to setup

Fork and rename the forked repo to include the blockchain name and optionally your personal or organisation name when that name exists already.

For example when creating a plugin for Ripple name your repo: `heat-server-ripple`

If that name is taken and you cannot use the original repo and need to create your own name your repo: `heat-server-ripple-dennis` that is if your name or organization name is dennis.

Install dependencies by running `npm install` on the command line.

## How to use

To develop your plugin we advise you start by editing `test/test_config.ts` and set the `port` and `host` properties for your blockchain API server.

Fast iteration is possible as all modules implementations are coded and ready as well as unit tests for each module. What you provide is:

1. How to construct GET/POST request
2. How to translate response to expected output format
3. More detailed unit tests beyond the most basic tests provided

## How to configure

Configure the settings section in `explorer.ts` at a minimum set the `ID` variable.

## How to publish

When ready you have to build your code and include the compiled code in your git repo.

### Build your code

Run `npm run prepublish` this will compile your code to javascript which will appear in the `dist` folder

### Include compiled code in git

Open `.gitignore` and remove the line that says `/dist` now add all files in dist to your git repo and commit then push your changes to github.com.