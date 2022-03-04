import tripsDataSet from '../src/data/trips-data';
import Trips from './Trips';

class Travelers {
  constructor(travelersAPI) {
    this.travelersData = travelersAPI;
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
    let result = tripsDataSet.filter(trip => {
      if(trip.userID === travelerId) {
        return trip;
      }
    });

    return result;
  }

  totalSpentYear(travelerId) {
    let today = new Date();
    let thisYear = today.getFullYear();
    const travelerTrips = new Trips(this.travelerAllTrips(travelerId));
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
