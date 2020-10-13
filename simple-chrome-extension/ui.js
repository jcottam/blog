/**
 * ui.js: The user interface of the extension
 * communicates with content.js
 */

document.getElementById("removeIFramesBtn").addEventListener("click", (evt) => {
  chrome.tabs.getSelected(null, (tab) => {
    chrome.tabs.sendMessage(
      tab.id,
      {
        type: "REMOVE_IFRAMES",
        tab,
      },
      {},
      function (response) {
        document.querySelector(".status").innerHTML = response;
      }
    );
  });
});

document.getElementById("copyLinks").addEventListener("click", (evt) => {
  chrome.tabs.getSelected(null, (tab) => {
    chrome.tabs.sendMessage(
      tab.id,
      {
        type: "COPY_LINKS",
        tab,
      },
      {},
      function (response) {
        copyToClipboard(response);
        document.querySelector(".status").innerHTML =
          "links copied to clipboard";
        // console.log(response);
      }
    );
  });
});

const copyToClipboard = (val) => {
  val = val.toString();
  val = val.replaceAll(",", "\n");
  const copyFrom = document.createElement("textarea");
  copyFrom.textContent = val;
  copyFrom.style.position = "absolute";
  copyFrom.style.top = "0";
  copyFrom.style.right = "0";
  copyFrom.style.height = "0";
  document.body.appendChild(copyFrom);
  copyFrom.select();
  document.execCommand("copy");
  copyFrom.blur();
  document.body.removeChild(copyFrom);
};
