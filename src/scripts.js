//imports
import "../src/css/styles.css";
import { destinations, trips, travelers, addTrip } from "./apiCalls";
import Destinations from "./Destinations";
import Trips from "./Trips";
import Travelers from "./Travelers";

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
const tripRequestTravelerNum = document.getElementById(
  "tripRequestTravelerNum"
);
const destinationsId = document.getElementById("destinationsId");
const errorTag = document.getElementById("errorTag");
// const destinationsList = document.getElementById("destinationsList");
const confirmTripWrapper = document.getElementById("confirmTripWrapper");
const confirmTripImage = document.getElementById("confirmTripImage");
const confirmTripDest = document.getElementById("confirmTripDest");
const confirmTripDate = document.getElementById("confirmTripDate");
const confirmTripDuration = document.getElementById("confirmTripDuration");
const confirmTripTravelers = document.getElementById("confirmTripTravelers");
const confirmTripCost = document.getElementById("confirmTripCost");
const confirmButton = document.getElementById("confirmButton");
const confirmTripText = document.getElementById("confirmTripText");
const cancelButton = document.getElementById("cancelButton");
// const destinationsList = document.getElementById("destinationsList")
//global variables
let travelersRepo;
const user = 3;

function instantNewTraveler(userId) {
  const traveler = travelersRepo.findTraveler(userId);
  return traveler;
}

function loadDestinations() {
  let result = travelersRepo.tripsObj.destinationsObj.destinationsData.destinations.forEach(
    (dest) => {
      destinationsId.innerHTML += `<option value="${dest.id}">${dest.destination}</option>`;
    }
  );
  return result;
}

function displayTravelersFName(userId) {
  const newTraveler = instantNewTraveler(user);
  const firstName = newTraveler.name.split(" ");

  welcomeBanner.innerHTML = `<h1 class="welcome-banner" id="welcomeBanner">Welcome ${firstName[0]}</h1>`;
}

function noTripDisplay(selector, trips) {
  if (selector === pastTrips) {
    return (selector.innerHTML += `
    <p class="no-trip-info trip-background shadow">${trips}</p>
    <!-- <section class="scroll-content shadow trip-box" id="pastTrips">
    <h2 class="trip-title" >Past Trips</h2>
    <p class="no-trip-info">${trips}</p>
    </section> -->
    `);
  } else if (selector === upcomingTrips) {
    return (selector.innerHTML += `
    <p class="no-trip-info trip-background shadow">${trips}</p>
    <!-- <section class="scroll-content shadow trip-box" id="upcomingTrips">
      <h2 class="trip-title" >Upcoming Trips</h2>
      <p class="no-trip-info">${trips}</p>
    </section> -->
    `);
  } else if (selector === pendingTrips) {
    return (selector.innerHTML += `
    <p class="no-trip-info trip-background shadow">${trips}</p>
    <!-- <section class="scroll-content shadow trip-box" id="pendingTrips">
      <h2 class="trip-title" >Pending Trips</h2>
      <p class="no-trip-info">${trips}</p>
    </section> -->
    `);
  }
}

function tripDisplay(selector, trips) {
  return (selector.innerHTML += `
  <div class="trip-container trip-background shadow">
  <img class="destination-image shadow" src=${
    travelersRepo.tripsObj.destinationsObj.findDestination(trips.destinationID)
      .image
  } alt="${
    travelersRepo.tripsObj.destinationsObj.findDestination(trips.destinationID)
      .destination
  }">
  <p class="trip-display">Destination: ${
    travelersRepo.tripsObj.destinationsObj.findDestination(trips.destinationID)
      .destination
  }</p>
  <p class="trip-display">Date: ${trips.date}</p>
  <p class="trip-display">Duration: ${trips.duration} Days</p>
  <p class="trip-display">Number of Travelers: ${trips.travelers}</p>
  </div>`);
}

function displayTravelersPastTrips(userId) {
  const previousTrips = travelersRepo.pastTrips(userId);

  if (previousTrips === "No previous trips to display.") {
    noTripDisplay(pastTrips, previousTrips);
  } else {
    previousTrips.forEach((trip) => {
      tripDisplay(pastTrips, trip);
    });
  }
}

function displayTravelersUpcomingTrips(userId) {
  const futureTrips = travelersRepo.upcomingTrips(userId);

  if (futureTrips === "No upcoming trips to display. Please request a trip.") {
    noTripDisplay(upcomingTrips, futureTrips);
  } else {
    futureTrips.forEach((trip) => {
      tripDisplay(upcomingTrips, trip);
    });
  }
}

