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
      route,
      greeting:
        "Estás en el catálogo. Si ya viste algo que te gustó, te ayudo a pasar a compra o a resolver dudas rápidas.",
      fallback:
        "Veo que estás en el catálogo. Puedo ayudarte a elegir, comprar o enviarte directo a WhatsApp.",
      teaser:
        "¿Ya viste una gorra que te gustó? Te ayudo a comprar o elegir mejor.",
      actions: [
        { label: "Cómo comprar", type: "message" as const, value: "¿Cómo compro?" },
        {
          label: "Recomiéndame una",
          type: "message" as const,
          value: "¿Qué gorra me recomiendas?",
        },
        { label: "WhatsApp", type: "link" as const, href: WHATSAPP_URL },
      ],
    };
  }

  if (route.startsWith("/mayoreo")) {
    return {
      route,
      greeting:
        "Estás en mayoreo. Si buscas volumen para negocio, evento o equipo, te ayudo a ir al siguiente paso.",
      fallback:
        "Veo que estás en mayoreo. Puedo ayudarte con cotización, contacto directo o dudas básicas de atención por volumen.",
      teaser:
        "¿Buscas mayoreo? Te oriento rápido sobre contacto y siguiente paso.",
      actions: [
        {
          label: "Quiero mayoreo",
          type: "message" as const,
          value: "Quiero información de mayoreo",
        },
        { label: "Cotizar por WhatsApp", type: "link" as const, href: WHATSAPP_URL },
        { label: "Contacto", type: "link" as const, href: "/contacto" },
      ],
    };
  }

  if (route.startsWith("/contacto")) {
    return {
      route,
      greeting:
        "Estás en contacto. Si quieres atención más directa, te llevo a WhatsApp en un clic.",
      fallback:
        "Veo que estás en contacto. Puedo decirte por dónde escribirnos o mandarte directo a WhatsApp.",
      teaser:
        "¿Quieres atención directa? Te llevo rápido a WhatsApp o al medio correcto.",
      actions: [
        { label: "WhatsApp", type: "link" as const, href: WHATSAPP_URL },
        {
          label: "Redes sociales",
          type: "message" as const,
          value: "¿Qué redes sociales tienen?",
        },
      ],
    };
  }

  if (route.startsWith("/disponibilidad") || route.startsWith("/envios-y-entregas")) {
    return {
      route,
      greeting:
        "Estás en disponibilidad y envíos. Si ya tienes un modelo en mente, te ayudo con compra o contacto.",
      fallback:
        "Veo que estás en disponibilidad y envíos. Puedo ayudarte con entregas, compra o atención directa.",
      teaser:
        "¿Tienes dudas de envíos o entregas? Te ayudo rápido.",
      actions: [
        {
          label: "¿Hacen envíos?",
          type: "message" as const,
          value: "¿Hacen envíos?",
        },
        {
          label: "Cómo comprar",
          type: "message" as const,
          value: "¿Cómo compro?",
        },
        { label: "WhatsApp", type: "link" as const, href: WHATSAPP_URL },
      ],
    };
  }

  if (route.startsWith("/faq")) {
    return {
      route,
      greeting:
        "Estás en preguntas frecuentes. Si quieres, te ayudo con compra, pagos, envíos o contacto sin que tengas que buscar tanto.",
      fallback:
        "Veo que estás en FAQ. Puedo orientarte con compras, pagos, envíos, mayoreo o contacto.",
      teaser:
        "¿Tienes una duda rápida? Te ayudo con compra, pagos o envíos.",
      actions: [
        {
          label: "Cómo comprar",
          type: "message" as const,
          value: "¿Cómo compro?",
        },
        {
          label: "Métodos de pago",
          type: "message" as const,
          value: "¿Qué métodos de pago tienen?",
        },
        {
          label: "¿Hacen envíos?",
          type: "message" as const,
          value: "¿Hacen envíos?",
        },
      ],
    };
  }

  if (route.startsWith("/nosotros")) {
    return {
      route,
      greeting:
        "Estás en nosotros. Si quieres, te cuento rápido de la marca o te llevo al catálogo.",
      fallback:
        "Veo que estás en nosotros. Puedo contarte de la marca, mostrarte catálogo o ayudarte a contactarnos.",
      teaser:
        "¿Quieres conocer la marca o mejor ver el catálogo?",
      actions: [
        { label: "Ver catálogo", type: "link" as const, href: "/catalogo" },
        { label: "Conocer la marca", type: "link" as const, href: "/nosotros" },
      ],
    };
  }

  return {
    route,
    greeting:
      "Soy Asistente Salva. Te ayudo con compras, catálogo, mayoreo, contacto y también tengo chistes y datos curiosos sobre gorras.",
    fallback:
      "Puedo ayudarte con catálogo, compras, envíos, métodos de pago, mayoreo, contacto, colaboraciones, datos curiosos o chistes de gorras.",
    teaser:
      "¿Buscas catálogo, mayoreo o una recomendación rápida?",
    actions: [
      { label: "Ver catálogo", type: "link" as const, href: "/catalogo" },
      { label: "Mayoreo", type: "link" as const, href: "/mayoreo" },
      { label: "WhatsApp", type: "link" as const, href: WHATSAPP_URL },
      {
        label: "Dime un chiste",
        type: "message" as const,
        value: "Cuéntame un chiste de gorras",
      },
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

function buildJokeResponse(pathname?: string): ChatbotResponse {
  const route = pathname ?? "/";

  return {
    intent: "joke",
    content: getRandomItem(capJokes),
    actions: sanitizeActions([
      { label: "Otro chiste", type: "message", value: "Otro chiste de gorras" },
      {
        label: "Dato curioso",
        type: "message",
        value: "Dame un dato curioso de gorras",
      },
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
        "Si estás en catálogo, te conviene empezar por una gorra versátil, fácil de combinar y con presencia limpia. Si ya viste una que te llamó la atención, el siguiente paso ideal es WhatsApp.",
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

  if (route.startsWith("/contacto")) {
    return {
      intent: "recommendation",
      content:
        "Si ya estás en contacto, lo mejor es pasar directo a WhatsApp para atención más rápida y personalizada.",
      actions: [
        { label: "WhatsApp", type: "link", href: WHATSAPP_URL },
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

  if (intent === "faq" && route.startsWith("/faq")) {
    return {
      intent,
      content:
        "Ya estás en preguntas frecuentes. Si no quieres buscar entre secciones, también puedes preguntarme directo sobre compra, pagos, envíos o mayoreo.",
      actions: [
        { label: "¿Cómo compro?", type: "message", value: "¿Cómo compro?" },
        {
          label: "¿Qué métodos de pago tienen?",
          type: "message",
          value: "¿Qué métodos de pago tienen?",
        },
        { label: "¿Hacen envíos?", type: "message", value: "¿Hacen envíos?" },
      ],
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
