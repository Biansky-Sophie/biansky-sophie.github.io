const pinned_entry = undefined;

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

if (pinned_entry !== undefined) {
    fetch(`entries/entry_${pinned_entry}.html`).then((res) => res.text()).then((text) => {
    document.getElementById("pinned").innerHTML = text;
  });
} else {
  document.querySelector("#top p:last-of-type").remove();
  document.getElementById("pinned").remove();
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
