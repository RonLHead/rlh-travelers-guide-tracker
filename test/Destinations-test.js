import { expect } from 'chai';
import Destinations from '../src/Destinations';
import destinationsDataSet from '../src/data/destinations-data';

describe('Destinations', () => {
  const destinationsTest = new Destinations(destinationsDataSet);

  it('should be a function', function () {
    expect(Destinations).to.be.a('function');
  });

  it("should be a instance of Destinations", function () {
    expect(destinationsTest).to.be.an.instanceOf(Destinations);
  });

  it.only("should store Destinations objects", function () {
    expect(destinationsTest.destinationsData).to.deep.equal(destinationsDataSet)
  });

  it("it should be able to find a Destination object by its ID", function () {
    expect(destinationsTest.findDestination(1)).to.equal({
        "id": 1,
        "destination": "Lima, Peru",
        "estimatedLodgingCostPerDay": 70,
        "estimatedFlightCostPerPerson": 400,
        "image": "https://images.unsplash.com/photo-1489171084589-9b5031ebcf9b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2089&q=80",
        "alt": "overview of city buildings with a clear sky"
      })
  })
})
