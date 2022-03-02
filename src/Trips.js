import Destinations from '../src/Destinations';

class Trips {
  constructor(tripsAPI) {
    this.tripsData = tripsAPI;
    this.pendingTrips = [];
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

  requestNewTrip(userId, startDate, tripLength, numTravelers, destID) {
    const newTripID = this.tripsData.length + 1;
    const today = new Date();
    console.log(today)
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

    this.pendingTrips.push(newTrip);

    return newTrip;
  }
}

export default Trips;
