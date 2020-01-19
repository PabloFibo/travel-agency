import React from 'react';
import styles from './OrderOption.scss';
import PropTypes from 'prop-types';

const OrderOptionText = ({ setOptionValue }) => (

  <div>
    <input
      type='text'
      className={styles.input}
      onChange={event => setOptionValue(event.currentTarget.value)}
    />
  </div>
);

OrderOptionText.propTypes = {
  type: PropTypes.string,
  setOptionValue: PropTypes.func,
  currentValue: PropTypes.string,
};

export default OrderOptionText;
