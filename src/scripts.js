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
const tripRequestStartDate = document.getElementById("tripRequestStartDate");
const tripRequestDuration = document.getElementById("tripRequestDuration");
const tripRequestTravelerNum = document.getElementById("tripRequestTravelerNum");
const destinationId = document.getElementById("destinationId");
const errorTag = document.getElementById("errorTag");
const destinationsList = document.getElementById("destinationsList");

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

function displayTravelersPastTrips(userId) {
  const previousTrips = travelersRepo.pastTrips(userId);

  if(previousTrips === "No previous trips to display.") {
    pastTrips.innerHTML = `<section class="scroll-content shadow trip-box" id="pastTrips">
      <h2 class="trip-title" >Past Trips</h2>
      <p class="no-trip-info">${previousTrips}</p>
    </section>`;
  } else {
    previousTrips.forEach(trip => {
      pastTrips.innerHTML += `
      <img class="destination-image" src=${travelersRepo.tripsObj.destinationsObj.findDestination(trip.destinationID).image} alt="nothin' to see here">
      <p class="trip-display">Destination: ${travelersRepo.tripsObj.destinationsObj.findDestination(trip.destinationID).destination}</p>
      <p class="trip-display">Date: ${trip.date}</p>
      <p class="trip-display">Duration: ${trip.date} Days</p>
      <p class="trip-display">Number of Travelers: ${trip.travelers}</p>`
    });
  }
}

function displayTravelersUpcomingTrips(userId) {
  // const newTraveler = instantNewTraveler(user);
  const futureTrips = travelersRepo.upcomingTrips(userId);
  // console.log(futureTrips)
  // const getDestination =
  if(futureTrips === "No upcoming trips to display. Please request a trip.") {
    upcomingTrips.innerHTML = `<section class="scroll-content shadow trip-box" id="upcomingTrips">
      <h2 class="trip-title" >Upcoming Trips</h2>
      <p class="no-trip-info">${futureTrips}</p>
    </section>`;
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

function displayTravelersPendingTrips(userId) {
  // const newTraveler = instantNewTraveler(user);
  const unapprovedTrips = travelersRepo.tripsPending(userId);
  // console.log(unapprovedTrips)
  // console.log(futureTrips)
  // const getDestination =
  if(unapprovedTrips === "No pending trips to display. Please request a trip.") {
    pendingTrips.innerHTML = `<section class="scroll-content shadow trip-box" id="pendingTrips">
      <h2 class="trip-title" >Pending Trips</h2>
      <p class="no-trip-info">${unapprovedTrips}</p>
    </section>`;
  } else {
    unapprovedTrips.forEach(trip => {
      pendingTrips.innerHTML = `<section class="scroll-content shadow trip-box" id="pendingTrips">
        <h2 class="trip-title" >Pending Trips</h2>
      <img class="destination-image" src=${travelersRepo.tripsObj.destinationsObj.findDestination(trip.destinationID).image} alt="nothin' to see here">
      <p class="trip-display">Destination: ${travelersRepo.tripsObj.destinationsObj.findDestination(trip.destinationID).destination}</p>
      <p class="trip-display">Date: ${trip.date}</p>
      <p class="trip-display">Duration: ${trip.date} Days</p>
      <p class="trip-display">Number of Travelers: ${trip.travelers}</p>
      </section>`
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

requestForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // const formData = new FormData(e.target);
  const newTrip = {
    userID: user,
    date: tripRequestStartDate.value.replaceAll("-", "/"),
    duration: parseInt(tripRequestDuration.value),
    travelers: parseInt(tripRequestTravelerNum.value),
    destinationID: parseInt(destinationId.value.split('.')[0]),
  };
  console.log("The new trip request", travelersRepo.tripsPending(newTrip));

  addTrip(travelersRepo.tripsPending(newTrip));
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
