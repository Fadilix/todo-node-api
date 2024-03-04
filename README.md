# Express Todo App

This is a simple Express.js application with CRUD operations for users and todos. It uses Sequelize as the ORM for database operations.

## Table of Contents

1. [Installation](#installation)
2. [Usage](#usage)
3. [API Endpoints](#api-endpoints)
    - [User Routes](#user-routes)
    - [Todo Routes](#todo-routes)
4. [Database](#database)



## Installation
- Clone the repository:
  ```bash
   git clone https://github.com/your-username/your-repo.git
  ```


- Install dependencies:
  ```bash
  cd your-repo
  npm install
  ```

## API Endpoints
### User Routes
* **Welcome page** :
  - Endpoint :  `GET /`
  - Response:
    ```
      { "message": "Hello world!!!" }
    ```


* **Add a user** :
  - Endpoint :  `POST /api/users/signup`
  - Request Body:
    ```
      {
        "username": "example_user",
        "password": "example_password"
      }
    ```
  - Response:
       ```
    { "message": "User added successfully" }

    ```

* **Log a user in** :
  - Endpoint :  `POST /api/users/login`
  - Request Body:
    ```
      {
        "username": "example_user",
        "password": "example_password"
      }
    ```
  - Response:
       ```
    { "message": "User logged in successfully" }

    ```

* **Delete a user**:
  - Endpoint :  `DELETE /api/users/:userId`
  - Url example : `http://localhost/3000/api/users/3`
  - Response:
       ```
    { "message": "User deleted successfully" }

    ```

* Edit a user :
  - Endpoint :  `PUT /api/users/edit/:userId`
  - Request Body:
    ```
      {
        "username": "example_user",
        "password": "example_password"
      }
    ```
  - Response:
       ```
    { "message": "User edited successfully" }

    ```


* Get all the users :
  - Endpoint :  `GET /api/users/edit/:userId`
  - Response:
    ```
      [
        { "id": 1, "username": "user1" },
        { "id": 2, "username": "user2" },
        // ...
      ]

    ```

### Todo Routes

* **Add a todo**:
  - Endpoint :  `POST /api/todos`
  - Request Body:
    ```
     {
    "task": "New Task",
    "userId": 1
      }
    ```
  - Response:
    ```
    { "message": "Todo added successfully" }

    ```
* **Get all todos** :
  - Endpoint :  `GET /api/todos`
  - Response:
    ```
       [
        { "id": 1, "task": "Task 1", "userId": 1 },
        { "id": 2, "task": "Task 2", "userId": 1 },
        // ...
      ]

    ```

* **Delete a todo** :
  - Endpoint :  `DELETE /api/todos/:id`
  - Response:
    ```
    { "message": "Todo deleted successfully" }
    ```

### Database
This app uses Sequelize as the ORM and Postgresql as the database. The database connection details can be configured in the `config.json` file. 

    
