import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { getBusinessCategoriesRequest } from '../../../store/actions/business';
import FromToDateCalendar from '../../../components/_common/FromToDate/FromToDateCalendar';
import { ReactComponent as DeleteIcon } from '../../../assets/icons/makingProgressIcons/trash-can-solid.svg';
import { ReactComponent as Update } from '../../../assets/icons/_common/Update.svg';
import Table from '../../../components/_common/Table/Table';
import classes from './category.module.scss';
import useQuery from '../../../helpers/hooks/useQuery';
import BusinessWrapper from '../../../helpers/hok/BusinessWrapper';
import Api from '../../../Api/Api';

const CategoryList = ({
  refreshDate, changeDate, componentMount, onPageChange,
}) => {
  const dispatch = useDispatch();
  const { query } = useQuery();

  const { businessCategories, businessCategoriesStatus } = useSelector((state) => state.business);

  const { startDate, endDate, page = 1 } = query;

  const tableDate = useMemo(() => [
    {
      title: 'Category',
      path: 'name',
      fontSize: 16,
      minWidth: 170,

    },
    {
      title: 'Delete',
      path: '',
      Icon: DeleteIcon,
      color: '#E80000',
      fontSize: 16,
      width: 50,
      modalData: {
        modalText: 'Are you sure to delete this category?',
        onClick: (id) => {
          (async () => {
            await Api.deleteDeletedUsers(id);
            await dispatch(getBusinessCategoriesRequest(
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
      title: 'Edit',
      path: '',
      Icon: Update,
      color: '#E80000',
      fontSize: 16,
      width: 50,
      modalData: {
        modalText: 'Are you sure to edit this user?',
        onChange: (id) => {
          (async () => {
            await Api.deleteDeletedUsers(id);
            await dispatch(getBusinessCategoriesRequest(
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
    componentMount(getBusinessCategoriesRequest);
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
        tableTitle="Category list"
        header={tableDate}
        data={businessCategories}
        showLoading={businessCategoriesStatus === 'request'}
        page={page ? +page : 1}
        pageCount={+'5'}
        onPageChange={onPageChange}
      />
    </div>
  );
};
CategoryList.propTypes = {
  refreshDate: PropTypes.func.isRequired,
  changeDate: PropTypes.func.isRequired,
  componentMount: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
export default BusinessWrapper(CategoryList);
