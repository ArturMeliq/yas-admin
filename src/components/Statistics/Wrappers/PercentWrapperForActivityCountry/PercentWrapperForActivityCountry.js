import React, { useCallback, useEffect, useState } from 'react';
import moment from 'moment';
import Api from '../../../../Api/Api';
import Percent from '../../Percent/Percent';

const PercentWrapperForActivityCountry = () => {
  const [rangeDate, setDateRange] = useState([null, null]);

  const [startDate, endDate] = rangeDate;

  useEffect(() => {
    const oneMountAgo = moment().add(-1, 'month').format('YYYY-MM-DD');
    const endOfMonth = moment().format('YYYY-MM-DD');

    Api.updateResponsiblePerson({
      startDate: startDate ? moment(startDate).format('YYYY-MM-DD') : oneMountAgo,
      endDate: endDate ? moment(endDate).format('YYYY-MM-DD') : endOfMonth,
    });
  }, [rangeDate]);

  const changeDate = useCallback((date) => {
    setDateRange(date);
  }, [rangeDate]);

  const clearDate = useCallback(() => {
    setDateRange([null, null]);
  }, [rangeDate]);

  return (
    <Percent
      name="Activity by Country"
      changeDate={changeDate}
      clearDate={clearDate}
      rangeDate={rangeDate}
      allowCalendar
      percents={[
        {
          id: 1,
          percentName: 'Yerevan',
          percent: '25%',
        },
        {
          id: 2,
          percentName: 'Gyumri',
          percent: '45%',
        },
        {
          id: 3,
          percentName: 'Vanadzor',
          percent: '67%',
        },
        {
          id: 4,
          percentName: 'Ijevan',
          percent: '67%',
        },
        {
          id: 5,
          percentName: 'Artik',
          percent: '74%',
        },
        {
          id: 6,
          percentName: 'Dilijan',
          percent: '84%',
        },
        {
          id: 7,
          percentName: 'Gyumrio',
          percent: '18%',
        },
      ]}
    />
  );
};

export default PercentWrapperForActivityCountry;
