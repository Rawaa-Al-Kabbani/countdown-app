# Description

This is a Countdown app where the user can define the end date and the name of the event taking
place on that day. The countdown always starts from the current time and it displays the time
remaining to your specified end date.

It is written in TypeScript and Angular.js is used as the framework.

When running the app via Docker Nginx is used to serve the static build files.

The app works in portrait as well as in landscape mode while the text displayed on the screen always
fills the whole width of the screen.

## How to run it locally

0. If you are using NVM run `nvm use` to use the recommended Node version.

1. Start by installing the dependencies by running: `npm install`

2. You can now run the app by running: `npm run start`

3. The app will be available on http://localhost:4200, by default

## How to run it using Docker

To run it using Docker start by building the image: `docker build -t countdown-app .`

Then start a container and expose port `8080` by running:

`docker run -p 8080:8080 -t countdown-app`

## How to run it using docker-compose

To run it using `docker-compose` simply run: `docker-compose up`

## How to run the tests

To run the tests, first ensure you have installed the dependencies (see above), then simply run:

`npm run test`

If you want to run the tests in headless mode, simply run:

`npm run test:headless`

## Deployment

The app is deployed to Azure Web Apps automatically by GitHub Actions when changes are pushed to
master. The pipeline also ensures the tests are passing before deploying.

The URL of the app is: https://countdown-app.azurewebsites.net/
