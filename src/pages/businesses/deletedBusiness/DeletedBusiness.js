import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { deletedBusinessListRequest } from '../../../store/actions/business';
import FromToDateCalendar from '../../../components/_common/FromToDate/FromToDateCalendar';
import { ReactComponent as DeclineIcon } from '../../../assets/icons/_common/Decline.svg';
import { ReactComponent as BlockIcon } from '../../../assets/icons/_common/Block.svg';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/makingProgressIcons/trash-can-solid.svg';
import { ReactComponent as ShowIcon } from '../../../assets/icons/_common/Show.svg';
import Table from '../../../components/_common/Table/Table';
import classes from './deletedBusiness.module.scss';
import useQuery from '../../../helpers/hooks/useQuery';
import BusinessWrapper from '../../../helpers/hok/BusinessWrapper';
import Api from '../../../Api/Api';

const DeletedBusiness = ({
  refreshDate, changeDate, componentMount, onPageChange,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { query } = useQuery();

  const {
    lists: {
      list, status, totalPages,
    },
  } = useSelector((state) => state.business);

  const { startDate, endDate, page = 1 } = query;
  const tableDate = useMemo(() => [
    {
      title: 'Business Name',
      path: 'name',
      fontSize: 16,
      minWidth: 191,
    },
    {
      title: 'Responsible person',
      path: 'responsiblePersonName',
      fontSize: 16,
      minWidth: 179,
    },
    {
      title: 'Email or Phone number',
      path: 'email',
      fontSize: 16,
      minWidth: 205,
    },
    {
      title: 'View Business',
      path: 'view',
      label: 'SHOW',
      fontSize: 16,
      minWidth: 142,
      Icon: ShowIcon,
      color: '#263238',
      onClick: (id) => {
        navigate(id);
      },
    },
    {
      title: 'Date',
      path: 'date',
      fontSize: 16,
      minWidth: 130,
    },
    {
      title: 'Delete business',
      path: '',
      fontSize: 16,
      minWidth: 110,
      width: 65,
      Icon: DeleteIcon,
      color: '#E80000',
      modalData: {
        modalText: 'Are you sure to delete this business?',
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
      title: 'Delete responsible person',
      path: '',
      Icon: DeclineIcon,
      fontSize: 16,
      minWidth: 100,
      width: 84,
      color: '#E80000',
      modalData: {
        modalText: 'Are you sure to delete this person?',
        onClick: (id) => {
          (async () => {
            await Api.deleteResponsiblePerson(id);
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
      title: 'Block Responsible person ',
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
      title: '',
      path: '',
      label: 'Cancel',
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
    componentMount(deletedBusinessListRequest);
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
        tableTitle="Delete Business Request"
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
DeletedBusiness.propTypes = {
  refreshDate: PropTypes.func.isRequired,
  changeDate: PropTypes.func.isRequired,
  componentMount: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
export default BusinessWrapper(DeletedBusiness);
