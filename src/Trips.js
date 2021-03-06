import Destinations from "./Destinations";

class Trips {
  constructor(tripsAPI, destinationsAPI) {
    this.tripsData = tripsAPI;
    this.destinationsObj = new Destinations(destinationsAPI);
  }

  findTrip(tripID) {
    if (!this.tripsData.trips.map((trip) => trip.id).includes(tripID)) {
      return `Trip ${tripID} doesn't exist!`;
    }

    let result = this.tripsData.trips.reduce((acc, data) => {
      if (tripID === data.id) {
        acc = data;
      }
      return acc;
    }, {});

    return result;
  }

  todaysDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, "0");
    let mm = String(today.getMonth() + 1).padStart(2, "0");
    let yyyy = today.getFullYear();

    let newToday = `${yyyy}/${mm}/${dd}`;
    return newToday;
  }

  requestNewTrip(userId, startDate, tripLength, numTravelers, destID) {
    const newTripID = this.tripsData.trips.length;
    const today = this.todaysDate();

    if (numTravelers > 9) {
      return "Can only request a trip for 9 travelers or less. Please re-enter with the correct number of travelers.";
    } else if (tripLength > 365) {
      return "Cannot request a trip to last more than one year. Please enter a duration for one year or less.";
    } else if (startDate < today) {
      return "Cannot set the start date to earlier than today. Please select a different start date.";
    }

    const newTrip = {
      id: newTripID + 1,
      userID: userId,
      destinationID: destID,
      travelers: numTravelers,
      date: startDate,
      duration: tripLength,
      status: "pending",
      suggestedActivities: [],
    };

    this.tripsData.trips.push(newTrip);
    return newTrip;
  }

  pendingTripCost(tripId) {
    let newTrip = this.tripsData.trips.find((trip) => {
      return trip.id === tripId;
    });

    if (!newTrip) {
      return "Pending trip request doesn't exist. Please request a new trip.";
    }

    let result = this.estimatedTripCost(newTrip);

    return result;
  }

  estimatedTripCost(trip) {
    let tripDestination = this.destinationsObj.destinationsData.destinations.find(
      (dest) => dest.id === trip.destinationID
    );
    let flightCost =
      trip.travelers * tripDestination.estimatedFlightCostPerPerson;
    let lodgingCost =
      trip.duration * tripDestination.estimatedLodgingCostPerDay;
    let totalEstimatedCost = flightCost * 2 + lodgingCost;

    totalEstimatedCost = totalEstimatedCost + totalEstimatedCost * 0.1;

    return totalEstimatedCost;
  }
}

export default Trips;
