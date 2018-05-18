// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv1 = require('uuid/v1');
const querystring = require('querystring');
const fetch = require('node-fetch');

// Set the port to 3001
const PORT = process.env.PORT || 3001;

// Create a new express server
const server = express()
  // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({
  server
});

let colorPicker = [ "#f4511e", "#43a047", "#1e88e5", "#d81b60"]
let colourPickerNumber = 0
// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.

wss.on('connection', (ws) => {
  console.log('Client connected');
// console.log('WSS CLIENTS', wss.clients);
  const colorMessage = {
    message:{
      type: "currentUser",
      color: colorPicker[colourPickerNumber]
    }
  }
  console.log(colorMessage);
  colourPickerNumber++
  let message = JSON.stringify(colorMessage)
  ws.send(message);


  console.log(wss.clients.size, "Number of clients")
  wss.clients.forEach(function each(client){
    const users = {
      numberofUsers : wss.clients.size,
      type : 'userNumber',
    }
    let messageUser = {
      message: users
    }
    let message = JSON.stringify(messageUser)
    console.log(message);
    client.send(message)
  })



  ws.on("message", function incoming(message) {
    let key = uuidv1();
    console.log(key);
    console.log(message);
    console.log("received: %s", message);

    let parsedMessage = JSON.parse(message);

    switch (parsedMessage.message.type) {

      case ("postMessage")  :

      console.log(parsedMessage);
      console.log(parsedMessage.content);
      if(matches = parsedMessage.message.content.match(/^\/giphy (.+)$/)){
        console.log(matches);
        let qs = querystring.stringify({
          api_key:  "pqBD9bzOZRx8r53d3tOI2VpFkl17ExIg",
          tag: matches[1]
    });
    fetch(`https://api.giphy.com/v1/gifs/random?${qs}`)
      .then( resp => {return resp.json() } )
      .then( json => {
        parsedMessage.message.content = `<img src="${json.data.image_url}" alt=""/>`
        parsedMessage.message.id = key
        parsedMessage.message.type = "incomingMessage"
        var message = JSON.stringify(parsedMessage);
        wss.clients.forEach(function each(client) {
          client.send(message)
        })
        console.log(`Sent: ${message}`);
      })
    } else if(parsedMessage.message.content.match(/png|jpg|gif/)){
      console.log(parsedMessage.message.content);
      parsedMessage.message.content = `<img src="${parsedMessage.message.content}" style="width:40vh" alt=""/>`
      parsedMessage.message.id = key
      parsedMessage.message.type = "incomingMessage"
      var message = JSON.stringify(parsedMessage);
      wss.clients.forEach(function each(client) {
        client.send(message)
      })
      console.log(`Sent: ${message}`);

    } else {
        console.log('parsed', parsedMessage);
        parsedMessage.message.id = key
        parsedMessage.message.type = "incomingMessage",
        message = JSON.stringify(parsedMessage);
        console.log(parsedMessage)
        wss.clients.forEach(function each(client) {
          client.send(message);
        });
      }
        break;

      case "postNotification":
        console.log('parsed', parsedMessage);
        parsedMessage.message.type = "incomingNotification"
        message = JSON.stringify(parsedMessage);
        console.log("Changed Type", parsedMessage)
        wss.clients.forEach(function each(client) {
          client.send(message);

        });
        break;
    }

});
    console.log(wss.clients.size, "Number of clients")


    // Set up a callback for when a client closes the socket. This usually means they closed their browser.
    ws.on('close', () => {
      console.log('Client disconnected')
      wss.clients.forEach(function each(client){
        const users = {
          numberofUsers : wss.clients.size,
          type : 'userNumber'
        }
        let messageUser = {
          message: users
        }
        let message = JSON.stringify(messageUser)
        console.log(message);
        client.send(message)
      })
  });
  });
