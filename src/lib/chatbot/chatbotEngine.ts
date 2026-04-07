import { capFacts } from "@/data/capFacts";
import { capJokes } from "@/data/capJokes";
import { chatbotKnowledge, WHATSAPP_URL } from "@/data/chatbotKnowledge";
import type { ChatAction, ChatbotResponse } from "@/types/chatbot";
import { matchIntent } from "./matchIntent";

interface ChatbotEngineOptions {
  pathname?: string;
}

function getRandomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function sanitizeActions(actions?: ChatAction[]): ChatAction[] | undefined {
  if (!actions?.length) return undefined;

  return actions.filter((action) => {
    if (action.type === "link") return Boolean(action.href);
    if (action.type === "message") return Boolean(action.value);
    return false;
  });
}

function getRouteContext(pathname?: string) {
  const route = pathname ?? "/";

  if (route.startsWith("/catalogo")) {
    return {
      greeting:
        "Estás en el catálogo. Si quieres, te ayudo a comprar, elegir una gorra o resolver dudas rápidas.",
      teaser:
        "¿Ya viste una gorra que te gustó? Te ayudo a comprar o elegir mejor.",
      suggestedActions: [
        { label: "Cómo comprar", type: "message" as const, value: "¿Cómo compro?" },
        { label: "Recomiéndame una", type: "message" as const, value: "¿Qué gorra me recomiendas?" },
        { label: "WhatsApp", type: "link" as const, href: WHATSAPP_URL },
      ],
    };
  }

  if (route.startsWith("/mayoreo")) {
    return {
      greeting:
        "Estás en mayoreo. Te ayudo con cotización, contacto y dudas sobre atención por volumen.",
      teaser:
        "¿Buscas mayoreo? Te oriento rápido sobre contacto y siguiente paso.",
      suggestedActions: [
        { label: "Quiero mayoreo", type: "message" as const, value: "Quiero información de mayoreo" },
        { label: "Cotizar por WhatsApp", type: "link" as const, href: WHATSAPP_URL },
        { label: "Contacto", type: "link" as const, href: "/contacto" },
      ],
    };
  }

  if (route.startsWith("/contacto")) {
    return {
      greeting:
        "Estás en contacto. Si quieres atención más directa, te llevo a WhatsApp en un clic.",
      teaser:
        "¿Quieres atención directa? Te llevo rápido a WhatsApp o al medio correcto.",
      suggestedActions: [
        { label: "WhatsApp", type: "link" as const, href: WHATSAPP_URL },
        { label: "Redes sociales", type: "message" as const, value: "¿Qué redes sociales tienen?" },
      ],
    };
  }

  if (route.startsWith("/faq")) {
    return {
      greeting:
        "Estás en preguntas frecuentes. También puedes preguntarme directo sobre compra, pagos, envíos o mayoreo.",
      teaser:
        "¿Tienes una duda rápida? Te ayudo con compra, pagos o envíos.",
      suggestedActions: [
        { label: "Cómo comprar", type: "message" as const, value: "¿Cómo compro?" },
        { label: "Métodos de pago", type: "message" as const, value: "¿Qué métodos de pago tienen?" },
        { label: "¿Hacen envíos?", type: "message" as const, value: "¿Hacen envíos?" },
      ],
    };
  }

  return {
    greeting:
      "Soy Asistente Salva. Te ayudo con compras, catálogo, mayoreo, contacto y también tengo chistes y datos curiosos sobre gorras.",
    teaser:
      "¿Buscas catálogo, mayoreo o una recomendación rápida?",
    suggestedActions: [
      { label: "Ver catálogo", type: "link" as const, href: "/catalogo" },
      { label: "Mayoreo", type: "link" as const, href: "/mayoreo" },
      { label: "WhatsApp", type: "link" as const, href: WHATSAPP_URL },
      { label: "Dime un chiste", type: "message" as const, value: "Cuéntame un chiste de gorras" },
    ],
  };
}

export function getChatbotTeaser(pathname?: string): string {
  return getRouteContext(pathname).teaser;
}

function buildGreetingResponse(pathname?: string): ChatbotResponse {
  const routeContext = getRouteContext(pathname);

  return {
    intent: "greeting",
    content: routeContext.greeting,
    actions: sanitizeActions(routeContext.suggestedActions),
  };
}

function buildFallbackResponse(pathname?: string): ChatbotResponse {
  const routeContext = getRouteContext(pathname);

  return {
    intent: "fallback",
    content:
      "Puedo ayudarte con compras, catálogo, envíos, métodos de pago, mayoreo, contacto, colaboraciones, datos curiosos o chistes de gorras.",
    actions: sanitizeActions(routeContext.suggestedActions),
  };
}

