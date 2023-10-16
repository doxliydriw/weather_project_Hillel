import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';

function createData(name, param) {
  return { name, param };
}

const rows = [
  createData('Frozen yoghurt', 159),
  createData('Ice cream sandwich', 237),
  createData('Eclair', 262),
];

export default function ResultTable() {
  const paramsset = useSelector(state => state.data.requestedFromApi)
  const apiResult = useSelector(state => state.data.apiResult)
  console.log(paramsset)
  console.log(apiResult);
  return (
    <p>TEST</p>
    // <TableContainer component={Paper} className='mt-2'>
    //   <Table sx={{ minWidth: 650 }} aria-label="simple table">
    //     <TableHead>
    //       <TableRow>
    //         <TableCell>Requested place: {paramsset.Latitude} - {paramsset.Longitude}</TableCell>
    //         <TableCell align="right">results</TableCell>
    //       </TableRow>
    //     </TableHead>
    //     <TableBody>
    //       {apiResult.data.map((el) => (
    //         <TableRow
    //           key={el.parametr}
    //           sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    //         >
    //           <TableCell component="th" scope="row">
    //             {el.parametr}
    //           </TableCell>
    //           <TableCell align="right">{el.coordinates[0].dates[0].value}</TableCell>
    //         </TableRow>
    //       ))}
    //     </TableBody>
    //   </Table>  
    // </TableContainer>
  );
}
