import React from "react";
import { useHistory } from "react-router-dom";

import { useAuth } from '../../hooks/auth';

import {
  Container,
  Wrapper,
  Left,
  Right,
  Avatar,
  Username,
  Button,
  ButtonSm,
  Brand,
} from "./styles";

interface ParsedUserProps {
  avatar: string|undefined;
  name: string;
}


const NavFixedTop: React.FC = () => {
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

  return (
    <Container>
      <Wrapper>
        <Left>
          <Brand>Digital Wallet</Brand>
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
        </Left>
        <Right>
          <Avatar src={'http://localhost:1919/files/'+parsedUser.avatar} />
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
