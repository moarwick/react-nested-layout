import React from 'react';
import { mount, shallow } from 'enzyme';
import { expect } from 'chai';

import Header from '../src/components/Header';

describe( '<Header/>', () => {

  it( 'renders as expected', () => {
    const rendered = shallow( <Header/> );
    expect( rendered ).to.exist;
  });
});
