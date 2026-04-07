import type {
  ChatAction,
  ChatbotContext,
  ChatbotMemory,
  ChatbotResponse,
} from "@/types/chatbot";

const DEFAULT_ACTIONS: ChatAction[] = [
  { label: "Ver catálogo", value: "Ver catálogo", type: "message" },
  { label: "Ayúdame a elegir", value: "Ayúdame a elegir", type: "message" },
  { label: "Dato curioso", value: "Dato curioso", type: "message" },
  { label: "Envíos", value: "Envíos", type: "message" },
  { label: "Mayoreo", value: "Mayoreo", type: "message" },
];

const GORRIN_FACTS = [
  "Dato curioso de Gorrín: la forma de la visera cambia mucho cómo se percibe una gorra puesta. La curva suele verse más relajada; la plana, más marcada.",
  "Dato curioso de Gorrín: una gorra puede verse muy bien en foto, pero si no ajusta bien, cambia todo. La comodidad también es parte del estilo.",
  "Dato curioso de Gorrín: aunque parezca detalle pequeño, una buena gorra puede darle estructura y actitud a todo el outfit.",
  "Dato curioso de Gorrín: los tonos neutros como negro, gris o beige suelen combinar más fácil y durar mejor en rotación.",
  "Dato curioso de Gorrín: muchas veces una gorra simple y bien elegida se ve más seria que una demasiado cargada.",
  "Dato curioso de Gorrín: el material y la textura también hablan. No solo importa el diseño, también cómo se siente y cómo cae puesta.",
  "Dato curioso de Gorrín: la silueta cambia mucho. Hay gorras que se ven más limpias, otras más deportivas y otras con más presencia frontal.",
  "Dato curioso de Gorrín: elegir bien una gorra sí se nota. No hace falta exagerar para que un look se sienta más pensado.",
];

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

function includesAny(text: string, terms: string[]) {
  return terms.some((term) => text.includes(term));
}

function getSectionLabel(pathname: string) {
  if (pathname.includes("/catalogo")) return "catálogo";
  if (pathname.includes("/mayoreo")) return "mayoreo";
  if (pathname.includes("/contacto")) return "contacto";
  if (pathname.includes("/faq")) return "preguntas frecuentes";
  if (pathname.includes("/disponibilidad")) return "disponibilidad y envíos";
  return "inicio";
}

function getWelcomeMessage(pathname: string) {
  const section = getSectionLabel(pathname);

  if (section === "catálogo") {
    return "Qué gusto tenerte por aquí. Soy Salva Gorrín. Andas en catálogo, así que te puedo ayudar a elegir una gorra, resolver dudas de compra o contarte un dato curioso.";
  }

  if (section === "mayoreo") {
    return "Soy Salva Gorrín. Si vienes por mayoreo, te oriento con compras por volumen, catálogo y contacto. Y sí, también me sé uno que otro dato curioso de gorras.";
  }

  if (section === "contacto") {
    return "Soy Salva Gorrín. Si quieres escribirnos, pedir información o resolver dudas rápido, aquí ando para ayudarte.";
  }

  if (section === "disponibilidad y envíos") {
    return "Soy Salva Gorrín. Si traes dudas sobre entregas, disponibilidad o envíos, te ayudo. También puedo orientarte con catálogo o mayoreo.";
  }

  return "Qué gusto tenerte por aquí. Soy Salva Gorrín. Te puedo ayudar con catálogo, envíos, mayoreo, compras y uno que otro dato curioso del mundo de las gorras.";
}

function getRandomFact(memory?: ChatbotMemory) {
  const usedIndex = typeof memory?.lastFactIndex === "number" ? memory.lastFactIndex : -1;
  const availableFacts = GORRIN_FACTS.map((fact, index) => ({ fact, index })).filter(
    ({ index }) => index !== usedIndex
  );

  const selected =
    availableFacts[Math.floor(Math.random() * availableFacts.length)] ??
    { fact: GORRIN_FACTS[0], index: 0 };

  return selected;
}

