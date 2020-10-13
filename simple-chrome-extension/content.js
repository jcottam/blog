/**
 * content.js: This script has access to the DOM and associated events
 * This script can read and write to web pages
 */

// Listen for messages dispatched from ui.js
chrome.runtime.onMessage.addListener((message, sender, callback) => {
  const { type } = message;
  let response;
  switch (type) {
    case "REMOVE_IFRAMES":
      const frames = document.querySelectorAll("iframe");
      Array.from(frames).forEach((frame) => frame.remove());
      response = `${frames.length} iframes removed`;
      break;
    case "COPY_LINKS":
      let links = document.querySelectorAll("a");
      response = Array.from(links).map((a) => a.href);
      response = response.filter((r) => r.trim() !== "");
      break;
  }
  if (callback) callback(response);
});
