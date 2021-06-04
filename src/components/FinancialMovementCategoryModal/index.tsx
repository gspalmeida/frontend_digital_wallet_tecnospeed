import React, { FormEvent } from "react";
import { useState } from "react";


import { CloseIcon, InputBlock, Input } from "./styles";

import CardForm from "../CardForm";
import api from "../../services/api";

interface ModalInterface {
  modalCategoryDetail: CategoryInterface;
  setCategoryModalState: React.Dispatch<React.SetStateAction<boolean>>;
}

interface CategoryInterface {
  id: string;
  categoryName: string;
}

const FinancialMovementCategoryModal: React.FC<ModalInterface> = ({ modalCategoryDetail, setCategoryModalState }) => {

  const id = modalCategoryDetail.id;
  const [categoryName, setCategoryName] = useState(modalCategoryDetail.categoryName);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!categoryName || !id ) {
      window.alert("O nome da categoria não pode ficar vazio");
    }
    const data = {
      categoryName: categoryName
    };
    try {
      await api.put(`/categories/${modalCategoryDetail.id}`, data);
      setCategoryModalState(false);
    } catch (error) {
      alert(
        "Erro ao salvar alteração, tente novamente.\n\nCaso o problema persista entre em" +
        " contato com o administrador através do contato abaixo: \n\n Gustavo - (44) 9 9957-1618"
      );
    }
  };

  if (!modalCategoryDetail) {
    return null;
  }
  return (
    <>
      <CloseIcon onClick={() => {setCategoryModalState(false);}}/>
      <CardForm
        title={`Editar Categoria`}
        buttonTitle="Aplicar Alterações"
        onSubmit={handleSubmit}
        style={{
          background: "rgba(0,0,0,0.85)",
          position: "absolute",
          top: 0,
          left: 0,
        }}
      >
        <InputBlock>
          <Input
            required
            placeholder="Nome da categoria"
            value={categoryName}
            onChange={(e) => {
              setCategoryName(e.target.value);
            }}
          />
        </InputBlock>
      </CardForm>
    </>
  );
};

export default FinancialMovementCategoryModal;
