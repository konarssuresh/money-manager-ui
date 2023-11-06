import { useState } from 'react';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { MmModal } from '../../customComponents';
import PropTypes from 'prop-types';

import { useDeleteTransactionMutation } from '../../apis';

export const DeleteTransactionModal = ({ onClose, transactionId }) => {
  const [errorMsg, setErrorMsg] = useState('');
  const [deleteTr, result] = useDeleteTransactionMutation();
  const handleDelete = async () => {
    const result = await deleteTr({ transactionId });
    if ('error' in result) {
      if (result.error?.response?.data) {
        setErrorMsg(result.error?.response?.data);
      } else {
        setErrorMsg('Error deleting transaction. Please try again');
      }
    } else {
      onClose();
    }
  };
  const { isLoading } = result;
  return (
    <MmModal
      renderHeader={() => 'Delete Confirmation'}
      renderActions={() => (
        <>
          <Button
            onClick={handleDelete}
            disabled={isLoading}
            color="error"
            variant="contained"
          >
            Yes
          </Button>
          <Button
            disabled={isLoading}
            variant="outlined"
            onClick={() => {
              onClose();
            }}
          >
            No
          </Button>
        </>
      )}
    >
      <Typography textAlign="center" variant="h6">
        Are you sure you want to delete the transaction? Once deleted it cannot
        be recovered.
      </Typography>
      {errorMsg && (
        <Typography variant={'subtitle1'} color="error.main" textAlign="center">
          {errorMsg}
        </Typography>
      )}
    </MmModal>
  );
};

DeleteTransactionModal.propTypes = {
  onClose: PropTypes.func,
  transactionId: PropTypes.number,
};
