/**
 * Pads a number to two digits, e.g. 1 -> "01".
 */
export function padNumber(value: number): string {
  return String(value).padStart(2, '0')
}

/**
 * Builds a Google Maps search URL for an address.
 */
export function getMapsUrl(address: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`
}