function buildJokeResponse(pathname?: string): ChatbotResponse {
  const route = pathname ?? "/";

  return {
    intent: "joke",
    content: getRandomItem(capJokes),
    actions: sanitizeActions([
      { label: "Otro chiste", type: "message", value: "Otro chiste de gorras" },
      { label: "Dato curioso", type: "message", value: "Dame un dato curioso de gorras" },
      route.startsWith("/mayoreo")
        ? { label: "Ver mayoreo", type: "link", href: "/mayoreo" }
        : { label: "Ver catálogo", type: "link", href: "/catalogo" },
    ]),
  };
}

function buildFactResponse(pathname?: string): ChatbotResponse {
  const route = pathname ?? "/";

  return {
    intent: "fact",
    content: getRandomItem(capFacts),
    actions: sanitizeActions([
      { label: "Otro dato", type: "message", value: "Dame otro dato curioso de gorras" },
      { label: "Dime un chiste", type: "message", value: "Cuéntame un chiste de gorras" },
      route.startsWith("/contacto")
        ? { label: "WhatsApp", type: "link", href: WHATSAPP_URL }
        : { label: "Ver catálogo", type: "link", href: "/catalogo" },
    ]),
  };
}

function buildRecommendationResponse(pathname?: string): ChatbotResponse {
  const route = pathname ?? "/";

  if (route.startsWith("/catalogo")) {
    return {
      intent: "recommendation",
      content:
        "Si estás en catálogo, te conviene empezar por una gorra versátil, fácil de combinar y con presencia limpia. Si ya viste una que te gustó, el siguiente paso ideal es WhatsApp.",
      actions: [
        { label: "Comprar por WhatsApp", type: "link", href: WHATSAPP_URL },
        { label: "Cómo comprar", type: "message", value: "¿Cómo compro?" },
      ],
    };
  }

  if (route.startsWith("/mayoreo")) {
    return {
      intent: "recommendation",
      content:
        "Si buscas mayoreo, lo más eficiente es escribir directo para revisar volumen, idea, tiempos y atención según tu caso.",
      actions: [
        { label: "Cotizar por WhatsApp", type: "link", href: WHATSAPP_URL },
        { label: "Ver mayoreo", type: "link", href: "/mayoreo" },
      ],
    };
  }

  return {
    intent: "recommendation",
    content:
      "Si buscas algo versátil, conviene empezar por una gorra cómoda, fácil de combinar y con buena presencia visual. Puedes revisar el catálogo y, si quieres avanzar rápido, escribir por WhatsApp.",
    actions: [
      { label: "Ver catálogo", type: "link", href: "/catalogo" },
      { label: "WhatsApp", type: "link", href: WHATSAPP_URL },
    ],
  };
}

function buildBusinessResponse(
  intent:
    | "buy"
    | "shipping"
    | "payment"
    | "wholesale"
    | "contact"
    | "catalog"
    | "faq"
    | "about"
    | "collab",
  pathname?: string
): ChatbotResponse {
  const route = pathname ?? "/";
  const response = chatbotKnowledge[intent];

  if (intent === "buy" && route.startsWith("/catalogo")) {
    return {
      intent,
      content:
        "Como ya estás en catálogo, el flujo ideal es elegir el modelo que te guste y escribir por WhatsApp para confirmar disponibilidad y cerrar tu pedido.",
      actions: [
        { label: "Comprar por WhatsApp", type: "link", href: WHATSAPP_URL },
        { label: "Ver catálogo", type: "link", href: "/catalogo" },
      ],
    };
  }

  if (intent === "wholesale" && route.startsWith("/mayoreo")) {
    return {
      intent,
      content:
        "Ya estás en mayoreo. Si buscas atención por volumen, negocio, evento o equipo, el siguiente paso más útil es cotizar directamente por WhatsApp.",
      actions: [
        { label: "Cotizar por WhatsApp", type: "link", href: WHATSAPP_URL },
        { label: "Contacto", type: "link", href: "/contacto" },
      ],
    };
  }

  if (intent === "contact" && route.startsWith("/contacto")) {
    return {
      intent,
      content:
        "Ya estás en contacto. Si quieres atención más directa y rápida, te conviene escribirnos por WhatsApp.",
      actions: [{ label: "WhatsApp", type: "link", href: WHATSAPP_URL }],
    };
  }

  return {
    ...response,
    actions: sanitizeActions(response.actions),
  };
}

export function getChatbotResponse(
  input: string,
  options?: ChatbotEngineOptions
): ChatbotResponse {
  const pathname = options?.pathname;
  const intent = matchIntent(input);

  switch (intent) {
    case "greeting":
      return buildGreetingResponse(pathname);

    case "joke":
      return buildJokeResponse(pathname);

    case "fact":
      return buildFactResponse(pathname);

    case "recommendation":
      return buildRecommendationResponse(pathname);

    case "buy":
    case "shipping":
    case "payment":
    case "wholesale":
    case "contact":
    case "catalog":
    case "faq":
    case "about":
    case "collab":
      return buildBusinessResponse(intent, pathname);

    case "fallback":
    default:
      return buildFallbackResponse(pathname);
  }
}
