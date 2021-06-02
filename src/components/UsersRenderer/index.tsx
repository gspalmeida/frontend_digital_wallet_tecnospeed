import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import ButtonApprove from "../ButtonApprove";
import ButtonDisaprove from "../ButtonDisaprove";
import api from "../../services/api";

interface IUsersTable {
  users: {
    id: string,
    avatar: string,
    name: string,
    email: string,
    allowAccess: boolean,
    status: string,
  }[];
  getUsers: () => Promise<void>;
}

const UsersTable: React.FC<IUsersTable> = ({
  users,
  getUsers,
}) => {
  const approveUser = async (id: string) => {
    await api.put(`/admins/users/${id}`);
    getUsers();
  };
  const deleteUser = async (id: string) => {
    await api.delete(`/admins/users/${id}`);
    getUsers();
  };

  return (
    <TableContainer component={Paper} style={{ marginTop: 30 }}>
      <Table style={{ minWidth: 650 }} size="small" aria-label="A list of users">
        <TableHead>
          <TableRow>
            <TableCell><p style={{fontWeight:600, fontSize:15}}>Nome</p></TableCell>
            <TableCell align="left"><p style={{fontWeight:600, fontSize:15}}>Email</p></TableCell>
            <TableCell align="left"><p style={{fontWeight:600, fontSize:15}}>Acesso à Plataforma</p></TableCell>
            <TableCell width="100px" align="left">
            <p style={{fontWeight:600, fontSize:15}}>Ações</p>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell component="th" scope="row">
                {user.name}
              </TableCell>
              <TableCell align="left">{user.email}</TableCell>
              <TableCell align="left">
                {user.allowAccess === false && "Aguardando Aprovação"}
              </TableCell>
              <TableCell align="right" style={{ display: "flex" }}>
                <ButtonDisaprove onClick={() => deleteUser(user.id)} />
                <ButtonApprove onClick={() => approveUser(user.id)} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default UsersTable;
