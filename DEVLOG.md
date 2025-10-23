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
    - display all users in the room in the sidebar
        - when the client join the room we save the user in array in server side "index.js" and then filter users depend on room send the users to the client "chatroom.js"
        - we get the users from the server and we display them in the sidebar


    - send message to all users when the user out of the room

    - remove user from array when the user out of the room
        - when the user out of the room we remove the user from the users array in server side "index.js" using "removeUser" function in "utils/users.js"
        - at first i made return users.filter but i forgot to update users array so i back again and update the users array in "removeUser" function by using splice
        - and we send the user leave message to all users in the room then redirect the outed user to the chatform page
        - call "getUsersRoom" after removing the user to display it again in sidebar after the user out of the room
        <!-- - after i call "getUsersRoom" i found a problem with the users name
        because every time i refresh the page the users name is the same because the socket id change every time
        - so i -->


    - organize the code by separating the functions such add users to array, send all users, update users list,
        - when i organize the code i found a problem with get user depend on his room
        - because at the first i made the user join send event from the client to server with username and room
        - so every time the user join i had to send the username and room to the server and this is not safe
        - because the user can join the room with another username or another room because i didn't check the username and room before send the event and depend on the username and room the user join the room
        - so i save the username and room in the users array with socket.id as the key
        - and every time later the user not need to send the username and room to the server because i already saved the username and room in the users array
        - so i build a function to get the user depend on his id
