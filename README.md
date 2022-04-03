# Traveler's Guide Tracker
![image](/src/images/travelers-guide-main-page.JPG)

### Project Description

The Traveler's Guide Tracker is a travel app that allows a user to sign in, view their trips (past, upcoming, and pending), and total spent this year. The app also allows a user to request a trip, see the estimated cost of the trip, and then confirm or cancel it.

#### Contributor
- [RonLHead](https://github.com/RonLHead)

#### Technologies Used
- JavaScript
- HTML
- CSS
- Fetch API
- Mocha
- Chai
- Webpack

## Setup

### Clone Project

- Clone down this repo.
- `cd` into it.
- Then run:
  - `npm install`
  - `npm start`

### Clone Local server

- In a seperate Terminal window clone down the local server for the project [here](https://github.com/turingschool-examples/travel-tracker-api)
- `cd` into it.
- Then run:
  - `npm install`
  - `npm start`

## Webpage
### Login
- After runnig `npm start` on both the project repo and local server, open the app at `localhost:8080` in your browser.
- It should load the login page:
![image](/src/images/travelers-guide-login.JPG)
- To login, enter the following credentials:
  - Username: `traveler50`
  - Password: `travel`

      ![gif](/src/images/travelers-guide-login-gif.GIF)
- The user in this project corresponds to user ID `50`.
- Once logged in, you can view all the previous trips in the **Past Trips** section, any upcoming trips in the **Upcoming Trips** section, any trips that have not been approved in the **Pending Trips** section, and the total spent in the year 2022 in the **Total Spent 2022 section**.
### Request a Trip
- You can also request a trip in the app:
  - Click in the date input window to display a calendar in order to choose a start date (it must be today or later):
      ![image](/src/images/travelers-guide-calendar.JPG)
  - Enter the duration of the trip (it must not exceed one year, or 365 days).
  - Enter the number of travelers (it must not exceed 9).
  - Click in the destinations field to display a window of all available locations to visit, then pick one:
      ![image](/src/images/travelers-guide-destinations.JPG)
  - Once all the fields have been filled, click on the `Request Trip` button.
  - A new window will display detailing the request trip, including its estimated cost:
    ![image](/src/images/travelers-guide-confirm-trip-window.JPG)
  - Click `Confirm` to confirm the trip request. It will take you back to the main dashboard and you will see the new trip in the **Pending Trip** section.
  - Click `Cancel` to cancel out of the trip request and go back to the main dashboard.

## Future Additions
- Set up a login system that will connect the username with any user ID depending on what is entered (ex: traveler20 will connect to the user ID 20).
