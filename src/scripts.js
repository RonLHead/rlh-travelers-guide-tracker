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
const welcomeBanner = document.getElementById("welcome-banner");
const pastTrips = document.getElementById("past-trips");
const upcomingTrips = document.getElementById("upcoming-trips");
const pendingTrips = document.getElementById("pending-trips");
const totalSpentThisYear = document.getElementById("total-spent-this-year")

//global variables
let travelersRepo;
const user = 1;

function displayTraveler(userId) {
  const user = travelersRepo.findTraveler(userId);
  const firstName = user.name.split(" ");

  const previousTrips = travelersRepo.pastTrips(userId);
  const futureTrips = travelersRepo.upcomingTrips(userId);
  const unapprovedTrips = travelersRepo.tripsPending(userId);

  const totalSpent = travelersRepo.totalSpentYear(userId);

  welcomeBanner.innerHTML = `<h1 class="welcomeBanner" id="welcomeBanner">Welcome ${firstName[0]}</h1>`;
  //need to add logic to display message if no past trips to return
  pastTrips.innerHTML += `<p>${previousTrips}</p>`;
  upcomingTrips.innerHTML += `<p>${futureTrips}</p>`;
  pendingTrips.innerHTML += `<p>${unapprovedTrips}</p>`;
  totalSpentThisYear.innerHTML += `<p>${totalSpent}</p>`

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
