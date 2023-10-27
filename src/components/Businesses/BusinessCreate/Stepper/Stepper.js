import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classes from './stepper.module.scss';

const Stepper = ({
  steps, currentStep, setCurrentStep, errors,
}) => {
  const backClick = (step) => {
    setCurrentStep(() => step);
  };

  return (
    <div className={classes.steps}>
      {steps.map(({ step, title, errorFields }) => {
        let hasError = false;

        errorFields.forEach((err) => {
          if (typeof errors[err] === 'object') {
            _.forEach(errors[err], (error) => {
              _.forEach(error, (e) => {
                if (typeof e === 'boolean' && e) hasError = true;
              });
            });
          } else if (errors[err]) hasError = true;
        });

        const stepClass = [classes.step];
        if (currentStep >= step) stepClass.push(classes.active);
        if (hasError) stepClass.push(classes.error);

        return (
          <div
            key={title}
            style={{ cursor: currentStep !== step ? 'pointer' : 'default' }}
            className={stepClass.join((' '))}
            onClickCapture={() => backClick(step)}
          >
            {step}

            <p>{title}</p>
          </div>
        );
      })}
    </div>
  );
};

Stepper.propTypes = {
  currentStep: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  steps: PropTypes.arrayOf(
    PropTypes.shape({
      step: PropTypes.number,
      title: PropTypes.string,
      errorFields: PropTypes.array,
    }),
  ).isRequired,
  setCurrentStep: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

Stepper.defaultProps = {};
export default Stepper;
