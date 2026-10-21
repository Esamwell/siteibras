/**
 * Cryptographic utility using native Web Crypto API (SubtleCrypto)
 * Converts text (passwords) to a secure SHA-256 hexadecimal hash.
 */
export async function sha256(message: string): Promise<string> {
  const msgBuffer = new TextEncoder().encode(message.trim())
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}
