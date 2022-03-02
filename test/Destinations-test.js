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
})
