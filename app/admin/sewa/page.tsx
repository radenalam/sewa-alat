"use client";

import DropdownAction from "@/components/DropdownAction";
import { SewaProps } from "@/types";
import { Badge, Table } from "@radix-ui/themes";
import axios from "axios";
import React, { useEffect, useState } from "react";

const PengambilanPage = () => {
  const [sewa, setSewa] = useState<SewaProps[]>([]);

  useEffect(() => {
    axios
      .get("/api/sewa")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setSewa(response.data);
        } else {
          console.error("Invalid response data format:", response.data);
        }
      })
      .catch((error) => console.error("Error fetching projects:", error));
  }, []);

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
            <Table.ColumnHeaderCell>Action</Table.ColumnHeaderCell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {sewa.map((sewa, i) => (
            <Table.Row align="center" key={i}>
              <Table.RowHeaderCell width={50}>{sewa.id}</Table.RowHeaderCell>
              <Table.Cell>{sewa.productId}</Table.Cell>
              <Table.Cell>{sewa.anggotaId}</Table.Cell>
              <Table.Cell>{sewa?.tgl_mulai.toString()}</Table.Cell>
              <Table.Cell>{sewa?.tgl_selesai.toString()}</Table.Cell>

              <Table.Cell align="right"></Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default PengambilanPage;
