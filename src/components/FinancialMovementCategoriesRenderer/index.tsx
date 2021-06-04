import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import ButtonEdit from "../ButtonEdit";

interface MovementCategoryDetail {
  id: string;
  categoryName: string;
}

interface IMyTable {
  movementCategories: {
    id: string;
    categoryName: string;
  }[];
  getMovementCategories: () => Promise<void>;
  setCategoryModalState: React.Dispatch<React.SetStateAction<boolean>>;
  setModalCategoryDetail: React.Dispatch<React.SetStateAction<MovementCategoryDetail>>;
}

const ServiceTypesRenderer: React.FC<IMyTable> = ({
  movementCategories,
  setCategoryModalState,
  setModalCategoryDetail,
  getMovementCategories,
}) => {
  const editCategory = (id: string) => {
    const category = movementCategories.find((movementCategory) => movementCategory.id === id);

    setCategoryModalState(true);
    if (category) {
      setModalCategoryDetail(category);
    } else {
      setModalCategoryDetail({} as MovementCategoryDetail);
    }
  };

  return (
    <TableContainer component={Paper} style={{ marginTop: 30 }}>
      <Table style={{ minWidth: 650 }} size="small" aria-label="Table with TypeServices">
        <TableHead>
          <TableRow>
            <TableCell><p style={{fontWeight:600, fontSize:15}}>Nomes das Categorias</p></TableCell>
            <TableCell align="right"><p style={{fontWeight:600, fontSize:15}}>Ações</p></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {movementCategories.map((category) => (
            <TableRow key={category.id}>
              <TableCell component="th" scope="row">
                {category.categoryName}
              </TableCell>
              <TableCell align="right" style={{ display: "flex" }}>
                <ButtonEdit onClick={() => editCategory(category.id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default ServiceTypesRenderer;
