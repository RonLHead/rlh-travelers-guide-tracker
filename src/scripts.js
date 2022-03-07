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
const requestForm = document.getElementById("requestForm");
const tripsContainer = document.getElementById("tripsContainer");
const tripRequestStartDate = document.getElementById("tripRequestStartDate");
const tripRequestDuration = document.getElementById("tripRequestDuration");
const tripRequestTravelerNum = document.getElementById("tripRequestTravelerNum");
const destinationId = document.getElementById("destinationId");
const errorTag = document.getElementById("errorTag");
const destinationsList = document.getElementById("destinationsList");
const confirmTripDisplay = document.getElementById("confirmTripDisplay");

//global variables
let travelersRepo;
const user = 45;

function instantNewTraveler(userId) {
  const traveler = travelersRepo.findTraveler(userId);
  return traveler;
}

function loadDestinations() {
  let result = travelersRepo.tripsObj.destinationsObj.destinationsData.destinations.forEach(dest => {
    destinationsList.innerHTML += `<option>${dest.id}. ${dest.destination}`;
  });
  return result;
}


function displayTravelersFName(userId) {
  const newTraveler = instantNewTraveler(user);
  const firstName = newTraveler.name.split(" ");

  welcomeBanner.innerHTML = `<h1 class="welcome-banner" id="welcomeBanner">Welcome ${firstName[0]}</h1>`;
}

function noTripDisplay(selector, trips) {
  if(selector === pastTrips) {
    return selector.innerHTML = `<section class="scroll-content shadow trip-box" id="pastTrips">
    <h2 class="trip-title" >Past Trips</h2>
    <p class="no-trip-info">${trips}</p>
    </section>`;
  } else if(selector === upcomingTrips) {
    return selector.innerHTML = `<section class="scroll-content shadow trip-box" id="upcomingTrips">
      <h2 class="trip-title" >Upcoming Trips</h2>
      <p class="no-trip-info">${trips}</p>
    </section>`;
  } else if(selector === pendingTrips) {
    return selector.innerHTML = `<section class="scroll-content shadow trip-box" id="pendingTrips">
      <h2 class="trip-title" >Pending Trips</h2>
      <p class="no-trip-info">${trips}</p>
    </section>`;
  }
}

function tripDisplay(selector, trips) {
  return selector.innerHTML += `
  <img class="destination-image" src=${travelersRepo.tripsObj.destinationsObj.findDestination(trips.destinationID).image} alt="${travelersRepo.tripsObj.destinationsObj.findDestination(trips.destinationID).destination}">
  <p class="trip-display">Destination: ${travelersRepo.tripsObj.destinationsObj.findDestination(trips.destinationID).destination}</p>
  <p class="trip-display">Date: ${trips.date}</p>
  <p class="trip-display">Duration: ${trips.date} Days</p>
  <p class="trip-display">Number of Travelers: ${trips.travelers}</p>`;
}

function displayTravelersPastTrips(userId) {
  const previousTrips = travelersRepo.pastTrips(userId);

  if(previousTrips === "No previous trips to display.") {
    noTripDisplay(pastTrips, previousTrips);
  } else {
    previousTrips.forEach(trip => {
      tripDisplay(pastTrips, trip);
    });
  }
}

function displayTravelersUpcomingTrips(userId) {
  const futureTrips = travelersRepo.upcomingTrips(userId);

  if(futureTrips === "No upcoming trips to display. Please request a trip.") {
    noTripDisplay(upcomingTrips, futureTrips);
  } else {
    futureTrips.forEach(trip => {
      tripDisplay(upcomingTrips, trip);
    });
  }
}

function displayTravelersPendingTrips(userId) {
  const unapprovedTrips = travelersRepo.tripsPending(userId);
  if(unapprovedTrips === "No pending trips to display. Please request a trip.") {
    noTripDisplay(pendingTrips, unapprovedTrips);
  } else {
    unapprovedTrips.forEach(trip => {
      tripDisplay(pendingTrips, trip);
    });
  }
}

function displayTravelersTotalSpent(userId) {
  const totalSpent = travelersRepo.totalSpentYear(userId);

  if(totalSpent === "There are no trips for this year.") {
    totalSpentThisYear.innerHTML += `<p class="no-trip-info">${totalSpent}</p>`;
  } else {
    totalSpentThisYear.innerHTML += `<p>$${totalSpent}</p>`
  }
}

function hide(e) {
  e.classList.add("remove");
}

function show(e) {
  e.classList.remove("remove")
}

function blur(e) {
  e.classList.add("blur-all")
}

function confirmTripRequest(trip) {
  blur(tripsContainer);
  show(confirmTripDisplay);
  confirmTripDisplay.innerHTML = `
  <section class="confirm-trip-display" id="confirmTripDisplay">
    <section class="trip-box shadow">
      <p>Confirm Trip</p>
      <img class="destination-image" src=${travelersRepo.tripsObj.destinationsObj.findDestination(trip.destinationID).image} alt="nothin' to see here">
      <p class="trip-display">Destination: ${travelersRepo.tripsObj.destinationsObj.findDestination(trip.destinationID).destination}</p>
      <p class="trip-display">Date: ${trip.date}</p>
      <p class="trip-display">Duration: ${trip.date} Days</p>
      <p class="trip-display">Number of Travelers: ${trip.travelers}</p>
      <p>Estimated Cost: $${travelersRepo.tripsObj.pendingTripCost(trip.id)}</p>
      <button type="submit" name="yes_button">Confirm</button><button type="submit" name="no_button">Cancel</button>
    </section>
  `
}
requestForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // const formData = new FormData(e.target);
  const newTrip = travelersRepo.tripsObj.requestNewTrip(
    user,
    tripRequestStartDate.value.replaceAll("-", "/"),
    parseInt(tripRequestDuration.value),
    parseInt(tripRequestTravelerNum.value),
    parseInt(destinationId.value)
  );

  confirmTripRequest(newTrip);
  addTrip(newTrip);
  // console.log(travelersRepo.tripsObj.pendingTrips)
  displayTravelersPendingTrips(user);
  e.target.reset();
});

//onload display
window.onload = (event) => {
  Promise.all([destinations, trips, travelers])
  .then((data) => {
    travelersRepo = new Travelers(data[2], data[1], data[0]);
    loadDestinations();
    displayTravelersFName(user);
    displayTravelersPastTrips(user);
    displayTravelersUpcomingTrips(user);
    displayTravelersPendingTrips(user);
    displayTravelersTotalSpent(user);
  })
  .catch((err) => console.log(err));
};
