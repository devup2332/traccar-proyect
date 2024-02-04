"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Td,
  TableContainer,
  IconButton,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  useDisclosure,
  Modal,
  ModalFooter,
  Button,
} from "@chakra-ui/react";
import moment from "moment-timezone";
import { fetchParaderos } from "@/lib/api/fetchParaderos";
import { useForm } from "react-hook-form";
import { FaPen, FaTrash } from "react-icons/fa6";
import { Toaster, toast } from "sonner";
import { saveNewInfoParadero } from "@/lib/api/saveNewInfoParadero";
import { sleep } from "@/lib/utils/sleep";
console.log(new Date().toISOString());

const ParaderosPage = () => {
  const [paraderos, setParaderos] = useState([]);
  const [paraderoToEdit, setParaderoToEdit] = useState<any>(null);
  const { onOpen, isOpen, onClose } = useDisclosure();
  const { register, handleSubmit } = useForm();
  const getData = async () => {
    const data = await fetchParaderos();
    console.log({ data });
    setParaderos(data);
  };
  useEffect(() => {
    getData();
  }, []);

  const openEditParadero = (p: any) => {
    console.log({ p });
    setParaderoToEdit(p);
    onOpen();
  };

  const saveData = async (data: any) => {
    console.log(data);
    const id = toast.loading("Guardando");
    await saveNewInfoParadero(data, paraderoToEdit?.id);
    await sleep(2000);
    toast.dismiss(id);
  };

  const listenDatabase = () => {
    setInterval(() => {
      getData()
    },5000)
  }

  return (
    <div>
      <Button colorScheme="blue" onClick={listenDatabase}>Escuchar</Button>
      <TableContainer>
        <Table>
          <Thead>
            <Tr>
              <Td>#</Td>
              <Td>Nombre</Td>
              <Td>Hora Estimada</Td>
              <Td>Hora Llegada</Td>
              <Td>Estado</Td>
            </Tr>
          </Thead>
          <Tbody>
            {paraderos.map((p: any, i: number) => {
              return (
                <Tr key={i}>
                  <Td>{i + 1}</Td>
                  <Td>{p.nombre}</Td>
                  <Td>
                    {p.hora_estimada
                      ? moment(new Date(p.hora_estimada.replace(" ", "T")))
                          .subtract(5, "hours")
                          .tz("America/Lima")
                          .format("LT")
                      : ""}
                  </Td>
                  <Td>
                    {p.hora_llegada
                      ? moment(new Date(p.hora_llegada.replace(" ", "T")))
                          .subtract(5, "hours")
                          .tz("America/Lima")
                          .format("LT")
                      : ""}
                  </Td>
                  <Td>{p.estado}</Td>
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </TableContainer>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Paradero</ModalHeader>
          <ModalBody>
            <FormControl>
              <FormLabel>Nombre</FormLabel>
              <Input
                placeholder="Nombre"
                value={paraderoToEdit?.name || ""}
                {...register("name", {
                  required: {
                    message: "El nombre es nesesario",
                    value: true,
                  },
                  onChange: (e) =>
                    setParaderoToEdit((p: any) => ({
                      ...p,
                      [e.target.name]: e.target.value,
                    })),
                })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Descripcion</FormLabel>
              <Input
                placeholder="Descripcion"
                value={paraderoToEdit?.description || ""}
                {...register("description", {
                  required: {
                    message: "Debe escribir una descripcion",
                    value: true,
                  },
                  onChange: (e) =>
                    setParaderoToEdit((p: any) => ({
                      ...p,
                      [e.target.name]: e.target.value,
                    })),
                })}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Fecha</FormLabel>
              <Input
                placeholder="Fecha y Hora"
                type="datetime-local"
                value={1706858078754}
                {...register("time_available")}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleSubmit(saveData)} colorScheme="blue" mr={3}>
              Guardar
            </Button>
            <Button onClick={onClose}>Cancelar</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <Toaster position="bottom-center" visibleToasts={1} />
    </div>
  );
};
export default ParaderosPage;
