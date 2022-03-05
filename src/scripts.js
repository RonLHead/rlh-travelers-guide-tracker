//imports
import '../src/css/styles.css';
import {
  destinations,
  trips,
  travelers
} from './apiCalls';
import Destinations from './Destinations';
import Trips from './Trips';
import Travelers from './Travelers';

//querySelectors
const welcomeBanner = document.getElementById("welcomeBanner");
const pastTrips = document.getElementById("pastTrips");
const upcomingTrips = document.getElementById("upcomingTrips");
const pendingTrips = document.getElementById("pendingTrips");

//global variables
let travelersRepo;
const user = 1;

//onload display
window.onload = (event) => {
  Promise.all([destinations, trips, travelers])
    .then((data) => {
      travelersRepo = new Travelers(travelers, trips, destinations);
      // console.log(travelersRepo);
      displayTraveler(user)
    })
    // .catch((err) => console.log(err));
};

function displayTraveler(userId) {
  const user = travelersRepo.findTraveler(userId);
  console.log(user);

  welcomeBanner.innerHTML = `<h1 class="welcomeBanner" id="welcomeBanner">Testing!</h1>`;
}


console.log('This is the JavaScript entry file - your code begins here.');
