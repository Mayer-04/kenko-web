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
    href: "/afiliados/rutas-integrales-de-atencion-en-salud",
    label: "Rutas integrales de atención en salud",
  },
  {
    href: "/afiliados/puntos-de-atencion",
    label: "Puntos de atención",
  },
  {
    href: "/afiliados/preguntas-frecuentes",
    label: "Preguntas frecuentes",
  },
  {
    href: "/afiliados/triage",
    label: "Triage",
  },
];

export const affiliateMeta: DropdownMeta = {
  description: "Puntos de atención y servicios médicos directos",
  title: "Atención en salud",
};
