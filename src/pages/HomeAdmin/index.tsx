import React, { useEffect, useState } from "react";
import UsersRenderer from "../../components/UsersRenderer";
import NavFixedTop from "../../components/NavFixedTop";

import { Container, Title } from "./styles";
import api from "../../services/api";

interface UserDetail {
  id: string;
  avatar: string;
  name: string;
  email: string;
  allowAccess: boolean;
  status: string;
}

const HomeAdmin: React.FC = () => {
  const [usersToEvaluate, setUsersToEvaluate] = useState<UserDetail[]>([{} as UserDetail]);
  const [approvedUsers, setApprovedUsers] = useState<UserDetail[]>([{} as UserDetail]);

  const getUsersToEvaluate = async () => {
    const { data } = await api.get("/admins/usersToEvaluate/");

    const usersToEvaluate = data.map((MapUser: any) => {
      const {
        id ,
        avatar,
        name,
        email,
        allow_access,
        status
      } = MapUser;
      return {
        id,
        avatar,
        name,
        email,
        allowAccess: allow_access,
        status,
      };
    });
    setUsersToEvaluate(usersToEvaluate);
  };

  const getApprovedUsers = async () => {
    const { data } = await api.get("/admins/approvedUsers/");

    const approvedUsers = data.map((MapUser: any) => {
      const {
        id ,
        avatar,
        name,
        email,
        allow_access,
        status
      } = MapUser;
      return {
        id,
        avatar,
        name,
        email,
        allowAccess: allow_access,
        status,
      };
    });
    setApprovedUsers(approvedUsers);
  };

  useEffect(() => {
    getUsersToEvaluate();
    getApprovedUsers();
  }, []);

  const updateUserLists = () =>{
    getUsersToEvaluate();
    getApprovedUsers();
  }

  return (
    <>
      <NavFixedTop />
      <Container>
        {approvedUsers &&<Title>Usuários Ativos</Title>}
        {approvedUsers && (
          <UsersRenderer
            users={approvedUsers}
            updateUserLists={updateUserLists}
          />
        )}
        {usersToEvaluate &&<Title>Usuários Aguardando Aprovação</Title>}
        {usersToEvaluate && (
          <UsersRenderer
            users={usersToEvaluate}
            updateUserLists={updateUserLists}
          />
        )}
      </Container>
    </>
  );
};

export default HomeAdmin;
