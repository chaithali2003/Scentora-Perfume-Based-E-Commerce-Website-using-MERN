// utils/imageUtils.js

/**
 * Converts a Google Drive sharing link to a direct view link
 * @param {string} url - The original URL
 * @returns {string} - The converted URL or original if not a Drive link
 */
export const convertDriveLink = (url) => {
  if (!url || typeof url !== 'string') return url;

  const trimmedUrl = url.trim();

  const patterns = [
    /https?:\/\/drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)\/(?:view|preview|edit)(?:\?.*)?/,
    /https?:\/\/drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)(?:&.*)?/,
    /https?:\/\/drive\.google\.com\/uc\?(?:export=(?:view|download)&)?id=([a-zA-Z0-9_-]+)(?:&.*)?/
  ];

  for (const pattern of patterns) {
    const match = trimmedUrl.match(pattern);
    if (match) {
      const fileId = match[1];
      return `https://drive.google.com/uc?export=view&id=${fileId}`;
    }
  }

  return trimmedUrl;
};

export const noImagePlaceholder = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MDAiIGhlaWdodD0iNDAwIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjQwMCIgZmlsbD0iI2YzZjRmNiIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBmb250LWZhbWlseT0iQXJpYWwsIHNhbnMtc2VyaWYgIiBmb250LXNpemU9IjI0IiBmaWxsPSIjNjY2NjY2IiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIj5ObyBJbWFnZTwvdGV4dD48L3N2Zz4=';

/**
 * Processes an array of image URLs, converting Drive links if necessary
 * @param {string[]} images - Array of image URLs
 * @returns {string[]} - Array of processed URLs
 */
export const processImageUrls = (images) => {
  if (!images) return [];

  if (typeof images === 'string') {
    return images
      .split(',')
      .map((url) => url.trim())
      .filter(Boolean)
      .map(convertDriveLink);
  }

  if (Array.isArray(images)) {
    return images
      .filter((url) => typeof url === 'string' && url.trim())
      .map((url) => convertDriveLink(url.trim()));
  }

  return [];
};