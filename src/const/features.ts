import LucideCoffee from "../assets/icons/lucide/LucideCoffee.astro";
import LucideShoppingCart from "../assets/icons/lucide/LucideShoppingCart.astro";
import LucideChartColumn from "../assets/icons/lucide/LucideChartColumn.astro";
import type { AstroComponentFactory } from "astro/runtime/server/index.js";

export interface Feature {
  icon: AstroComponentFactory;
  title: string;
  description: string;
}

export const features: Feature[] = [
  {
    icon: LucideCoffee,
    title: "Gestión de Inventario",
    description: "Control preciso de productos",
  },
  {
    icon: LucideShoppingCart,
    title: "Gestión de Pedidos",
    description:
      "Permite a los usuarios realizar pedidos fácilmente, personalizarlos y hacer seguimiento en tiempo real.",
  },
  {
    icon: LucideChartColumn,
    title: "Reportes y Análisis",
    description:
      "Estadísticas detalladas sobre ventas, consumo y preferencias.",
  },
];
