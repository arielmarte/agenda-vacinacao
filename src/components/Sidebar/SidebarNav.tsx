import { Button, Stack } from "@chakra-ui/react";
import { TbVaccine, TbUser, TbHeartPlus, TbCalendarTime, TbList } from "react-icons/tb";
import { BsCalendarCheck, BsCalendarEvent, BsCalendarX, BsFillCalendar2Fill } from "react-icons/bs"
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";
import NextLink from "next/link";

export function SidebarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      
      <NavSection title="AGENDAMENTO DE VACINAS">
        <NavLink icon={BsFillCalendar2Fill} href="/agendas">Agendas</NavLink>
        <NavLink icon={BsCalendarEvent} href="/agendas/hoje">Hoje</NavLink>
        <NavLink icon={BsCalendarX} href="/agendas/canceladas">Canceladas</NavLink>
        <NavLink icon={BsCalendarCheck} href="/agendas/realizadas">Realizadas</NavLink>
      </NavSection>
      
      <NavSection title="DADOS">
        <NavLink icon={TbUser} href="/usuarios">Usuários</NavLink>
        <NavLink icon={TbVaccine} href="/vacinas">Vacinas</NavLink>
        <NavLink icon={TbHeartPlus} href="/alergias">Alergias</NavLink>
      </NavSection>

      <Button as={NextLink} href="/agendas/create" colorScheme="green">Novo Agendamento</Button>
    </Stack>
  );
}