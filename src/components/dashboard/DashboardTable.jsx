import { AddTransactionModal } from './AddTransactionModal';
import { DeleteTransactionModal } from './DeleteTransactionModal';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { showModal, DataTable } from '../../customComponents';
import { getFormattedRupee } from '../../utils/commonUtils';
import dayjs from 'dayjs';
import PropTypes from 'prop-types';

export const DashboardTable = ({ data = [] }) => {
  const handleEdit = (d) => {
    const closeModal = showModal(
      <AddTransactionModal
        isEdit
        initialValues={d}
        onClose={() => {
          closeModal();
        }}
      />
    );
  };

  const handleDelete = (d) => {
    const closeModal = showModal(
      <DeleteTransactionModal
        transactionId={d?.transactionId}
        onClose={() => {
          closeModal();
        }}
      />
    );
  };

  const columns = [
    {
      header: 'S.No',
      hideOnMobile: true,
      renderData: (d) => {
        return d.sNo;
      },
    },
    {
      header: 'Date',
      hideOnMobile: true,
      renderData: (d) => {
        return dayjs(d.transactionDate).format('MM/DD/YYYY');
      },
    },
    {
      header: 'Detail',
      hideOnMobile: true,
      renderData: (d) => {
        return d.comment;
      },
    },
    {
      header: 'Type',
      width: 2,
      renderData: (d) => {
        return d.name;
      },
    },
    {
      header: 'Income/Expense',
      hideOnMobile: true,
      renderData: (d) => {
        return d.type;
      },
    },
    {
      header: 'Amount',
      renderData: (d) => {
        return (
          <Typography
            color={d.type === 'Income' ? 'success.main' : 'error.main'}
          >
            <i className="fa fa-inr"></i>
            {getFormattedRupee(d.value)}
          </Typography>
        );
      },
    },
    {
      header: 'Actions',
      hideOnMobile: true,
      renderData: (d) => {
        return (
          <Box sx={{ display: 'flex', columnGap: 1 }}>
            <Button
              onClick={() => {
                handleEdit(d);
              }}
              sx={{ bgcolor: 'primary.main', color: 'white' }}
            >
              Edit
            </Button>
            <Button
              sx={{ bgcolor: 'error.main', color: 'white' }}
              onClick={() => {
                handleDelete(d);
              }}
            >
              Delete
            </Button>
          </Box>
        );
      },
    },
  ];

  const renderHiddenView = (d) => {
    return (
      <div>
        <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 1 }}>
          <Typography variant="subtitle1">s.no</Typography>
          <Typography variant="subtitle2" color="info.main">
            {d.sNo}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 1 }}>
          <Typography variant="subtitle1">Transaction Id</Typography>
          <Typography variant="subtitle2" color="info.main">
            {d.transactionId}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 1 }}>
          <Typography variant="subtitle1">Date</Typography>
          <Typography variant="subtitle2" color="info.main">
            {dayjs(d.transactionDate).format('MM/DD/YYYY')}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 1 }}>
          <Typography variant="subtitle1">Income/Expense</Typography>
          <Typography variant="subtitle2" color="info.main">
            {d.type}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 1 }}>
          <Typography variant="subtitle1">Detail</Typography>
          <Typography variant="subtitle2" color="info.main">
            {d.comment}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', columnGap: 1 }}>
          <Button
            onClick={() => {
              handleEdit(d);
            }}
            sx={{ bgcolor: 'primary.main', color: 'white' }}
          >
            Edit
          </Button>
          <Button
            sx={{ bgcolor: 'error.main', color: 'white' }}
            onClick={() => {
              handleDelete(d);
            }}
          >
            Delete
          </Button>
        </Box>
      </div>
    );
  };

  return (
    <DataTable
      columns={columns}
      data={data.map((d, i) => ({ ...d, sNo: i + 1 }))}
      keyField="transactionId"
      pagination
      renderHiddenView={renderHiddenView}
    />
  );
};

DashboardTable.propTypes = {
  data: PropTypes.array,
};
