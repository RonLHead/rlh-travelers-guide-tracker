class Destinations {
  constructor(destinationsAPI) {
    this.destinationsData = destinationsAPI;
  }

  findDestination(destID) {
    let result = this.destinationsData.filter(dest => {
      if(destID === dest.id) {
        return dest
      }
    });
    
    return result[0];
  }
}

export default Destinations;
