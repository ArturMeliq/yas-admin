import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Table from '../../../components/_common/Table/Table';
import FromToDateCalendar from '../../../components/_common/FromToDate/FromToDateCalendar';
import { waitingBusinessesVerificationRequest } from '../../../store/actions/business';
import { ReactComponent as VerifyIcon } from '../../../assets/icons/_common/Verify.svg';
import { ReactComponent as DeclineIcon } from '../../../assets/icons/_common/Decline.svg';
import { ReactComponent as ShowIcon } from '../../../assets/icons/_common/Show.svg';
import api from '../../../Api/Api';
import classes from './waitingVerification.module.scss';
import useQuery from '../../../helpers/hooks/useQuery';
import BusinessWrapper from '../../../helpers/hok/BusinessWrapper';

const WaitingVerification = ({
  refreshDate, changeDate, componentMount, onPageChange,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { query } = useQuery();

  const {
    list, status, totalPages,
  } = useSelector((state) => state.business.lists);

  const { startDate, endDate, page = 1 } = query;

  const tableDate = useMemo(() => [
    {
      title: 'Business Name',
      path: 'name',
      minWidth: 420,
      fontSize: 16,
    },
    {
      title: 'Date',
      path: 'date',
      minWidth: 203,
      fontSize: 16,
    },
    {
      title: 'View completed Information',
      path: 'view',
      label: 'SHOW',
      fontSize: 16,
      minWidth: 325,
      Icon: ShowIcon,
      color: '#263238',
      onClick: (id) => {
        navigate(id);
      },
    },
    {
      title: 'Verify',
      path: 'verify',
      fontSize: 16,
      Icon: VerifyIcon,
      minWidth: 67,
      modalData: {
        modalText: 'Are you sure to verify this item?',
        onClick: (id) => {
          (async () => {
            await api.verifyBusiness(id);
            await dispatch(waitingBusinessesVerificationRequest({
              page: page || 1,
              startDate,
              endDate,
            }));
          })();
        },
      },
    },
    {
      title: 'Delete',
      path: 'delete',
      fontSize: 16,
      Icon: DeclineIcon,
      color: '#E80000',
      modalData: {
        modalText: 'Are you sure to delete this item?',
        onClick: (id) => {
          (async () => {
            await api.deleteDontVerifyBusiness(id);
            await dispatch(waitingBusinessesVerificationRequest(1));
          })();
        },
      },
    },
  ], []);

  useEffect(() => {
    componentMount(waitingBusinessesVerificationRequest);
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
        tableTitle="Waiting Verification"
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

WaitingVerification.propTypes = {
  refreshDate: PropTypes.func,
  changeDate: PropTypes.func,
  componentMount: PropTypes.func,
  onPageChange: PropTypes.func,
};
WaitingVerification.defaultProps = {
  refreshDate: () => {},
  changeDate: () => {},
  componentMount: () => {},
  onPageChange: () => {},
};

export default BusinessWrapper(WaitingVerification);
