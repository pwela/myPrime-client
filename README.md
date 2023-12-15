# Myprime App

This apps works in combination with <a href="https://github.com/pwela/movie_api">movie_api</a>, a server-side app hosted on heroku.
You can find all the details related to the api in my GitHub repository.

## Objective

This project goal was to build a client SPA allowing user to interact with movies and user preferences on a movie client-server application.
This app is hosted on netlify.

### Live app URL:

https://myprime.netlify.app/

<div>
<img alt="App screenshoot" src="/assets/homepage.png"/>
</div>

# Technologies used:

1. React
2. React router
3. React bootstrap
4. eslint & pettier for code formatting
5. Parcel
6. React Redux
7. netlify

Programming langages:

1. JavaScript
2. CSS
3. Html

# Key features:

## Main view

- Returns ALL movies to the user (each movie item with an image, title, and description)
- Filtering the list of movies with a “search” feature
- Ability to select a movie for more details
- Ability to log out
- Ability to navigate to Profile view

## Single Movie view

- Returns data (description, genre, director, image) about a single movie to the user
- Allows users to add a movie to their list of favorites

## Login view

- Allows users to log in with a username and password

## Signup view

- Allows new users to register (username, password, email, date of birth)

## Profile view

- Displays user registration details
- Allows users to update their info (username, password, email, date of birth)
- Displays favorite movies
- Allows users to remove a movie from their list of favorites
- Allows existing users to deregister

## Optional Views & Features:

### Genre view

- Returns data about a genre, with a name and description
- Displays example movies

### the movie rating

- Allow users to access different movie information, such as genre description and director bio, without leaving the view (e.g., tooltips)
- Display a list of related or similar movies

# Dependencies

- "@parcel/transformer-sass": "^2.9.3",
- "eslint": "^8.49.0",
- "eslint-config-prettier": "^9.0.0",
- "eslint-plugin-prettier": "^5.0.0",
- "eslint-plugin-react": "^7.33.2",
- "parcel": "^2.9.3",
- "prettier": "^3.0.3",
- "process": "^0.11.10"
