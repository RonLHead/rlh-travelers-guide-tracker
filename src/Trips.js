import Destinations from './Destinations';

class Trips {
  constructor(tripsAPI, destinationsAPI) {
    this.tripsData = tripsAPI;
    this.destinationsObj = new Destinations(destinationsAPI);
  }

  findTrip(tripID) {
    if(!this.tripsData.trips.map(trip => trip.id).includes(tripID)) {
      return `Trip ${tripID} doesn't exist!`;
    }

    let result = this.tripsData.trips.reduce((acc, data) => {
      if(tripID === data.id) {
        acc = data;
      }
      return acc;
    }, {});

    return result;
  }

  requestNewTrip(userId, startDate, tripLength, numTravelers, destID) {
    const newTripID = this.tripsData.trips.length;

    if(numTravelers > 9) {
      return "Can only request a trip for 9 travelers or less.";
    } else if(tripLength > 365) {
      return "Cannot request a trip to last more than one year.";
    } else if(!this.destinationsObj.destinationsData.destinations.find(dest => dest.id === destID)) {
      return "Destination doesn't exist. Please choose a different destination.";
    }

    const newTrip = {
      "id": newTripID + 1,
      "userID": userId,
      "destinationID": destID,
      "travelers": numTravelers,
      "date": startDate,
      "duration": tripLength,
      "status": "pending",
      "suggestedActivities": [

      ]
    }

    this.tripsData.trips.push(newTrip);

    return newTrip;
  }

  pendingTripCost(tripId) {
    let newTrip = this.pendingTrips.find(trip => {
      return trip.id === tripId;
    });

    if(!newTrip) {
      return "Pending trip request doesn't exist. Please request a new trip.";
    }

    let result = this.estimatedTripCost(newTrip);

    return result;
  }

  estimatedTripCost(trip) {
    let tripDestination = this.destinationsObj.destinationsData.destinations.find(dest => dest.id === trip.destinationID);
    let flightCost = trip.travelers * tripDestination.estimatedFlightCostPerPerson;
    let lodgingCost = trip.duration * tripDestination.estimatedLodgingCostPerDay;
    let totalEstimatedCost = (flightCost * 2) + lodgingCost;

    totalEstimatedCost = totalEstimatedCost + (totalEstimatedCost * 0.10);

    return totalEstimatedCost;
  }
}

export default Trips;
