/**
 * Konvertuje iznos iz USD u RSD po zadatom kursu (default 102.46)
 * @param usd - iznos u dolarima
 * @param rate - kurs dolara u dinarima
 * @returns iznos u dinarima, zaokružen na 2 decimale
 */
export function convertUsdToRsd(usd: number, rate = 102.46): number {
  return +(usd * rate).toFixed(2);
}
