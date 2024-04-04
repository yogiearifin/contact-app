# Contact App

This is a project for Technical Test at Jenius utilizing their own contact API

## Features
- Working Create,Read,and Update functions (Delete is currently not working due to their API problem).
![not working rn](https://i.imgur.com/jjWbMVv.png)
- Looking good on mobile and desktop screen.
- Drag and drop image upload.
- Blazingly fast webapp powered by Vite.
- Typesafe code powered by Typescript
- Now featuring some unit tests.

## How to Run the Project
- Clone the project.
- Open your terminal in the directory you clone this project.
- Run 'npm i'
- Run 'npm run dev'
- Profit!

## Issues
What is a great project without some issues, am I right?

- If you access Homepage ('/), it will have a lot of console.error. This is due to someone inserted a local path for contact images (I swear it wasn't me).
![look at this red thingies](https://i.imgur.com/pXOZiP8.png)
- Slowness on Homepage. This is due the endpoint has a lot of data without built-in pagination from the Backend side.