# Step 2 to 3: ngFor and a component specific style
We now want to display our Github ID's in a bulleted format.  This introduces us to the structural template directive in angular, `ngFor`.

open `app.component.html`.

Delete the two paragraphs that output `ghId` and `ghIds`.  We will replace them with an ngFor loop in the template.  

we are also going to add some basic styling.  Let's put our title in a `<div>` with wildcat colors. 
We will create the wildcat-colors style in `app.component.css`   This is a css style local to our app.component.   We then change `app.component.html` to look like this:
````
<section class="mat-typography">
<div class="wildcat-colors"> 
<div style="text-align:center">
  <h1>
    Welcome to {{ title }}!
  </h1>
</div>
<div>
  <mat-form-field>
    <input matInput [(ngModel)]="ghId" placeholder="Enter a github org or user id"  value="toddwseattle" >
  </mat-form-field>
  <button mat-raised-button (click)="addGhId(ghId)">Add to List</button>
</div>
<ul>
  <li *ngFor="let i of ghIds">{{i}}</li>
</ul>
</div>
</section>

````
and `app.component.css` should look like this:
````
.wildcat-colors {
    background-color: #4E2A84;
    color: #d8d6d6;
}
````