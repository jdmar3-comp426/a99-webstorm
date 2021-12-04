# a99 Blackjack

A simple blackjack game.

## Login

You will be prompted to log in with a username and password. If you already have login info you can sign in, otherwise you can signup using the signup button. After logging in, you will be prompted to the gameplay page. 

## Gameplay
You will see three buttons: Play, Hitme, and Stand. To start the game, press Play, and you will be dealt two hands. The goal of this blackjack game is to get as close to 21 points as possible without getting over 21 points. An ace is worth 11 or 1 point, whichever is best for your interest. An king, queen, jack, and ten is worth 10 points, and other cards are worth their individual points. If you believe that you need another card, press hitme and you will be dealt another card. Otherwise, press stand and you will be manipulating the behaviors of the second hand. Similarly, press hitme if you want another card, and stand if you don't. The highest score of the two hands that's not over 21 will be added to the scoreboard. You can restart the game by pressing the restart button.

## Dependency List
* better-sqlite3
* browser-sync
* concurrently
* express
* md5

## [API Endpoints](/docs/endpoints.md)
* Login
* Signup
* User Entered Wrong Login
* User Info Already Exists
* Game