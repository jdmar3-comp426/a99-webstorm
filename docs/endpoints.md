We have a lot of endpoints which merely redirect and provide files. I will list some endpoints that have other functions.

## Login Page

**Endpoints** : Post `/app/login`

Requests username and password to log in. Checks if user data already exists in database. Redirects to `/app/game` if data exists and this user will have his/her numOfGames and lastLogin attributes update, redirects to `/app/signup` to register new user, redirects to `/app/wronginformation` if not login info not found.

**Endpoints** : Post `/app/changeInfo`

Allow users to change their username or/and password without influencing their other attributes.

**Endpoints** : Post `/app/destroy`

Will delete the account information related to certain username.

## Signup Page

**Endpoints** : Post `/app/signup`

Allows users to register username, password, and email address into database. If the username or email address already exist in database, redirects to `/app/alreadyexists`. If the account successfully registered, it will redirect user to to `/app/login`.

## Game

**Endpoints** : Get `/app/game`

Main game page. Accessible after successful log in.

**Endpoints** : Get `/app/game/pi`

Allow users to check their username and password once entered into the game page.
