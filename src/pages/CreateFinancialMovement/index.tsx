import React, { FormEvent, useEffect, useState } from "react";
import CardForm from "../../components/CardForm";

import { InputBlock, Input } from "./styles";
import DatePicker from "../../components/DatePicker";

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';

import api from "../../services/api";
import { useHistory } from "react-router-dom";

interface MovementCategoryInterface {
  id?: string;
  categoryName: string;
  inputValue?:string;
} 


const filter = createFilterOptions<MovementCategoryInterface>();


const CreateFinancialMovement: React.FC = () => {
  const history = useHistory();
  
  const [isMoneyIn, setIsMoneyIn] = React.useState('true');
  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsMoneyIn((event.target as HTMLInputElement).value);
  };

  const [financialMovementCategories, setFinancialMovementCategories] = useState<MovementCategoryInterface[]>([{id:'string', categoryName:'nome'}])
  const [value, setValue] = React.useState<MovementCategoryInterface | null>(null);
  const getFinancialMovementCategories = async () => {
    const { data } = await api.get("/categories");
    const selectMovementCategoriesData = data.map((financialMovementCategory: any) => {
      const { id, movement_category_name: movementCategory } = financialMovementCategory;
      return {
        id,
        categoryName: movementCategory,
      };
    });
    setFinancialMovementCategories(selectMovementCategoriesData);
  };

  const [description, setDescription] = useState("");
  const [movementValue, setServiceValue] = useState("");

  const [selectedDate, setSelectedDate] = useState<Date|null>(null);
  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (
      !description ||
      !movementValue ||
      !selectedDate
    ) {
      window.alert("Preencha todos os dados campos do formulário");
      return;
    }
    const data = {
      category: value?.categoryName,
      description: description,
      value: movementValue,
      date: selectedDate.toLocaleDateString("pt-br"),
      isMoneyIn,
    };
    try {
      await api.post("/movements", data);
      history.push("/");
    } catch (error) {
      alert(
        "Erro ao salvar a movimentação, tente novamente.\n Caso o problema persista entre em" +
        "contato com o administrador através do telefone abaixo: \n\n Gustavo - (44) 9 9957-1618"
      );
    }
  };

  useEffect(() => {
    getFinancialMovementCategories();
  }, []);

  return (
    <CardForm
      subtitle="Não deseja mais realizar um cadastro?"
      subtitleLink="Voltar"
      subtitleLinkHref="/"
      title={`Nova Movimentação Financeira`}
      buttonTitle="Salvar Movimentação"
      onSubmit={handleSubmit}
    >
      <InputBlock>

        <Divider style={{marginBottom:'20px'}}/>

        <FormControl component="fieldset" style={{alignItems:'center'}}>
          <FormLabel component="legend" style={{width:'100%', textAlign:'center', color:'#000', fontWeight:'bolder', paddingBottom:'8px'}}>Tipo da Movimentação</FormLabel>
          <RadioGroup row aria-label="isMoneiIn" name="isMoneyIn" value={isMoneyIn} onChange={handleRadioChange}>
            <FormControlLabel value="true" control={<Radio />} label="Entrada" />
            <FormControlLabel value="false" control={<Radio />} label="Saida" />
          </RadioGroup>
        </FormControl>

        <Divider style={{marginTop:'10px', marginBottom:'20px'}}/>

        <Autocomplete
          value={value}
          onChange={(event, newValue) => {
            if (typeof newValue === 'string') {
              setValue({
                categoryName: newValue,
              });
            } else if (newValue && newValue.inputValue) {
              // Create a new value from the user input
              setValue({
                categoryName: newValue.inputValue,
              });
            } else {
              setValue(newValue);
            }
          }}
          filterOptions={(options, params) => {
            const filtered = filter(options, params);
            // Suggest the creation of a new value
            if (params.inputValue !== '') {
              filtered.push({
                inputValue: params.inputValue,
                categoryName: `Adicionar "${params.inputValue}"`,
              });
            }
            return filtered;
          }}
          selectOnFocus
          clearOnBlur
          handleHomeEndKeys
          id="category-input"
          options={financialMovementCategories}
          getOptionLabel={(option) => {
            // Value selected with enter, right from the input
            if (typeof option === 'string') {
              return option;
            }
            // Add "xxx" option created dynamically
            if (option.inputValue) {
              return option.inputValue;
            }
            // Regular option
            return option.categoryName;
          }}
          renderOption={(option) => option.categoryName}
          freeSolo
          style={{marginBottom:'15px'}}
          renderInput={(params) => (
            <TextField {...params} label="Categoria da Movimentação" variant="filled" />
          )}
        />

        <Input
          required
          placeholder="Descrição da movimentação"
          value={description}
          onChange={(e: any) => {
            setDescription(e.target.value);
          }}
        />
        <Input
          required
          placeholder="Valor"
          type="number"
          step = ".01"
          value={movementValue}
          onChange={(e) => {
            setServiceValue(e.target.value);
          }}
        />

        <DatePicker
          value={selectedDate}
          placeholder="Data da Movimentação"
          handleChange={handleDateChange}
        />
      </InputBlock>
    </CardForm>
  );
};

export default CreateFinancialMovement;
