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

  it.only("should be able to request a new trip", function () {
    expect(tripsTest.requestNewTrip(24, "2022/12/19", 19, 5, 19)).to.deep.equal({
      "id": 9,
      "userID": 24,
      "destinationID": 19,
      "travelers": 5,
      "date": "2022/12/19",
      "duration": 19,
      "status": "pending",
      "suggestedActivities": [

      ]
    });
  });
});
