// chrome.history.getVisits(object details, function callback)

chrome.topSites.get((mostVisitedURLs) => {
  console.log(mostVisitedURLs);
  const topSitesDiv = document.getElementById("topSites");
  const ol = topSitesDiv.appendChild(document.createElement("ol"));
  for (let i = 0; i < mostVisitedURLs.length; i++) {
    const li = ol.appendChild(document.createElement("li"));
    const a = li.appendChild(document.createElement("a"));
    a.href = mostVisitedURLs[i].url;
    a.appendChild(document.createTextNode(mostVisitedURLs[i].title));
    a.addEventListener("click", (evt) =>
      console.log("clicked", evt.target.href)
    );
  }
});
