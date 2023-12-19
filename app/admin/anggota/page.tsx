import { Table } from "@radix-ui/themes";
import React from "react";

const AnggotaPage = () => {
  return (
    <div className="mx-6 my-6">
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row align={"center"}>
            <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Nama</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Email</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>No Anggota</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row align={"center"}>
            <Table.RowHeaderCell>1</Table.RowHeaderCell>
            <Table.Cell>Alam Sanjaya</Table.Cell>

            <Table.Cell>raden@gmail.com</Table.Cell>
            <Table.Cell>2013055168</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default AnggotaPage;
