import React, { useState } from 'react';
import 'react-datepicker/dist/react-datepicker-cssmodules.css';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker';

const OrderOptionDate = ({ setOptionValue }) => {
  const [startDate, setStartDate] = useState(new Date());
  return (
    <DatePicker
      showPopperArrow={false}
      selected={startDate}
      onChange={date => setOptionValue(setStartDate(date))}
      minDate={new Date()}
      dateFormat='dd/MM/yyyy'
    />
  );
};

OrderOptionDate.propTypes = {
  setOptionValue: PropTypes.func,
};

export default OrderOptionDate;
