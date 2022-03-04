import Trips from './Trips';

class Travelers {
  constructor(travelersAPI, tripsAPI, destData) {
    this.travelersData = travelersAPI;
    this.tripsObj = new Trips(tripsAPI, destData)
    // this.destObj = new Destinations(destData)
  }

  findTraveler(travelerId) {
    if(!this.travelersData.map(traveler => traveler.id).includes(travelerId)) {
      return `Traveler ${travelerId} doesn't exist!`;
    }

    let result = this.travelersData.reduce((acc, data) => {
      if(travelerId === data.id) {
        acc = data;
      }
      return acc;
    }, {});

    return result;
  }

  travelerAllTrips(travelerId) {
    let result = this.tripsObj.tripsData.filter(trip => {
      if(trip.userID === travelerId) {
        return trip;
      }
    });

    return result;
  }

  totalSpentYear(travelerId) {
    let today = new Date();
    let thisYear = today.getFullYear();
    const travelerTrips = new Trips(this.travelerAllTrips(travelerId), this.tripsObj.destinationsObj);

    let result = 0;

    travelerTrips.tripsData.forEach(trip => {
      if(trip.date.includes(thisYear)) {
        result = result + travelerTrips.estimatedTripCost(trip.id);
      }
    });

    if(result > 0) {
      return result;
    } else return "There are no trips for this year.";
  }
}

export default Travelers
