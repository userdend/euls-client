let api = `https://boydbayndend.bsite.net`;

let element_mapping = new Map([
  ["pdf-list", document.getElementById("pdf-list")],
  ["btn-build-tt", document.getElementById("btn-build-tt")],
  ["btn-dw-img", document.getElementById("btn-dw-img")],
  ["label-search-box", document.getElementById("label-search-box")],
  ["filter-subject", document.getElementById("filter-subject")],
  ["subject-list", document.getElementById("subject-list")],
]);

let subjects = [];

let subjects_for_pdf = {};
