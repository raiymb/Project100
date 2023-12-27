Project Documentation
1. Overview
This project is a simple RESTful API for managing contacts. It includes functionalities such as user registration, user authentication, and CRUD operations for contacts. The backend is built using Node.js, Express.js, and MongoDB as the database. Mongoose is used as an ODM for MongoDB.
2. Project Structure
  2.1. Directory Structure
    config: Contains configuration files, such as database connection (dbConnection.js) and environment variables (dotenv).
    controllers: Defines the main logic for handling HTTP requests.
    middleware: Holds middleware functions used in route handling (validateTokenHandler.js and errorHandler.js).
    models: Contains Mongoose schemas for User and Contact entities.
    routes: Defines the API routes and connects them to the appropriate controller methods.
    public: Stores static files (currently not extensively used in the project).
    index.js: The main entry point for the application.
  2.2. Key Files
    contactController.js: Manages the CRUD operations for contacts.
    userController.js: Handles user registration, login, and current user information.
    contactRoutes.js: Defines routes related to contacts.
    userRoutes.js: Defines routes related to users.
    dbConnection.js: Establishes a connection to the MongoDB database using Mongoose.
    validateTokenHandler.js: Middleware to validate user authentication tokens.
    errorHandler.js: Middleware to handle errors and send appropriate HTTP responses.
    contactModel.js: Mongoose schema for the Contact entity.
    userModel.js: Mongoose schema for the User entity.
    index.js: The main entry point for the application, where the server is configured and started.
3. Dependencies
  Node.js: JavaScript runtime for server-side development.
  Express.js: Web application framework for Node.js.
  MongoDB: NoSQL database used to store contact and user information.
  Mongoose: ODM for MongoDB, simplifying database interactions.
  Bcrypt: Library for hashing passwords securely.
  jsonwebtoken: Library for creating and verifying JSON Web Tokens (JWT).
  express-async-handler: Middleware for handling asynchronous errors in Express.
4. Getting Started
  Clone the repository: git clone <repository-url>
  Install dependencies: npm install
  Set up the environment variables by creating a .env file (use .env.example as a template).
  Start the server: npm start
5. API Endpoints
  5.1. Contacts
    GET /api/contacts: Get a list of contacts (requires authentication).
    POST /api/contacts: Create a new contact (requires authentication).
    GET /api/contacts/:id: Get details of a specific contact (requires authentication).
    PUT /api/contacts/:id: Update a specific contact (requires authentication).
    DELETE /api/contacts/:id: Delete a specific contact (requires authentication).
  5.2. Users
    POST /api/users/register: Register a new user.
    POST /api/users/login: Login and receive an access token.
    GET /api/users/current: Get details of the currently logged-in user (requires authentication).
6. Error Handling
  The project uses a centralized error handling mechanism (errorHandler.js). It categorizes errors based on HTTP status codes and provides detailed error messages.
7. Security
  User passwords are securely hashed using bcrypt. JWTs are employed for user authentication, and routes are protected using the validateTokenHandler middleware.
8. Additional Notes
  The project uses async/await and the express-async-handler middleware to handle asynchronous operations gracefully.
  The .env file is used to store sensitive information, such as database connection strings and secret keys.
9. Constants
  The constants object in index.js provides predefined HTTP status codes for use in error handling.
