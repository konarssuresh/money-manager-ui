import { forwardRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TextField from '@mui/material/TextField';
import DatePicker from 'react-datepicker';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import dayjs from 'dayjs';
import { selectedMonthAndYearSelector } from '../../selectors';
import { actions } from '../../ducks';

const { dashboardActions } = actions;

const CustomInput = forwardRef((props, ref) => {
  const { value, setOpen } = props;
  return (
    <TextField
      label="Month/Year"
      ref={ref}
      value={value}
      onFocus={() => {
        setOpen(true);
      }}
    />
  );
});

CustomInput.propTypes = {
  value: PropTypes.any,
  onClick: PropTypes.func,
  onBlur: PropTypes.func,
  setOpen: PropTypes.func,
};

CustomInput.displayName = 'CustomInputForDatepicker';

const MonthAndYearSelect = ({ onYearAndMonthChange }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const { selectedMonth, selectedYear } = useSelector(
    selectedMonthAndYearSelector
  );

  const renderMonthContent = (month, shortMonth, longMonth) => {
    const tooltipText = `Tooltip for month: ${longMonth}`;
    return <span title={tooltipText}>{shortMonth}</span>;
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '2rem' }}>
      <div>
        <DatePicker
          renderMonthContent={renderMonthContent}
          showMonthYearPicker
          dateFormat="MM/yyyy"
          customInput={<CustomInput setOpen={setOpen} />}
          value={`${selectedMonth}/${selectedYear}`}
          onChange={(v) => {
            dispatch(dashboardActions.setSelectedMonth(dayjs(v).get('M') + 1));
            dispatch(dashboardActions.setSelectedYear(dayjs(v).get('Y')));
            setOpen(false);
          }}
          open={open}
          onBlur={() => {
            setOpen(false);
          }}
          onInputClick={() => {
            setOpen(true);
          }}
          onClickOutside={() => {
            setOpen(false);
          }}
          onMonthChange={() => {
            setOpen(false);
          }}
        />
      </div>

      <Button
        variant="outlined"
        onClick={() => {
          onYearAndMonthChange({ year: selectedYear, month: selectedMonth });
        }}
      >
        Refresh
      </Button>
    </Box>
  );
};

MonthAndYearSelect.propTypes = {
  onYearAndMonthChange: PropTypes.func,
};

export default MonthAndYearSelect;
