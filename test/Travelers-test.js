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

  it.only("should store Travelers objects", function () {
    expect(travelers.travelersData).to.deep.equal(travelersDataSet);
  });

});
