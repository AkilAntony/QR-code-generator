# QR Code Generator

This application allows users to generate QR codes by entering a URL and clicking the "Generate QR Code" button.

## Frontend (React)

The Frontend is built using React, and it provides a user interface for entering the URL and generating QR codes.

## Installation and Setup

1. Clone this repository to your local machine.
2. Navigate to the front-end directory.
3. Run npm install to install dependencies.
4. Start the development server by running npm start.
5. Access the application in your web browser at http://localhost:3000.

## Usage
1. Enter the URL for which you want to generate a QR code in the input field.
2. Click the "Generate QR code" button.
3. The generated QR code will be displayed below the input field.

## Backend (Express.js)

The backend is built using Express.js and serves as an API for generating QR codes.

## Installation and Setup
1. Navigate to the back-end directory.
2. Run npm install to install dependencies.
3. Start the server by running npm start.
4 The server will be running at http://localhost:5000.

## Endpoints
1. POST /url: Accepts a URL in the request body and generates a QR code for the provided URL.
2. GET /qrcode: Retrieves the generated QR code image.

# Technologies Used

## Frontend
React
Axios
Validator (for URL validation)

## Backend
Express.js
cors
qr-image
fs
 

