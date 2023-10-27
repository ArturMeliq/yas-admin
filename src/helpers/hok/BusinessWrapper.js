import { useDispatch } from 'react-redux';
import React, { useCallback } from 'react';
import moment from 'moment/moment';
import useQuery from '../hooks/useQuery';

const BusinessWrapper = (Component) => (props) => {
  const dispatch = useDispatch();

  const { query, setQuery } = useQuery();
  const { startDate, endDate } = query;

  const changeDate = useCallback((path, date) => {
    const changedDate = {
      ...query,
      page: 1,
      [path]: moment(date).format('YYYY-MM-DD'),
    };

    if (path === 'startDate' && (new Date(date) >= new Date(endDate) || !endDate)) {
      changedDate.endDate = moment(date).add(1, 'day').format('YYYY-MM-DD');
    }

    setQuery(changedDate);
  }, [query]);

  const refreshDate = useCallback(() => {
    setQuery({});
  }, [query]);

  const componentMount = useCallback((cb) => {
    const queryData = {
      page: query.page || 1,
      startDate: startDate ? moment(startDate).format('YYYY-MM-DD') : null,
      endDate: endDate ? moment(endDate).format('YYYY-MM-DD') : null,
    };

    dispatch(cb(queryData));
  }, [query]);

  const onPageChange = useCallback((page) => {
    setQuery({
      ...query,
      page,
    });
  }, [query]);

  return (
    <Component
      changeDate={changeDate}
      componentMount={componentMount}
      onPageChange={onPageChange}
      refreshDate={refreshDate}
      {...props}
    />
  );
};

export default BusinessWrapper;
