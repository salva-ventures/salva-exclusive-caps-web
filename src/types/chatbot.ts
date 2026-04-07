export type ChatRole = "user" | "assistant";

export type ChatIntent =
  | "buy"
  | "shipping"
  | "payment"
  | "wholesale"
  | "contact"
  | "catalog"
  | "faq"
  | "about"
  | "collab"
  | "joke"
  | "fact"
  | "recommendation"
  | "greeting"
  | "fallback";

export interface ChatAction {
  label: string;
  href?: string;
  type: "link" | "message";
  value?: string;
}

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  timestamp: string;
  actions?: ChatAction[];
}

export interface ChatbotResponse {
  intent: ChatIntent;
  content: string;
  actions?: ChatAction[];
  metadata?: {
    lastFactIndex?: number;
    lastJokeIndex?: number;
  };
}

export interface ChatbotMemory {
  lastIntent?: ChatIntent;
  lastTopic?: "catalog" | "wholesale" | "contact" | "shipping" | "payment" | "faq";
  lastReference?: string;
  lastUserMessage?: string;
  lastFactIndex?: number;
  lastJokeIndex?: number;
}

export interface ChatbotContext {
  pathname: string;
  memory: ChatbotMemory;
}
