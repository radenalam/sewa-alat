"use client";

import { SewaProps } from "@/types";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
    <div className="mx-6 my-6 border rounded-md shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-200">
            <TableHead className="text-center w-1/12">ID</TableHead>
            <TableHead>Barang</TableHead>
            <TableHead>Peminjam</TableHead>
            <TableHead>Tanggal Mulai</TableHead>
            <TableHead>Tanggal Selesai</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {sewa.map((sewa, i) => (
            <TableRow key={i}>
              <TableCell className="text-center">{sewa.id}</TableCell>
              <TableCell>{sewa.productId}</TableCell>
              <TableCell>{sewa.anggotaId}</TableCell>
              <TableCell>{sewa?.tgl_mulai.toString()}</TableCell>
              <TableCell>{sewa?.tgl_selesai.toString()}</TableCell>

              <TableCell align="right"></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PengambilanPage;
