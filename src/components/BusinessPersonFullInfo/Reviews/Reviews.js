import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import PropTypes from 'prop-types';
import classes from './reviews.module.scss';
import MySelectComponent from '../../_common/Form/Select/MySelectComponent/MySelectComponent';
import { ReactComponent as ReviewIcon } from '../../../assets/icons/activity/review.svg';
import Button from '../../_common/Form/Button/Button';
import StarRatingsMyComponent from '../../_common/StarRatings/StarRatingsMyComponent';
import userPhoto from '../../../assets/photos/user_photo.png';
import { singleBusinessReviewsRequest } from '../../../store/actions/business';
import Loader from '../../_common/Loader/Loader';
import Api from '../../../Api/Api';
import Modal from '../../_common/Modal/Modal';
import BusinessWrapper from '../../../helpers/hok/BusinessWrapper';
import Pagination from '../../_common/Pagination/Pagination';
import useQuery from '../../../helpers/hooks/useQuery';

const options = ['Newest first'];

const Reviews = ({ onPageChange }) => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { query } = useQuery();
  const singleResponsiblePerson = useSelector((state) => state.business.singleBusinessReviews);
  const [loading, loadingToggle] = useState(true);
  const [showBtnLoading, setBtnLoading] = useState(false);
  const [reviewId, setReviewId] = useState('');
  const {
    reviews, reviewCount, businessName, pageCount,
  } = singleResponsiblePerson;

  const { page = 1 } = query;

  useEffect(() => {
    (async () => {
      loadingToggle(true);
      await dispatch(singleBusinessReviewsRequest(id, page));
      loadingToggle(false);
    })();
  }, []);

  const deleteReviews = async (revId) => {
    setBtnLoading(true);
    await Api.deleteSingleReview(revId);
    await dispatch(singleBusinessReviewsRequest(id, page));
    setBtnLoading(false);
    setReviewId('');
  };
  return (
    <div>
      {loading
        ? (
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: 'calc(100vh - 80px)',
            padding: 20,
          }}
          >
            <Loader />

          </div>
        ) : (
          <div className={classes.wrapper}>
            <h2 className={classes.title}>Reviews</h2>

            <div className={classes.sort_by}>
              <p className={classes.reviews_count}>
                {`${reviewCount || ''} Review for ${_.upperFirst(businessName)}`}
              </p>

              <div className={classes.sort_by_block}>
                <span className={classes.sort_by_word}>Sort By</span>

                <MySelectComponent
                  classNameCurrentWrapper={classes.current_wrapper_option}
                  classNameCurrentOptionText={classes.current_text_option}
                  classNameOptionsWrapper={classes.options_wrapper_fz}
                  classNameOptions={classes.options_fz}
                  options={options}
                  hideBorder
                />
              </div>
            </div>
            {reviews.map(({
              rate, message, id: revId, user, createdAt,
            }) => (
              <section className={classes.single_reviews} key={revId}>
                <div className={classes.user_info}>

                  <div className={classes.user_image}>
                    <img src={user?.avatar || userPhoto} alt="user_photo" />
                  </div>

                  <div className={classes.user_data}>

                    <h4 className={classes.user_fName}>
                      {`${user.firstName} ${user.lastName}`}
                    </h4>

                    <p className={classes.user_place}>
                      {user.city}
                      {', '}
                      {user.country}
                    </p>

                    <p className={classes.user_review_count}>
                      <ReviewIcon />
                      {' '}
                      2 Reviews
                    </p>
                  </div>
                </div>

                <div className={classes.review_content_wrapper}>
                  <div className={classes.range}>
                    <StarRatingsMyComponent
                      className={classes.start_w_h}
                      rating={+rate}
                    />

                    {moment(createdAt).format('D/MM/YYYY')}
                  </div>

                  <p className={classes.review_content}>
                    {message}
                  </p>

                  <Button
                    className={classes.add_public_comment}
                    onClick={() => {}}
                  >
                    Add public comment
                  </Button>

                  <Button
                    className={classes.delete}
                    onClick={() => setReviewId(revId)}
                  >
                    Delete
                  </Button>
                </div>
              </section>
            ))}

            <div className={classes.pagination_review}>
              <Pagination
                onPageChange={onPageChange}
                className={classes.pagination_space}
                pageCount={+pageCount}
                page={page}
              />
            </div>

            <Modal
              onClose={() => setReviewId(false)}
              show={reviewId}
            >
              <div className={classes.delete_modal_wrapper}>
                <p className={classes.delete_modal_text}>
                  Are you sure to delete this reviews?
                </p>

                <div style={{ display: 'flex' }}>
                  <Button
                    className={classes.delete}
                    onClick={() => deleteReviews(reviewId)}
                  >
                    {showBtnLoading ? <Loader size={25} weight={2} /> : 'Delete'}
                  </Button>

                  <Button
                    className={classes.cancel_btn}
                    onClick={() => setReviewId('')}
                  >
                    Cancel
                  </Button>
                </div>

              </div>

            </Modal>
          </div>
        ) }
    </div>

  );
};
Reviews.propTypes = {
  onPageChange: PropTypes.func,
};
Reviews.defaultProps = {
  onPageChange: () => {},
};

export default BusinessWrapper(Reviews);
