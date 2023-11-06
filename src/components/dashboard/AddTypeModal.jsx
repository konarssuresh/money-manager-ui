import { useState } from 'react';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import Grid from '@mui/material/Grid';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import CircularProgress from '@mui/material/CircularProgress';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { MmModal } from '../../customComponents';
import { ERROR_MESSAGE } from '../../constants';
import PropTypes from 'prop-types';
import { useAddTypeMutation } from '../../apis';

import { useForm, useController } from 'react-hook-form';

export default function AddTypeModal({
  onClose,
  initialValues = {
    type: '',
    name: '',
  },
  isEdit = false,
}) {
  // TODO: remove this log and implement edit functionality too
  console.log({ isEdit });
  const [errorMsg, setErrorMsg] = useState('');
  const [addType, addTypeResult] = useAddTypeMutation();

  const { isLoading } = addTypeResult;
  const {
    control,
    setValue,
    trigger,
    getValues,
    formState: { isValid } = {},
  } = useForm({
    mode: 'onBlur',
    defaultValues: initialValues,
  });

  const { field: typeField, fieldState: typeState } = useController({
    control,
    name: 'type',
    rules: {
      required: ERROR_MESSAGE.REQUIRED,
    },
  });

  const { field: nameField, fieldState: nameState } = useController({
    control,
    name: 'name',
    rules: {
      required: ERROR_MESSAGE.REQUIRED,
    },
  });

  const handleChange = (e) => {
    setValue('type', e.target.value);
    trigger('type');
  };

  const handleBlur = () => {
    trigger('type');
  };

  const handleAddType = async () => {
    setErrorMsg('');
    const result = await addType({ ...getValues() });
    if ('error' in result) {
      result.error?.response?.data && setErrorMsg(result.error?.response?.data);
    } else {
      onClose();
    }
  };

  return (
    <MmModal
      maxWidth="sm"
      renderHeader={() => 'Add Type'}
      renderActions={() => {
        return (
          <>
            <Button disabled={isLoading || !isValid} onClick={handleAddType}>
              Add Type
            </Button>
            <Button
              disabled={isLoading}
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
      <Grid spacing={2} container>
        {isLoading ? (
          <Grid xs={12}>
            <CircularProgress sx={{ margin: 'auto' }} />
          </Grid>
        ) : (
          <>
            <Grid mt={2} item xs={12}>
              <FormControl required error={typeState.invalid} fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  fullWidth
                  value={typeField.value}
                  label="Type"
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  <MenuItem value="Income">Income</MenuItem>
                  <MenuItem value="Expense">Expense</MenuItem>
                </Select>
                {typeState.error && (
                  <FormHelperText>{typeState.error.message}</FormHelperText>
                )}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Name"
                {...nameField}
                placeholder="Enter type name"
                error={nameState.invalid}
                helperText={nameState.error?.message}
                variant="outlined"
                fullWidth
                required
              />
            </Grid>
            {errorMsg && (
              <Grid xs={12}>
                <Typography
                  variant="subtitle1"
                  textAlign="center"
                  sx={{ color: 'red' }}
                >
                  {errorMsg}
                </Typography>
              </Grid>
            )}
          </>
        )}
      </Grid>
    </MmModal>
  );
}

AddTypeModal.propTypes = {
  onClose: PropTypes.func,
  initialValues: PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string,
  }),
  isEdit: PropTypes.bool,
};
