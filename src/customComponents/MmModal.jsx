import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';

const StyledDialog = styled(Dialog)({
  '& .MuiDialog-paper': {
    overflowY: 'visible',
  },
});
export const MmModal = ({
  renderHeader,
  children,
  renderActions,
  maxWidth = 'md',
  fullScreen,
  fullWidth = true,
  disableEscapeKeyDown = true,
  ...remainingDialogProps
}) => {
  return (
    <StyledDialog
      open
      maxWidth={maxWidth}
      fullScreen={fullScreen}
      disableEscapeKeyDown={disableEscapeKeyDown}
      fullWidth={fullWidth}
      {...remainingDialogProps}
    >
      <DialogTitle>{renderHeader()}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>{renderActions()}</DialogActions>
    </StyledDialog>
  );
};

MmModal.propTypes = {
  renderHeader: PropTypes.func,
  children: PropTypes.any,
  renderActions: PropTypes.func,
  maxWidth: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl']),
  fullScreen: PropTypes.bool,
  disableEscapeKeyDown: PropTypes.bool,
  fullWidth: PropTypes.bool,
};
