class Destinations {
  constructor(destinationsAPI) {
    this.destinationsData = destinationsAPI;
  }

  findDestination(destID) {
    if(!this.destinationsData.map(dest => dest.id).includes(destID)) {
      return `Destination ${destID} doesn't exist!`;
    }

    let result = this.destinationsData.reduce((acc, data) => {
      if(destID === data.id) {
        acc = data;
      }
      return acc;
    }, {});

    return result;
  }
}

export default Destinations;
