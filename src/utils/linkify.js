/**
 * Detects URLs in text and converts them to clickable links
 * @param {string} text - The text to process
 * @returns {Array} - Array of text segments and link objects
 */
export function parseTextWithLinks(text) {
  if (!text) return [];

  // http://, https://, www.
  const urlRegex = /(https?:\/\/[^\s]+|www\.[^\s]+)/gi;

  const parts = [];
  let lastIndex = 0;
  let match;

  urlRegex.lastIndex = 0;

  while ((match = urlRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({
        type: "text",
        content: text.substring(lastIndex, match.index),
      });
    }

    let url = match[0];
    const href = url.startsWith("www.") ? `https://${url}` : url;

    parts.push({
      type: "link",
      content: url,
      href: href,
    });

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    parts.push({
      type: "text",
      content: text.substring(lastIndex),
    });
  }

  if (parts.length === 0) {
    parts.push({
      type: "text",
      content: text,
    });
  }

  return parts;
}
