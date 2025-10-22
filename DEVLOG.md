# How i create a chat room with socket.io step by step

## 1- install express, dotenv, nodemon, socket.io

## 2- create html home page with it's styles in css folder

    - which it's the main page of the chat room
    = it contains a link to the chat form
    - when the user click on the link it will redirect to the chat form

## 3- I faced a problem with css file when i link it with html file it's not working

    - I searched for a solution and i found that i need to create a public folder and put my css file in it then add express static middleware to serve my public folder
    - I did it and it's working

## 4- create a chat form with it's styles in css folder

    - this page contains a form with username and room select
    - when the user click on the button it will redirect to the chat room page to start chatting

## 5- create a chat room page with it's styles in css folder and scripts in js folder

    - this page contains a sidebar with the room name and a list of all active users
    - when the user enter the room it will send a welcome message with the username and time of entering
    - when the user send a message it will appear on all users screens with the username and time of sending
    - i used socket.io to send message to all users from the chat room page "client side" using socket.emit but the messages from only the same room
    - this means send event to the server called message with the message content
    - after the user click on send empty the input field
    - in the server side which is "index.js" i used io.on to listen for the event message and send the message to all users
    - I faced a problem with data when i redirect to the chatroom page with the username and room because the data is not saved in the memory and the connection is closed when i redirect to the chatroom page
    - so I have two solutions:
        - save the data in the memory as a cookie or local storage or session or any storage method
        - use the query string to pass the data to the chatroom page
        - or add two forms in one file and make the second form hidden and when the user click on the first form it will show the second form

    - but i used the query string to pass the data to the chatroom page and it's working for now maybe i will found good solution in the future
    - add the message to screen or chat to appears in html page
    - send welcome message to the user when he enter the room for the first time or refresh the page or re-enter the room
    - send message to all users when the user out of the room
