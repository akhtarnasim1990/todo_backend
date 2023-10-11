# Backend project

## Table of Contents

- [Backend project](#backend-project)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Configuration](#configuration)
  - [Usage](#usage)
  - [Endpoints](#endpoints)
  - [Technologies Used](#technologies-used)

## Description

This is the backend project for todo list. Toatal nine apis have been built.
Four for user credential i.e for signup, aignin and logout and remainig for todos to create, delete, update and delete i.e (CRUD) operations.

## Getting Started

### Prerequisites

- Node.js (version 16.18.0)
- MongoDB (comapss)

### Installation

Provide step-by-step instructions for setting up the project locally on a developer's machine.

1. Clone the repository: git clone git@github.com:akhtarnasim1990/todo_backend.git

2. Navigate to the project directory: cd todo_backend

3. Install dependencies: npm install

### Configuration

env file is not ignored, so that it can be easily accessible.

## Usage

1. Start the server: npm run dev (if nodemon is globally installed) or npm start

2. The server will run on http://localhost:8000 by default.

## Endpoints

List the available API endpoints .

- `POST /users/signUp`: To signUp the todo page.
  payloads: {
  email: 'useremail',
  password: 'password'
  }
- `POST /users/login`: To login the todo page.
  payloads: {
  email: 'useremail',
  password: 'password'
  }
- `GET /users/logout`: To logout the todo page.
  payloads: {
  }
- `GET /users/logoutAll`: To logout from all devices.
  payloads: {
  }
- `POST /todos/createTodo`: To create a todo.
  payloads: {
  item: itemName(String)
  }
- `GET /todos/getTodos`: To read all todos.
  payloads: {
  }
- `POST /todos/deleteTodo`: To delete a todo.
  payloads: {
  todo_id: todo id
  }
- `POST /todos/updateTodo`: To update a todo.
  payloads: {
  todo_id: todo id,
  todo: updatedTodo
  }
- `POST /todos/todoIsDone`: To update a todo's is_done.
  payloads: {
  todo_id: todo id,
  isDone: true/false
  }

## Technologies Used

List the main technologies, libraries, and tools used to build backend project.

- Node.js
- Express.js
- MongoDB
- JWT for authentication
- ...
