import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import { getFormattedRupee } from '../../utils/commonUtils';

export const HeaderCard = ({
  header,
  value,
  isNegative,
  isSuccess,
  isInfo,
}) => {
  const getColor = () => {
    if (isNegative) {
      return 'error.main';
    } else if (isSuccess) {
      return 'success.main';
    } else if (isInfo) {
      return 'primary.main';
    }
  };
  return (
    <Grid item xs={12} sm={6} md={4}>
      <Card raised>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography gutterBottom variant="h4" component="div">
            {header}
          </Typography>
          <Typography
            textAlign="end"
            variant="h3"
            component="div"
            color={getColor()}
          >
            <i className="fa fa-inr"></i>
            {getFormattedRupee(value)}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

HeaderCard.propTypes = {
  header: PropTypes.string,
  value: PropTypes.number,
  isNegative: PropTypes.bool,
  isSuccess: PropTypes.bool,
  isInfo: PropTypes.bool,
};
