import type { ChatIntent, ChatbotResponse } from "@/types/chatbot";

export const WHATSAPP_URL = "https://wa.me/528335340498";

export const chatbotKnowledge: Record<
  Exclude<
    ChatIntent,
    "joke" | "fact" | "recommendation" | "greeting" | "fallback"
  >,
  ChatbotResponse
> = {
  buy: {
    intent: "buy",
    content:
      "Puedes revisar el catálogo, elegir el modelo que más te guste y continuar por WhatsApp para confirmar disponibilidad, resolver dudas y cerrar tu pedido de forma directa.",
    actions: [
      { label: "Ver catálogo", type: "link", href: "/catalogo" },
      { label: "Comprar por WhatsApp", type: "link", href: WHATSAPP_URL },
    ],
  },
  shipping: {
    intent: "shipping",
    content:
      "Manejamos entregas y envíos según disponibilidad y destino. Si ya tienes una gorra en mente, también puedes escribirnos por WhatsApp para orientarte más rápido.",
    actions: [
      { label: "Ver disponibilidad y envíos", type: "link", href: "/disponibilidad" },
      { label: "WhatsApp", type: "link", href: WHATSAPP_URL },
    ],
  },
  payment: {
    intent: "payment",
    content:
      "Puedes revisar la sección de métodos de pago para conocer las opciones disponibles. Si quieres avanzar directo con tu compra, también te atendemos por WhatsApp.",
    actions: [
      { label: "Métodos de pago", type: "link", href: "/metodos-de-pago" },
      { label: "Comprar por WhatsApp", type: "link", href: WHATSAPP_URL },
    ],
  },
  wholesale: {
    intent: "wholesale",
    content:
      "Sí contamos con atención para mayoreo. Si buscas volumen para negocio, equipo, evento o proyecto, podemos orientarte de forma más directa según lo que necesites.",
    actions: [
      { label: "Ver mayoreo", type: "link", href: "/mayoreo" },
      { label: "Cotizar por WhatsApp", type: "link", href: WHATSAPP_URL },
    ],
  },
  contact: {
    intent: "contact",
    content:
      "Puedes escribirnos por WhatsApp para atención más directa o revisar la sección de contacto y redes sociales para elegir el medio que prefieras.",
    actions: [
      { label: "WhatsApp", type: "link", href: WHATSAPP_URL },
      { label: "Ver contacto", type: "link", href: "/contacto" },
    ],
  },
  catalog: {
    intent: "catalog",
    content:
      "En el catálogo puedes explorar los modelos actuales de Salva Exclusive Caps. Si ves algo que te interese, te ayudo a pasar al siguiente paso de compra.",
    actions: [
      { label: "Ir al catálogo", type: "link", href: "/catalogo" },
      { label: "Cómo comprar", type: "message", value: "¿Cómo compro?" },
    ],
  },
  faq: {
    intent: "faq",
    content:
      "Si tienes dudas sobre compras, pagos, envíos, disponibilidad o atención, la sección de preguntas frecuentes te ayuda a resolver lo más común de forma rápida.",
    actions: [
      { label: "Ver FAQ", type: "link", href: "/faq" },
      { label: "WhatsApp", type: "link", href: WHATSAPP_URL },
    ],
  },
  about: {
    intent: "about",
    content:
      "Salva Exclusive Caps es una marca enfocada en gorras exclusivas, presencia visual cuidada y una experiencia más premium alrededor del producto.",
    actions: [
      { label: "Conocer más", type: "link", href: "/nosotros" },
      { label: "Ver catálogo", type: "link", href: "/catalogo" },
    ],
  },
  collab: {
    intent: "collab",
    content:
      "Si te interesa una colaboración, propuesta de contenido o alianza, puedes revisar esa sección o escribirnos directamente para aterrizar la idea.",
    actions: [
      { label: "Ver colaboraciones", type: "link", href: "/colaboraciones" },
      { label: "Contactar", type: "link", href: "/contacto" },
    ],
  },
};
