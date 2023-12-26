import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import React from "react";

const AnggotaPage = () => {
  return (
    <div className="mx-6 my-6 border rounded-xl shadow-sm">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>No Anggota</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>Alam Sanjaya</TableCell>

            <TableCell>raden@gmail.com</TableCell>
            <TableCell>2013055168</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default AnggotaPage;
