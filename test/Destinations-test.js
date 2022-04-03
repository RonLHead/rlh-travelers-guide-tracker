import { expect } from 'chai';
import Destinations from '../src/Destinations';
import destinationsDataSet from '../src/data/destinations-data';

describe('Destinations', () => {
  const destinationsTest = new Destinations(destinationsDataSet);

  it("should be a function", function () {
    expect(Destinations).to.be.a('function');
  });

  it("should be a instance of Destinations", function () {
    expect(destinationsTest).to.be.an.instanceOf(Destinations);
  });

  it("should store Destinations objects", function () {
    expect(destinationsTest.destinationsData).to.deep.equal(destinationsDataSet)
  });

  it("should be able to find a Destination object by its ID", function () {
    expect(destinationsTest.findDestination(1)).to.deep.equal({
        "id": 1,
        "destination": "Lima, Peru",
        "estimatedLodgingCostPerDay": 70,
        "estimatedFlightCostPerPerson": 400,
        "image": "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
        "alt": "overview of city buildings with a clear sky"
      });
  });

  it("should return an error message if a Destination doesn't exist", function () {
    expect(destinationsTest.findDestination(10)).to.equal("Destination 10 doesn't exist. Please choose a different destination.");
  });
});
