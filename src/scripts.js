//imports
import '../src/css/styles.css';
import {
  destinations,
  trips,
  travelers,
  addTrip
} from './apiCalls';
import Destinations from './Destinations';
import Trips from './Trips';
import Travelers from './Travelers';

//querySelectors
const welcomeBanner = document.getElementById("welcomeBanner");
const pastTrips = document.getElementById("pastTrips");
const upcomingTrips = document.getElementById("upcomingTrips");
const pendingTrips = document.getElementById("pendingTrips");
const totalSpentThisYear = document.getElementById("totalSpentThisYear");
const submitButton = document.getElementById("submitButton");
const tripRequestStartDate = document.getElementById("tripRequestStartDate");
const tripRequestDuration = document.getElementById("tripRequestDuration");
const tripRequestTravelerNum = document.getElementById("tripRequestTravelerNum");
const destinationId = document.getElementById("destinationId");

//global variables
let travelersRepo;
const user = 35;

function instantNewTraveler(userId) {
  const traveler = travelersRepo.findTraveler(userId);
  return traveler;
}

function displayTraveler(userId) {
  const newTraveler = instantNewTraveler(user);
  const firstName = newTraveler.name.split(" ");

  const previousTrips = travelersRepo.pastTrips(userId);
  const futureTrips = travelersRepo.upcomingTrips(userId);
  const unapprovedTrips = travelersRepo.tripsPending(userId);

  const totalSpent = travelersRepo.totalSpentYear(userId);

  welcomeBanner.innerHTML = `<h1 class="welcome-banner" id="welcomeBanner">Welcome ${firstName[0]}</h1>`;
  //need to add logic to display message if no past trips to return
  pastTrips.innerHTML += `<p class="no-trip-info">${previousTrips}</p>`;
  upcomingTrips.innerHTML += `<p class="no-trip-info">${futureTrips}</p>`;
  pendingTrips.innerHTML += `<p class="no-trip-info">${unapprovedTrips}</p>`;
  totalSpentThisYear.innerHTML += `<p class="no-trip-info">${totalSpent}</p>`

}

submitButton.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(e.target);
  const newTraveler = instantNewTraveler(user);
  // console.log(newTraveler)
  const newTripRequest = newTraveler.tripsObj.trips.requestNewTrip(user, tripRequestStartDate.value, parseInt(tripRequestDuration.value), parseInt(tripRequestTravelerNum.value), parseInt(destinationId.value));
  console.log("The new trip request", newTripRequest);
  pendingTrips.innerHTML += `<p class="no-trip-info">${newTripRequest}</p>`;
});

//onload display
window.onload = (event) => {
  Promise.all([destinations, trips, travelers])
  .then((data) => {
    travelersRepo = new Travelers(data[2], data[1], data[0]);
    displayTraveler(user);
  })
  .catch((err) => console.log(err));
};
