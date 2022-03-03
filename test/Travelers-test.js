import { expect } from 'chai';
import Travelers from '../src/Travelers';

describe('Travelers', () => {
  it("should be a function", function () {
    expect(Travelers).to.be.a('function');
  });
});
