# Step 3 to 4:  refactor and create a stylish github user list component with favorites

We have implemented a first pass at our user story, so let's tackle another in our backlog:

>As a user, I want to be able to designate some of my saved github id's as favorities

 We want to make it a little bit more stylish, and as we start to save a bigger list of users we like, we would also like to create a set of favorites.  

## Create an GithubID class with a name and favorite property
so far we have just been capturing a string for each github id; now we also have to designate whether it is a favorite.  Like in other languages, we can create  [interfaces](https://www.typescriptlang.org/docs/handbook/interfaces.html) in typescript.  In this case we will create an interface to hold the GithubId object.   Create it with a name string property and a favorite boolean property:

1.  open a new file in your editor and save it in the `src\app` directory named `github-id.ts`

    Open the file and create this interface
````
export interface GitIdInfo {
    login: string;
    favorite?: boolean;
}
````

2. now create the new component that will display our id list, `app-id-list` by executing the following command in the root directory of our repository:
`ng g component idList`  This will create three files in `src/app/id-list`:
   - `id-list.component.html` the component template
   - `id-list.component.spec.ts` a unit test stub file
   - `id-list.component.ts` the component code file.
3. make sure the component activates appropriately.  put the tag `<app-id-list></app-id-list>` in `app.component.html`.  
When this is served, you should see *id-list works!* in the browser.
4. change app.component to use the githubId objects.  First import it, then change the array type, andchage the add method to create a list of githubId objects with a favorite property.  change the method properties as in the below fragment of app.component.ts with the import at the top of the file, and the rest of the fragment within the **IdListComponent**
````typescript
import { GithubId } from './github-id';
// ...
  ghIds: GitIdInfo[] = [];

  constructor() { }

  addGhId(toadd: string) {
      this.ghIds.push({login: toadd, favorite: false});
      this.ghId = '';
  }
````

5. To output our list in the component, we need to pass it from app-component to app-id-list. To do this, we change the reference to app-id-list to pass an input property in `[]` to the tag:
  `<app-id-list [idlist]="ghIds"></app-id-list>`
6. To receive the id list, add it as as an input using the @Input decorator.  First, import it from the angular libary.  The first line of `id-list.component.ts` will read:
`import { Component, OnInit, Input } from '@angular/core';`

also import the GithubId class as was done in app.component:
`import { GithubIdInfo } from './github-id';`

before the contructor of the class, add the @Input decorator and declare 
`@Input() idlist: GitIdInfo[];` 

7. finally, in the IdListComponent component (`id-list.component.ts`) add a method to toggle the favorite flag in the object:

````typescript
 toggleFavorite(favid: GitIdInfo) {
    favid.favorite = !favid.favorite;
  }
````

The full `id-list.component.ts` file should look like this:
````typescript
import { Component, OnInit, Input } from '@angular/core';
import { GithubId } from '../github-id';
@Component({
  selector: 'app-id-list',
  templateUrl: './id-list.component.html',
  styleUrls: ['./id-list.component.css']
})

export class IdListComponent implements OnInit {
  @Input() idlist: GithubId[];
  constructor() { }

  ngOnInit() {
  }
  toggleFavorite(favid: GithubId) {
    favid.favorite = !favid.favorite;
  }
}

````
8. now make the view match, with a list and favorite button for each element in the list. For the favorite column, we will add a button that shows an empty or filled heart depending on the disposition of the favorite flag for that id object.
- We will use a few new Material Design components to implement this:  [list](https://material.angular.io/components/list/overview), to show each iteam and [icon](https://material.angular.io/components/icon/overview) to show the heart in the button.  Like with the button component, we need to import them in `app.module.ts`: 
````typescript
import { MatInputModule, MatButtonModule, MatIconModule, MatListModule } from '@angular/material';
/...
imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule
  ],
````  
- Open `id-list.component.html` Delete the contents of the file We will put the Github ID's and favorites in a `<div>`.   We use the component directive `<mat-list>` to create the list.  Each item is a `<mat-list-item>`.  We use ngFor to show each of the id's in the components list input.
````html
<div>
  <mat-list>
    <mat-list-item *ngFor="let id of idlist">
      {{id.name}}
    </mat-list-item>
  </mat-list>
</div>
````
This should render the Github ID list when added using `ng serve`

9. Now we need to toggle the favorite.  in `<mat-list-item>` tag, before where we show the name with `{{id.login}}`  we will put a button to toggle the favorite.  We show the heart based on the favorite property.  To do this, we use the `*ngIf= ` structural directive.   When the expression is true, that element is shown (and evaluated if there are methods or properties access within).  When the button is clicked, it should call the method we created and toggle the favorite flag.  The button within the `<mat-list-item>` will look like this:
````html
  <button mat-icon-button (click)="toggleFavorite(id)">
        <mat-icon *ngIf="id.favorite">favorite</mat-icon>
        <mat-icon *ngIf="!id.favorite">favorite_border</mat-icon>
  </button>  {{id.login}}
````
