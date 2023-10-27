import React, { useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import classes from './businesses.module.scss';
import Table from '../../components/_common/Table/Table';
import { businessListRequest } from '../../store/actions/business';
import FromToDateCalendar from '../../components/_common/FromToDate/FromToDateCalendar';
import { ReactComponent as ShowIcon } from '../../assets/icons/_common/Show.svg';
import useQuery from '../../helpers/hooks/useQuery';
import BusinessWrapper from '../../helpers/hok/BusinessWrapper';

const Businesses = ({
  refreshDate, changeDate, componentMount, onPageChange,
}) => {
  const navigate = useNavigate();
  const { query } = useQuery();

  const {
    list, status, totalPages,
  } = useSelector((state) => state.business.lists);

  const { startDate, endDate, page = 1 } = query;

  const tableData = useMemo(() => [
    {
      title: 'Business Name',
      minWidth: 191,
      fontSize: 16,
      path: 'name',
    },
    {
      title: 'Responsible person',
      path: 'responsiblePersonName',
      minWidth: 179,
      fontSize: 16,
    },
    {
      title: 'Email or Phone number',
      path: 'email',
      minWidth: 179,
      fontSize: 16,
    },
    {
      title: 'View completed Information',
      fontSize: 16,
      width: 115,
      minWidth: 142,
      path: 'view',
      label: 'SHOW',
      Icon: ShowIcon,
      color: '#263238',
      onClick: (id, stat) => {
        const findStatus = +stat === 0 ? 'DRAFT' : +stat === 1 ? 'ACTIVE' : 'PENDING_VERIFICATION';

        if (findStatus !== 'PENDING_VERIFICATION') {
          navigate(`/businesses/activity/${id}`);
        } else {
          navigate(`/businesses/waiting-verification/${id}`);
        }
      },
    },
    {
      title: 'Country',
      fontSize: 16,
      minWidth: 94,
      path: 'country',
    },
    {
      title: 'Sign up method',
      fontSize: 16,
      minWidth: 150,
      path: '',
    },
    {
      title: 'Gadget',
      fontSize: 16,
      minWidth: 84,
      path: '',
    },
    {
      title: 'Status',
      fontSize: 16,
      path: 'status',
      statuses: [
        {
          title: 'Draft',
          status: 'DRAFT',
          order: 0,
          color: '#EE7F41',
        },
        {
          title: 'Active',
          status: 'ACTIVE',
          order: 1,
          color: '#34A853',
        },
        {
          title: 'Pending',
          status: 'PENDING_VERIFICATION',
          order: 2,
          color: '#FF0000',
        },
      ],
    },
  ], []);

  useEffect(() => {
    componentMount(businessListRequest);
  }, [startDate, endDate, page]);

  return (
    <div className={classes.add_business_wrapper}>

      <FromToDateCalendar
        startDate={startDate}
        endDate={endDate}
        changeDate={(path, data, p) => changeDate(path, data, p)}
        onRefreshDate={refreshDate}
        page={page ? +page : 1}
      />

      <div className={classes.business_list}>
        <Table
          tableTitle="Businesses"
          header={tableData}
          data={list}
          showLoading={status === 'request'}
          onPageChange={onPageChange}
          page={page ? +page : 1}
          pageCount={+totalPages}
        />
      </div>
    </div>
  );
};
Businesses.propTypes = {
  refreshDate: PropTypes.func,
  changeDate: PropTypes.func,
  componentMount: PropTypes.func,
  onPageChange: PropTypes.func,
};

Businesses.defaultProps = {
  refreshDate: () => {},
  changeDate: () => {},
  componentMount: () => {},
  onPageChange: () => {},
};
export default BusinessWrapper(Businesses);
