const pinned_entries = [0];

function doesFileExist(urlToFile) {
  var xhr = new XMLHttpRequest();
  xhr.open("HEAD", urlToFile, false);
  xhr.send();

  if (xhr.status == "404") {
    return false;
  } else {
    return true;
  }
}

for (let i = 0; true; i++) {
  if (!doesFileExist(`entries/entry_${i}.html`)) {
    fetch(`entries/entry_${i - 1}.html`).then((res) => res.text()).then((text) => {
      document.getElementById("newest").innerHTML = text;
    });

    break;
  }
}

document.getElementById("all-entries").addEventListener("click", () => {
  const parentElement = document.getElementById("top");

  parentElement.replaceChildren();
  document.getElementById("all-entries").remove();

  for (i = 0; doesFileExist(`entries/entry_${i}.html`); i++) {
    const entryElement = document.createElement("div");
    entryElement.className = "box";

    fetch(`entries/entry_${i}.html`).then((res) => res.text()).then((text) => {
      entryElement.innerHTML = text;
    });

    parentElement.insertBefore(entryElement, parentElement.firstChild);
  }
});

for (let i = 0; i < pinned_entries.length; i++) {
  const parentElement = document.getElementById("top");
  const entryElement = document.createElement("div");
  entryElement.classList.add("box");
  entryElement.classList.add("pinned");
  
  if (i === 0) {
    const sectionNameParagraphElement = document.createElement("p");
    const sectionNameEmphasisElement = document.createElement("i");
    sectionNameEmphasisElement.innerText = "Angeheftete Einträge:";

    sectionNameParagraphElement.appendChild(sectionNameEmphasisElement);
    parentElement.appendChild(sectionNameParagraphElement);
  }

  fetch(`entries/entry_${pinned_entries[i]}.html`).then((res) => res.text()).then((text) => {
    entryElement.innerHTML = text;
  });
  parentElement.appendChild(entryElement);
}
