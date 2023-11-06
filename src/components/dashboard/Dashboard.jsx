/* eslint-disable react/display-name */

import { useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import CircularProgress from '@mui/material/CircularProgress';
import MonthAndYearSelect from './MonthAndYearSelect';
import Box from '@mui/material/Box';
import { useGetTransactionByMonthAndYearQuery } from '../../apis';
import { selectedMonthAndYearSelector } from '../../selectors';
import { Typography } from '@mui/material';
import { HeaderCard } from './HeaderCard';
import { DashboardTable } from './DashboardTable';

const getTotals = (data = []) => {
  let income = 0,
    expense = 0,
    balance = 0;

  const sumIncome = data.reduce((acc, currentValue) => {
    if (currentValue.type === 'Income') {
      return acc + currentValue.value;
    } else {
      return acc;
    }
  }, income);

  const sumExpense = data.reduce((acc, currentValue) => {
    if (currentValue.type === 'Expense') {
      return acc + currentValue.value;
    } else {
      return acc;
    }
  }, expense);

  balance = sumIncome - sumExpense;

  return {
    income: sumIncome,
    expense: sumExpense,
    balance,
  };
};

const Dashboard = () => {
  const { selectedMonth, selectedYear } = useSelector(
    selectedMonthAndYearSelector
  );
  const {
    refetch,
    isFetching,
    isError,
    data = [],
  } = useGetTransactionByMonthAndYearQuery({
    year: selectedYear,
    month: selectedMonth,
  });

  const totals = getTotals(data);

  return (
    <Container maxWidth="xl">
      <Grid pt={2} container spacing={1}>
        <Grid item md={9} xs={12}>
          <Typography variant="h4">Dashboard</Typography>
        </Grid>
        <Grid item md={3} xs={12}>
          <MonthAndYearSelect onYearAndMonthChange={refetch} />
        </Grid>
      </Grid>

      {isFetching ? (
        <Box
          sx={{
            height: '60vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <CircularProgress />
        </Box>
      ) : isError ? (
        <Typography color="danger.main">
          Error in fetching transaction Details
        </Typography>
      ) : (
        <>
          <Grid mt={2} spacing={1} container>
            <HeaderCard
              header="Total Earnings"
              value={totals.income}
              isSuccess
            />
            <HeaderCard
              header="Total Expense"
              value={totals.expense}
              isNegative
            />
            <HeaderCard header="Balance" value={totals.balance} isInfo />
          </Grid>

          <Grid spacing={2} container mt={2}>
            <Grid item xs={12}>
              <Typography variant="h5">Details</Typography>
            </Grid>
            <Grid item xs={12}>
              <DashboardTable data={data} />
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
};

export default Dashboard;
