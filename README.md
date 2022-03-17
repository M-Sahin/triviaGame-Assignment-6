# Trivia Game 

[REST API](https://murattimothytriviagame.herokuapp.com/trivia)

## Table of contents

- [General Information](#general-information)
- [Technologies](#technologies)
- [Installation and usage](#installation-and-usage)
- [Contributors](#contributors)

## General Information
The Trivia Game app starts on the main screen, which is called the Start Screen. Here, the player can input his/her name and set te difficulty, amount of questions and select the category. If the user does not input any values, the game will use the default settings. Default settings consist of 5 question from all categories and difficulties. The data is fetched from a free [API](https://opentdb.com/api_config.php).

When the player presses start, the questions screen will appear. All the questions which are fetched from the API are displayed in this screen. This screen only views one question at a time. Every time the user presses the next button, the page will view the next question. A correct answer amounts to 10 points.

When all the questions are answered, the resultsscreen shows up. In this screen the user can see the score. Also, all the answers are displayed here and good and wrong answers are highlighted. Finally, at the bottom there are two buttons, the Reset and the Replay button. When the player presses the Reset button, the game resets all values and returns to the startscreen, where the player starts a new game with new values, for example the player can select another catagory or difficulty. When the player presses the Replay button, the game returns to the questions screen and displays new questions from the same catagory, same difficulty and same amount of questions.

## Technologies
- Vue
- Vue Router
- Vuex
- JavaScript
- HTML, CSS

## Installation and Usage

**Note** For this application to work, you need node and npm installed on your machine.

1) Clone the project repository:
```sh
git clone https://github.com:M-Sahin/triviaGame-assignment-6.git
```

2) While inside the root directory, run the following command:
```sh
npm install
```

3) Start the development server by running
```sh
npm run dev
```
4) After running the command, you will get an url with which you can connect to the development server.

## Contributors
[Murat Sahin (@M-sahin)](https://github.com/M-sahin)
[Timothy Blom (@TimothyBlom)](https://github.com/TimothyBlom)
