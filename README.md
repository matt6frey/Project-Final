## SnapCook

### 1. About
The goal of the project is to display recipes from pictures of ingredients. 

### 2. Link for Heroku 
http://lhl-recipe-app.herokuapp.com/#/

### 3. Steps to run locally
1. Git Clone 
2. 'npm i' in root folder and in client folder
3. Create .env file with .env.example as a template 
4. Create a Postgres table with .env information
5. 'npm start' in root folder to start the server
6. 'npm start' in client folder to start the app
7. Go to 'http://localhost:3000/'

### 4. Tech Stack
1. React, NodeJS
2. 3 APIs: 
    a. Cloudinary: Image upload
    b. Clarifai: Image Detection using Machine Learning
    c. Spoonacular: Recipes
3. Express for Server
4. Postgres for Database