function getContextualHint(pathname: string) {
  const section = getSectionLabel(pathname);

  switch (section) {
    case "catálogo":
      return "Estás en catálogo, así que también te puedo ayudar a elegir una según el estilo que busques.";
    case "mayoreo":
      return "Estás en mayoreo, pero también te puedo orientar con catálogo, contacto y envíos.";
    case "contacto":
      return "Estás en contacto, aunque si quieres también te ayudo con catálogo, envíos o mayoreo.";
    case "disponibilidad y envíos":
      return "Aquí estás en disponibilidad y envíos, pero también puedo ayudarte con compras o mayoreo.";
    default:
      return "Si quieres, te ayudo a encontrar rápido lo más útil según lo que estés buscando.";
  }
}

export function getChatbotTeaser(pathname: string) {
  const section = getSectionLabel(pathname);

  if (section === "catálogo") {
    return "Te ayudo a elegir una buena gorra o a resolver dudas de compra.";
  }

  if (section === "mayoreo") {
    return "Si te interesa comprar por volumen, aquí te oriento rápido.";
  }

  if (section === "contacto") {
    return "Si ocupas ayuda o quieres escribirnos, aquí ando.";
  }

  return "Te ayudo con catálogo, envíos, mayoreo y uno que otro dato curioso.";
}

