# Step 5 to 6 Using HttpClient to call the GIT REST API
For our last step, we are going to extend our last user story to retrieve the information from github:
> As a user, in the list of Github ID's, I see additional information like their bio and their avatar *retrieved from github.com*.

To implement this, we are going to extend our service to call a [REST API](https://en.wikipedia.org/wiki/Representational_state_transfer) provided by [Github](https://developer.github.com/v3/).   While many of these calls require authentication, basic information on a user does not.   Checkout the [github users api docs](https://developer.github.com/v3/users/).  You can get an idea of what this api returns by looking at a call from my userid  [https://api.github.com/users/toddwseattle](https://api.github.com/users/toddwseattle)

REST API's typically return their data in a format like XML or JSON.  Github returns in JSON, which is great because it maps well to structures in javascript and interfaces in typescript.

Angular provides a service to make it easy to call web and restful services like github, called the [HttpClient](https://angular.io/tutorial/toh-pt6).  Note This was introduced in Angular 4.3; so there are still references on the web (before summer 2017) to a prior http service.

Like our own service, we import and inject in the constructor the HttpClient.  The fragment in `git-id-info.service.ts` looks like this:
````typescript
// ...
import { HttpClient } from '@angular/common/http';
// ...
@Injectable()
export class GitIdInfoService {

  constructor(private http: HttpClient) { }
// ...
````
We also need to import the module into our `@NgModule` in `app.module.ts`:
````typescript
//...
import { HttpClientModule } from '@angular/common/http';
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
    HttpClientModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatListModule
  ],
  providers: [GitIdInfoService],
  bootstrap: [AppComponent]
})
// ...

