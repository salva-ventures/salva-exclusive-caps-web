import { capFacts } from "@/data/capFacts";
import { capJokes } from "@/data/capJokes";
import { chatbotKnowledge, WHATSAPP_URL } from "@/data/chatbotKnowledge";
import type { ChatAction, ChatbotResponse } from "@/types/chatbot";
import { matchIntent } from "./matchIntent";

function getRandomItem<T>(items: T[]): T {
  return items[Math.floor(Math.random() * items.length)];
}

function buildFallbackResponse(): ChatbotResponse {
  return {
    intent: "fallback",
    content:
      "Puedo ayudarte con catálogo, compras, envíos, métodos de pago, mayoreo, contacto, colaboraciones, datos curiosos o chistes de gorras.",
    actions: [
      { label: "Ver catálogo", type: "link", href: "/catalogo" },
      { label: "Mayoreo", type: "link", href: "/mayoreo" },
      { label: "WhatsApp", type: "link", href: WHATSAPP_URL },
      { label: "Dime un chiste", type: "message", value: "Cuéntame un chiste de gorras" },
    ],
  };
}

function buildGreetingResponse(): ChatbotResponse {
  return {
    intent: "greeting",
    content:
      "Soy Asistente Salva. Te ayudo con compras, catálogo, mayoreo, contacto y también tengo chistes y datos curiosos sobre gorras.",
    actions: [
      { label: "Ver catálogo", type: "link", href: "/catalogo" },
      { label: "Cómo comprar", type: "message", value: "¿Cómo compro?" },
      { label: "Mayoreo", type: "link", href: "/mayoreo" },
      { label: "Dime un chiste", type: "message", value: "Cuéntame un chiste de gorras" },
    ],
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

function buildRecommendationResponse(): ChatbotResponse {
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

function sanitizeActions(actions?: ChatAction[]): ChatAction[] | undefined {
  if (!actions?.length) return undefined;

  return actions.filter((action) => {
    if (action.type === "link") {
      return Boolean(action.href);
    }

    if (action.type === "message") {
      return Boolean(action.value);
    }

    return false;
  });
}

export function getChatbotResponse(input: string): ChatbotResponse {
  const intent = matchIntent(input);

  switch (intent) {
    case "greeting":
      return buildGreetingResponse();

    case "joke":
      return buildJokeResponse();

    case "fact":
      return buildFactResponse();

    case "recommendation":
      return buildRecommendationResponse();

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
      return buildFallbackResponse();
  }
}
