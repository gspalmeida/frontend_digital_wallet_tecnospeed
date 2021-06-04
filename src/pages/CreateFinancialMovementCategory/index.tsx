import React, { FormEvent, useState } from "react";
import CardForm from "../../components/CardForm";

import { InputBlock, Input } from "./styles";

import api from "../../services/api";
import { useHistory } from "react-router-dom";

const CreateFinancialMovementCategory: React.FC = () => {
  const history = useHistory();

  const [categoryName, setCategoryName] = useState("");


  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!categoryName) {
      window.alert("Preencha o nome da nova Categoria");
      return;
    }
    const data = {
      categoryName: categoryName,
    };
    try {
      await api.post("/categories", data);
      if (window.confirm("Sua Categoria foi criada, deseja criar mais categorias?")) {
        setCategoryName('');
      }else{
        history.push('/');
      }
    } catch (error) {
      alert(
        "Erro ao salvar nova categoria, tente novamente.\n\nCaso o problema persista entre em " +
        "contato com o administrador através do contato abaixo: \n\n Gustavo - (44) 9 9957-1618"
      );
    }
  };

  return (
    <CardForm
      subtitle="Não quer mais criar categorias?"
      subtitleLink="Voltar"
      subtitleLinkHref="/"
      title={`Cadastrar nova Categoria`}
      buttonTitle="Salvar Categoria"
      onSubmit={handleSubmit}
    >
      <InputBlock>
        <Input
          required
          placeholder="Nome da nova Categoria"
          value={categoryName}
          onChange={(e) => {
            setCategoryName(e.target.value);
          }}
        />
      </InputBlock>
    </CardForm>
  );
};

export default CreateFinancialMovementCategory;
