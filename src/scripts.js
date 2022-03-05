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

function displayTraveler(userId) {
  const user = travelersRepo.findTraveler(userId);
  const firstName = user.name.split(" ");

  const previousTrips = travelersRepo.pastTrips(userId);
  const futureTrips = travelersRepo.upcomingTrips(userId);
  welcomeBanner.innerHTML = `<h1 class="welcomeBanner" id="welcomeBanner">Welcome ${firstName[0]}</h1>`;
  //need to add logic to display message if no past trips to return
  pastTrips.innerHTML = `<p>${previousTrips.find(trip => trip).date}</p>`;
  upcomingTrips.innerHTML = `<p>${futureTrips}</p>`
}

//onload display
window.onload = (event) => {
  Promise.all([destinations, trips, travelers])
  .then((data) => {
    travelersRepo = new Travelers(data[2], data[1], data[0]);
    displayTraveler(user);
  })
  .catch((err) => console.log(err));
};
