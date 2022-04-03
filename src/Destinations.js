class Destinations {
  constructor(destinationsAPI) {
    this.destinationsData = destinationsAPI;
  }

  findDestination(destID) {
    let result = this.destinationsData.destinations.find(
      (dest) => dest.id === destID
    );
    if (!result) {
      return `Destination ${destID} doesn't exist. Please choose a different destination.`;
    } else return result;
  }
}

export default Destinations;
