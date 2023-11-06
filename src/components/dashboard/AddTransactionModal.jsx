import { useState, forwardRef } from 'react';
import { useForm, useController } from 'react-hook-form';
import {
  useTransactionTypesQuery,
  useAddTransactionMutation,
  useUpdateTransactionMutation,
} from '../../apis';

import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DatePicker from 'react-datepicker';
import { MmModal } from '../../customComponents';

import { styled } from '@mui/material/styles';

import { ERROR_MESSAGE, PRIMARY_DATE_FORMAT } from '../../constants';
import { getFormattedDate } from '../../utils/commonUtils';
import PropTypes from 'prop-types';

const DateGrid = styled(Grid)({
  '& .react-datepicker-wrapper': {
    width: '100%',
  },
});

const CustomInput = forwardRef((props, ref) => {
  const { value, ...remainingProps } = props;
  return (
    <TextField
      fullWidth
      sx={{ width: '100%' }}
      label="Date"
      ref={ref}
      value={value}
      {...remainingProps}
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

export const AddTransactionModal = ({
  onClose,
  initialValues = {
    typeId: null,
    value: 0,
    comment: '',
    transactionDate: getFormattedDate(new Date()),
  },
  isEdit = false,
}) => {
  const [errorMsg, setErrorMsg] = useState('');
  const { control, setValue, trigger, getValues, formState } = useForm({
    mode: 'onBlur',
    defaultValues: initialValues,
  });

  const { field: typeField, fieldState: typeState } = useController({
    control,
    name: 'typeId',
    rules: { required: ERROR_MESSAGE.REQUIRED },
  });
  const { field: valueField, fieldState: valueState } = useController({
    control,
    name: 'value',
    rules: { required: ERROR_MESSAGE.REQUIRED },
  });
  const { field: commentField, fieldState: commentState } = useController({
    control,
    name: 'comment',
    rules: { required: ERROR_MESSAGE.REQUIRED },
  });
  const { field: dateField, fieldState: dateState } = useController({
    control,
    name: 'transactionDate',
    rules: { required: ERROR_MESSAGE.REQUIRED },
  });

  const { isFetching, data = [] } = useTransactionTypesQuery();
  const [updateTransaction, updateResult] = useUpdateTransactionMutation();
  const { isLoading: updateLoading } = updateResult;

  const [addTransaction, addTransactionResult] = useAddTransactionMutation();
  const { isLoading } = addTransactionResult;
  const handleAddTransaction = async () => {
    setErrorMsg('');
    const result = await addTransaction(getValues());
    console.log({ result });
    if ('error' in result) {
      if (result.error?.response?.data) {
        setErrorMsg(result.error?.response?.data);
      } else {
        setErrorMsg('Error adding transaction details. Please try again');
      }
    } else {
      onClose();
    }
  };

  const handleUpdateMutation = async () => {
    setErrorMsg('');
    const result = await updateTransaction(getValues());
    if ('error' in result) {
      if (result.error?.response?.data) {
        setErrorMsg(result.error?.response?.data);
      } else {
        setErrorMsg('Error updating transaction details. Please try again');
      }
    } else {
      onClose();
    }
  };

  const options = data.map(({ typeId, type, name }) => ({
    id: typeId,
    label: `${name}-(${type})`,
  }));

  return (
    <MmModal
      maxWidth="sm"
      scrolling={false}
      renderHeader={() => `${isEdit ? 'Edit' : 'Add'} Transaction`}
      renderActions={() => {
        return (
          <>
            <Button
              disabled={isLoading || !formState.isValid || updateLoading}
              onClick={() => {
                if (!isEdit) {
                  handleAddTransaction();
                } else {
                  handleUpdateMutation();
                }
              }}
            >{`${isEdit ? 'Update' : 'Add'}`}</Button>
            <Button
              disabled={isLoading || updateLoading}
              onClick={() => {
                onClose();
              }}
            >
              Close
            </Button>
          </>
        );
      }}
    >
      <Grid container mt={2} spacing={2}>
        <Grid item xs={12}>
          <Autocomplete
            fullWidth
            disablePortal
            options={options}
            loading={isFetching}
            loadingText="Loading Types"
            value={options.find((v) => v.id === typeField.value)?.label}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Type"
                error={typeState?.invalid}
                helperText={typeState?.error?.message}
                disabled={isLoading || updateLoading}
              />
            )}
            onChange={(e, v) => {
              setValue('typeId', v.id);
              trigger('typeId');
            }}
            onBlur={() => {
              trigger('typeId');
            }}
          />
        </Grid>

        <DateGrid item xs={12}>
          <DatePicker
            showMonthDropdown
            showYearDropdown
            dateFormat={PRIMARY_DATE_FORMAT}
            valueFormat={PRIMARY_DATE_FORMAT}
            customInput={
              <CustomInput
                disabled={isLoading || updateLoading}
                error={dateState.error}
                helperText={dateState?.error?.message}
              />
            }
            value={getFormattedDate(dateField.value)}
            onChange={(v) => {
              setValue('transactionDate', getFormattedDate(v));
              trigger('transactionDate');
            }}
            onBlur={() => {
              trigger('transactionDate');
            }}
          />
        </DateGrid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            type="number"
            label="Value"
            variant="outlined"
            disabled={isLoading || updateLoading}
            {...valueField}
            error={valueState.invalid}
            helperText={valueState?.error?.message}
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Comment"
            variant="outlined"
            disabled={isLoading || updateLoading}
            {...commentField}
            error={commentState.invalid}
            helperText={commentState?.error?.message}
          />
        </Grid>

        {errorMsg && (
          <Grid item xs={12}>
            <Typography variant="subtitle1" color="error.main">
              {errorMsg}
            </Typography>
          </Grid>
        )}
      </Grid>
    </MmModal>
  );
};

AddTransactionModal.propTypes = {
  onClose: PropTypes.func,
  initialValues: PropTypes.object,
  isEdit: PropTypes.bool,
};
