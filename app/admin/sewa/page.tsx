"use client";

import DropdownAction from "@/components/DropdownAction";
import { Badge, Table } from "@radix-ui/themes";
import React from "react";

const PengambilanPage = () => {
  return (
    <div className="mx-6 my-6">
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row align={"center"}>
            <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Barang</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Peminjam</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Tanggal Mulai</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Tanggal Selesai</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Status</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.RowHeaderCell>1</Table.RowHeaderCell>
            <Table.Cell>Canon 600D</Table.Cell>
            <Table.Cell>Alam Sanjaya</Table.Cell>
            <Table.Cell>21 Desember 2023</Table.Cell>
            <Table.Cell>25 Desember 2023</Table.Cell>
            <Table.Cell>
              <Badge color="green">Belum diambil</Badge>
            </Table.Cell>
            <Table.Cell>
              <DropdownAction />
            </Table.Cell>
          </Table.Row>

          <Table.Row align={"center"}>
            <Table.RowHeaderCell>2</Table.RowHeaderCell>
            <Table.Cell>Sony A6000</Table.Cell>
            <Table.Cell>Raihan Azka</Table.Cell>
            <Table.Cell>21 Desember 2023</Table.Cell>
            <Table.Cell>25 Desember 2023</Table.Cell>
            <Table.Cell>
              <Badge color="blue">Sedang Dipinjam</Badge>
            </Table.Cell>
            <Table.Cell>
              <DropdownAction />
            </Table.Cell>
          </Table.Row>

          <Table.Row align={"center"}>
            <Table.RowHeaderCell>3</Table.RowHeaderCell>
            <Table.Cell>Canon 5D</Table.Cell>
            <Table.Cell>Sanjaya</Table.Cell>
            <Table.Cell>21 Desember 2023</Table.Cell>
            <Table.Cell>25 Desember 2023</Table.Cell>
            <Table.Cell>
              <Badge color="red">Belum dikembalikan</Badge>
            </Table.Cell>
            <Table.Cell>
              <DropdownAction />
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default PengambilanPage;
