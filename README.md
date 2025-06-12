# Node.js Native Authentication Demo

This is a simple demonstration project to simulate authentication using Node.js core modules without any frameworks like Express.

## Project Structure

- `server.js` — A native Node.js HTTP server handling routes (`/login`, `/profile`)
- `Client.js` — A client that sends HTTP requests to the server and simulates login/profile actions.

## Features

- Basic authentication on `/login`
- Token (Bearer) authentication on `/profile`
- Manual HTTP request handling using the `http` module
- Token generation using `crypto`
- File handling using `fs`

## Technologies Used

- Node.js core modules:
  - `http`
  - `crypto`
  - `fs`
  - `querystring`

## How to Run

1. Run the server:
   ```bash
   node server.js
   node client.js
