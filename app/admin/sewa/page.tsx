"use client";

import { Badge, Button, Table } from "@radix-ui/themes";
import { DropdownMenu } from "@radix-ui/themes";
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
          <Table.Row align={"center"}>
            <Table.RowHeaderCell>1</Table.RowHeaderCell>
            <Table.Cell>Canon 600D</Table.Cell>
            <Table.Cell>Alam Sanjaya</Table.Cell>
            <Table.Cell>21 Desember 2023</Table.Cell>
            <Table.Cell>25 Desember 2023</Table.Cell>
            <Table.Cell>
              <Badge color="blue">Belum diambil</Badge>
            </Table.Cell>
            <Table.Cell>
              <div>
                <DropdownMenu.Root>
                  <DropdownMenu.Trigger>
                    <Button variant="soft">Options</Button>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content>
                    <DropdownMenu.Item shortcut="⌘ E">Edit</DropdownMenu.Item>
                    <DropdownMenu.Item shortcut="⌘ D">
                      Duplicate
                    </DropdownMenu.Item>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item shortcut="⌘ N">
                      Archive
                    </DropdownMenu.Item>

                    <DropdownMenu.Sub>
                      <DropdownMenu.SubTrigger>More</DropdownMenu.SubTrigger>
                      <DropdownMenu.SubContent>
                        <DropdownMenu.Item>Move to project…</DropdownMenu.Item>
                        <DropdownMenu.Item>Move to folder…</DropdownMenu.Item>

                        <DropdownMenu.Separator />
                        <DropdownMenu.Item>Advanced options…</DropdownMenu.Item>
                      </DropdownMenu.SubContent>
                    </DropdownMenu.Sub>

                    <DropdownMenu.Separator />
                    <DropdownMenu.Item>Share</DropdownMenu.Item>
                    <DropdownMenu.Item>Add to favorites</DropdownMenu.Item>
                    <DropdownMenu.Separator />
                    <DropdownMenu.Item shortcut="⌘ ⌫" color="red">
                      Delete
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
                </DropdownMenu.Root>
              </div>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </div>
  );
};

export default PengambilanPage;
