import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { reportedTheReviewListRequest } from '../../../store/actions/business';
import FromToDateCalendar from '../../../components/_common/FromToDate/FromToDateCalendar';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/makingProgressIcons/trash-can-solid.svg';
import Table from '../../../components/_common/Table/Table';
import classes from './reportedTheReview.module.scss';
import useQuery from '../../../helpers/hooks/useQuery';
import BusinessWrapper from '../../../helpers/hok/BusinessWrapper';
import Api from '../../../Api/Api';

const ReportedTheReview = ({
  refreshDate, changeDate, componentMount, onPageChange,
}) => {
  const dispatch = useDispatch();

  const {
    lists: {
      list, status, totalPages,
    },
  } = useSelector((state) => state.business);

  const { query } = useQuery();

  const [currentShowDate, setCurrentShowDate] = useState({
    id: '',
    path: '',
  });

  const { startDate, endDate, page = 1 } = query;

  const tableDate = useMemo(() => [
    {
      title: 'User Name',
      path: 'userName',
      fontSize: 16,
      minWidth: 170,
    },
    {
      title: 'Business Name',
      path: 'businessName',
      fontSize: 16,
      minWidth: 170,
    },
    {
      title: 'Reported Person',
      path: 'reportedPerson',
      fontSize: 16,
      minWidth: 155,
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
      fontSize: 16,
      minWidth: 268,
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
      fontSize: 16,
      minWidth: 273,
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
      width: 50,
      Icon: DeleteIcon,
      color: '#E80000',
      fontSize: 16,
      modalData: {
        modalText: 'Are you sure to delete this report?',
        onClick: (id) => {
          (async () => {
            await Api.deleteCancelReportReview(id);
            await dispatch(reportedTheReviewListRequest(
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
  ], []);

  useEffect(() => {
    componentMount(reportedTheReviewListRequest);
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
        tableTitle="Reported reviews"
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
ReportedTheReview.propTypes = {
  refreshDate: PropTypes.func.isRequired,
  changeDate: PropTypes.func.isRequired,
  componentMount: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
export default BusinessWrapper(ReportedTheReview);
