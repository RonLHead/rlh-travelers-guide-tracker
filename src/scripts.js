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
const errorTag = document.getElementById("errorTag");

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
  console.log("click")
  const formData = new FormData(e.target);
  const newTraveler = instantNewTraveler(user);
  const newTripDate = tripRequestStartDate.value;
  console.log(newTripDate)
  const newTripDuration = parseInt(tripRequestDuration.value);
  console.log(newTripDuration)
  const newTripNumTravelers = parseInt(tripRequestTravelerNum.value);
  console.log(newTripNumTravelers)
  const newTripDestId = parseInt(destinationId.value);
  console.log(newTripDestId)
  const newTripRequest = newTraveler.tripsObj.trips.requestNewTrip(user, newTripDate, newTripDuration, newTripNumTravelers, );
  addTrip(newTripRequest)
  console.log("The new trip request", newTripRequest);
  pendingTrips.innerHTML += `<p class="no-trip-info">${newTripRequest}</p>`;
  e.target.reset();
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
