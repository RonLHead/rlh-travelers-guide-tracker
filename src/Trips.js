import Destinations from '../src/Destinations';

class Trips {
  constructor(tripsAPI) {
    this.tripsData = tripsAPI;
  }

  findTrip(tripID) {
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
