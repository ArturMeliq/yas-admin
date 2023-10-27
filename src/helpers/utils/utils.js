import _ from 'lodash';

class Utils {
  static deleteEmptyKeys = (object) => {
    const obj = _.cloneDeep(object);

    for (const propName in obj) {
      if (typeof obj[propName] !== 'boolean' && !obj[propName]) {
        delete obj[propName];
      }
    }

    return obj;
  };

  static keyPressOnlyNumber = (e, past, positiveNumber, maxLength, maxValue) => {
    const { value } = e.target;
    const { selectionStart, selectionEnd } = e.target;

    const pastValueWithCurrentValue = value.slice(0, selectionStart) + (e?.clipboardData?.getData('text') || '');

    const val = past
      ? pastValueWithCurrentValue
      : (value.length && value.length === value.substring(selectionStart, selectionEnd).length
        ? value
        : value.substring(0, selectionStart) + e.key + value.substring(selectionStart, value.length));

    const valueToNumber = +val;
    const firstNumber = val.slice(0, 1);

    if (e.which === 32 || (positiveNumber && +firstNumber === 0)
      || _.isNaN(valueToNumber) || (maxLength && val.length > maxLength)
      || val.includes('.') || val.includes('e') || (maxValue && valueToNumber > maxValue)) {
      e.preventDefault();
    }
  };

  static isEmail = (email) => {
    const emailReg = /^(([^<>()\\[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return emailReg.test(String(email).toLowerCase());
  };

  static validateNumber = (number) => /^\+374(4[134]|33|55|77|88|9[1345689])\d{6}$/img.test(number);

  static hoursOption = () => {
    const hours = [];
    const minutes = ['00', '15', '30', '45'];

    for (let h = 0; h < 24; h++) {
      for (let m = 0; m < minutes.length; m++) {
        hours.push({ label: `${h < 10 ? `0${h}` : h}:${minutes[m]}`, value: `${h < 10 ? `0${h}` : h}:${minutes[m]}` });
      }
    }

    return hours;
  };

  static validateImage = (file, mb = 5, types = '') => {
    const allowTypes = types.replaceAll('.', '').split(', ');

    const fileSize = file.size / 1024 / 1024;

    const checkImageFormat = allowTypes.some((t) => file.type.includes(t));
    return fileSize <= mb && checkImageFormat;
  };
}
export default Utils;
