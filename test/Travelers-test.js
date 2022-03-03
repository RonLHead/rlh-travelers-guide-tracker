import { expect } from 'chai';
import Travelers from '../src/Travelers';
import travelersDataSet from '../src/data/travelers-data';

describe('Travelers', () => {

  let travelers = new Travelers(travelersDataSet);

  it("should be a function", function () {
    expect(Travelers).to.be.a('function');
  });

  it.only("should be a instance of Travelers", function () {
    expect(travelers).to.be.an.instanceOf(Travelers);
  });
});
