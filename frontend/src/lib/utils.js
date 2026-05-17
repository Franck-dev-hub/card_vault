import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS class names safely.
 *
 * clsx resolves conditional and array-based class expressions into a single
 * string, then twMerge deduplicates conflicting Tailwind utilities (e.g. two
 * `p-*` values) so only the last one wins — matching the expected CSS cascade
 * behaviour without requiring consumers to manage conflicts manually.
 *
 * @param {...(string|string[]|Record<string,boolean>|undefined|null|false)} inputs
 *   Any mix of class strings, arrays, or conditional objects accepted by clsx.
 * @returns {string} A single deduplicated Tailwind class string.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
