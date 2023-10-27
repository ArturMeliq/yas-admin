import { useCallback, useState } from 'react';

const DateRangeWrapper = (Comp) => (props) => {
  const [rangeDate, setDateRange] = useState([null, null]);

  const changeDate = useCallback((date) => {
    setDateRange(date);
  }, [rangeDate]);

  const clearDate = useCallback(() => {
    setDateRange([null, null]);
  }, [rangeDate]);

  return (
    <Comp
      rangeDate={rangeDate}
      changeDate={changeDate}
      clearDate={clearDate}
      {...props}
    />
  );
};

export default DateRangeWrapper;
