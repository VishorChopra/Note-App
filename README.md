# React Notes App
# Introduction
A web application with **CRUD** (Create, Read, Update, Delete) functionality built using **MERN** stack (MongoDB, Express, React, Node.js) that allows the user to view, read ,craete , update and delete notes in the form of visual cards.
# Tech stacks used
 - **[MongoDB](https://www.mongodb.com/)** - For database functionality
 - **[Express](https://expressjs.com/)** - For handling server side (backend) functions
 - **[React](https://react.dev/)** - For frontend and client side functions
 - **[Node.js](https://nodejs.org/en)** - For backend functions
# Approach
## server
### index
 - Express routers are used to handle user and note functions.
 - [Mongoose](https://mongoosejs.com/) is used to handle MongoDB connection.

### Authentication [jsonwebtoken]
 - HTTP **POST** requests are used for both sign up and log in.
 - Signing up requires creating a username, entering email and password.
 - Uses [bcrypt](https://www.npmjs.com/package/bcrypt) to encrypt passwords given by users before storing them in database.
 - Before sign up, the API checks DB to ensure email does not already exist.
 - For logging in, DB is checked to make sure user exists. 
 - Then a [JWT](https://jwt.io/) token is created after signing the payload (the user ID in the database) with a secret key and given an expiration time of 5 hrs.
 - After successful login, this token is returned.
 - For every operation involving notes, this token is sent in the appropriate HTTP request's header.
 - If token expires, user is requested to login again.
### Database Models/Schema
 - Two models - user and note
 - User model contains username, email, and password (encrypted), also auto-generated user ID.
 - Note model contains title, body and user ID of the user who created it, also auto-generated note ID.
### Creating Notes
 - An HTTP **POST** request is sent with the aforementioned **token** in its header.
 - The user for which note is created is identified from token.
 - Uses `save` method from Mongoose.
### Retrieving Notes
 - An HTTP **GET** request is sent with the token in its header.
 - The user ID is identified from token and the DB is searched for notes having user ID of current user.
 - Uses `find` method from Mongoose.
 - The notes are then sent back in JSON form.
### Updating Notes
 - An HTTP **PATCH** request is sent to the API whose header contains the token as well as the ID of the required note.
 - The new title and body is sent in JSON form.
 - It uses `findByIdAndUpdate` method from Mongoose.
### Deleting Notes
 - An HTTP **DELETE** request is sent to the API with the token and required note ID in its header.
 - It uses `findByIdAndDelete` method from Mongoose.

All methods send appropriate status messages (successful/unsuccessful) upon completion.

## Frontend
### Pages
 - The look and feel of the frontend as well as several components like navigation bar, note cards, buttons, dialog boxes .
 - It has 4 pages: Home page, Login page and Sign up page.
 - Components used - Navigation bar, Note card, Modal, Avatar, Menu, Button.
#### Home page
 Contains links to log in , sign up and also contains the imported file {app.jsx}. 
#### Sign up page
 - User has to fill up the required fields and click on Sign Up button
 - `useState()` function is used to set default values for username, email, password.
 - The input given by user is then passed on to the API by Axios.
 - After successful sign up, user is taken to login page.
#### Login page
 - User has to fill up the required fields and click on Log In button
 - `useState()` function is used to set default values for email and password.
 - The input given by user is then passed on to the API by Axios.
 - After successful login, user is taken to notes page.
#### Notes page
 - Notes are displayed in the form of visual cards.
 - `useEffect()` function is used to get notes and display them.
 - On clicking '+' button user can create notes.
 - On clicking 'Add Note' button, create notes function is dispatched from Note redux.
 - Or user can click 'Cancel' button to cancel operation.
#### Note Card
 - Contains title and description of note
 - Contains two buttons: Update and Delete.
 - On clicking 'Update' button a dialog box is opened where user can enter the new title and body of note.
 - On clicking 'Update' button update notes function is dispatched.
 - On clicking 'Delete' button delete notes function is dispatched from Note redux.
#### Navigation Bar
 - The Navbar contains the ,search , login and sign up button.
 - When not logged in, it contains buttons for Log In and Sign Up.
 - On Log In, it displays an user name and logout button.
 - Clicking 'Logout' button will dispatch the logout state from User Home page.
### Routing
 - Two types: auth router and Note router.
 - In both router , I am insert the error and success message by using try and catch methods.
 - On Auth file i implemented JWT to successful login, the user ID and the token generated are returned.
 - The login is handled by [Axios](https://www.npmjs.com/package/axios) which makes the proper HTTP request and returns the response.
### CRUD
 - Note Crud contains 4 types of states - READ notes ,EDIT notes, UPDATE notes and DELETE notes .
 - All note actions are also handled by Axios and HTTP requests are made according to the format given in backend.
 - Both user and note reducers are combined and stored with `redux-thunk` middleware applied.

