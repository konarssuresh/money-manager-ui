import { useState } from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import { chunk } from 'lodash';

const StyledTableCell = styled(TableCell)(
  ({ theme, hideOnMobile, hideOnDesktop }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
    [theme.breakpoints.down('sm')]: {
      paddingLeft: 0,
      paddingRight: 0,
    },
    ...(hideOnMobile
      ? {
          [theme.breakpoints.down('sm')]: {
            display: 'none',
            padding: 0,
          },
        }
      : {}),
    ...(hideOnDesktop
      ? {
          [theme.breakpoints.up('sm')]: {
            display: 'none',
          },
        }
      : {}),
  })
);

const StyledTableRow = styled(TableRow)(({ theme, hideOnDesktop }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },

  ...(hideOnDesktop
    ? {
        [theme.breakpoints.up('sm')]: {
          display: 'none',
        },
      }
    : {}),
}));

const StyledPagination = styled(TablePagination)(() => ({
  padding: 0,
  textAlign: 'right',
  '& .MuiTablePagination-toolbar': {
    padding: 0,
  },
  '& .MuiTablePagination-input': {
    marginRight: '1rem',
    marginLeft: '0.5rem',
  },
  '& .MuiTablePagination-actions': {
    marginLeft: 0,
  },
}));

const DataTableRow = ({
  columns,
  data,
  keyField,
  rowIndex,
  renderHiddenView,
}) => {
  const [open, setOpen] = useState(false);

  const filteredColumns = columns.filter((c) => c.hideOnMobile);
  return (
    <>
      <StyledTableRow key={data[keyField]}>
        <StyledTableCell hideOnDesktop>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </StyledTableCell>
        {columns.map((columnData, ci) => (
          <StyledTableCell hideOnMobile={columnData.hideOnMobile} key={ci}>
            {columnData.renderData
              ? columnData.renderData(data, rowIndex)
              : data[columnData.fieldKey]}
          </StyledTableCell>
        ))}
      </StyledTableRow>
      <StyledTableRow hideOnDesktop>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={filteredColumns.length + 1}
        >
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>{renderHiddenView(data)}</Box>
          </Collapse>
        </TableCell>
      </StyledTableRow>
    </>
  );
};

DataTableRow.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.object,
  keyField: PropTypes.string,
  rowIndex: PropTypes.number,
  renderHiddenView: PropTypes.func,
};

export const DataTable = ({
  columns,
  data,
  keyField,
  pagination,
  renderHiddenView,
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [pages, setPages] = useState(chunk(data, rowsPerPage));

  const handleRowsPerPageChange = (e) => {
    setPage(0);
    const rowsPerPage = parseInt(e.target.value, 10);
    setRowsPerPage(rowsPerPage);
    setPages(chunk(data, rowsPerPage));
  };

  const handlePageChange = (e, newPage) => {
    setPage(newPage);
  };

  const renderHeader = () => {
    return (
      <TableHead>
        <TableRow>
          <StyledTableCell hideOnDesktop />
          {columns.map((columnData) => (
            <StyledTableCell
              hideOnMobile={columnData.hideOnMobile}
              key={columnData.fieldKey}
              width={columnData.width}
            >
              {columnData.header}
            </StyledTableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  };

  const renderBody = () => {
    const data = pages[page];
    return (
      <TableBody>
        {data?.map((row, ri) => {
          return (
            <DataTableRow
              key={ri}
              data={row}
              columns={columns}
              rowIndex={ri}
              keyField={keyField}
              renderHiddenView={renderHiddenView}
            />
          );
        })}
      </TableBody>
    );
  };

  return (
    <>
      {pagination && (
        <StyledPagination
          component="div"
          count={data.length}
          page={page}
          rowsPerPage={rowsPerPage}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      )}
      <TableContainer
        sx={{ width: '100%', overflow: 'auto' }}
        component={Paper}
      >
        <Table sx={{ width: '100%' }} aria-label="customized table">
          {renderHeader()}
          {renderBody()}
        </Table>
      </TableContainer>
    </>
  );
};

DataTable.propTypes = {
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      fieldKey: PropTypes.string,
      width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      header: PropTypes.any,
    })
  ),
  data: PropTypes.array,
  keyField: PropTypes.string,
  pagination: PropTypes.bool,
  renderHiddenView: PropTypes.func,
};
