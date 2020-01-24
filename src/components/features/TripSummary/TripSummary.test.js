import React from 'react';
import { shallow } from 'enzyme';
import TripSummary from './TripSummary';

describe('Component TripSummary', () => {
  it('should render without crashing', () => {
    const tagsOpt = [ 'a', 'b', 'c'];
    const component = shallow(<TripSummary id={'id'} image={'image.jpg'} name={'name'} cost={'cost'} days={3} tags={tagsOpt} />);
    expect(component).toBeTruthy();
  });

  it('should throw error without required props', () => {
    expect(() => shallow(<TripSummary />)).toThrow();
  });

  it('should generate correct link', () => {
    const tagsOpt = [ 'a', 'b', 'c'];
    const expectedId = 'abc';
    const expectedLink = '/trip/abc';
    const component = shallow(<TripSummary id={expectedId} image={'image.jpg'} name={'name'} cost={'cost'} days={3} tags={tagsOpt} />);

    expect(component.find('.link').prop('to')).toEqual(expectedLink);
  });

  it('should check if src and alt value is correct', () => {
    const tagsOpt = [ 'a', 'b', 'c'];
    const expectedSrc = 'image';
    const expectedAlt = 'name';
    const component = shallow(<TripSummary id={'id'} image={expectedSrc} name={expectedAlt} cost={'cost'} days={3} tags={tagsOpt} />);

    expect(component.find('img').prop('src')).toEqual(expectedSrc);
    expect(component.find('img').prop('alt')).toEqual(expectedAlt);
  });

  it('should render correct values of name, cost and days', () => {
    const tagsOpt = [ 'a', 'b', 'c'];
    const expectedName = 'title';
    const expectedCosts = '5000';
    const expectedDays =  14;
    const component = shallow(<TripSummary id={'id'} image={'image.jpg'} name={expectedName} cost={expectedCosts} days={expectedDays} tags={tagsOpt} />);

    expect(component.find('.title').text()).toEqual(expectedName);
    expect(component.find('.details').childAt(1).containsMatchingElement(<span>from {expectedCosts}</span>)).toEqual(true);
    expect(component.find('.details').childAt(0).containsMatchingElement(<span>{expectedDays} days</span>)).toEqual(true);
  });

  it('should render correct tags', () => {
    const tagsOpt = ['a', 'b', 'c'];
    const component = shallow(<TripSummary id={'id'} image={'image'} name={'name'} cost={'cost'} days={3} tags={tagsOpt} />);

    for(let i = 0; i < tagsOpt.length; i++){
      expect(component.find('.tag').at([i]).text()).toEqual(tagsOpt[i]);
    }
  });

  it('should not render tags if empty or false', () => {
    const component = shallow(<TripSummary id={'id'} image={'image'} name={'name'} cost={'cost'} days={3} />);
    expect(component.find('.tags')).toEqual({});
  });
});
