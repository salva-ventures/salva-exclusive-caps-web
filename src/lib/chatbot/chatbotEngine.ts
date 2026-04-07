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
        "Estás en el catálogo. Si quieres, te ayudo a explorar modelos, cómo comprar o te mando directo a WhatsApp.",
      fallback:
        "Veo que estás en el catálogo. Puedo ayudarte a comprar, recomendarte algo general o llevarte directo a WhatsApp.",
      actions: [
        { label: "Cómo comprar", type: "message" as const, value: "¿Cómo compro?" },
        { label: "Recomiéndame una", type: "message" as const, value: "¿Qué gorra me recomiendas?" },
        { label: "WhatsApp", type: "link" as const, href: WHATSAPP_URL },
      ],
    };
  }

  if (route.startsWith("/mayoreo")) {
    return {
      greeting:
        "Estás en la sección de mayoreo. Te puedo orientar sobre atención por volumen, contacto y siguiente paso para cotizar.",
      fallback:
        "Veo que estás en mayoreo. Puedo ayudarte con atención por volumen, contacto directo o resolver dudas básicas de compra.",
      actions: [
        { label: "Quiero mayoreo", type: "message" as const, value: "Quiero información de mayoreo" },
        { label: "Contactar", type: "link" as const, href: "/contacto" },
        { label: "WhatsApp", type: "link" as const, href: WHATSAPP_URL },
      ],
    };
  }

  if (route.startsWith("/contacto")) {
    return {
      greeting:
        "Estás en contacto. Si quieres, te llevo directo a WhatsApp o te ayudo a ubicar el medio correcto para escribirnos.",
      fallback:
        "Veo que estás en contacto. Puedo llevarte a WhatsApp, resolver dudas rápidas o decirte dónde escribirnos.",
      actions: [
        { label: "WhatsApp", type: "link" as const, href: WHATSAPP_URL },
        { label: "Redes sociales", type: "message" as const, value: "¿Qué redes sociales tienen?" },
      ],
    };
  }

  if (route.startsWith("/disponibilidad")) {
    return {
      greeting:
        "Estás en disponibilidad y envíos. Te puedo ayudar con tiempos, entregas o siguiente paso para comprar.",
      fallback:
        "Veo que estás en disponibilidad y envíos. Puedo ayudarte con entregas, cómo comprar o contacto.",
      actions: [
        { label: "¿Hacen envíos?", type: "message" as const, value: "¿Hacen envíos?" },
        { label: "Cómo comprar", type: "message" as const, value: "¿Cómo compro?" },
        { label: "Contactar", type: "link" as const, href: "/contacto" },
      ],
    };
  }

  if (route.startsWith("/faq")) {
    return {
      greeting:
        "Estás en preguntas frecuentes. Si quieres, te ayudo a resolver dudas rápidas de compra, pagos, envíos o contacto.",
      fallback:
        "Veo que estás en preguntas frecuentes. Puedo orientarte con compras, pagos, envíos, mayoreo o contacto.",
      actions: [
        { label: "Cómo comprar", type: "message" as const, value: "¿Cómo compro?" },
        { label: "Métodos de pago", type: "message" as const, value: "¿Qué métodos de pago tienen?" },
        { label: "¿Hacen envíos?", type: "message" as const, value: "¿Hacen envíos?" },
      ],
    };
  }

  if (route.startsWith("/nosotros")) {
    return {
      greeting:
        "Estás en la sección de nosotros. Si quieres, te cuento rápido de la marca o te llevo a catálogo y contacto.",
      fallback:
        "Veo que estás en nosotros. Puedo contarte de la marca, llevarte al catálogo o ayudarte a contactarnos.",
      actions: [
        { label: "Ver catálogo", type: "link" as const, href: "/catalogo" },
        { label: "Contacto", type: "link" as const, href: "/contacto" },
      ],
    };
  }

  return {
    greeting:
      "Soy Asistente Salva. Te ayudo con compras, catálogo, mayoreo, contacto y también tengo chistes y datos curiosos sobre gorras.",
    fallback:
      "Puedo ayudarte con catálogo, compras, envíos, métodos de pago, mayoreo, contacto, colaboraciones, datos curiosos o chistes de gorras.",
    actions: [
      { label: "Ver catálogo", type: "link" as const, href: "/catalogo" },
      { label: "Mayoreo", type: "link" as const, href: "/mayoreo" },
      { label: "WhatsApp", type: "link" as const, href: WHATSAPP_URL },
      { label: "Dime un chiste", type: "message" as const, value: "Cuéntame un chiste de gorras" },
    ],
  };
}

function buildGreetingResponse(pathname?: string): ChatbotResponse {
  const routeContext = getRouteContext(pathname);

  return {
    intent: "greeting",
    content: routeContext.greeting,
    actions: sanitizeActions(routeContext.actions),
  };
}

function buildFallbackResponse(pathname?: string): ChatbotResponse {
  const routeContext = getRouteContext(pathname);

  return {
    intent: "fallback",
    content: routeContext.fallback,
    actions: sanitizeActions(routeContext.actions),
  };
}

function buildJokeResponse(): ChatbotResponse {
  return {
    intent: "joke",
    content: getRandomItem(capJokes),
    actions: [
      { label: "Otro chiste", type: "message", value: "Otro chiste de gorras" },
      { label: "Dato curioso", type: "message", value: "Dame un dato curioso de gorras" },
      { label: "Ver catálogo", type: "link", href: "/catalogo" },
    ],
  };
}

function buildFactResponse(): ChatbotResponse {
  return {
    intent: "fact",
    content: getRandomItem(capFacts),
    actions: [
      { label: "Otro dato", type: "message", value: "Dame otro dato curioso de gorras" },
      { label: "Dime un chiste", type: "message", value: "Cuéntame un chiste de gorras" },
      { label: "Ver catálogo", type: "link", href: "/catalogo" },
    ],
  };
}

function buildRecommendationResponse(pathname?: string): ChatbotResponse {
  const route = pathname ?? "/";

  if (route.startsWith("/catalogo")) {
    return {
      intent: "recommendation",
      content:
        "Ya que estás en catálogo, te conviene empezar por una gorra fácil de combinar, cómoda y con presencia limpia. Si quieres algo más aterrizado, te mando directo a WhatsApp.",
      actions: [
        { label: "WhatsApp", type: "link", href: WHATSAPP_URL },
        { label: "Cómo comprar", type: "message", value: "¿Cómo compro?" },
      ],
    };
  }

  if (route.startsWith("/mayoreo")) {
    return {
      intent: "recommendation",
      content:
        "Si buscas algo orientado a mayoreo, lo mejor es escribir directo para revisar volumen, idea y siguiente paso de atención.",
      actions: [
        { label: "WhatsApp", type: "link", href: WHATSAPP_URL },
        { label: "Contacto", type: "link", href: "/contacto" },
      ],
    };
  }

  return {
    intent: "recommendation",
    content:
      "Si buscas algo versátil, conviene empezar por una gorra fácil de combinar, cómoda y con buena presencia visual. Te recomiendo revisar el catálogo y, si quieres algo más aterrizado, escribir por WhatsApp.",
    actions: [
      { label: "Ver catálogo", type: "link", href: "/catalogo" },
      { label: "WhatsApp", type: "link", href: WHATSAPP_URL },
    ],
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
      return buildJokeResponse();

    case "fact":
      return buildFactResponse();

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
    case "collab": {
      const response = chatbotKnowledge[intent];
      return {
        ...response,
        actions: sanitizeActions(response.actions),
      };
    }

    case "fallback":
    default:
      return buildFallbackResponse(pathname);
  }
}
