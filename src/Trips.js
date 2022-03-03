import destinationsDataSet from '../src/data/destinations-data';

class Trips {
  constructor(tripsAPI) {
    this.tripsData = tripsAPI;
    // this.pendingTrips = [];

  }

  findTrip(tripID) {
    if(!this.tripsData.map(trip => trip.id).includes(tripID)) {
      return `Trip ${tripID} doesn't exist!`;
    }

    let result = this.tripsData.reduce((a, b) => {
      if(tripID === b.id) {
        a = b;
      }
      return a;
    }, {});

    return result;
  }

  todaysDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();

    let newToday = `${yyyy}/${mm}/${dd}`;
    return newToday;
  }

  requestNewTrip(userId, startDate, tripLength, numTravelers, destID) {
    const newTripID = this.tripsData.length + 1;
    // const today = this.todaysDate();
    //
    // if(startDate < today) {
    //   return `Cannot request a trip beginning earlier than today.`;
    // } else if(numTravelers > 9) {
    //   return "Can only request a trip for 9 travelers or less.";
    // } else if(tripLength > 365) {
    //   return "Cannot request a trip to last more than one year.";
    // } else if(!destinationsDataSet.find(dest => dest.id === destID)) {
    //   return "Destination doesn't exist. Please choose a different destination."
    // }

    const newTrip = {
      "id": newTripID,
      "userID": userId,
      "destinationID": destID,
      "travelers": numTravelers,
      "date": startDate,
      "duration": tripLength,
      "status": "pending",
      "suggestedActivities": [

      ]
    }

    this.tripsData.push(newTrip);

    return newTrip;
  }

  estimatedTripCost(tripID) {
    let newTrip = this.tripsData.find(trip => {
      return trip.id === tripID;
    });

    if(!newTrip) {
      return "Pending trip request doesn't exist. Please request a new trip.";
    }

    let tripDestination = destinationsDataSet.find(dest => {
      return dest.id === newTrip.destinationID;
    });

    let flightCost = newTrip.travelers * tripDestination.estimatedFlightCostPerPerson;
    let lodgingCost = newTrip.duration * tripDestination.estimatedLodgingCostPerDay;
    let totalEstimatedCost = flightCost + lodgingCost;
    totalEstimatedCost = totalEstimatedCost + (totalEstimatedCost * 0.10);
    
    return totalEstimatedCost;
  }
}

export default Trips;
