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

  it("shoudld store Trips objects", function () {
    expect(tripsTest.tripsData).to.deep.equal(tripsDataSet)
  })
});
