# NUWebBoot-1
This web tutorial walks a user through creating a simple single page web application that demonstrates a 'slice' of the functionality in Angular 5. 

It also includes a script and some magic github tags to [reset to a particular step](#go-step-by-step) in the sequence.

## Concepts Covered
This tutorial covers the following Angular and Material Concepts:
- Using the node package manager (npm) to install the Angular Material Library 
- Using the Angular CLI to build and run an Angular app
- Identifying components in an Angular Module 
- The structure of basic Angular Components 
- Understanding binding Angular templates to Angular component properties, including simple and two way binding 
- Binding events to component methods
- Selecting an Angular Material theme and Using Angular Material components in an Angular Application
- Specific use of the Angular Material text input field, button, and icons
- Basic styling using component level CSS
- Creating Angular components with the angular cli, and consuming and passing data to child components using @Input
- Simple Typescript Interfaces
- Angular Services and using dependency Injection
- Using the Angular HttpClient to consume the un-authenticated Github API
- Using rxjs Observables and using simple subscriptions in typescript, including using typescript generic type support

## Go Step by Step

If you want a specific concept, please see the [Step by Step](docs/step-by-step.md) to reference which concepts are covered where.

## Tutorial Functionality
The end user functionality implemented by the app is this high level user story:

> As a user, I can navigate to a webpage and enter github login ids to see related information.  I can mark some of those logins as favorites

# pre-reqs
In order for the tutorial to work, please install the following:

## A command shell

If you are running a mac, you can get to the command line (bash) by running the terminal application.

If you are on a PC (the author uses a Windows 10 PC with Poershell) you can use [Powershell](http://www.thewindowsclub.com/how-to-open-an-elevated-powershell-prompt-in-windows-10) or the [Bash Shell in the Linux subsystem](https://docs.microsoft.com/en-us/windows/wsl/install-win10). 

## A good programmers editor

I recomend [Microsoft's VSCode](https://code.visualstudio.com) which works on Macintosh, Linux or Windows, but sublime, atom, or a javascript oriented IDE like IntelliJ works too.

## Nodejs
NodeJS provides a batch javascript runtime and a set of tools for managing packages (libraries) in javascript.   NodeJS can be downloaded at [nodejs.org](https://nodejs.org).   Download version 6.8 or better.

after installing you should be able to type the following commands:

```bash
node -v
npm -v

```

This should display the versions of the node engine (>6.8) and the package manager NPM (~4.1)

## Git, Github, and a github account
You should have a working version of git with the ability to connect to github.com.  The easist way to do that, is to simply install the software at [desktop.github.com](https://desktop.github.com/).  After installation, you should be able to go to the command line and type:
```bash
git --version
```
And have it display a version number (mine is git version 2.13.3.windows.1)

## The Angular CLI (Command Line Interface)   
The information on the Angular CLI can be found on [cli.angular.io](https://cli.angular.io). 

### Installing @angular/cli
To install after installing nodejs:

```bash
npm install @angular/cli -g
```

### Verifying installation of the Angular CLI
Verify that the cli is correctly installed by typing:

```bash
ng --version
```


your output should look something like:
```

    _                      _                 ____ _     ___
   / \   _ __   __ _ _   _| | __ _ _ __     / ___| |   |_ _|
  / △ \ | '_ \ / _` | | | | |/ _` | '__|   | |   | |    | |
 / ___ \| | | | (_| | |_| | | (_| | |      | |___| |___ | |
/_/   \_\_| |_|\__, |\__,_|_|\__,_|_|       \____|_____|___|
               |___/

Angular CLI: 1.6.3
Node: 8.9.3
OS: win32 x64
Angular: 
```
Your CLI version can be higher than the one mentioned (e.g. 1.6.2 or 1.7).  If it is a whole number higher (e.g. 2.0); this tutorial may not work.

### Generate a first test app to test the setup
From the command line, generate a sample test app to verify.  Navigate in the command line to the spot where you want to put your test app and then type
```bash
ng new my-test-app
```
After npm has installed dependencies (this may take a while), make sure the application can be built and run successfully.  The root folder of your application can be reached at this point by changing directory to where it is located
```bash
cd my-test-app
```

You can check the versions of all components by running 
```bash
ng --version
```
again.  Now you should see a screen that looks something like this:
```

    _                      _                 ____ _     ___
   / \   _ __   __ _ _   _| | __ _ _ __     / ___| |   |_ _|
  / △ \ | '_ \ / _` | | | | |/ _` | '__|   | |   | |    | |
 / ___ \| | | | (_| | |_| | | (_| | |      | |___| |___ | |
/_/   \_\_| |_|\__, |\__,_|_|\__,_|_|       \____|_____|___|
               |___/

Angular CLI: 1.6.3
Node: 8.9.3
OS: win32 x64
Angular: 5.1.3
... animations, common, compiler, compiler-cli, core, forms
... http, language-service, platform-browser
... platform-browser-dynamic, router

@angular/cli: 1.6.3
@angular-devkit/build-optimizer: 0.0.36
@angular-devkit/core: 0.0.22
@angular-devkit/schematics: 0.0.42
@ngtools/json-schema: 1.1.0
@ngtools/webpack: 1.9.3
@schematics/angular: 0.1.11
@schematics/schematics: 0.0.11
typescript: 2.4.2
webpack: 3.10.0
```
# Clone a  copy of NUWebBoot 1
To clone a copy of this repository, move to the directory where you would like to place the repostory and then:
```bash
git clone https://github.com/NUvention-web/NUwebbootcamp1.git
```
This will place the repository in the NUwebbootcamp1 folder.  you can specify a different folder name at the end of the git clone command.

# Follow the step by step
We use git to swtich between a series of steps in the tutorial.
These are documented in [Step by Step](docs/step-by-step.md).


# What follows is what is automatically generated by the CLI for NUWebBoot-1
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
# nubootcamp
