# 4 to 5 Add a Github ID Info Service
## Errata:  if you use `npm run workshop` to switch to step 4, you will get an error on ng serve.  The error will be:
````
ERROR in src/app/id-list/id-list.component.ts(16,12): error TS2551: Property 'ghId' does not exist on type 'IdListComponent'
````
Open `id-list.component.ts` and delete line 16 and the applicaiton will work just fine.

## Implementing the next story

Our next story is:
> As a user, in the list of Github ID's, I see additional information like a description and their avatar

To implement this story, we use an Angular concept called a [service](https://angular.io/tutorial/toh-pt4).  A service is a special [singleton function](http://www.dofactory.com/javascript/singleton-design-pattern) used to share data (or get data) across multiple components. It's a special angular class, that can be ['injected'](https://stackoverflow.com/questions/130794/what-is-dependency-injection) into components to provide new functions.  Let's make our first one:
1.  Use the cli to generate the component `ng g s GitIdInfo`
by default two files are added in the `app` directory
````
  git-id-info.service.spec.ts
  git-id-info.service.ts
````
The spec file is a test.  Note that unlike components, just a .ts file is generated (no html or css).  A test is generated (unlike a simple class).  

The format of the service is also different from the class.  In particular, the Angular specific annotation @Injectable is added to the class definition.  This makes it so it can be 'injected' into the contstructor of the view component.   This more loosely binds the UI components to the controller logic in the service; and promotes easier substitution for component reuse and testing.

2.  the CLI does not automatically add the service to our modules and components.  First, declare it in the module file `app.module.ts`.  A synonym for services is `provider`.  Add the `GitIdInfoService` service to the provider section, and import the definition from the `.ts` file.  In `app.module.ts` `@NgModule` should look like this:
````typescript
// ...
import { GitIdInfoService } from './git-id-info.service';
// ...
@NgModule({
  declarations: [
    AppComponent,
    IdListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule
  ],
  providers: [GitIdInfoService],
  bootstrap: [AppComponent]
})
//...
````
3.  Let's make our service actually do something.  We know we at least want to get the id's bio and it's avatar.  To do this, we need to add some information to our [interface](https://weblogs.asp.net/dwahlin/the-role-of-interfaces-in-typescript)
in `github-id.ts`.  In the file, before the class, create the interface; export it so the component and service can consume it. Additionally, we will want to have the info associated with our id class; so we will have it implement the interface. The question mark indicates it's optional. The file will look like this:
````typescript
export interface GitIdInfo {
    login: string;
    favorite?: boolean;
    bio?: string;
    avatar_url?: string;
}
````
- now import the interface into the service.  We need to create a method in our service that will return the GitIDInfo for a given github login id (what we are calling "name" in our GithubId class).  let's call the method `GetGitIdInfo(login: string).` For our first implementation, we will just create some sample infomation based on the login for the bio; and the same generic avatar for each call. The service implementation will look like this:
````typescript
import { Injectable } from '@angular/core';
import { GitIdInfo } from './github-id';

@Injectable()
export class GitIdInfoService {

  constructor() { }

  GetGitIdInfo(login: string): GitIdInfo {
    return({
      login: login,
      bio: login + ' biography information',
      avatar_url: '/assets/images/User_Avatar.png'
    });
}

````  
- We will use the service to add the info at the same time the id is entered; so we will call it from `app.component.ts` it must be "injected" into the constructor.  We will assign access to the service to the `ids` class member of AppComponent.   Additionally, the service (and our new interface) must be imported into the component.  The fragment will look like:
````typescript
//...
import { GitIdInfo } from './github-id';
import { GitIdInfoService } from './git-id-info.service';
//...
export class AppComponent {
  title = 'My Favorite Github Users and Orgs';
  ghId = '';
  ghIds: GithubId[] = [];
  constructor(public ids: GitIdInfoService) { }
//...
````
- Once the *Add to List* button is pressed, we need to call the service to look up the bio information for the user and fetch the avatar.  We do this by calling `this.ids.GetGitIdInfo` with the github user id.  Let's modify the `addGhId` method of AppComponent to do that in `app.component.ts`: 
````typescript
// ...
  addGhId(toadd: string) {
      const newid= this.ids.GetGitIdInfo(toadd);
      this.ghIds.push(newid);
      this.ghId = '';
  }
// ...
````
- Now we can change our **id-list** component to display this additional information by changing the template `id-list/id-list.component.html`:
````html
<!-- ...-->
<mat-list-item *ngFor="let id of idlist">
     <button mat-icon-button (click)="toggleFavorite(id)">
        <mat-icon *ngIf="id.favorite">favorite</mat-icon>
        <mat-icon *ngIf="!id.favorite">favorite_border</mat-icon>
    </button>  {{id.name}} ({{id.bio}})  Avatar: {{id.avatar_url}}
    </mat-list-item>
<!-- ...-->
````
Now when we run our application, we see that after adding the user id, it calls the service to create the bio string; and also displays the text of the avatar_url.  Of course, we'd like to actually display an avatar image.  To create a default image to be displayed, we can leverage the `asset` folder created by the `cli` in the `\src` directory when we put our application together.  All the files we put here are copied to the final directory, and accessible by referencing `/assets` as a relative url.   Let's put our default avatar in an `images` directory, in our project structure: `/src/assets/images`.  There is a a decent default avatar on the wikimedia.org site [User_avatar](https://commons.wikimedia.org/wiki/File:User_Avatar.png).  (I downloaded the 450x450 one; but we are going to initially show it very small to fit on a single line).  Download this and place it in `/src/assets/images`.   Now modify our list in `id-list/id-list.component.html` to read:
````html
<!-- ...-->
<mat-list-item *ngFor="let id of idlist">
      <button mat-icon-button (click)="toggleFavorite(id)">
          <mat-icon *ngIf="id.favorite">favorite</mat-icon>
          <mat-icon *ngIf="!id.favorite">favorite_border</mat-icon>
      </button>
      <img [src]="id.avatar_url" alt="avatar" width="50"> {{id.name}} ({{id.bio}})  
    </mat-list-item>
<!-- ...-->
````
Now when you run the application, you should see our generic Avatar in front of the user name.

Now if only we got some useful information (which we will do in the final step)