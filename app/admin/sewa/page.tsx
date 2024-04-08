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
import AddSewa from "@/components/sewa/AddSewa";
import { Button } from "@/components/ui/button";
import DeleteSewaForm from "@/components/sewa/DeleteSewaForm";

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
      <AddSewa />
      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary ">
              <TableHead className="text-center w-1/12 text-secondary-foreground">
                ID
              </TableHead>
              <TableHead className="text-secondary-foreground">
                Barang
              </TableHead>
              <TableHead className="text-secondary-foreground">
                Peminjam
              </TableHead>
              <TableHead className="text-secondary-foreground">
                Tanggal Mulai
              </TableHead>
              <TableHead className="text-secondary-foreground">
                Tanggal Selesai
              </TableHead>
              <TableHead className="text-secondary-foreground">
                Total Harga
              </TableHead>
              <TableHead className="text-secondary-foreground">
                Created at
              </TableHead>
              <TableHead className="text-secondary-foreground">
                Action
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {sewa.map((sewa, i) => (
              <TableRow key={i}>
                <TableCell className="text-center">{sewa.id}</TableCell>
                <TableCell>{sewa.productId}</TableCell>
                <TableCell>
                  {sewa.anggotaId
                    ? "Anggota : " + sewa.anggotaId
                    : "Non Anggota : " + sewa.nonAnggotaId}
                </TableCell>
                <TableCell>{sewa?.tgl_mulai.toString()}</TableCell>
                <TableCell>{sewa?.tgl_selesai.toString()}</TableCell>
                <TableCell>{sewa?.total_harga}</TableCell>
                <TableCell>{sewa?.createdAt.toString()}</TableCell>
                <TableCell>
                  <div className="flex flex-row space-x-2">
                    <DeleteSewaForm sewa={sewa} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PengambilanPage;
