# Step 1 to 2
You can baseline to the beginning of this step by running the workship script and selecting step 1:
`npm run workshop`

We are going to do some simple querying of the github api.  have your github login id and some others handy. We would first like to implement the following user story:

>As a user, I can enter a github login, press an add button, and see a list of all the logins I have added.

not super useful; but it's just an early step!

Angular groups components in **Modules** a default module, **AppModule** is created in `/src/app/app.module.ts` by the angular cli.  It groups the angular components that are used together to deliver a piece of functionality.  Modules can contain other modules, like the libraries we will use here.

We need to get some input, and for that we will be using the Forms module, and two of the material design packages controls.   We need to tell angular that we are using the [Angular Forms Module](https://angular.io/guide/forms), the [Material Design Input Module](https://material.angular.io/components/input/overview), and the [Material Design Button Module](https://material.angular.io/components/button/overview).  Additionally, material relies on the [Angular animations module](https://angular.io/guide/animations).

Open `app.module.ts` in the editor.   We need to first `Import` using typescript the 3 modules we need.  Add these statements at the beginning:
```typescript
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatButtonModule } from '@angular/material';
```
Then we put those modules in the import section of the same file:
```typescript
 imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule
  ]
  ```
After modifying the file,

Open the file `app.component.ts` in the \src\app folder. change the value of title from app works! to something like *My Github buddies*.

just below the `title` assignment in the class, initialize a new variable to hold the github id, **ghId**.  

we're going to create a button bound to a function that takes a string (a github username) to add to an array of usernames / github organizations we will display, and reset the edit file.   Within the component should be the following fragment to do those tasks:

````
  title = 'My Favorite Github Users and Orgs';
  ghId = '';
  ghIds: string[] = [];
  addGhId(toadd: string) {
      this.ghIds.push(toadd);
      this.ghId = '';
  }
````

now open the file `app.component.html` to present the view for this information.

Keep the `<section>` header for Material fonts you created in the last step; and the `<h1>` that
displays the title (`{{title}}`) erase everything else--all the Angular boilerplate HTML.

We are going to add a [material design input field](https://material.angular.io/components/input/overview).

Below the `<h1>` with the title; add a new `<div>` with an  `<input>` tag.  In generic HTML this would look something like:
```html
<input placeholder="enter a github username or org" value="toddwseattle">
```
But we are going to do two things:
 - Bind the input to the variable `ghId`
 - Style input using the Angular Material library.

The Angular Template compiler lets code bind to custom attributes.  the Angular forms module contains an atribute `ngModel` that lets you connect an html form input to a typescript property of the component class.   In this case we want the input to be connected to the `ghId` property of AppComponent.  Angular templates bind to tag events using parentheses `()` and to values using brackets `[]`  two way binding uses "bannana brackets" `[()]`.     Use the Ngmodel directive to double bind to the ghId property of your class:
```html
<input placeholder="enter a github username or org" value="toddwseattle" [(ngModel)]="ghId">
```
Now we style it by using the material library. Form elements are styled using the `<mat-form-field>` custom tag and by placing the `matInput` attribute also defined by material and imported via `MatInputModule`.  Our input tag now looks like this:
```html
 <mat-form-field>
    <input matInput [(ngModel)]="ghId" placeholder="Enter a github org or user id"  value="toddwseattle" >
 </mat-form-field>
```
you can then output the current value of the `ghId` property the same way `title` was by adding
```html
<p>{{ghId}}</p>
```
after the `mat-form-field`.

Now we can enter the username, the story needs a way to add it to the list.  Let's add a material button.  For this we need to add the `<button>` element, style it with material, and bind its `(click)` event to the `addGhId()` method we created in `AppComponent` earlier.   Importing the material button module gives us a set of button attributes.  We want a raised style so we use `mat-raised-button` attribute.  The tag looks like this:
```html
<button mat-raised-button (click)="addGhId(ghId)">Add to List</button>
```
We can see the full list of added id's by displaying the `ghIds` arrays.  Becuase ghIds is an array of strings, not a simple type, we need to tell Angular how to expand it.  To format types Angular has special components called pipes (`|`). There is a built in pipe to output stringified json for objects and arrays, so `{{ghIds | json}}` in the HTML will display the array we have added too.

The full html file will look like the following
````html
<section class="mat-typography">
<div style="text-align:center">
  <h1>
    Welcome to {{ title }}!
  </h1>
</div>
<div>
  <mat-form-field>
    <input matInput [(ngModel)]="ghId" placeholder="Enter a github org or user id"  value="toddwseattle" >
  </mat-form-field>
  <p>{{ghId}}</p>
  <button mat-raised-button (click)="addGhId(ghId)">Add to List</button>
</div>
<p>{{ghIds | json}}</p>
</section>
````
When you run this step (`ng serve`), you will need to click tab or click the mouse just above the button to see the edit box since it blends in with our white background.
