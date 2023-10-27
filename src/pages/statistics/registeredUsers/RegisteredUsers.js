import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import classes from './registeredUsers.module.scss';
import FromToDateCalendar from '../../../components/_common/FromToDate/FromToDateCalendar';
import Table from '../../../components/_common/Table/Table';
import useQuery from '../../../helpers/hooks/useQuery';
import { registeredUsersRequest } from '../../../store/actions/business';
import BusinessWrapper from '../../../helpers/hok/BusinessWrapper';
import DataWithPercentagesAndAGraph
  from '../../../components/Statistics/Wrappers/DataWithPercentagesAndAGraph/DataWithPercentagesAndAGraph';
import Button from '../../../components/_common/Form/Button/Button';

const RegisteredUsers = ({
  refreshDate, changeDate, componentMount, onPageChange,
}) => {
  const { query } = useQuery();

  const {
    lists: {
      list, status, totalPages,
    },
  } = useSelector((state) => state.business);

  const [showStatistics, setShowStatistics] = useState(false);

  const { startDate, endDate, page = 1 } = query;

  const tableDate = useMemo(() => [
    {
      title: 'User Name',
      path: 'userName',
      fontSize: 16,
      minWidth: 137,
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
      minWidth: 100,
    },
  ], []);

  useEffect(() => {
    componentMount(registeredUsersRequest);
  }, [startDate, endDate, page]);

  return (
    <div className={classes.wrapper}>
      <div className={classes.date_btn_wrapper}>
        <FromToDateCalendar
          startDate={startDate}
          endDate={endDate}
          changeDate={(path, data, p) => changeDate(path, data, p)}
          onRefreshDate={refreshDate}
          page={page ? +page : 1}
        />

        <Button
          className={`${classes.opening_btn} ${showStatistics ? classes.passive : ''}`}
          onClick={() => setShowStatistics((prev) => !prev)}
        >
          {showStatistics ? 'Close Chart' : 'Open Chart'}
        </Button>
      </div>

      {showStatistics && (
      <DataWithPercentagesAndAGraph
        startDate={startDate}
        endDate={endDate}
      />
      )}

      {!showStatistics && (
      <Table
        header={tableDate}
        data={list}
        showLoading={status === 'request'}
        page={page ? +page : 1}
        pageCount={+totalPages}
        onPageChange={onPageChange}
      />
      )}

    </div>
  );
};

RegisteredUsers.propTypes = {
  refreshDate: PropTypes.func.isRequired,
  changeDate: PropTypes.func.isRequired,
  componentMount: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
export default BusinessWrapper(RegisteredUsers);
