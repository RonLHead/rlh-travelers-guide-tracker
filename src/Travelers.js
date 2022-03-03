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
}

export default Travelers
