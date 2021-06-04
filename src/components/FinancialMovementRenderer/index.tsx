import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import ButtonDelete from "../ButtonDelete";
import ButtonEdit from "../ButtonEdit";
import api from "../../services/api";

interface FinancialMovementDetail {
  id: string;
  isMoneyIn: boolean;
  description: string;
  categoryName: string;
  value: string;
  date: string;
}

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
  setFinancialMovementsModalState: React.Dispatch<React.SetStateAction<boolean>>;
  setModalFinancialMovementDetail: React.Dispatch<React.SetStateAction<FinancialMovementDetail>>;
}

const MyTable: React.FC<IMyTable> = ({
  financialMovements,
  getFinancialMovements,
  setFinancialMovementsModalState,
  setModalFinancialMovementDetail,
}) => {
  const deleteFinancialMovement = async (id: string) => {
    await api.delete(`/services/${id}`);
    getFinancialMovements();
  };
  const editFinancialMovement = (id: string) => {
    const financialMovement = financialMovements.find((financialMovement) => financialMovement.id === id);

    setFinancialMovementsModalState(true);
    if (financialMovement) {
      setModalFinancialMovementDetail(financialMovement);
    } else {
      setModalFinancialMovementDetail({} as FinancialMovementDetail);
    }
  };

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
