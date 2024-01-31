"use client";
import React from "react";
import {
  Input,
  Table,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { FaRegTrashCan } from "react-icons/fa6";
import { IconButton } from "@chakra-ui/react";
import { users } from "@/app/data";
const UsersPage = () => {
  return (
    <div>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Th>#</Th>
              <Th>Correo</Th>
              <Th>Creado en</Th>
              <Th>Acciones</Th>
            </Tr>
          </Thead>
          <Tbody>
            {users.map((u, i) => {
              return (
                <Tr key={u.id}>
                  <Td>{i + 1}</Td>
                  <Td>{u.email}</Td>
                  <Td>tomorrow</Td>
                  <Td>
                    <IconButton
                      aria-label="Delete User"
                      icon={<FaRegTrashCan />}
                    />
                  </Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default UsersPage;