export function getChatbotResponse(
  input: string,
  context: ChatbotContext
): ChatbotResponse {
  const normalized = normalizeText(input);
  const { pathname, memory } = context;

  if (normalized === "hola" || normalized === "buenas" || normalized === "hello") {
    return {
      intent: "greeting",
      content: getWelcomeMessage(pathname),
      actions: DEFAULT_ACTIONS,
      metadata: {},
    };
  }

  if (includesAny(normalized, ["dato curioso", "curiosidad", "sorprendeme", "otro dato"])) {
    const selected = getRandomFact(memory);

    return {
      intent: "fact",
      content: `${selected.fact}\n\nSi quieres, te doy otro.`,
      actions: [
        { label: "Otro dato", value: "Otro dato", type: "message" },
        { label: "Ver catálogo", value: "Ver catálogo", type: "message" },
        { label: "Ayúdame a elegir", value: "Ayúdame a elegir", type: "message" },
      ],
      metadata: {
        lastFactIndex: selected.index,
      },
    };
  }

  if (includesAny(normalized, ["ver catalogo", "catalogo", "productos", "gorras"])) {
    return {
      intent: "catalog",
      content:
        "Si quieres ver opciones, lo mejor es entrar al catálogo. Ahí puedes revisar lo disponible y, si quieres, también te ayudo a elegir algo según el estilo que busques.",
      actions: [
        { label: "Ayúdame a elegir", value: "Ayúdame a elegir", type: "message" },
        { label: "Envíos", value: "Envíos", type: "message" },
        { label: "Dato curioso", value: "Dato curioso", type: "message" },
      ],
      metadata: {},
    };
  }

  if (includesAny(normalized, ["ayudame a elegir", "elige", "recomiendame", "recomienda"])) {
    return {
      intent: "recommendation",
      content:
        "Te ayudo. Dime si buscas algo más limpio, más llamativo, más fácil de combinar o con más presencia. Con eso te oriento mejor.",
      actions: [
        { label: "Algo limpio", value: "Busco algo limpio", type: "message" },
        { label: "Algo llamativo", value: "Busco algo llamativo", type: "message" },
        { label: "Fácil de combinar", value: "Busco algo fácil de combinar", type: "message" },
      ],
      metadata: {},
    };
  }

  if (includesAny(normalized, ["busco algo limpio", "limpio"])) {
    return {
      intent: "recommendation",
      content:
        "Buena elección. Normalmente lo más limpio se siente más serio y combina más fácil. Te conviene revisar opciones en tonos neutros o diseños menos cargados.",
      actions: [
        { label: "Ver catálogo", value: "Ver catálogo", type: "message" },
        { label: "Dato curioso", value: "Dato curioso", type: "message" },
      ],
      metadata: {},
    };
  }

  if (includesAny(normalized, ["busco algo llamativo", "llamativo"])) {
    return {
      intent: "recommendation",
      content:
        "Si quieres algo con más presencia, conviene fijarte en contraste, silueta y fuerza visual frontal. Lo importante es que siga sintiéndose bien puesta, no solo que destaque.",
      actions: [
        { label: "Ver catálogo", value: "Ver catálogo", type: "message" },
        { label: "Ayúdame a elegir", value: "Ayúdame a elegir", type: "message" },
      ],
      metadata: {},
    };
  }

  if (includesAny(normalized, ["busco algo facil de combinar", "facil de combinar", "combinar"])) {
    return {
      intent: "recommendation",
      content:
        "Para combinar fácil, casi siempre funcionan mejor los tonos neutros, acabados limpios y diseños menos saturados. Esas suelen dar más juego en el día a día.",
      actions: [
        { label: "Ver catálogo", value: "Ver catálogo", type: "message" },
        { label: "Dato curioso", value: "Dato curioso", type: "message" },
      ],
      metadata: {},
    };
  }

  if (includesAny(normalized, ["envios", "envio", "entregas", "disponibilidad"])) {
    return {
      intent: "shipping",
      content:
        "Te puedo ayudar con disponibilidad y envíos. Si quieres información exacta, revisa esa sección del sitio o escríbenos directo para confirmar tiempos y cobertura.",
      actions: [
        { label: "Ver catálogo", value: "Ver catálogo", type: "message" },
        { label: "Mayoreo", value: "Mayoreo", type: "message" },
      ],
      metadata: {},
    };
  }

  if (includesAny(normalized, ["mayoreo", "volumen", "mayorista"])) {
    return {
      intent: "wholesale",
      content:
        "Si te interesa mayoreo, lo ideal es que nos compartas qué volumen buscas y por qué canal quieres vender o mover producto. Así te orientamos mejor.",
      actions: [
        { label: "Contacto", value: "Contacto", type: "message" },
        { label: "Ver catálogo", value: "Ver catálogo", type: "message" },
      ],
      metadata: {},
    };
  }

  if (includesAny(normalized, ["contacto", "whatsapp", "hablar", "mensaje"])) {
    return {
      intent: "contact",
      content:
        "Si quieres hablar con el equipo, la vía más rápida suele ser contacto directo. También te puedo orientar primero por aquí si solo traes una duda puntual.",
      actions: [
        { label: "Envíos", value: "Envíos", type: "message" },
        { label: "Mayoreo", value: "Mayoreo", type: "message" },
        { label: "Dato curioso", value: "Dato curioso", type: "message" },
      ],
      metadata: {},
    };
  }

  if (includesAny(normalized, ["chiste", "risa", "algo random"])) {
    return {
      intent: "joke",
      content:
        "Ahí te va uno leve: una buena gorra no hace magia... pero casi siempre arregla más de un outfit.\n\nY ya en serio, también te puedo contar un dato curioso.",
      actions: [
        { label: "Dato curioso", value: "Dato curioso", type: "message" },
        { label: "Ver catálogo", value: "Ver catálogo", type: "message" },
      ],
      metadata: {},
    };
  }

  return {
    intent: "fallback",
    content: `${getContextualHint(pathname)}\n\nSi me dices qué buscas exactamente, te respondo más directo.`,
    actions: DEFAULT_ACTIONS,
    metadata: {},
  };
}

export function getUpdatedMemory(
  input: string,
  response: ChatbotResponse,
  memory: ChatbotMemory
): ChatbotMemory {
  return {
    ...memory,
    lastIntent: response.intent,
    lastUserMessage: input,
    ...(typeof response.metadata?.lastFactIndex === "number"
      ? { lastFactIndex: response.metadata.lastFactIndex }
      : {}),
  };
}