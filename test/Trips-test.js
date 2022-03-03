import { expect } from 'chai';
import Trips from '../src/Trips';
<<<<<<< HEAD
import tripsDataSet from '../src/data/trips-data'
=======
import tripsDataSet from '../src/data/trips-data';
>>>>>>> 9856ae38b6157c0a4e3450f0905709e12c02fe45

describe('Trips', () => {
  const tripsTest = new Trips(tripsDataSet);

  it("should be a function", function () {
    expect(Trips).to.be.a('function');
  });

  it("should be a instance of Trips", function () {
    expect(tripsTest).to.be.an.instanceOf(Trips);
  });

  it("should store Trips objects", function () {
    expect(tripsTest.tripsData).to.deep.equal(tripsDataSet);
  });

  it("should be able to find a Trip by its ID", function () {
    expect(tripsTest.findTrip(1)).to.deep.equal({
      "id": 1,
      "userID": 44,
      "destinationID": 49,
      "travelers": 1,
      "date": "2022/09/16",
      "duration": 8,
      "status": "approved",
      "suggestedActivities": [

      ]
    });
  });

  it("should return an error message if a Trips doesn't exist", function () {
    expect(tripsTest.findTrip(10)).to.equal("Trip 10 doesn't exist!");
  });

  it("should be able to request a new trip", function () {
    expect(tripsTest.requestNewTrip(8, "2022/03/02", 19, 5, 4)).to.deep.equal({
      "id": 9,
      "userID": 8,
      "destinationID": 4,
      "travelers": 5,
      "date": "2022/03/02",
      "duration": 19,
      "status": "pending",
      "suggestedActivities": [

      ]
    });
  });

<<<<<<< HEAD
  it.only("should return an error message if a request trip includes a start date earlier than today", function () {
    expect(tripsTest.requestNewTrip(7, "2022/01/01", 10, 2, 1)).to.equal("Cannot request a trip beginning earlier than today.");
  });
=======
  it("should return an error message if a request trip includes a start date earlier than today", function () {
    expect(tripsTest.requestNewTrip(7, "2022/01/01", 10, 2, 1)).to.equal("Cannot request a trip beginning earlier than today.");
  });

  it("should return an error message if a requested trip includes over 9 travelers", function () {
    expect(tripsTest.requestNewTrip(7, "2022/03/02", 10, 15, 1)).to.equal("Can only request a trip for 9 travelers or less.");
  });

  it("should return an error message if a request trip lasts over 1 year (365 days)", function () {
    expect(tripsTest.requestNewTrip(6, "2022/12/25", 400, 5, 5)).to.equal("Cannot request a trip to last more than one year.");
  });

  it("should return an error message if a request trip has an invalid destination", function () {
    // console.log(tripsTest.errorInvalidDestination(30))
    expect(tripsTest.requestNewTrip(1, "2022/10/28", 3, 1, 30)).to.equal("Destination doesn't exist. Please choose a different destination.");
  });

  it("should calculate the estimated cost of a new trip request that is pending", function () {
    tripsTest.requestNewTrip(8, "2022/03/02", 19, 5, 4)
    expect(tripsTest.estimatedCostNewTrip(9)).to.equal("$3283.5");
  });

  it("should return an error message if a pending trip request doesn't exist", function () {
    expect(tripsTest.estimatedCostNewTrip(20)).to.equal("Pending trip request doesn't exist. Please request a new trip.")
  })
>>>>>>> 9856ae38b6157c0a4e3450f0905709e12c02fe45
});
