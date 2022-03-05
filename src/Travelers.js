import Trips from './Trips';

class Travelers {
  constructor(travelersAPI, tripsAPI, destData) {
    this.travelersData = travelersAPI;
    this.tripsObj = new Trips(tripsAPI, destData)
  }

  findTraveler(travelerId) {
    if(!this.travelersData.travelers.map(traveler => traveler.id).includes(travelerId)) {
      return `Traveler ${travelerId} doesn't exist!`;
    }

    let result = this.travelersData.travelers.reduce((acc, data) => {
      if(travelerId === data.id) {
        acc = data;
      }
      return acc;
    }, {});

    return result;
  }

  travelerAllTrips(travelerId) {
    let result = this.tripsObj.tripsData.trips.filter(trip => {
      if(trip.userID === travelerId) {
        return trip;
      }
    });

    if(result.length === 0) {
      return "No trips to display. Please request a trip.";
    } else return result;
  }

  todaysDate() {
    let today = new Date();
    let dd = String(today.getDate()).padStart(2, '0');
    let mm = String(today.getMonth() + 1).padStart(2, '0');
    let yyyy = today.getFullYear();

    let newToday = `${yyyy}/${mm}/${dd}`;
    return newToday;
  }

  pastTrips(travelerId) {
    const today = this.todaysDate();
    const allTrips = this.travelerAllTrips(travelerId);

    let result = [];
    allTrips.forEach(trip => {
      if(trip.date < today) {
        result.push(trip)
      }
    });

    return result;
  }

  upcomingTrips(travelerId) {
    const today = this.todaysDate();
    const allTrips = this.travelerAllTrips(travelerId);

    let result = [];
    allTrips.forEach(trip => {
      if(trip.date > today) {
        result.push(trip)
      }
    });

    return result;
  }

  totalSpentYear(travelerId) {
    let today = new Date();
    let thisYear = today.getFullYear();
    const travelerTrips = this.travelerAllTrips(travelerId);

    let result = 0;

    travelerTrips.forEach(trip => {
      if(trip.date.includes(thisYear)) {
        result = result + this.tripsObj.estimatedTripCost(trip.id);
      }
    });

    if(result > 0) {
      return result;
    } else return "There are no trips for this year.";
  }
}

export default Travelers
