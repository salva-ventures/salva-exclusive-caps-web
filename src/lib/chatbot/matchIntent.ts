import type { ChatIntent } from "@/types/chatbot";
import { normalizeText } from "./normalizeText";

type IntentRule = {
  intent: ChatIntent;
  keywords: string[];
  weight?: number;
};

const INTENT_RULES: IntentRule[] = [
  {
    intent: "greeting",
    keywords: [
      "hola",
      "buenas",
      "buen dia",
      "buen día",
      "que onda",
      "saludos",
      "hello",
      "hi",
      "hey",
    ],
    weight: 3,
  },
  {
    intent: "buy",
    keywords: [
      "comprar",
      "compra",
      "quiero comprar",
      "quiero una gorra",
      "quiero pedir",
      "pedido",
      "pedir",
      "ordenar",
      "como compro",
      "como comprar",
      "me interesa comprar",
      "quiero esa",
    ],
    weight: 4,
  },
  {
    intent: "shipping",
    keywords: [
      "envio",
      "envios",
      "hacen envios",
      "entrega",
      "entregas",
      "paqueteria",
      "cuanto tarda",
      "cuanto tardan",
      "disponibilidad",
      "mandan a",
      "envian a",
      "llega a",
      "tiempo de envio",
    ],
    weight: 4,
  },
  {
    intent: "payment",
    keywords: [
      "pago",
      "pagos",
      "metodo de pago",
      "metodos de pago",
      "como pago",
      "transferencia",
      "deposito",
      "tarjeta",
      "formas de pago",
      "aceptan transferencia",
      "aceptan tarjeta",
    ],
    weight: 4,
  },
  {
    intent: "wholesale",
    keywords: [
      "mayoreo",
      "mayorista",
      "por volumen",
      "volumen",
      "lote",
      "comprar varias",
      "muchas gorras",
      "pedido grande",
      "cotizacion mayoreo",
      "cotizar mayoreo",
    ],
    weight: 4,
  },
  {
    intent: "contact",
    keywords: [
      "contacto",
      "contactar",
      "whatsapp",
      "telefono",
      "mensaje",
      "redes",
      "instagram",
      "facebook",
      "hablar con ustedes",
      "como los contacto",
      "donde les escribo",
    ],
    weight: 4,
  },
  {
    intent: "catalog",
    keywords: [
      "catalogo",
      "catálogo",
      "modelos",
      "ver gorras",
      "productos",
      "coleccion",
      "colección",
      "quiero ver gorras",
      "ver modelos",
    ],
    weight: 4,
  },
  {
    intent: "faq",
    keywords: [
      "faq",
      "preguntas frecuentes",
      "dudas",
      "ayuda",
      "informacion",
      "información",
      "tengo una duda",
      "tengo dudas",
    ],
    weight: 3,
  },
  {
    intent: "about",
    keywords: [
      "quienes son",
      "quienes somos",
      "sobre ustedes",
      "sobre salva",
      "nosotros",
      "marca",
      "empresa",
      "de que trata",
    ],
    weight: 3,
  },
  {
    intent: "collab",
    keywords: [
      "colaboracion",
      "colaboración",
      "colab",
      "alianza",
      "trabajar juntos",
      "modelo",
      "influencer",
      "creador",
      "fotografo",
      "fotógrafo",
    ],
    weight: 3,
  },
  {
    intent: "joke",
    keywords: [
      "chiste",
      "cuentame un chiste",
      "cuéntame un chiste",
      "broma",
      "jajaja",
      "algo chistoso",
      "hazme reir",
      "hazme reír",
      "otro chiste",
    ],
    weight: 5,
  },
  {
    intent: "fact",
    keywords: [
      "dato",
      "dato curioso",
      "curioso",
      "sabias",
      "sabías",
      "curiosidad",
      "fact",
      "otro dato",
    ],
    weight: 5,
  },
  {
    intent: "recommendation",
    keywords: [
      "recomiendame",
      "recomiéndame",
      "que gorra me recomiendas",
      "que me recomiendas",
      "sugerencia",
      "recomendacion",
      "recomendación",
      "cual me recomiendas",
      "cuál me recomiendas",
    ],
    weight: 4,
  },
];

function scoreIntent(text: string, rule: IntentRule): number {
  const normalizedKeywords = rule.keywords.map((keyword) => normalizeText(keyword));
  const weight = rule.weight ?? 1;

  let score = 0;

  for (const keyword of normalizedKeywords) {
    if (text === keyword) {
      score += weight + 4;
      continue;
    }

    if (text.includes(keyword)) {
      score += weight + 2;
      continue;
    }

    const keywordParts = keyword.split(" ").filter(Boolean);
    const partialMatches = keywordParts.filter(
      (part) => part.length >= 4 && text.includes(part)
    ).length;

    if (partialMatches > 0) {
      score += partialMatches;
    }
  }

  return score;
}

export function matchIntent(input: string): ChatIntent {
  const text = normalizeText(input);

  if (!text) return "fallback";

  let bestIntent: ChatIntent = "fallback";
  let bestScore = 0;

  for (const rule of INTENT_RULES) {
    const score = scoreIntent(text, rule);

    if (score > bestScore) {
      bestScore = score;
      bestIntent = rule.intent;
    }
  }

  if (bestScore <= 0) {
    return "fallback";
  }

  return bestIntent;
}
