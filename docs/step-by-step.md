# Setting up the tutorial
The tutorial requires node.js, npm, the angular cli, and git.   See the [Readme](readme.md) for more information on installing and verifgitgitying these components.
## Using the command shell
Unless otherwise specified, a command shell command should be executed in the directory where you git cloned the project.   Usually this will be in Documents\GitHub\n
# Switching Steps with npm run workshop
You can switch to a completed step at anytime to see the answer and to get a completed repository by using the following npm command:
````
npm run workshop
````

To work through the tutorial, run the workshop script as above and select step 0.

this will present a list of the steps. Note: choosing a step wipes out any local work on the repository.
Steps are implemented using [git tags](https://git-scm.com/book/en/v2/Git-Basics-Tagging).

# Recommended setup
I recommend you open each step at the begining with a good programmer's editor like [VS Code](https://code.visualstudio.com/).  Also start a command shell and keep the build running and automatically reloading on `http://localhost:4200` by typing the following at the command line:
````
ng serve
````
# Concepts Covered
- Using the node package manager (npm) to install the Angular Material Library (Step 0 to 1)
- Using the Angular CLI to build and run an Angular app (Step 0 to 1)
- Identifying components in an Angular Module (Step 0 to 1)
- The structure of basic Angular Components (Step 1 to 2)
- Understanding binding Angular templates to Angular component properties, including simple and two way binding (Step 1 to 2)
- Binding events to component methods (Step 1 to 2)
- Selecting an Angular Material theme and Using Angular Material components in an Angular Application (Step 0 to 1)
- Specific use of the Angular Material text input field, button, and icons
- Basic styling using component level CSS (Step 1 to 2 and Step 3 to 4)
- Creating Angular components with the angular cli, and consuming and passing data to child components using @Input (Step 3 to 4)
- Simple Typescript Interfaces (Step 3 to 4 and Step 4 to 5)
- Angular Services and using dependency Injection (Step 4 to 5)
- Using the Angular HttpClient to consume the un-authenticated Github API (Step 5 to 6)
- Using rxjs Observables and using simple subscriptions in typescript, including using typescript generic type support (Step 5 to 6)

# Workshop Steps
This Workshop is divided into 6 Steps.  You can move to the completed step by running workshop in the root of the repository:
````bash
npm run workshop
````
Instructions to follow along for each step are in seperate files linked here:
## Step 0 to 1: Installing Angular Material Library [Go to Step](step-0-to-1.md)
- Using the node package manager (npm) to install the Angular Material Library
- Using the Angular CLI to build and run an Angular app
- Identifying components in an Angular Module
- Selecting an Angular Material theme and Using Angular Material components in an Angular Application

## Step 1 to 2: create two way binding on an edit field [Go to Step](step-1-to-2.md)
- The structure of basic Angular Components
- Understanding binding Angular templates to Angular component properties, including simple and two way binding 
- Binding events to component methods
- Specific use of the Angular Material text input field and button
## Step 2 to 3: ngFor and a component specific style [Go to Step](step-2-to-3.md)
- Structural directive ngFor
- component specific styles
## Step 3 to 4:  refactor and create a stylish github user list component with favorites [Go to Step](step-3-to-4.md)
- Specific use of the Angular Material icons
- Creating Angular components with the angular cli, and consuming and passing data to child components using @Input 
- Simple Typescript Interfaces 

## 4 to 5 Add a Github ID info service [Go to Step](step-4-to-5.md)
- Simple Typescript Interfaces 
- Angular Services and using dependency Injection 

>Note there is a small syntax error when the project is currently reset to step-4 using the workshop.  Delete the line with the error and it will work fine.


## Step 5 to 6 Using HttpClient to call the Github REST API [Go To Step](step-5-to-6.md)
- Using the Angular HttpClient to consume the un-authenticated Github API 
- Using rxjs Observables and using simple subscriptions in typescript, including using typescript generic type support 

# Conclusion and next steps


# Acknowledgments

p.s. thanks to @EladBezalel and @DevVersion for creating the [material tutorial](https://github.com/EladBezalel/material2-start/) where I stole the workshop code from.  After you complete this one, try that one!