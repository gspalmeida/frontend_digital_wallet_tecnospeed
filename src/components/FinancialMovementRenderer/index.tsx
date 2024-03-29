import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

interface IMyTable {
  financialMovements: {
    id: string;
    isMoneyIn: boolean;
    categoryName: string;
    description: string;
    value: string;
    date: string;
  }[];
  getFinancialMovements: () => Promise<void>;
}

const MyTable: React.FC<IMyTable> = ({
  financialMovements,
  getFinancialMovements,
}) => {

  return (
    <TableContainer component={Paper} style={{ marginTop: 30 }}>
      <Table style={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell align="left"><p style={{fontWeight:600, fontSize:15}}>Tipo</p></TableCell>
            <TableCell><p style={{fontWeight:600, fontSize:15}}>Descrição</p></TableCell>
            <TableCell width="100px" align="left">
            <p style={{fontWeight:600, fontSize:15}}>Categoria</p>
            </TableCell>
            <TableCell align="left"><p style={{fontWeight:600, fontSize:15}}>Valor</p></TableCell>
            <TableCell align="left"><p style={{fontWeight:600, fontSize:15}}>Data</p></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {financialMovements.map((financialMovement) => (
            <TableRow key={financialMovement.id}>
              <TableCell component="th" scope="row">
              {
                financialMovement.isMoneyIn===true ? (
                  <p>Entrada</p>
                ): <p>Saída</p>
              }
              </TableCell>
              <TableCell align="left">{financialMovement.description}</TableCell>
              <TableCell width="400px" align="left">
                {financialMovement.categoryName}
              </TableCell>
              <TableCell align="left">R$ {financialMovement.value}</TableCell>
              <TableCell align="left">{financialMovement.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MyTable;
