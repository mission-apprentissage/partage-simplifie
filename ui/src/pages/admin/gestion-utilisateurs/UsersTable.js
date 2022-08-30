import {
  Box,
  Button,
  Menu,
  MenuButton,
  MenuList,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import PropTypes from "prop-types";
import React from "react";

import { BasePagination } from "../../../common/components/Pagination/Pagination";
import usePaginatedItems from "../../../common/hooks/usePaginatedItems";
import { formatDate } from "../../../common/utils/dateUtils";
import GetUpdatePasswordUrlMenuItem from "./menuItems/GetUpdatePasswordUrlMenuItem";

const UsersTable = ({ users }) => {
  // Pagination hook
  const [current, setCurrent, itemsSliced] = usePaginatedItems(users);

  return (
    <Table variant="secondary">
      <TableCaption>
        <BasePagination
          current={current}
          onChange={(page) => {
            setCurrent(page);
          }}
          total={users?.length}
        />
      </TableCaption>
      <Thead>
        <Tr background="galt">
          <Th>Nom d&apos;utilisateur</Th>
          <Th>Email</Th>
          <Th>Role</Th>
          <Th>Nom établissement</Th>
          <Th>Date de création</Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {itemsSliced?.map((user) => {
          return (
            <Tr key={user.id}>
              <Td color="bluefrance">{user.username}</Td>
              <Td color="grey.800">{user.email}</Td>
              <Td color="grey.800">{user.role}</Td>
              <Td color="grey.800">{user.nom_etablissement}</Td>
              <Td color="grey.800">{user.created_at ? formatDate(new Date(user.created_at)) : "Inconnue"}</Td>
              <Td color="grey.800">
                <Menu>
                  <MenuButton
                    variant="secondary"
                    as={Button}
                    rightIcon={<Box as="i" className="ri-arrow-down-s-fill" />}
                  >
                    Action
                  </MenuButton>
                  <MenuList>
                    <GetUpdatePasswordUrlMenuItem username={user.username} />
                  </MenuList>
                </Menu>
              </Td>
            </Tr>
          );
        })}
      </Tbody>
    </Table>
  );
};

UsersTable.propTypes = {
  users: PropTypes.array,
};
export default UsersTable;
