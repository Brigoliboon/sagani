export type ChatRole = "system" | "user" | "assistant" | "tool";

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

export interface ChatCompletionOptions {
  model: string;
  messages: ChatMessage[];
  temperature?: number;
  maxTokens?: number;
  responseFormat?: { type: "text" | "json_object" };
}

export interface ChatCompletionResponse {
  id: string;
  model: string;
  choices: {
    index: number;
    message: ChatMessage;
    finishReason: string | null;
  }[];
  usage: {
    promptTokens: number;
    completionTokens: number;
    totalTokens: number;
  };
}

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_BASE_URL =
  process.env.OPENROUTER_BASE_URL ?? "https://openrouter.ai/api/v1";
const OPENROUTER_SITE_URL = process.env.OPENROUTER_SITE_URL;
const OPENROUTER_SITE_NAME = process.env.OPENROUTER_SITE_NAME;

export function getApiKey(): string {
  if (!OPENROUTER_API_KEY) {
    throw new Error(
      "OPENROUTER_API_KEY is not defined. Set it in your environment variables."
    );
  }
  return OPENROUTER_API_KEY;
}

export class OpenRouterError extends Error {
  readonly status: number;
  readonly code: string | undefined;

  constructor(message: string, status: number, code?: string) {
    super(message);
    this.name = "OpenRouterError";
    this.status = status;
    this.code = code;
  }
}

function buildHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Authorization: `Bearer ${getApiKey()}`,
    "Content-Type": "application/json",
  };
  if (OPENROUTER_SITE_URL) {
    headers["HTTP-Referer"] = OPENROUTER_SITE_URL;
  }
  if (OPENROUTER_SITE_NAME) {
    headers["X-Title"] = OPENROUTER_SITE_NAME;
  }
  return headers;
}

export async function chat(
  options: ChatCompletionOptions
): Promise<ChatCompletionResponse> {
  const response = await fetch(`${OPENROUTER_BASE_URL}/chat/completions`, {
    method: "POST",
    headers: buildHeaders(),
    body: JSON.stringify({
      model: options.model,
      messages: options.messages,
      temperature: options.temperature,
      max_tokens: options.maxTokens,
      response_format: options.responseFormat,
    }),
  });

  if (!response.ok) {
    const body = (await response.json().catch(() => null)) as {
      error?: { message?: string; code?: string };
    } | null;
    throw new OpenRouterError(
      body?.error?.message ?? `OpenRouter request failed: ${response.status}`,
      response.status,
      body?.error?.code
    );
  }

  const data = (await response.json()) as {
    id: string;
    model: string;
    choices: {
      index: number;
      message: ChatMessage;
      finish_reason: string | null;
    }[];
    usage: {
      prompt_tokens: number;
      completion_tokens: number;
      total_tokens: number;
    };
  };

  return {
    id: data.id,
    model: data.model,
    choices: data.choices.map((choice) => ({
      index: choice.index,
      message: choice.message,
      finishReason: choice.finish_reason,
    })),
    usage: {
      promptTokens: data.usage.prompt_tokens,
      completionTokens: data.usage.completion_tokens,
      totalTokens: data.usage.total_tokens,
    },
  };
}

export async function listModels(): Promise<unknown[]> {
  const response = await fetch(`${OPENROUTER_BASE_URL}/models`, {
    headers: buildHeaders(),
  });

  if (!response.ok) {
    throw new OpenRouterError(
      `Failed to list models: ${response.status}`,
      response.status
    );
  }

  const data = (await response.json()) as { data: unknown[] };
  return data.data;
}