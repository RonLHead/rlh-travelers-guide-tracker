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
const tripsWrapper = document.getElementById("tripsWrapper");
const tripRequestStartDate = document.getElementById("tripRequestStartDate");
const tripRequestDuration = document.getElementById("tripRequestDuration");
const tripRequestTravelerNum = document.getElementById(
  "tripRequestTravelerNum"
);
const destinationsId = document.getElementById("destinationsId");
const errorTag = document.getElementById("errorTag");
const confirmTripWrapper = document.getElementById("confirmTripWrapper");
const confirmTripImage = document.getElementById("confirmTripImage");
const confirmTripDest = document.getElementById("confirmTripDest");
const confirmTripDate = document.getElementById("confirmTripDate");
const confirmTripDuration = document.getElementById("confirmTripDuration");
const confirmTripTravelers = document.getElementById("confirmTripTravelers");
const confirmTripCost = document.getElementById("confirmTripCost");
const confirmButton = document.getElementById("confirmButton");
const cancelButton = document.getElementById("cancelButton");
const confirmButtonsRow = document.getElementById("confirmButtonsRow");
const submitButton = document.getElementById("submitButton");
const login = document.getElementById("login");
const username = document.getElementById("username");
const password = document.getElementById("password");
const errorLogin = document.getElementById("errorLogin");

//global variables
let travelersRepo;
let user = "";
console.log(user)

//functions
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
    return selector.innerHTML += `
    <p class="no-trip-info no-margin-top border-radius-5 text-center trip-background shadow">${trips}</p>
    `;
  } else if (selector === upcomingTrips) {
    return selector.innerHTML += `
    <p class="no-trip-info no-margin-top border-radius-5 text-center trip-background shadow">${trips}</p>`;
  } else if (selector === pendingTrips) {
    return selector.innerHTML += `
    <p class="no-trip-info no-margin-top border-radius-5 text-center trip-background shadow">${trips}</p>`;
  }
}

function tripDisplay(selector, trips) {
  return (selector.innerHTML += `
  <div class="trip-container border-radius-5 text-center trip-background shadow">
  <img class="destination-image border-radius-5 shadow" src=${
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
  const unapprovedTrips = travelersRepo.tripsPending(userId);

  pendingTrips.innerHTML = `<h2 class="trip-title" >Pending Trips</h2>`;
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
    totalSpentThisYear.innerHTML += `<p class="no-trip-info no-margin-top border-radius-5 text-center trip-background shadow">${totalSpent}</p>`;
  } else {
    totalSpentThisYear.innerHTML += `<p class="trip-title trip-background shadow total-spent no-margin-top border-radius-5 text-center">$${totalSpent}</p>`;
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
  blur(tripsWrapper);
  show(confirmTripWrapper);
  hide(errorTag);

  confirmTripImage.innerHTML = "";

  if(trip === "Can only request a trip for 9 travelers or less. Please re-enter with the correct number of travelers.") {
    confirmTripImage.innerHTML += `
    <article class="confirm-trip-box border-radius-5 trip-background confirm-trip-text no-margin-top text-center font-20 shadow margin-left-5">
      <section class="confirm-trip-text no-margin-top text-center">
      <p class="trip-display"><b>${trip}</b></p>
      </section>
    </article>`;
    hide(confirmButton);
  } else if(trip === "Cannot request a trip to last more than one year. Please enter a duration for one year or less.") {
    confirmTripImage.innerHTML += `
    <article class="confirm-trip-box border-radius-5 trip-background confirm-trip-text no-margin-top text-center font-20 shadow margin-left-5">
      <section class="confirm-trip-text no-margin-top text-center">
      <p class="trip-display"><b>${trip}</b></p>
      </section>
    </article>`;
    hide(confirmButton);
  } else if(trip === "Cannot set the start date to earlier than today. Please select a different start date.") {
    confirmTripImage.innerHTML += `
    <article class="confirm-trip-box border-radius-5 trip-background confirm-trip-text no-margin-top text-center font-20 shadow margin-left-5">
      <section class="confirm-trip-text no-margin-top text-center">
      <p class="trip-display"><b>${trip}</b></p>
      </section>
    </article>`;
    hide(confirmButton);
  } else {
    confirmTripImage.innerHTML += `<img class="confirm-destination-image border-radius-5 shadow" src=${
      travelersRepo.tripsObj.destinationsObj.findDestination(trip.destinationID)
        .image
    } alt=${
      travelersRepo.tripsObj.destinationsObj.findDestination(trip.destinationID)
        .destination
    } id="confirmTripImage">
    <article class="confirm-trip-box border-radius-5 trip-background confirm-trip-text no-margin-top text-center font-20 shadow">
      <section class="confirm-trip-text no-margin-top text-center">
    <p class="trip-display" id="confirmTripDest"><b>Destination</b>: ${travelersRepo.tripsObj.destinationsObj.findDestination(trip.destinationID).destination}</p>
    <p class="trip-display" id="confirmTripDate"><b>Date</b>: ${trip.date}</p>
    <p class="trip-display" id="confirmTripDuration"><b>Duration</b>: ${trip.duration} Days</p>
    <p class="trip-display" id="confirmTripTravelers"><b>Number of Travelers</b>: ${trip.travelers}</p>
    <p class="trip-display" id="confirmTripCost"><b>Estimated Cost</b>: $${travelersRepo.tripsObj.pendingTripCost(trip.id)}</p>
    </section>
  </article>`;
  }
}

function createNewTripRequest() {
  const newTrip = travelersRepo.tripsObj.requestNewTrip(
    user,
    tripRequestStartDate.value.replaceAll("-", "/"),
    parseInt(tripRequestDuration.value),
    parseInt(tripRequestTravelerNum.value),
    parseInt(destinationsId.value)
  );
  return newTrip;
}

function confirmTrip(trip) {
  addTrip(trip);
  hide(confirmTripWrapper);
  removeBlur(tripsWrapper);
  show(tripsWrapper);
  displayTravelersPendingTrips(user);
}

function clearInputForms() {
  tripRequestStartDate.value = '';
  tripRequestDuration.value = '';
  tripRequestTravelerNum.value = '';
  destinationsId.value = '';
}

function clearLoginForm() {
  username.value = '';
  password.value = '';
}

function assignUser() {
  let parseUser = username.value.split("r");
  let result = parseUser.pop();

  user = parseInt(result);

  return user;
}

//event listeners
requestForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const newTrip = createNewTripRequest();

  confirmTripRequest(newTrip);
  confirmButton.addEventListener("click", (e) => {
    confirmTrip(newTrip);
    clearInputForms();
  });
});


cancelButton.addEventListener("click", (e) => {
  show(confirmButton)
  hide(confirmTripWrapper);
  removeBlur(tripsWrapper);
  show(tripsWrapper);
  clearInputForms();
});


submitButton.addEventListener("click", (e) => {
  e.preventDefault();
  if(username.value === "traveler50" && password.value === "travel") {
    hide(login);
    show(welcomeBanner);
    show(tripsWrapper);
    show(requestForm);
    assignUser();
    if(user === 50) {
      onload()
    }
  } else {
    hide(login)
    show(errorLogin);
    setTimeout(() => {
      hide(errorLogin)
      show(login);
      clearLoginForm()
    }, 3500)
  }
})

//onload display
const onload = (event) => {
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
