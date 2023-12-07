import React from "react";
import { Table } from "@radix-ui/themes";

const barang = () => {
  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Nama Barang</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Peminjam</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Tanggal Mulai</Table.ColumnHeaderCell>
          <Table.ColumnHeaderCell>Tanggal Berakhir</Table.ColumnHeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        <Table.Row>
          <Table.RowHeaderCell>1</Table.RowHeaderCell>
          <Table.Cell>Kamera</Table.Cell>
          <Table.Cell>Raden Alam</Table.Cell>
          <Table.Cell>21-01-2023</Table.Cell>
          <Table.Cell>25-01-2023</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table.Root>
  );
};

export default barang;
