import React from 'react';
import chai, { expect } from 'chai';
import {shallow} from 'enzyme';
import chaiEnzyme from 'chai-enzyme';
import { spy } from 'sinon';

import Signup from '../../components/Signup';
import Login from '../../components/Login';
import { SignupContainer } from '../../containers/SignupContainer';

chai.use(chaiEnzyme());

describe ('<SignupContainer /> ', () => {
  let signupContainerWrapper;
  beforeEach(() => {
    signupContainerWrapper = shallow(<SignupContainer />);
  });

  it('<SignupContainer /> should contain <Signup /> component in signup state', () => {
    signupContainerWrapper.setState({ type: 'signup'});
    expect(signupContainerWrapper).to.have.descendants(Signup);
  });

  it('SignupContainer /> should contain <Login/> component in login state', () => {
    signupContainerWrapper.setState({ type: 'login'});
    expect(signupContainerWrapper).to.have.descendants(Login);
  });
});
