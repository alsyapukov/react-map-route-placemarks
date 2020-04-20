import React from 'react';
import App from '../src/components/App'
import { create } from 'react-test-renderer';

describe('Test App component', () =>{

  it('render App component', () => {
    const tree = create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });

})