# Endpoints

## Login

**URL** : `/login`

Requests username and password to log in and allows for signup if new user. Checks if user data already exists in database. Redirects to `/game` if data exists, redirects to `/signup` to register new user, redirects to `/wronginformation` if not login info not found.

## Signup

**URL** : `/signup`

Allows users to register username and password into database. If info already exists in database, redirects to `/alreadyexists`. Otherwise redirects to `/login`.

## User entered wrong login

**URL** : `/wronginformation`

Informs user that user data cannot be found in database, redirects to `/login`.

## User info already exists

**URL** : `/alreadyexists`

Informs user that entered signup information already exists in database.  Redirects to `/signup`.

## Game

**URL** : `/game`

Main game page. Accessible after successful log in.