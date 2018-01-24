# Step 0 to 1
Step one adds [angular material design](matarial.angular.io) the project for better styling. To do this, we follow the directions on the material.angular.io site:
## 1a Install Material and the CDK (component development kit)
`npm install --save @angular/material @angular/cdk`

## 1b Add Material Animations
`npm install --save @angular/animations`

## 1c Add a pre-built theme
To do this, modify `styles.css` in the `src` directory which contains the global styles for the angular project.  Insert the following:
`@import "~@angular/material/prebuilt-themes/purple-green.css"`

## 1c Add Material Icons and Fonts
In the `src` directory, add the following two lines to `index.html` just after the `<body>` tag:
```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">`
<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet">
```

## 1d Activate the styles in the default angular page
open the file `app.component.html` in the `src\app` The material typography is used when the css class `mat-typography` is applied to a portion of an html file.   To do that, let's wrap the whole page in a section by putting the opening tage in the first line of the file:
`<section class="mat-typography">`
and closing it in the last line of the file
`</section>`

You should now be able to re run the application and see the use of the Google Roboto font instead of the browser default font for the angular startup page.  Do that by running:
`ng serve`

We recommend keeping this running in a seperate command shell so you get 'live reload' as you develop.