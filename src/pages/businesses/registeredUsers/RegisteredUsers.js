import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import classes from './registeredUsers.module.scss';
import FromToDateCalendar from '../../../components/_common/FromToDate/FromToDateCalendar';
import Table from '../../../components/_common/Table/Table';
import { ReactComponent as BlockIcon } from '../../../assets/icons/_common/Block.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/makingProgressIcons/trash-can-solid.svg';
import useQuery from '../../../helpers/hooks/useQuery';
import { deletedBusinessListRequest, registeredUsersRequest } from '../../../store/actions/business';
import BusinessWrapper from '../../../helpers/hok/BusinessWrapper';
import Api from '../../../Api/Api';

const RegisteredUsers = ({
  refreshDate, changeDate, componentMount, onPageChange,
}) => {
  const { query } = useQuery();
  const dispatch = useDispatch();

  const {
    lists: {
      list, status, totalPages,
    },
  } = useSelector((state) => state.business);

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
      title: 'Delete User',
      path: '',
      fontSize: 16,
      minWidth: 110,
      width: 65,
      Icon: DeleteIcon,
      color: '#E80000',
      modalData: {
        modalText: 'Are you sure to delete this user?',
        onClick: (id) => {
          (async () => {
            await Api.deleteBusiness(id);
            await dispatch(deletedBusinessListRequest(
              {
                page: page || query.page || 1,
                startDate: query.startDate || startDate,
                endDate: query.endDate || endDate,
              },
            ));
          })();
        },
      },
    },
    {
      title: 'Block',
      path: '',
      Icon: BlockIcon,
      fontSize: 16,
      minWidth: 100,
      width: 84,
      color: '#E80000',
      modalData: {
        modalText: 'Are you sure to block this person?',
        onClick: (id) => {
          (async () => {
            await Api.blockResponsiblePerson(id);
            await dispatch(deletedBusinessListRequest(
              {
                page: page || query.page || 1,
                startDate: query.startDate || startDate,
                endDate: query.endDate || endDate,
              },
            ));
          })();
        },
      },
    },
    {
      title: 'Status',
      path: 'status',
      fontSize: 16,
      onClick: async (id) => {
        await Api.deletedBusinessCancel(id);
        await dispatch(deletedBusinessListRequest(
          {
            page: page || query.page || 1,
            startDate: query.startDate || startDate,
            endDate: query.endDate || endDate,
          },
        ));
      },
    },
  ], []);

  useEffect(() => {
    componentMount(registeredUsersRequest);
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
        tableTitle="Registered Users"
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

RegisteredUsers.propTypes = {
  refreshDate: PropTypes.func.isRequired,
  changeDate: PropTypes.func.isRequired,
  componentMount: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
export default BusinessWrapper(RegisteredUsers);
