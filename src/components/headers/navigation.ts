export interface NavigationItem {
  label: string;
  href: string;
}

export interface DropdownMeta {
  title: string;
  description: string;
}

export const affiliateItems: NavigationItem[] = [
  {
    label: "Rutas integrales de atención en salud",
    href: "/afiliados/rutas-integrales-de-atencion-en-salud",
  },
  {
    label: "Puntos de atención",
    href: "/afiliados/puntos-de-atencion",
  },
  {
    label: "Preguntas frecuentes",
    href: "/afiliados/preguntas-frecuentes",
  },
  {
    label: "Triage",
    href: "/afiliados/triage",
  },
];

export const affiliateMeta: DropdownMeta = {
  title: "Atención en salud",
  description: "Puntos de atención y servicios médicos directos",
};
