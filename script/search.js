let filterSubject = element_mapping.get("filter-subject");
let subjectList = element_mapping.get("subject-list");

function clear_input() {
  filterSubject.value = "";
  subjectList.innerHTML = "";
}

function search() {
  let keywords = filterSubject.value.toUpperCase();
  let maxList = 0;

  subjectList.innerHTML = "";

  for (let i = 0; i < subjects.length; i++) {
    if (subjects[i]["title"].toUpperCase().indexOf(keywords) > -1) {
      let props = {
        "subject-title": subjects[i]["title"],
        "full-path": subjects[i]["base"].replace(
          "mindex.html",
          subjects[i]["path"]
        ),
        "source-path": subjects[i]["base"]
          .replace("mindex.html", subjects[i]["path"])
          .replace("html", "xml"),
      };
      maxList += 1;
      if (maxList <= 5) {
        subjectList.innerHTML +=
          filterSubject.value == ""
            ? ""
            : `
              <button onclick="add_to_list('${props["subject-title"]}', '${
                props["source-path"]
              }')">
                &#43;
              </button>
              &ensp;
              <a href="${props["full-path"]}">
                ${props["subject-title"].split(",")[0]}
              </a><br /><br />
            `;
      }
    }
  }
}
