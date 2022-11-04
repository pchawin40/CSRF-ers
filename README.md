# Slack Clone Project

Heroku Link: https://csrf-ers.herokuapp.com/

GitHub Link: https://github.com/pchawin40/CSRF-ers

## Setup Directions:
1. Clone from GitHub repository
   1. Run `pipenv install` in the  `CSRF-ers` directory
   2. Switch to the `react-app` directory and run `npm install`
   3. Run `pipenv shell` to start the virtual environment
2. Run the following command in your terminal to run the migration and seeder files within the `CSRF-ers` directory
   1. `flask db init && flask db migrate && flask db upgrade && flask seed all`
3. Run the following commands to create start a local session
   1. In the `CSRF-ers` directory, run `flask run`
   2. In the `react-app` directory, run `npm start`

___

## Description:
This is a repository of a Slack clone by Chawin (Ham) Pathompornvivat, Brian Moore, and Kihong (Samuel) Bae.
This project implements 4 features. Two features, Channels and Channel Messages, are full CRUD features. The two other features, Direct Message Rooms and Direct Message Room Messages are CRD features (without an Update functionality).
This clone project also implements a feature to allow users to create a new account, sign in with a Demo User account, and log out.

___

## Landing Page:
Depending on whether the user is logged in, the first screen with direct to either a ![Login Page](https://github.com/pchawin40/CSRF-ers/blob/dev/assets/LoginPage.png) or the ![Slack Landing Page](https://github.com/pchawin40/CSRF-ers/blob/dev/assets/LandingPage.png).



## Getting started
1. Clone this repository (only this branch)

   ```bash
   git clone https://github.com/appacademy-starters/python-project-starter.git
   ```

2. Install dependencies

      ```bash
      pipenv install -r requirements.txt
      ```

3. Create a **.env** file based on the example with proper settings for your
   development environment
4. Make sure the SQLite3 database connection URL is in the **.env** file

5. Get into your pipenv, migrate your database, seed your database, and run your Flask app

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

6. To run the React App in development, checkout the [README](./react-app/README.md) inside the `react-app` directory.


<br>

## Deploy to Heroku
This repo comes configured with Github Actions. When you push to your main branch, Github will automatically pull your code, package and push it to Heroku, and then release the new image and run db migrations.

1. Write your Dockerfile. In order for the Github action to work effectively, it must have a configured Dockerfile. Follow the comments found in this [Dockerfile](./Dockerfile) to write your own!

2. Create a new project on Heroku.

3. Under Resources click "Find more add-ons" and add the add on called "Heroku Postgres".

4. Configure production environment variables. In your Heroku app settings -> config variables you should have two environment variables set:

   |    Key          |    Value    |
   | -------------   | ----------- |
   | `DATABASE_URL`  | Autogenerated when adding postgres to Heroku app |
   | `SECRET_KEY`    | Random string full of entropy |

5. Generate a Heroku OAuth token for your Github Action. To do so, log in to Heroku via your command line with `heroku login`. Once you are logged in, run `heroku authorizations:create`. Copy the GUID value for the Token key.

6. In your Github Actions Secrets you should have two environment variables set. You can set these variables via your Github repository settings -> secrets -> actions. Click "New respository secret" to create
each of the following variables:

   |    Key            |    Value    |
   | -------------     | ----------- |
   | `HEROKU_API_KEY`  | Heroku Oauth Token (from step 6)|
   | `HEROKU_APP_NAME` | Heroku app name    |

7. Push to your `main` branch! This will trigger the Github Action to build your Docker image and deploy your application to the Heroku container registry. Please note that the Github Action will automatically upgrade your production database with `flask db upgrade`. However, it will *not* automatically seed your database. You must manually seed your production database if/when you so choose (see step 8).

8. *Attention!* Please run this command *only if you wish to seed your production database*: `heroku run -a HEROKU_APP_NAME flask seed all`

## Helpful commands
|    Command            |    Purpose    |
| -------------         | ------------- |
| `pipenv shell`        | Open your terminal in the virtual environment and be able to run flask commands without a prefix |
| `pipenv run`          | Run a command from the context of the virtual environment without actually entering into it. You can use this as a prefix for flask commands  |
| `flask db upgrade`    | Check in with the database and run any needed migrations  |
| `flask db downgrade`  | Check in with the database and revert any needed migrations  |
| `flask seed all`      | Just a helpful syntax to run queries against the db to seed data. See the **app/seeds** folder for reference and more details |
| `heroku login -i`      | Authenticate your heroku-cli using the command line. Drop the -i to authenticate via the browser |
| `heroku authorizations:create` | Once authenticated, use this to generate an Oauth token |
| `heroku run -a <app name>` | Run a command from within the deployed container on Heroku |
