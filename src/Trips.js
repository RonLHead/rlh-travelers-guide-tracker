import Destinations from '../src/Destinations';

class Trips {
  constructor(tripsAPI) {
    this.tripsData = tripsAPI;
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
}

export default Trips;
