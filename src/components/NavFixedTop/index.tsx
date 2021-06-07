import React, { useEffect, useState} from "react";
import { useHistory } from "react-router-dom";

import { useAuth } from '../../hooks/auth';
import api from "../../services/api";

import {
  Container,
  Wrapper,
  Left,
  Right,
  Avatar,
  Username,
  Button,
  ButtonSm,
  WalletBalance,
  Center,
} from "./styles";

interface ParsedUserProps {
  avatar: string|undefined;
  name: string;
}


const NavFixedTop: React.FC = () => {
  const [walletBalance, setWalletBalance] = useState('');
  let parsedUser: ParsedUserProps = {avatar:'', name:'Saindo...'};
  const history = useHistory();
  
  const { signOut } = useAuth();
  const admin = localStorage.getItem('@dwt:admin');
  const user = localStorage.getItem('@dwt:user');
  

  if (admin !== 'undefined' && admin ){
    const parsedAdmin = JSON.parse(admin);
    parsedUser = {avatar: parsedAdmin.avatar, name: parsedAdmin.name};
  }
  if(user !== 'undefined' && user){
    const parsedProvider = JSON.parse(user);
    parsedUser = {avatar: parsedProvider.avatar, name: parsedProvider.name};
  }

  const getWalletBalance = async () => {
    const { data } = await api.get("/users/saldo");

    console.log(data);

    setWalletBalance(data);
  };

  useEffect(() => {
    if (user!=='undefined'){
      getWalletBalance();
    }
  }, [user]);

  return (
    <Container>
      <Wrapper>
        <Left>
          {walletBalance!=='' && 
            <WalletBalance>Saldo: {walletBalance}</WalletBalance>
          }
        </Left>
        <Center>
          {user!=='undefined' && 
            <>
              <Button color="#2dab03" onClick={()=>{history.push('/novamovimentacao')}}>
                Nova Movimentação Financeira
              </Button>
              <Button color="#2dab03" onClick={()=>{history.push('/categories')}}>
                Nova Categoria
              </Button>
            </>
          }
        </Center>
        <Right>
          <Avatar src={process.env.REACT_APP_API_URL + 'files/'+parsedUser.avatar} />
          <Username>{parsedUser.name}</Username>
          <ButtonSm outlined color="#ffffff" onClick={() => {
            history.push('/');
            signOut()}}> 
            Sair
          </ButtonSm>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default NavFixedTop;
