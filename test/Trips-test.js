import { expect } from 'chai';
import Trips from '../src/Trips';
import tripsDataSet from '../src/data/trips-data'

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

  it("should return an error message if a request trip includes a start date earlier than today", function () {
    expect(tripsTest.requestNewTrip(7, "2022/01/01", 10, 2, 1)).to.equal("Cannot request a trip beginning earlier than today.");
  });

  it("should return an error message if a requested trip includes over 9 travelers", function () {
    expect(tripsTest.requestNewTrip(7, "2022/03/02", 10, 15, 1)).to.equal("Can only request a trip for 9 travelers or less.");
  });

  it("it should return an error message if a request trip lasts over 1 year (365 days)", function () {
    expect(tripsTest.requestNewTrip(6, "2022/12/25", 400, 5, 5)).to.equal("Cannot request a trip to last more than one year.")
  });
});
