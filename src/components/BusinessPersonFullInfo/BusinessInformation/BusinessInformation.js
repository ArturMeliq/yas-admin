import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import classes from './businessInformation.module.scss';
import BusinessFullCreate from '../../Businesses/BusinessCreate/BusinessFullCreate/BusinessFullCreate';
import BusinessHours from '../../Businesses/BusinessCreate/MakingProgress/BusinessHours/BusinessHours';
import Specialities from '../../Businesses/BusinessCreate/MakingProgress/Specialities/Specialities';
import TextArea from '../../_common/Form/Input/TextArea/TextArea';
import Button from '../../_common/Form/Button/Button';
import { ReactComponent as BackIcon } from '../../../assets/icons/business/Back.svg';
import GoogleMapComponent from '../../_common/GoogleMapComponent/GoogleMapComponent';
import PhotosAndVideos from '../PhotosAndVideos/PhotosAndVideos';
import Api from '../../../Api/Api';

const BusinessInformation = ({
  businessData, showGoogleMap, changeBusinessData, saveData, errors,
  showAllowButtons,
}) => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className={classes.main_block}>

      <div className={classes.top_block}>
        <div className={classes.top_left_block}>
          <BusinessFullCreate
            className={classes.full_create_width}
            data={businessData}
            onChange={changeBusinessData}
            errors={errors}
            title="Business Information"
            showButtons={false}
          />
        </div>

        {showGoogleMap
          && (
          <div className={classes.google_map_wrapper}>
            <GoogleMapComponent />
          </div>
          )}
      </div>

      <div className={classes.bottom_block}>

        <BusinessHours
          className={classes.full_create_width}
          weekData={businessData.weekdays}
          onChange={changeBusinessData}
          saveData={saveData}
          errors={errors}
          showAllowFields={false}
          title="Special Hours"
        />

        <Specialities
          data={businessData}
          changeData={changeBusinessData}
          showAllowFields={false}
          errors={errors}
        />

        <h2 className={classes.meet_the_Business}>Meet the Business Owner</h2>

        <TextArea
          onChange={changeBusinessData}
          isAllowCharacters
          className={classes.meet_the_Business_textarea}
        />

        {showAllowButtons && (
        <PhotosAndVideos
          photos={businessData.photos}
          changeData={changeBusinessData}
        />
        )}

        <div className={classes.btns}>
          {showAllowButtons
            ? (
              <>
                <Button
                  className={classes.verify}
                  onClick={() => saveData('PENDING_VERIFICATION')}
                >
                  Save
                </Button>

                <Button
                  className={classes.verify}
                  onClick={() => {
                    Api.verifyBusiness(id);
                    navigate(-1);
                  }}
                >
                  Verify
                </Button>

                <Button
                  className={classes.save_as_draft}
                  onClick={() => navigate(-1)}
                >
                  <BackIcon />
                  Back to List page
                </Button>

              </>
            )
            : (
              <div>
                <Button
                  className={classes.verify}
                  onClick={() => saveData('ACTIVE')}
                >
                  Save
                </Button>

                <Button
                  className={classes.verify}
                  onClick={() => saveData('DRAFT')}
                >
                  Draft
                </Button>
              </div>
            )}

        </div>
      </div>
    </div>
  );
};
BusinessInformation.propTypes = {
  businessData: PropTypes.object.isRequired,
  showGoogleMap: PropTypes.bool,
  changeBusinessData: PropTypes.func.isRequired,
  saveData: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  showAllowButtons: PropTypes.bool,
};
BusinessInformation.defaultProps = {
  showGoogleMap: true,
  showAllowButtons: true,
};

export default BusinessInformation;
