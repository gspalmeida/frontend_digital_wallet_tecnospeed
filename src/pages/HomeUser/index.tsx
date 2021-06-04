import React, { useEffect, useState } from "react";
import FinancialMovementRenderer from "../../components/FinancialMovementRenderer";
import FinancialMovementCategoryModal from "../../components/FinancialMovementCategoryModal";
import FinancialMovementCategoriesRenderer from "../../components/FinancialMovementCategoriesRenderer";
import Header from "../../components/NavFixedTop";
import {CSVLink} from 'react-csv';

import { Container, Title } from "./styles";
import api from "../../services/api";
import FilterByDate from "../../components/FilterByDate";

interface CategoryInterface {
  id: string;
  categoryName: string;
}

interface FinancialMovementInterface {
  id: string;
  isMoneyIn: boolean;
  categoryName: string;
  description: string;
  value: string;
  date: string;
}


const HomeUser: React.FC = () => {
  const [financialMovements, setFinancialMovements] = useState<FinancialMovementInterface[]>([{} as FinancialMovementInterface]);
  const getFinancialMovements = async () => {
    const { data } = await api.get("/movements");

    const financialMovementsData = data.map((financialMovement: any) => {
      const {
        id,
        category,
        description,
        value,
        movement_date,
        isMoneyIn,
      } = financialMovement;
      return {
        movementId:id,
        categoryName:category.movement_category_name,
        description,
        value,
        date:movement_date,
        isMoneyIn,
      };
    });
    setFinancialMovements(financialMovementsData);
  };

  const [movementCategories, setMovementCategories] = useState<CategoryInterface[]>([{} as CategoryInterface]);
  const [categoriesModalState, setCategoryModalState] = useState(false);
  const [modalCategoryDetail, setModalCategoryDetail] = useState<CategoryInterface>(
    {} as CategoryInterface
  );
  const getMovementCategories = async () => {
    const { data } = await api.get("/categories");

    const movementCategoriesData = data.map((movementCategory: any) => {
      const {
        id,
        movement_category_name
      } = movementCategory;
      return {
        id,
        categoryName: movement_category_name
      };
    });
    setMovementCategories(movementCategoriesData);
  };

  useEffect(() => {
    if (!categoriesModalState) {
      getMovementCategories();
      getFinancialMovements();
    }
  }, [categoriesModalState]);

  const csvHeaders = [
    {label: 'Descrição', key: 'description'},
    {label: 'Categoria da Movimentação', key: 'categoryName'},
    {label: 'Valor', key: 'value'},
    {label: 'Data', key: 'date'},
    {label: 'É Entrada?', key: 'isMoneyIn'},
  ];
  const csvReport = {
    filename: "Movimentações Financeiras.csv",
    headers: csvHeaders,
    data: financialMovements
  }

  return (
    <>
      <Header />
      <Container>
        <Title>Movimentações Financeiras</Title>
        <FilterByDate setFinancialMovements={setFinancialMovements}/>
        {financialMovements[0] ? (
          <FinancialMovementRenderer
            financialMovements={financialMovements}
            getFinancialMovements={getFinancialMovements}
          />
        ): <p><br/>Nenhuma Movimentação Financeira Cadastrada</p>}
        
        <CSVLink {...csvReport}>Exportar Movimentações para CSV</CSVLink>
        
        <Title>Categorias de Movimentações</Title>
        {movementCategories[0] ? (
          <FinancialMovementCategoriesRenderer
            movementCategories={movementCategories}
            getMovementCategories={getMovementCategories}
            setCategoryModalState={setCategoryModalState}
            setModalCategoryDetail={setModalCategoryDetail}
          />
        ): <p>Nenhuma categoria Cadastrada</p>}
        {categoriesModalState && (
          <FinancialMovementCategoryModal
            modalCategoryDetail={modalCategoryDetail}
            setCategoryModalState={setCategoryModalState}
          />
        )}
      </Container>
    </>
  );
};

export default HomeUser;
