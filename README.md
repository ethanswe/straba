## STRABA (Strava Clone)

**Description**
* Straba is a web application that allows users to upload their GPX activity data and share their exercises with other users on the site.  Users can follow, comment, and give kudos to other users.  They can upload their unique avatars as well. Straba features an activity feed, activity detail page, as well as a dynamic user profile page with stats, user activity history, and followers.

**Live Demonstration**
* https://straba.herokuapp.com/login

**MVP**
* User sign up, sign on, and authentication 
* Allow users to create an activity 
* Allow users to like/comment on a post 
* Main activity feed
* Activity detail
* Allow users to follow other users 
* User profile page with the user's activity feed and followers

**Stretch Goals**
* Automated GPX parsing of activity data
* Comment editing
* Activity deletion
* Activity historical data graph

## Technologies
 - JavaScript
 - Python 3
 - PostgreSQL
 - Psycopg2
 - Flask
 - FlaskForms
 - SQLAlchemy
 - Alembic
 - React
 - HTML/CSS
 - Google Maps

## Feature List
 ### User CRUD
  - Signup/login/logout
  - User profile (User's profile page, displays all a User's activities and followers, User's profile picture)

 ### Post CRUD
  - Users can create an activity
  - Activity includes a title, description, mileage, pace, distance, a map, as well as the date, user name, and avatar
  - An Activity will have kudos(likes) associated with them.
  - An Activity will also have comments associated with them.

 ### Comments CRUD
  - Users will have the ability to leave comments on activities
  - Comments can be deleted by user who owns them.

 ### Kudos
  - Users will have the ability to give kudos on an activity, this will be reflected on the activity.

 ### Followers
  - Users will have the ability to follow other users to recieve updates on a User's feed.

## Database Schema
  ![STRABA Database Schema](/assets/StrabaDBSchema.png)
