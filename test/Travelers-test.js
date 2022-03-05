import { expect } from 'chai';
import Travelers from '../src/Travelers';
import travelersDataSet from '../src/data/travelers-data';
import tripsDataSet from '../src/data/trips-data';
import destinationsDataSet from '../src/data/destinations-data';

describe('Travelers', () => {

  let travelers = new Travelers(travelersDataSet, tripsDataSet, destinationsDataSet);

  it("should be a function", function () {
    expect(Travelers).to.be.a('function');
  });

  it("should be a instance of Travelers", function () {
    expect(travelers).to.be.an.instanceOf(Travelers);
  });

  it("should store Travelers objects", function () {
    expect(travelers.travelersData).to.deep.equal(travelersDataSet);
  });

  it("should be able to find a Traveler by its ID", function () {
    expect(travelers.findTraveler(1)).to.deep.equal({
      "id": 1,
      "name": "Ham Leadbeater",
      "travelerType": "relaxer"
    });
  });

  it("should return an error message if a Traveler doesn't exist", function () {
    expect(travelers.findTraveler(10)).to.equal("Traveler 10 doesn't exist!");
  });

  it("should return all the trips for an individual Traveler", function () {
    expect(travelers.travelerAllTrips(3)).to.deep.equal([
      {
        "id": 3,
        "userID": 3,
        "destinationID": 7,
        "travelers": 4,
        "date": "2022/05/22",
        "duration": 17,
        "status": "approved",
        "suggestedActivities": [

        ]
      },
      {
        "id": 4,
        "userID": 3,
        "destinationID": 8,
        "travelers": 2,
        "date": "2022/02/25",
        "duration": 10,
        "status": "approved",
        "suggestedActivities": [

        ]
      }
    ]);
  });

  it("should return a message if a Traveler has no trips", function () {
    expect(travelers.travelerAllTrips(9)).to.equal("No trips to display. Please request a trip.");
  });

  it("should return all the past trips for an individual Traveler", function () {
    expect(travelers.pastTrips(3)).to.deep.equal([
      {
        "id": 4,
        "userID": 3,
        "destinationID": 8,
        "travelers": 2,
        "date": "2022/02/25",
        "duration": 10,
        "status": "approved",
        "suggestedActivities": [

        ]
      }
    ]);
  });

  it("should return a message if a Traveler has no past trips", function () {
    expect(travelers.pastTrips(7)).to.equal("No previous trips to display.");
  });

  it("should return all the upcoming trips for an individual Traveler", function () {
    expect(travelers.upcomingTrips(3)).to.deep.equal([
      {
        "id": 3,
        "userID": 3,
        "destinationID": 7,
        "travelers": 4,
        "date": "2022/05/22",
        "duration": 17,
        "status": "approved",
        "suggestedActivities": [

        ]
      }
    ]);
  });

  it("should return the total amount spent on trips this year", function () {
    expect(travelers.totalSpentYear(3)).to.equal(11121);
  });

  it("should return a message if a Traveler has no upcoming trips", function () {
    expect(travelers.upcomingTrips(1)).to.equal("No upcoming trips to display. Please request a trip.");
  });

  it("should return an error message if there are no trips for this year", function () {
    expect(travelers.totalSpentYear(100)).to.equal("There are no trips for this year.")
  })
});
