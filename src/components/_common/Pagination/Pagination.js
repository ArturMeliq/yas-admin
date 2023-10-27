import React from 'react';
import ReactPaginate from 'react-paginate';
import PropTypes from 'prop-types';
import { ReactComponent as PrevIcon } from '../../../assets/icons/_common/Prev.svg';
import { ReactComponent as NextIcon } from '../../../assets/icons/_common/Next.svg';
import classes from './pagination.module.scss';

const Pagination = ({
  pageCount, className, onPageChange, page,
}) => (
  <div className={className}>
    <ReactPaginate
      nextLabel={<NextIcon />}
      previousLabel={<PrevIcon />}
      containerClassName={classes.container}
      previousClassName={classes.prev}
      previousLinkClassName={classes.prev_link}
      nextClassName={classes.next}
      nextLinkClassName={classes.next_link}
      pageLinkClassName={classes.link}
      activeLinkClassName={classes.active_link}
      disabledClassName={classes.disabled}
      pageClassName={classes.page}
      onPageChange={({ selected }) => {
        onPageChange(selected + 1);
      }}
      pageCount={pageCount}
      forcePage={+page - 1}
    />
  </div>
);
Pagination.propTypes = {
  pageCount: PropTypes.number.isRequired,
  className: PropTypes.string,
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
};
Pagination.defaultProps = {
  className: '',
};

export default Pagination;
