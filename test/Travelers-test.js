import { expect } from 'chai';
import Travelers from '../src/Travelers';
import travelersDataSet from '../src/data/travelers-data';

describe('Travelers', () => {

  let travelers = new Travelers(travelersDataSet);

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
});
