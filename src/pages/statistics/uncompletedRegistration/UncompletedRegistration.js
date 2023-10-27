import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import classes from './uncompletedRegistration.module.scss';
import FromToDateCalendar from '../../../components/_common/FromToDate/FromToDateCalendar';
import Table from '../../../components/_common/Table/Table';
import useQuery from '../../../helpers/hooks/useQuery';
import BusinessWrapper from '../../../helpers/hok/BusinessWrapper';
import { unregisteredVisitorsListRequest } from '../../../store/actions/business';

const UncompletedRegistration = ({
  refreshDate, changeDate, componentMount, onPageChange,
}) => {
  const { query } = useQuery();

  const {
    lists: {
      list, status, totalPages,
    },
  } = useSelector((state) => state.business);

  const { startDate, endDate, page = 1 } = query;

  const tableDate = useMemo(() => [
    {
      title: 'Name Surname',
      path: 'userName',
      fontSize: 16,
      minWidth: 205,
    },
    {
      title: 'Email or Phone number',
      path: 'email',
      fontSize: 16,
      minWidth: 205,
    },
    {
      title: 'Country',
      path: 'country',
      fontSize: 16,
      minWidth: 137,
    },
    {
      title: 'City',
      path: 'city',
      fontSize: 16,
      minWidth: 110,
    },
    {
      title: 'Platform',
      path: 'os',
      fontSize: 16,
      minWidth: 185,
    },
  ], []);

  useEffect(() => {
    componentMount(unregisteredVisitorsListRequest);
  }, [startDate, endDate, page]);

  return (
    <div className={classes.wrapper}>
      <FromToDateCalendar
        startDate={startDate}
        endDate={endDate}
        changeDate={(path, data, p) => changeDate(path, data, p)}
        onRefreshDate={refreshDate}
        page={page ? +page : 1}
      />

      <Table
        header={tableDate}
        data={list}
        showLoading={status === 'request'}
        page={page ? +page : 1}
        pageCount={+totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
};

UncompletedRegistration.propTypes = {
  refreshDate: PropTypes.func.isRequired,
  changeDate: PropTypes.func.isRequired,
  componentMount: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
export default BusinessWrapper(UncompletedRegistration);
