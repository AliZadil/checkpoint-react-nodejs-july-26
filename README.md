# Getting started:
Fork and clone this repository, and run

    npm install

Inside the repository.

Start editing the **src/app.js** file for the react part, and **src/server/server.ts** for the express.js server part.

Run:

    npm run dev

This will start the react app and the server app at the same time, with hot reload enabled for both of them.

React app will run on **localhost:3000** and the express server needs to be created, to run on **localhost:3001**.

You should use:

    import cors from "cors";
    app.use(cors());

to enable CORS for the express.js server, so that it accepts http requests from the react app.

Add

    import React from "react";

At the top of your react component files, to not get odd typescript error.

# Task

Build a website where a user can input text, send it to the express.js server using a http POST request, and use an http GET request to get all posts sent to the server. The posts will be stored in a simple array in the server.

## For react app
You can use function or class components for react.

Write an input field to get the text, and a "Save" button, which when pressed will send a POST request to http://localhost:3001/api/posts containing a JSON object, that looks like: 
    
    { text: "Input text here" }.

When the App component mounts, make a GET request to http://localhost:3001/api/posts to get all the posts saved in the server.

You can use useSWR, or fetch, or whatever solution you want, to get this information.

Hint: fetcher for useSWR looks like this:

    const fetcher = (url) => fetch(url).then((res) => res.json());

To make HTTP requests, use fetch like so:

    // a GET request:

    const response = await fetch(API_BASE_URL + "api/posts", {
        method: "GET",
        mode: "cors",
        headers: {
        "Content-Type": "application/json",
        },
    });
    response.json(); // will give you the json response from this request
    
    // a POST request:
    const response = await fetch(API_BASE_URL + "api/posts", {
        method: "POST",
        mode: "cors",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: text }),
    });
    response.json(); // will give you the json response from this request

    // a PUT request:
    const response = await fetch(API_BASE_URL + "api/posts/" + id, {
      method: "PUT",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: text }),
    });

    // DELETE
    const response = await fetch(API_BASE_URL + "api/posts/" + id, {
      method: "DELETE",
      mode: "cors",
    });


fetch() is async, so it returns a Promise.


The express.js server should return a list of posts in a JSON response, with status code 200. The response should look like this:

    [
        {
            id: 0,
            text: "Text 1 here",
        },
        {
            id: 1,
            text: "Text 2 here",
        },
        ....
    ]

Display all the posts in the page, each post in its own Post component. The Post component will have the text, and two buttons "Delete" and "Update".

The text inside the post component should be editable. You can use an Input tag, or a simple tag with the property contenteditable enabled, you can choose how you want to do this.

The Update button will send an http PUT request to http://localhost:3001/api/posts/${id}, to update the post text with whatever you edited in that post text.

The Delete button will send an http DELETE request to http://localhost:3001/api/posts/${id} to delete a post with that specific ID.

After a Delete or Update, trigger an update to properly display the list of posts, with the correct ones that were deleted or updated.

Hint: if you useSWR, you can call the mutate function right after sending the updated or delete request.

Write two buttons in your App component, to sort and reverse sort the posts by ID.

If a Post has an even ID, make the text color red. If the ID is odd, make the text color blue.
So if a Post has id = 3, then the text will be blue.

For the typescript part, add any typescript that you can to your functions, and the objects you use.

## For express.js server

Don't forget about the **cors** part, otherwise you'll have problems sending http request from frontend to backend.

Create an express.js app that will listen on port 3001. 

Configure your express app to accept JSON from the frontend.

This server will have endpoints for Create, Read, Update and Delete of posts, for the url "http://localhost:3001/api/posts/"

Write functions for each action (getAll, create, updateByID, deleteByID), and use them in your express server. Write the proper types for these functions (req and res objects as parameters).
You can store these functions in server.ts, or move them to a separate file, that's up to you. 
If you move them to a separate file, make sure when you import them you use .js at the end of the path.

Write type definitions for your Posts array.

ID is number, and it starts at 1 and then gets incremented by +1 every time a new post gets created. So the first post will have ID 1, second post will have ID 2, and so on.

import express from "express";
const app = express();
app.use(express.json());
app.listen(port, () => {
  console.log("Server started on port", port);
});