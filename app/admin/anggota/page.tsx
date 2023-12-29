"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AnggotaProps } from "@/types";
import axios from "axios";

import React, { useEffect, useState } from "react";

const AnggotaPage = () => {
  const [anggota, setAnggota] = useState<AnggotaProps[]>([]);
  useEffect(() => {
    axios
      .get("/api/anggota")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setAnggota(response.data);
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
            <TableHead>Nama</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>No Telp</TableHead>
            <TableHead>No Anggota</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {anggota.map((anggota, i) => (
            <TableRow>
              <TableCell className="text-center">1</TableCell>
              <TableCell>{anggota.nama}</TableCell>
              <TableCell>{anggota.alamat}</TableCell>
              <TableCell>{anggota.no_telp}</TableCell>
              <TableCell>{anggota.nomorAnggota}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AnggotaPage;