````
So far all of our interactions have been local to the machine, but a key problem with web applications, is how they handle asyncrhonous operations:  mouse movements, keyboard inputs, the user unexpectedly hitting the 'back' button, and calling out to web servers that have varying degrees of network latency.   Angular makes extensive use of a library called [rxJs](https://github.com/ReactiveX/rxjs) which provides 'reactive' extensions for javascript/typescript and makes it easy to handle asyncrhonous operations.  

Core to observables is the idea that things like mouse movements and data coming back from a web server are *streams*.   An obervable provides a way to *subscribe* to a stream to get the values emitted. [This article](https://developer.telerik.com/topics/web-development/introduction-observables-angular-developers/) describes how we come to observables in angular.  In the case of our API call, just one value is emitted after we do an *http get* from the service.  In general, it makes sense to return the Observable up from the service rather than the subscribed value as you shall see.

### Calling HttpClient Get Method

The [HttpClient](https://angular.io/api/common/http/HttpClient) provides a complete way to call rest services like the Github API.  It has methods that correspond to the main Http protocol verbs of get, post, put, patch, and delete.   To get the information about the user, we need to call get with the api for a username.   The get method returns an Observable which is a typescript [generic](https://www.typescriptlang.org/docs/handbook/generics.html).   We can add a type in `<>` in the call signature to specify the type we are returning.   In our case, we are mapping the result of the `/users/{user}` REST call to the interface we defined, **GitIdInfo**.  So we import the `Observable` form the rxjs library and change our call signature in `git-id-info.service.` to: 
````typescript
// ...
import { Observable } from 'rxjs/Observable';
// ...
 GetGitIdInfo(login: string): Observable<GitIdInfo>
//
````
For the API call, I prefer putting the base URL in a constant in the file; and also creating a constant in the method for the specific api.   We make the call based on the username passed in.   As mentioned, we return the whole observable.  `git-id-info.service.ts` now looks like this:
````typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GitIdInfo, GithubId } from './github-id';
import { Observable } from 'rxjs/Observable';

const githubAPI = 'https://api.github.com';

@Injectable()
export class GitIdInfoService {

  constructor(private http: HttpClient) { }

  GetGitIdInfo(login: string): Observable<GitIdInfo> {
    const userAPI = githubAPI + 'users/';
    return(this.http.get<GitIdInfo>(userAPI + login));
  }
}
````
### Consuming the Observable
We now need to consume the API and its observable in our component.  We call the service in `app.component.ts` in the **addGhId** method, which currently looks like this:

````typescript
 addGhId(toadd: string) {
      const info = this.ids.GetGitIdInfo(toadd);
      const newid = new GithubId(toadd);
      newid.avatar_url = info.avatar_url;
      newid.bio = info.bio;
      this.ghIds.push(newid);
      this.ghId = '';
  }
````
This isn't quite what we need for a couple of reasons:
1.  the **GetGitIdInfo** method of our service no longer returns a simple interface, **GitIdInfo**, but now returns **Observable<GitIdInfo>** an Observable with the type of **GitIdInfo**.   We need to handle that appropriately, by subscribing to the observable
2. We augment an object we create; but there is no reason we couldn't just use the information returned by the interface, becaue when the call is successful; all the information we need (and more) is populated in the interface.

To do both these things we change the method to:
````typescript
addGhId(toadd: string) {
    this.ids.GetGitIdInfo(toadd).subscribe( info => {
      this.ghIds.push(info as GithubId);
      });
    this.ghId = '';
  }
````
You might see something unfamiliar here:  We call **GetGitIdInfo** as before, it now returns an **Observable**.   We then call the **subscribe** method; which will get called by the observable when it emits new data.  As a parameter to the subscribe, we pass an anonymous arrow function.  info will contain the emitted **GitHubId** data from the api call.  We can then push this on the array.

To display the new information, we can modify the template.  We'll also add a few more properties to the interface based on what's returned by github for the user.

1. Add the proprties to the interface in `github-id.ts`
````typescript
    export interface GitIdInfo {
        login: string;
        name?: string;
        bio?: string;
        avatar_url?: string;
        location?: string;
        company:? string;
        html_url?: string;
        created_at?: string;
        public_repos?: string;
        favorite?: boolean;
    }
````

2. Now we reference some of the new properties in the template in `id-list-component.html`:
````typescript
<mat-list-item *ngFor="let id of idlist">
      <button mat-icon-button (click)="toggleFavorite(id)">
          <mat-icon *ngIf="id.favorite">favorite</mat-icon>
          <mat-icon *ngIf="!id.favorite">favorite_border</mat-icon>
      </button>
      <img [src]="id.avatar_url" alt="avatar" width="50"> {{id.login}} - {{id.name}} from {{id.location}} ({{id.public_repos}} Public Repos) on github since {{id.created_at | date}}
</mat-list-item>
````
notice the last field, ``id.created_at``, in the github API this is an ISO date stamp string--something that is not very pretty to the user.  Angular has a concept called a `pipe` where the output of an expression can be filtered through a function.  Angular has a set of built in pipes, but developers can also write their own.  The date pipe in particular formats the ISO date in the local codepage as a simple date output.

When you are running the application, you may notice if you enter an invalid login name, an error is logged to the console.  We can handle this error condition in the subscription.  While we just provide an initial parameter, which is a function that handles the 'next' condition from the observable; two other parameters are available to us in the **subscribe** method: **error** and **complete** called if the observable encounters an error and when it is finished respectively.   Let's handle the error state.
1. We want to display a message to the user; so in app.component we can define an `errorMessage` string property.
2. We make sure this is reset after the button is pressed to null; and it will be set if our observable fails.
3. When our observable fails, we can set the property.
4. To display in our template, we create a `<div>` that is only conditionally displayed if the `errorMessage` isn't null.  We want the div to be yellow on a red background; so we create an `.error` css class.   To do these things we make the following modifications to `app.component`:
- `app.component.ts`:
````typescript
// ...
export class AppComponent {
  title = 'My Favorite Github Users and Orgs';
  ghId = '';
  ghIds: GithubId[] = [];
  errorMessage = null;
  constructor(public ids: GitIdInfoService) { }

  addGhId(toadd: string) {
    this.errorMessage = null;
    this.ids.GetGitIdInfo(toadd).subscribe( info => {
      this.ghIds.push(info as GithubId);
      },
      error => {
        console.log('error:', error);
        this.errorMessage = error.message;
      });
      this.ghId = '';
  }
}
// ...
````
- the template, `app.component.html` at the end of the file:
````html
<div *ngIf="errorMessage" class="error">{{errorMessage}}</div>
</section>
````
- the css file, `app.comonent.css` for the error class:
````css
.wildcat-colors {
    background-color: #4E2A84;
    color: #d8d6d6;
}
.error {
    background-color: red;
    color: yellow;
}
````

There is one final bit of housekeeping we should do on our observable.  We've create a subscription with the subscribe method; but haven't, "un subscribed" from it.  Unsubscribing is important to insure that the memory allocated for our subscription is returned to the heap.  The right time to do that is when the component is destroyed.  Angular provides *lifecycle events* that are called in our component when they are for example initialized or being destroyed.   To do this we need to do the following:

1. Tell angular we are implementing the `ngDestroy` lifecycle event in our component.
2. Assign the subscription to a private member of our **AppComponent** class.   We need to import the **Subscription** type from rxjs.
3. implement the ngDestory event and have it unsubscribe.  Here is the fragment of `app.component.ts` that implements those pieces:
````typescript
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
// ...
export class AppComponent implements OnDestroy {
  title = 'My Favorite Github Users and Orgs';
  ghId = '';
  ghIds: GithubId[] = [];
  private getGitsub: Subscription;
  errorMessage = null;
  constructor(public ids: GitIdInfoService) { }

  addGhId(toadd: string) {
    this.errorMessage = null;
    this.getGitsub = this.ids.GetGitIdInfo(toadd).subscribe( info => {
      this.ghIds.push(info as GithubId);
      },
      error => {
        console.log('error:', error);
        this.errorMessage = error.message;
      });
      this.ghId = '';
  }

  ngOnDestroy() {
    this.getGitsub.unsubscribe();
  }
}

````

That's it!  We've seen in this tutorial:
- the basic structure of an angular application generated with the cli
- how to use external libraries like material and incorporate them in our app module, and use their customer and structural directives in our template.
- how to do 'two way binding' to our component to display information in the template
- how to attach an event to our html template
- how to use structural directive like `ngIf` and `ngFor`
- how to create, reference, and pass data to subcomponents using the cli and angular framework
- how to create, provide, and instatiate basic Angular services for our components to use
- using a library service, like `HttpClient` in our application to integrate a REST API
- how to create, subscribe, and unsubscribe to simple Observables in rxjs

There are still areas of angular yet to explore, especially routing, application state management, and navigation; as well as doing more complex operations with backend services including saving and manipulating data.   We will explore those in the next tutorial.

