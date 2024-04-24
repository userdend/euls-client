let filterSubject = element_mapping.get("filter-subject");
let subjectList = element_mapping.get("subject-list");

function clear_input() {
  filterSubject.value = "";
  subjectList.innerHTML = "";
}

function search() {
  let keywords = filterSubject.value.toUpperCase();
  let maxList = 0;
  let subString = "";

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
        subString +=
          filterSubject.value == ""
            ? ""
            : `
              <tr>
                <td>
                  <button onclick="add_to_list('${props["subject-title"]}', '${
                props["source-path"]
              }')">
                    Add
                  </button>
                </td>
                <td>
                  <a href="${props["full-path"]}">
                    ${props["subject-title"].split(",")[0]}
                  </a>
                </td>
              </tr>
            `;
      }
    }
  }

  subjectList.innerHTML =
    filterSubject.value == ""
      ? ""
      : `
    <table border="1">
      <thead>
        <tr>
          <th>Action</th>
          <th>Subject</th>
        </tr>
      </thead>
      ${subString}
    </table>
    `;
}
