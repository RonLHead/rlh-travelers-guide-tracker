class Travelers {
  constructor(travelersAPI) {
    this.travelersData = travelersAPI;
  }

  findTraveler(travelerId) {
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
