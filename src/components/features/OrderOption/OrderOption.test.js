import React from 'react';
import { shallow } from 'enzyme';
import OrderOption from './OrderOption';
import DatePicker from 'react-datepicker';

describe('Component OrderOption', () => {
  it('should render without crashing', () => {
    const component = shallow(<OrderOption type={'type'} name={'name'} id={'id'} />);
    expect(component).toBeTruthy();
  });

  it('should return empty object if called without required props', () => {
    const component = shallow (<OrderOption />);
    expect(component).toEqual({});
  });
});


const optionTypes = {
  dropdown: 'OrderOptionDropdown',
  icons: 'OrderOptionIcons',
  checkboxes: 'OrderOptionCheckboxes',
  number: 'OrderOptionNumber',
  text: 'OrderOptionText',
  date: 'OrderOptionDate',
};

const mockProps = {
  id: 'abc',
  name: 'Lorem',
  values: [
    {id: 'aaa', icon: 'h-square', name: 'Lorem A', price: 0},
    {id: 'xyz', icon: 'h-square', name: 'Lorem X', price: 100},
  ],
  required: false,
  currentValue: 'aaa',
  price: '50%',
  limits: {
    min: 0,
    max: 6,
  },
};

const mockPropsForType = {
  dropdown: {},
  icons: {},
  checkboxes: {currentValue: [mockProps.currentValue]},
  number: {currentValue: 1},
  text: {},
  date: {},
};

const testValue = mockProps.values[1].id;
const testValueNumber = 3;

for(let type in optionTypes){
  describe('Component OrderOption with type=${type}', () => {
    /* test setup */
    let component;
    let subcomponent;
    let renderedSubcomponent;
    let mockSetOrderOption;

    beforeEach(() => {
      mockSetOrderOption = jest.fn();
      component = shallow (
        <OrderOption
          type={type}
          setOrderOption={mockSetOrderOption}
          {...mockProps}
          {...mockPropsForType[type]}
        />
      );
      subcomponent = component.find(optionTypes[type]);
      renderedSubcomponent = subcomponent.dive();
    });

    /* common tests */
    it(`renders ${optionTypes[type]}`, () => {
      expect(subcomponent).toBeTruthy();
      expect(subcomponent.length).toBe(1);
    });

    /* type-specific tests */
    switch (type) {
      case 'dropdown': {
        /* tests for dropdown */
        it('contains select and options', () => {
          const select = renderedSubcomponent.find('select');
          expect(select.length).toBe(1);

          const emptyOption = select.find('option[value=""]').length;
          expect(emptyOption).toBe(1);

          const options = select.find('option').not('[value=""]');
          expect(options.length).toBe(mockProps.values.length);
          expect(options.at(0).prop('value')).toBe(mockProps.values[0].id);
          expect(options.at(1).prop('value')).toBe(mockProps.values[1].id);
        });

        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find('select').simulate('change', {currentTarget: {value: testValue}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue});
        });
        break;
      }

      case 'icons': {
        /* tests for icons */
        it('contains div with class icon', () => {
          const expectedIcon = renderedSubcomponent.find('.icon');
          expect(expectedIcon.length).toBe(mockProps.values.length + 1);
        });

        it('should run setOrderOption function on click', () => {
          renderedSubcomponent.find('.icon').at(1).simulate('click');
          expect(mockSetOrderOption).toBeCalledTimes(1);
        });
        break;
      }

      case 'checkboxes': {
        /* tests for checkboxes */
        it('contains div with class checkboxes', () => {
          const expectedCheckboxesDiv = renderedSubcomponent.find('.checkboxes');
          const expectedInputs = renderedSubcomponent.find('input');

          expect(expectedCheckboxesDiv.length).toBe(1);
          expect(expectedInputs.length).toBe(mockProps.values.length);
          expect(expectedInputs.at(0).prop('value')).toBe(mockProps.values[0].id);
          expect(expectedInputs.at(1).prop('value')).toBe(mockProps.values[1].id);
        });

        it('should run setOrderOption function on change', () => {
          renderedSubcomponent.find(`input[value="${testValue}"]`).simulate('change', {currentTarget: {checked:true}});
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: [mockProps.currentValue, testValue]});
        });
        break;
      }

      case 'number': {
        /*tests for number */
        it('contains div and input', () => {
          const expectedNumberDiv = renderedSubcomponent.find('.number');
          const expectedInputs = renderedSubcomponent.find('input[type="number"]');

          expect(expectedNumberDiv.length).toBe(1);
          expect(expectedInputs.length).toBe(1);
        });

        it('should run setOrderOption function on chnage', () => {
          renderedSubcomponent.find('input[type="number"]').simulate('change', { currentTarget: { value: testValueNumber } });
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValueNumber });
        });
        break;
      }

      case 'text': {
        /* test for texts */
        it('contains input', () => {
          const expectedInputText = renderedSubcomponent.find('input[type="text"]');

          expect(expectedInputText.length).toBe(1);
        });

        it('should run SetOrderOption function on change', () => {
          renderedSubcomponent.find('input[type="text"]').simulate('change', { currentTarget: { value: testValue } });
          expect(mockSetOrderOption).toBeCalledTimes(1);
          expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
        });
        break;
      }

      case 'date': {
        /*test for date picker */
        it('contains Datepicker', () => {
          expect(renderedSubcomponent.find(DatePicker).length).toBe(1);
        });

        it('should run SetOrderOption function on change', () => {
          renderedSubcomponent.find(DatePicker).simulate('change', testValue);
          expect(mockSetOrderOption).toBeCalledTimes(1);
        });
        break;
      }
    }
  });
}
