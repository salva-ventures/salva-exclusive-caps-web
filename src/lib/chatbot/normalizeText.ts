export function normalizeText(input: string): string {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[¿?¡!.,;:()[\]{}"'`´]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .toLowerCase();
}
