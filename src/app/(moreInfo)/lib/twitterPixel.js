// lib/twitterPixel.js

export const TWITTER_PIXEL_ID = 'oxi2l'; // e.g. 'o8abc'

// Event IDs from Twitter Ads → Events Manager
export const TW_EVENTS = {
  CALL_CLICK: 'tw-oxi2l-rd5y1',
  WHATSAPP_CLICK: 'tw-oxi2l-rd5y4',
};

export const twEvent = (eventId, params = {}) => {
  if (typeof window !== 'undefined' && typeof window.twq === 'function') {
    window.twq('event', eventId, params);
  }
};