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

// const unapprovedTrips = travelersRepo.tripsPending(userId);
// const totalSpent = travelersRepo.totalSpentYear(userId);
// //need to add logic to display message if no past trips to return

// pendingTrips.innerHTML += `<p class="no-trip-info">${unapprovedTrips}</p>`;
// totalSpentThisYear.innerHTML += `<p class="no-trip-info">${totalSpent}</p>`

function displayTravelersFName(userId) {
  const newTraveler = instantNewTraveler(user);
  const firstName = newTraveler.name.split(" ");

  welcomeBanner.innerHTML = `<h1 class="welcome-banner" id="welcomeBanner">Welcome ${firstName[0]}</h1>`;
}

function displayTravelersPastTrips(userId) {
  const previousTrips = travelersRepo.pastTrips(userId);

  if(previousTrips === "No previous trips to display.") {
    pastTrips.innerHTML += `<p class="no-trip-info">${previousTrips}</p>`;
  } else {
    previousTrips.forEach(trip => {
      pastTrips.innerHTML += `<p>Date: ${trip.date}</p>
      <p>Destination: ${trip.destinationID}</p>
      <p>Duration: ${trip.date} Days</p>
      <p>Number of Travelers: ${previousTrips.travelers}</p>`
    });
  }
}

function displayTravelersUpcomingTrips(userId) {
  // const newTraveler = instantNewTraveler(user);
  const futureTrips = travelersRepo.upcomingTrips(userId);
  // console.log(futureTrips)
  // const getDestination =
  if(futureTrips === "No upcoming trips to display. Please request a trip.") {
    pastTrips.innerHTML += `<p class="no-trip-info">${futureTrips}</p>`;
  } else {
    futureTrips.forEach(trip => {
      upcomingTrips.innerHTML += `
      <img class="destination-image" src=${travelersRepo.tripsObj.destinationsObj.findDestination(trip.destinationID).image} alt="nothin' to see here">
      <p class="trip-display">Destination: ${travelersRepo.tripsObj.destinationsObj.findDestination(trip.destinationID).destination}</p>
      <p class="trip-display">Date: ${trip.date}</p>
      <p class="trip-display">Duration: ${trip.date} Days</p>
      <p class="trip-display">Number of Travelers: ${trip.travelers}</p>`
    });
  }
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
    displayTravelersFName(user);
    displayTravelersPastTrips(user);
    displayTravelersUpcomingTrips(user);
  })
  .catch((err) => console.log(err));
};
