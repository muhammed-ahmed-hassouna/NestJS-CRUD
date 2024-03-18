# NestJS User CRUD API

This project is a CRUD (Create, Read, Update, Delete) API built using NestJS framework. It provides endpoints to manage users along with authentication and authorization features.

## Features

- **User Management**: CRUD operations for managing user data.
- **Authentication**: User authentication using JWT (JSON Web Tokens).
- **Authorization**: Restricted access to certain routes based on user roles.
- **Login and Signup**: Endpoints for user login and signup.

## Prerequisites

- Node.js installed on your machine
- MongoDB database instance (local or remote) accessible
- npm or yarn package manager

## Installation

1. **Clone the repository:**

    ```bash
    git clone https://github.com/muhammed-ahmed-hassouna/NestJS-CRUD.git
    ```

2. **Install dependencies:**

    ```bash
    npm install
    ```

3. **Set up environment variables:**

    Create a `.env` file at the root of the project and define the following variables:

    ```plaintext
    PORT=<port>
    MONGODB_URI=mongodb+srv://<username>:<password>@<cluster-url>/<database-name>?retryWrites=true&w=majority
    JWT_SECRET=<your-jwt-secret>
    ```

## Usage

**Run the application:**

    ```bash
    npm run start:dev
    ```

