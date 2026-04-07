import type { ChatIntent, ChatbotResponse } from "@/types/chatbot";

export const WHATSAPP_URL = "https://wa.me/528335340498";

export const chatbotKnowledge: Record<
  Exclude<ChatIntent, "joke" | "fact" | "recommendation" | "greeting" | "fallback">,
  ChatbotResponse
> = {
  buy: {
    intent: "buy",
    content:
      "Puedes revisar el catálogo, elegir la gorra que te interese y continuar por WhatsApp para cerrar tu pedido de forma directa.",
    actions: [
      { label: "Ver catálogo", type: "link", href: "/catalogo" },
      { label: "WhatsApp", type: "link", href: WHATSAPP_URL },
    ],
  },
  shipping: {
    intent: "shipping",
    content:
      "Contamos con entregas y envíos según disponibilidad y destino. También puedes revisar la sección de disponibilidad y envíos para más detalle.",
    actions: [
      { label: "Ver envíos", type: "link", href: "/disponibilidad" },
      { label: "Contactar", type: "link", href: "/contacto" },
    ],
  },
  payment: {
    intent: "payment",
    content:
      "Puedes revisar la sección de métodos de pago para conocer las opciones disponibles. Si quieres confirmar algo específico, también puedes escribir por WhatsApp.",
    actions: [
      { label: "Métodos de pago", type: "link", href: "/metodos-de-pago" },
      { label: "WhatsApp", type: "link", href: WHATSAPP_URL },
    ],
  },
  wholesale: {
    intent: "wholesale",
    content:
      "Sí manejamos atención para mayoreo. Si buscas volumen para negocio, equipo, evento o proyecto, te puedo llevar a esa sección o enviarte a contacto directo.",
    actions: [
      { label: "Ver mayoreo", type: "link", href: "/mayoreo" },
      { label: "Contactar", type: "link", href: "/contacto" },
    ],
  },
  contact: {
    intent: "contact",
    content:
      "Puedes contactarnos por WhatsApp o revisar la sección de contacto y redes sociales para elegir el medio que más te convenga.",
    actions: [
      { label: "WhatsApp", type: "link", href: WHATSAPP_URL },
      { label: "Ver contacto", type: "link", href: "/contacto" },
    ],
  },
  catalog: {
    intent: "catalog",
    content:
      "Aquí puedes explorar el catálogo actual de Salva Exclusive Caps y ver los modelos disponibles.",
    actions: [{ label: "Ir al catálogo", type: "link", href: "/catalogo" }],
  },
  faq: {
    intent: "faq",
    content:
      "Si tienes dudas frecuentes sobre compras, envíos, pagos o disponibilidad, te conviene revisar la sección de preguntas frecuentes.",
    actions: [{ label: "Ver FAQ", type: "link", href: "/faq" }],
  },
  about: {
    intent: "about",
    content:
      "Salva Exclusive Caps es una marca enfocada en gorras exclusivas, imagen cuidada y una experiencia más premium alrededor del producto.",
    actions: [{ label: "Conocer más", type: "link", href: "/nosotros" }],
  },
  collab: {
    intent: "collab",
    content:
      "Si te interesa una colaboración, alianza o propuesta de contenido, puedes revisar la sección correspondiente o escribirnos directamente.",
    actions: [
      { label: "Ver colaboraciones", type: "link", href: "/colaboraciones" },
      { label: "Contactar", type: "link", href: "/contacto" },
    ],
  },
};
