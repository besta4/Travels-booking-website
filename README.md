# Travels Booking Website

This project is a Travel Listings website built with Node.js, Express, and MongoDB. The website allows users to view, add, edit, and delete travel listings. The UI is styled with Bootstrap and CSS. This is a simple CRUD application that demonstrates core concepts of web development like routing, templates, and database interaction.

## Table of Contents
- [Technologies Used](#technologies-used)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Database Initialization](#database-initialization)
- [Routes](#routes)
- [Data Structure](#data-structure)
- [Validation](#validation)
- [Error Handling](#error-handling)
- [Contributing](#contributing)
- [License](#license)

## Technologies Used
- **Node.js**: A JavaScript runtime built on Chrome's V8 JavaScript engine.
- **Express.js**: A web framework for Node.js for building robust web applications.
- **MongoDB**: A NoSQL database for storing travel listings.
- **Mongoose**: An Object Data Modeling (ODM) library for MongoDB and Node.js.
- **EJS**: Embedded JavaScript templating engine for rendering dynamic HTML.
- **Bootstrap**: A front-end framework for building responsive, mobile-first websites.
- **Joi**: A powerful schema description language and validator for JavaScript objects.

## Features
- Add new travel listings including title, description, image, price, and location.
- Edit existing listings with real-time updates.
- Delete listings.
- Server-side validation for input data using Joi.
- Error handling for invalid routes and server issues.
- Responsive design using Bootstrap.

## Installation

### Prerequisites
Make sure you have the following installed:
- Node.js
- MongoDB

### Steps
1. Clone the repository:
    ```bash
    git clone https://github.com/besta4/Travels-booking-website.git
    cd Travels-booking-website
    ```

2. Install dependencies:
    ```bash
    npm install
    ```

3. Start MongoDB:
    Ensure that MongoDB is running on your system.
    ```bash
    mongod
    ```

4. Initialize the database (optional, if you want to populate the database with sample listings):
    ```bash
    node init/index.js
    ```

5. Run the server:
    ```bash
    node app.js
    ```
    The server will be running at [http://localhost:8080](http://localhost:8080).

## Usage
Access the Application
Once the server is up and running, visit the following URLs in your browser:
- Home: [http://localhost:8080](http://localhost:8080)
- View Listings: [http://localhost:8080/listings](http://localhost:8080/listings)
- Add a Listing: [http://localhost:8080/listings/new](http://localhost:8080/listings/new)

## Routes
- **GET /listings**: Displays a list of all travel listings.
- **GET /listings/new**: Displays a form for adding a new listing.
- **POST /listings**: Adds a new listing (validated with Joi).
- **GET /listings/:id**: Displays a specific listing's details.
- **GET /listings/:id/edit**: Displays a form to edit an existing listing.
- **PUT /listings/:id**: Updates the details of a listing (validated with Joi).
- **DELETE /listings/:id**: Deletes a specific listing.

## Data Structure
Each listing has the following fields:
- **title** (required): The name of the travel destination.
- **description**: A brief description of the location.
- **image**: A URL to an image of the location (optional, default image provided).
- **price** (required): The cost of visiting this location.
- **location** (required): The specific address of the location.
- **country** (required): The country of the travel destination.

## Validation
The application uses Joi for server-side validation to ensure that all required fields are filled correctly when creating or editing a listing.

The Joi schema is located in `schema.js` and validates the following fields:
- **title** (required, string)
- **description** (optional, string)
- **price** (required, number)
- **location** (required, string)
- **country** (required, string)

If the validation fails, the user will receive an error message.

## Error Handling
The application handles errors gracefully:
- **Custom 404 Page**: If a route does not exist, the application will return a custom "Page not found" error.
- **Validation Errors**: Any validation errors on form submissions will trigger a detailed error message, guiding the user to correct the input.
- **General Errors**: Other server-side errors are caught and displayed to the user with a custom error page.

## License
This project is licensed under the ISC License.
