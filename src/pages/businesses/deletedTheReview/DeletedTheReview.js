import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { deletedTheReviewListRequest } from '../../../store/actions/business';
import FromToDateCalendar from '../../../components/_common/FromToDate/FromToDateCalendar';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/makingProgressIcons/trash-can-solid.svg';
import Table from '../../../components/_common/Table/Table';
import classes from './deletedTheReview.module.scss';
import useQuery from '../../../helpers/hooks/useQuery';
import BusinessWrapper from '../../../helpers/hok/BusinessWrapper';

const DeletedTheReview = ({
  refreshDate, changeDate, componentMount, onPageChange,
}) => {
  const dispatch = useDispatch();
  const { query } = useQuery();
  const [currentShowDate, setCurrentShowDate] = useState({
    id: '',
    path: '',
  });
  const {
    lists: {
      list, status, totalPages,
    },
  } = useSelector((state) => state.business);

  const { startDate, endDate, page = 1 } = query;

  const tableDate = useMemo(() => [
    {
      title: 'User Name',
      path: 'personName',
      fontSize: 16,
      minWidth: 170,

    },
    {
      title: 'Business Name',
      path: 'businessName',
      fontSize: 16,
      minWidth: 172,

    },
    {
      title: 'Date',
      path: 'date',
      fontSize: 16,
      minWidth: 130,

    },
    {
      title: 'Review',
      path: 'review',
      showMore: 'Read more',
      minWidth: 308,
      fontSize: 16,
      onClick: (id, path) => {
        setCurrentShowDate({
          id,
          path,
        });
      },
    },
    {
      title: 'Reason',
      path: 'reason',
      showMore: 'Read more',
      minWidth: 308,
      fontSize: 16,
      onClick: (id, path) => {
        setCurrentShowDate({
          id,
          path,
        });
      },
    },
    {
      title: 'Delete',
      path: '',
      Icon: DeleteIcon,
      color: '#E80000',
      fontSize: 16,
      width: 50,
      modalData: {
        modalText: 'Are you sure to delete this review?',
        onClick: () => {
          (async () => {
            await dispatch(deletedTheReviewListRequest({ page: 1, startDate: '2023-01-22', endDate: '2023-02-22' }));
          })();
        },
      },
    },
  ], []);

  useEffect(() => {
    componentMount(deletedTheReviewListRequest);
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
        tableTitle="Request Delete Review"
        header={tableDate}
        data={list}
        showLoading={status === 'request'}
        page={page ? +page : 1}
        pageCount={+totalPages}
        onPageChange={onPageChange}
        currentShowDate={currentShowDate}
      />
    </div>
  );
};
DeletedTheReview.propTypes = {
  refreshDate: PropTypes.func.isRequired,
  changeDate: PropTypes.func.isRequired,
  componentMount: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
export default BusinessWrapper(DeletedTheReview);
