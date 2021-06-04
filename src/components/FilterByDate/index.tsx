import React, { useState } from "react";
import api from "../../services/api";
import moment from 'moment';
import DatePicker from "../DatePicker";

import {
  Container,
  Left,
  Right,
  DatepickerContainer,
  Label,
  Button,
} from "./styles";

interface IFilterByDate {
  setFinancialMovements: React.Dispatch<
    React.SetStateAction<
      {
        id: string;
        isMoneyIn: boolean;
        categoryName: string;
        description: string;
        value: string;
        date: string;
      }[]
    >
  >;
}

const FilterByDate: React.FC<IFilterByDate> = ({ setFinancialMovements }) => {
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const handleStartDateChange = (date: any) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: any) => {
    setEndDate(date);
  };

  const removeFilters = async () => {
    setStartDate(null);
    setEndDate(null);
    const { data } = await api.get("/movements");
    const filteredFinancialMovements = data.map((financialMovement: any) => {
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
    setFinancialMovements(filteredFinancialMovements);
    alert('Filtro por datas removido');  
  };
  const filterByDate = async () => {
    if (startDate!==null && endDate !== null){
      const parsedStartDate = moment(startDate).format('DD/MM/YYYY');
      const parsedEndDate = moment(endDate).format('DD/MM/YYYY');
      try {
        const {data} = await api.get('/movements', {params:{startDate: parsedStartDate, endDate:parsedEndDate}});
        const filteredFinancialMovements = data.map((financialMovement: any) => {
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
        setFinancialMovements(filteredFinancialMovements);
        alert('Filtragem pelas datas realizada');
      } catch (error) {
        alert("Erro ao filtrar Movimentações Financeiras");
      }
    }else{
      alert("Informe a data de início e fim do filtro.");
      const { data } = await api.get("/movements");

      const financialMovements = data.map((financialMovement: any) => {
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

      setFinancialMovements(financialMovements);
    } 
  };

  return (
    <Container>
      <Left>
        <DatepickerContainer>
          <Label>Data de Início</Label>
          <DatePicker
            value={startDate}
            placeholder="DD/MM/AAAA"
            handleChange={handleStartDateChange}
            style={{
              backgroundColor: "#fff",
              borderRadius: 3,
              border: "1px solid rgb(75, 92, 107, 0.3)",
              width: 200,
            }}
          />
        </DatepickerContainer>

        <DatepickerContainer>
          <Label>Data de Fim</Label>
          <DatePicker
            value={endDate}
            placeholder="DD/MM/AAAA"
            handleChange={handleEndDateChange}
            style={{
              backgroundColor: "#fff",
              borderRadius: 3,
              border: "1px solid rgb(75, 92, 107, 0.3)",
              width: 200,
            }}
          />
        </DatepickerContainer>
      </Left>
      <Right>
        <Button
          color="#D3455B"
          outlined
          style={{ width: 150 }}
          onClick={removeFilters}
        >
          Remover Fitros
        </Button>
        <Button color="#6558F5" onClick={filterByDate}>
          Filtrar pela data
        </Button>
      </Right>
    </Container>
  );
};

export default FilterByDate;
