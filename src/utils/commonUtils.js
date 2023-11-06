import dayjs from 'dayjs';
import { PRIMARY_DATE_FORMAT } from '../constants';

export const getFormattedRupee = (number) => {
  if (typeof number !== 'number') {
    return '0.00';
  }

  if (isNaN(number)) {
    return '0.00';
  }

  // Ensure the number is formatted with two decimal places
  const formattedNumber = number.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formattedNumber;
};

export const getFormattedDate = (value, format = PRIMARY_DATE_FORMAT) =>
  dayjs(value).format(format);
