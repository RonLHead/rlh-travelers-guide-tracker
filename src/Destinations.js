class Destinations {
  constructor(destinationsAPI) {
    this.destinationsData = destinationsAPI;
  }

  findDestination(destID) {
    if(!this.destinationsData.map(dest => dest.id).includes(destID)) {
      return `Destination ${destID} doesn't exist!`;
    }

    let result = this.destinationsData.reduce((a, b) => {
      if(destID === b.id) {
        a = b;
      }
      return a;
    }, {});

    return result;
  }
}

export default Destinations;
