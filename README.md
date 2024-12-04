# mySMB App

mySMB App

## Prerequisites

Before you begin, ensure you have the following installed on your machine:

Docker

- [Docker Desktop Windows](https://docs.docker.com/desktop/install/windows-install/)
- [Docker Desktop Mac](https://docs.docker.com/desktop/install/mac-install/)

Packages

- [Node.js](https://nodejs.org/) | Node Version v18.18.2
- [npm](https://www.npmjs.com/) | npm (Node Package Manager) v9.8.1

Builder and Bundlers

- [Dev Containers](https://containers.dev/)

Web Library

- [ReactJS](https://react.dev/) | React JS 18.3.1
- [TypeScript](https://www.typescriptlang.org/) | TypeScript 4.9.5

HTTP Request, State and Data Managements

- [Context Hooks](https://react.dev/reference/react/hooks#context-hooks)
- [Axios](https://axios-http.com/docs/intro) | Axois 1.7.7
- [Web Socket](https://developer.mozilla.org/en-US/docs/Web/API/WebSocket)

React Library and JavaScript SDK Microsoft Integration

- [react-markdown](https://www.npmjs.com/package/react-markdown) | 9.0.1
- [Microsoft Teams JavaScript client library](https://www.npmjs.com/package/@microsoft/teams-js) | 2.28.0

Microsoft for handling authentication and authorization

- [Microsoft Authentication Library](https://www.npmjs.com/package/@azure/msal-browser) | 3.23.0
- [jwt-decode](https://www.npmjs.com/package/jwt-decode) | 4

UI Library, Themes and Styling

- [MUI](https://mui.com/) | material ui 5.16.7
- [SASS](https://sass-lang.com/) | SASS 1.81

## Installation

1. Clone the mysmbdemofrontend repository to your local machine:

```bash
    git@github.com:SuperDryHann/mysmbdemofrontend.git
```

2. Install Dev Container from VS code

3. Let the Dev Container setup and build your project


## Configuration

1. Rename .env into .env_prod

2. Then rename .env_dev into .env

Update the configuration in the .env file as needed. and ask for your project lead for it.

## ngrok Configuration

1. Ask lead/supervisor for ngrok URL

2. Replace the ngrok url for this following lines from manifest.json

```bash
    mysmbdemofrontend/appPackage/dev/manifest.json
```

3. Change the base url from contenUrl to your new ngrok URL

```
  "contentUrl": "https://<ngrok-url-here>/ssoDemo/?inTeams=true",
```

```
  "configurationUrl": "https://<ngrok-url-here>/configure/?inTeams=true",
```

```
    "validDomains": [
      "<ngrok-url-here>"
    ],
```

3.1 change the ngrok url and id

```
  "webApplicationInfo": {
    "id": "<your-id-here>",
     "resource": "api://<ngrok-url-here>/<your-id-here>"
  }
```

4. Compress the color.jpg, fullcolor.jpg and manifest.json into appPackage_dev.zip and upload it to the team app.


#### Starting the Project

```bash
    npm run start
```


Visit http://localhost:3000/ in your web browser to check/access the application.


# Conventions

## I. Code Conventions

**Common / Global Components:**  
“AH” - initials of the company + `[NameOfComponent]` should be in StartCase, avoid destructing or shorthand of passing the props

AHSampleComponent = ({yourPropsName}) => {}

AHSampleComponent.jsx

`<AHSampleComponent yourPropsName={yourPropsName}/> `

#

**Non-Global/Specific Components:**  
Should be placed along under feature/ ex:  
AccountsAnalyticsTable - feature/Chat

#

**Constants Variables:**  
Anything hardcoded and not changing values.  
const THIS_IS_A_CONSTANT = {}

#

**Functions / Methods:**  
getNewUsers = () => {}  
handleSubmitMessage();

#

**Styles:**

- Custom Styles: use kebab cases for SASS and creating custom styles
- do not override library styles by accessing or targeting the classnames or id of the element
- Theme folder contains the index and variable for global css classes
- App.scss contains the Application UI level of styles

Global Styles: should contain ah-” and should be declared in theme/index.scss  
Ex: ah-primary-button”, ah-statuses”

#

**Git + Development Flow:**

Development Phase:

1. Once fixing a bug, there will be a `staging` branch

- Staging branch is from Development branch

2. Branchout your `main` branch to current sprint branch
3. start development
4. Review your code
5. Deployment
6. QA
7. Done
8. Staging Branch - can be use for Demo and Create/consolidating of Notes
9. Merge Staging branch -> main, Repeat.

#

## UAT Environment Deployment

1. Make sure all the changes/updates from `staging` branch is merge to `main` branch
2. don't forget to bump the version in `package.json` NOTE: just edit the version,
3. from `main` branch merge `staging` targeting to it self and merge it
4. CI/CD will run and wait to finish
5. done - check the changes in uat

Note: if there's a new API endpoint or anything needed to add in environment config, edit the `.env` file, mostly likely contains the same variables, differs in value only.

#

Always KEEP in mind the **3M**:

Make it work - do the business logic and requirements

Make it right - do the global and best practices

Make it fast - refactor and optimize
