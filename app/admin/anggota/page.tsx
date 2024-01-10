"use client";

import AddAnggota from "@/components/anggota/AddAnggota";
import DeleteAnggota from "@/components/anggota/DeleteAnggota";
import EditAnggota from "@/components/anggota/EditAnggota";
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
    <div>
      <div className="text-right py-4 px-4">
        <AddAnggota />
      </div>
      <div className="mx-6 my-2 border rounded-md shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-secondary">
              <TableHead className="text-center w-1/12">ID</TableHead>
              <TableHead>Nama</TableHead>
              <TableHead>Alamat</TableHead>
              <TableHead>No Telp</TableHead>
              <TableHead>No Anggota</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {anggota.map((anggota) => (
              <TableRow key={anggota.id}>
                <TableCell className="text-center">{anggota.id}</TableCell>
                <TableCell>{anggota.nama}</TableCell>
                <TableCell>{anggota.alamat}</TableCell>
                <TableCell>{anggota.no_telp}</TableCell>
                <TableCell>{anggota.nomorAnggota}</TableCell>
                <TableCell>
                  <div className="flex flex-row space-x-2">
                    {anggota && <EditAnggota anggota={anggota} />}
                    {anggota && <DeleteAnggota anggota={anggota} />}
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

export default AnggotaPage;
