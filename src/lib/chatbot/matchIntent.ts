import type { ChatIntent } from "@/types/chatbot";
import { normalizeText } from "./normalizeText";

const INTENT_KEYWORDS: Array<{
  intent: ChatIntent;
  keywords: string[];
}> = [
  {
    intent: "greeting",
    keywords: [
      "hola",
      "buenas",
      "que onda",
      "saludos",
      "hello",
      "hi",
      "hey",
    ],
  },
  {
    intent: "buy",
    keywords: [
      "comprar",
      "compra",
      "pedido",
      "pedir",
      "ordenar",
      "quiero una gorra",
      "como compro",
      "como comprar",
    ],
  },
  {
    intent: "shipping",
    keywords: [
      "envio",
      "envios",
      "entrega",
      "entregas",
      "paqueteria",
      "cuanto tarda",
      "disponibilidad",
      "mandan a",
      "hacen envios",
    ],
  },
  {
    intent: "payment",
    keywords: [
      "pago",
      "pagos",
      "metodo de pago",
      "metodos de pago",
      "transferencia",
      "deposito",
      "tarjeta",
      "como pago",
    ],
  },
  {
    intent: "wholesale",
    keywords: [
      "mayoreo",
      "mayorista",
      "por volumen",
      "volumen",
      "lote",
      "muchas gorras",
      "comprar varias",
    ],
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
    ],
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
    ],
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
    ],
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
    ],
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
  },
  {
    intent: "joke",
    keywords: [
      "chiste",
      "broma",
      "jajaja",
      "algo chistoso",
      "hazme reir",
      "hazme reír",
    ],
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
    ],
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
    ],
  },
];

export function matchIntent(input: string): ChatIntent {
  const text = normalizeText(input);

  for (const item of INTENT_KEYWORDS) {
    const matched = item.keywords.some((keyword) =>
      text.includes(normalizeText(keyword))
    );

    if (matched) {
      return item.intent;
    }
  }

  return "fallback";
}
