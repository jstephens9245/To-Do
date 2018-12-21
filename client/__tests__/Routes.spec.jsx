import React from 'react';
import chai from 'chai';
import {shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';

import Routes from '../Routes.jsx';

chai.use(chaiEnzyme);

const expect = chai.expect;

jest.unmock('../Routes.jsx');

describe('<Routes />', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Routes />);
  });

  it('should contain', () => {
    expect(wrapper).to.exist;
  });
});