function displayTravelersPendingTrips(userId) {
  const unapprovedTrips = travelersRepo.filterPendingTrips(userId);
  console.log(unapprovedTrips);
  if (
    unapprovedTrips === "No pending trips to display. Please request a trip."
  ) {
    noTripDisplay(pendingTrips, unapprovedTrips);
  } else {
    unapprovedTrips.forEach((trip) => {
      tripDisplay(pendingTrips, trip);
    });
  }
}

function displayTravelersTotalSpent(userId) {
  const totalSpent = travelersRepo.totalSpentYear(userId);

  if (totalSpent === "There are no trips for this year.") {
    totalSpentThisYear.innerHTML += `<p class="no-trip-info trip-background shadow">${totalSpent}</p>`;
  } else {
    totalSpentThisYear.innerHTML += `<p class="trip-title trip-background shadow">$${totalSpent}</p>`;
  }
}

function hide(e) {
  e.classList.add("remove");
}

function show(e) {
  e.classList.remove("remove");
}

function blur(e) {
  e.classList.add("blur-all");
}

function removeBlur(e) {
  e.classList.remove("blur-all");
}

function confirmTripRequest(trip) {
  blur(tripsContainer);
  show(confirmTripWrapper);

  // confirmTripImage.innerHTML = "";
  console.log(
    travelersRepo.tripsObj.destinationsObj.findDestination(trip.destinationID)
      .image
  );
  confirmTripImage.innerHTML = ""
  confirmTripImage.innerHTML += `<img class="confirm-destination-image shadow" src=${
    travelersRepo.tripsObj.destinationsObj.findDestination(trip.destinationID)
      .image
  } alt=${
    travelersRepo.tripsObj.destinationsObj.findDestination(trip.destinationID)
      .destination
  } id="confirmTripImage">
  <article class="confirm-trip-box trip-background confirm-trip-text-margin shadow">
    <section class="confirm-trip-text" id="confirmTripText">
  <p class="trip-display" id="confirmTripDest">Destination: ${travelersRepo.tripsObj.destinationsObj.findDestination(trip.destinationID).destination}</p>
  <p class="trip-display" id="confirmTripDate">Date: ${trip.date}</p>
  <p class="trip-display" id="confirmTripDuration">Duration: ${trip.duration} Days</p>
  <p class="trip-display" id="confirmTripTravelers">Number of Travelers: ${trip.travelers}</p>
  <p class="trip-display" id="confirmTripCost">Estimated Cost: $${travelersRepo.tripsObj.pendingTripCost(trip.id)}</p>
  </section>
</article>`;
}

function createNewTripRequest() {
  console.log(parseInt(destinationsId.value))
  const newTrip = travelersRepo.tripsObj.requestNewTrip(
    user,
    tripRequestStartDate.value.replaceAll("-", "/"),
    parseInt(tripRequestDuration.value),
    parseInt(tripRequestTravelerNum.value),
    parseInt(destinationsId.value)
  );
  console.log(newTrip);
  return newTrip;
}

requestForm.addEventListener("submit", (e) => {
  e.preventDefault();
  // const formData = new FormData(e.target);
  const newTrip = createNewTripRequest();

  confirmTripRequest(newTrip);
  // setTimeout(() => {document.location.reload(true)}, 5000)
  // addTrip(newTrip);
  // displayTravelersPendingTrips(user);
  // e.target.reset();
});

function confirmTrip(trip) {
  // const confirmButton = event.target.id;
  //
  // confirmButton.addEventListener("click", (e) => {
  // e.preventDefault();

  addTrip(trip);
  // refreshPendingTrips();
  hide(confirmTripWrapper);
  removeBlur(tripsContainer);
  show(tripsContainer);
  displayTravelersPendingTrips(user);
  //   e.target.reset();
  // });
}
//
// function refreshPendingTrips() {
//   pendingTrips.innerHTML = `<h3 class="trip-title" >Pending Trips</h3>`;
//   displayTravelersPendingTrips(user);
// }

confirmButton.addEventListener("click", (e) => {
  const newTrip = createNewTripRequest();
  confirmTrip(newTrip);
});

cancelButton.addEventListener("click", (e) => {
  hide(confirmTripWrapper);
  removeBlur(tripsContainer);
  show(tripsContainer);
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
