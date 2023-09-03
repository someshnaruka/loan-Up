
# Loan Application Project-LoanUp
This is a web application built using the MERN stack (MongoDB, Express.js, React, and Node.js) with Redux state management. It also utilizes Firebase for Google authentication and Tailwind CSS for styling. The project aims to calculate the pre-assessment loan value for a business based on the last fiscal data entered by the user of the company. The loan calculation depends on the profit or loss and asset value of the company as follows:

- If the company has made a profit, a 60% loan is approved.
- If the asset value is greater than or equal to the loan amount, 100% loan is approved.
- In other cases, 20% of the loan amount is approved.


## Live Preview

https://loan-up.vercel.app/

## Tech Stack

**Frontend:**

- React: React is a popular JavaScript library for building user interfaces. It is used for the frontend of your application, providing a dynamic and responsive user interface.
- React-Redux: Redux is a state management library for JavaScript applications. It is used to manage the application's state, making it easier to handle complex data flows and maintain a predictable state.

- Tailwind CSS for responsive and customizable UI design.

**Backend:**

- Node.js: Node.js is a server-side JavaScript runtime that allows you to run JavaScript on the server. It is used to build the backend server for your application.
- Express.js: Express.js is a Node.js web application framework that simplifies the creation of APIs and routes. It is used to build the backend API for your application.

**Database**

- MongoDB: MongoDB is a NoSQL database that stores data in a flexible, JSON-like format. It is used to store company fiscal data, user information, and other relevant data.

**Firebase Authentication**

- Firebase Authentication is a service provided by Google's Firebase platform. It offers easy-to-use authentication methods, including Google Authentication, which allows users to log in to your application using their Google accounts.


## Features
- User registration and authentication using Firebase Google Authentication.
- Input and storage of fiscal data for the company, including profit/loss and asset value.
- Loan value calculation based on the provided data.
- User-friendly interface designed with Tailwind CSS.
## Prerequisites
- Liked Articles
Before running the project locally or deploying it, make sure you have the following prerequisites installed:

- Node.js and npm (Node Package Manager)
- MongoDB Atlas account or a locally running MongoDB server
- Firebase project for authentication (with Google authentication enabled)
- API Key for Firebase (required for authentication)


## Installation

To set up the application locally, follow these steps:

Clone the repository: 
```bash
  git clone https://github.com/someshnaruka/loan-Up.git
```

Navigate to the project directory: 
```bash
  cd loan-up
```
Install server dependencies:
```bash
  cd backend
  npm install
```
Install client dependencies:
```bash
  cd frontend
  npm install
```
- Configuration

Create a Firebase project and enable Google Authentication. Obtain the Firebase API key.

Create a .env file to add environment variables

Start server:
```bash
  node index.js 
```
Start client :
```bash
  npm start
```

- Open your browser and visit http://localhost:3000 to access the application.
## Usage

- Register or log in using your Google account.

- Enter the company's fiscal data, including profit/loss and asset value.

- The application will calculate and display the pre-assessment loan value.


## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

Please adhere to this project's `code of conduct`.


## Contact

Contact
If you have any questions or issues, feel free to contact us at someshnaruka@gmail.com

Happy coding! 🚀