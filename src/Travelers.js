import tripsDataSet from '../src/data/trips-data';
import travelersDataSet from '../src/data/travelers-data';

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
}

export default Travelers
