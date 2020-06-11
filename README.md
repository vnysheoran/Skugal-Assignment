# Skugal-Assignment
Skugal Assignment

## Development servers

#### Local
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

#### Github Pages
Navigate to `https://vnysheoran.github.io/Skugal-Assignment`

#### Firebase Hosting
Navigate to `https://skugal-assignment-d0ab8.web.app/` or `https://skugal-assignment-d0ab8.firebaseapp.com/`


## Build

#### Local Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

#### Build for Github Pages
`ng build --prod --output-path docs --base-href /Skugal-Assignment/`

duplicate index.html as 404.html and push the code to github

#### Build for Firebase Hosting
Run `ng build --prod --output-path firebase/public` to build the project for firebase hosting

`cd firebase` and run `firebase deploy --only hosting`

## Functionality
1. Allow you to create TODO with rich text description.
2. Added realtime firestore database.
3. When an action performed, loading spinner shown
4. When an item added, updated or delete, fade-in animation shown
5. A Google cloud function is in place that will automatically change the name of todo to uppercase
6. User can update and delete the todo
7. Filtering based on active, done and all is also given.
8. Export as JSON, PDF, Excel also provided.
9. Project hosted on github pages as well as Firebase hosting.
10. Todo can be marked active or Done.
11. There are also some subtle changes that you will notice while using the app.
