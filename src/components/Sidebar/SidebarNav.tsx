import { Stack } from "@chakra-ui/react";
import { TbVaccine, TbUser, TbHeartPlus, TbCalendarTime, TbList } from "react-icons/tb"
;
import { NavLink } from "./NavLink";
import { NavSection } from "./NavSection";

export function SidebarNav() {
  return (
    <Stack spacing="12" align="flex-start">
      <NavSection title="GERAL">
        <NavLink icon={TbCalendarTime} href="/dashboard">Hoje</NavLink>
        <NavLink icon={TbList} href="/users">Agenda</NavLink>
      </NavSection>
      <NavSection title="DADOS">
        <NavLink icon={TbUser} href="/pacientes">Pacientes</NavLink>
        <NavLink icon={TbVaccine} href="/vacinas">Vacinas</NavLink>
        <NavLink icon={TbHeartPlus} href="/alergias">Alergias</NavLink>
      </NavSection>
    </Stack>
  );
}