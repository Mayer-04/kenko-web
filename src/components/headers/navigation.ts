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
];

export const aboutItems: NavigationItem[] = [
  { label: "Historia", href: "/nosotros/historia" },
  { label: "Misión y visión", href: "/nosotros/mision-y-vision" },
  { label: "Objetivos estratégicos", href: "/nosotros/objetivos-estrategicos" },
  { label: "Valores", href: "/nosotros/valores" },
  { label: "Organigrama", href: "/nosotros/organigrama" },
  {
    label: "Plan de modernización y saneamiento financiero",
    href: "/nosotros/plan-de-modernizacion-y-saneamiento-financiero",
  },
];

export const affiliateMeta: DropdownMeta = {
  title: "Atención en salud",
  description: "Puntos de atención y servicios médicos directos",
};

export const aboutMeta: DropdownMeta = {
  title: "Quiénes somos",
  description:
    "Nuestra historia, propósito institucional, metas y los valores que nos guían día a día.",
};
