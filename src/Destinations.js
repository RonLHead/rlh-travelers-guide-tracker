class Destinations {
  constructor(destinationsAPI) {
    this.destinationsData = destinationsAPI;
  }

  findDestination(destID) {
    let result = this.destinationsData.reduce((a, b) => {
      if(destID === b.id) {
        // console.log("Filtered Destination", b)
        a = b;
      } 
      // console.log(a)
      return a;
    }, {})
      // else return "Destination doesn't exist!"
    // console.log("result", result)
    return result;
  }
}

export default Destinations;
