/**
 * Normalizes an Indonesian phone number to WhatsApp's international format
 * (digits only, `62` prefix). Returns null when it doesn't look valid.
 *
 *   "0812-3456-7890"   -> "6281234567890"
 *   "+62 812 3456 7890" -> "6281234567890"
 *   "812 3456 7890"    -> "6281234567890"
 */
export function normalizeWhatsAppNumber(input: string): string | null {
  let digits = input.replace(/\D/g, '')

  if (digits.startsWith('0')) digits = `62${digits.slice(1)}`
  else if (digits.startsWith('8')) digits = `62${digits}`

  return /^62\d{8,13}$/.test(digits) ? digits : null
}

/**
 * Builds a wa.me link that opens a chat with a pre-filled message.
 */
export function getWhatsAppUrl(phone: string, message: string): string {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`
}

/**
 * Turns a guest name into the `?for=` value the invitation page expects
 * (spaces become dashes; the page turns them back into spaces).
 */
export function toRecipientParam(name: string): string {
  return name.trim().replace(/\s+/g, '-')
}
