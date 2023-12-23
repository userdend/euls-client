let pdf_list = element_mapping.get("pdf-list");
let btn_build_tt = element_mapping.get("btn-build-tt");

function add_to_list(title, src) {
  subjects_for_pdf[title] = src;
  config_ui();
}

function remove_from_list(title) {
  delete subjects_for_pdf[title];
  config_ui();
}

function config_ui() {
  let count_subjects = Object.keys(subjects_for_pdf).length;

  if (count_subjects == 0) {
    btn_build_tt.disabled = true;
  } else {
    btn_build_tt.disabled = false;
  }

  let table = `
    <table border="1">
      <thead>
        <tr>
          <th>Action</th>
          <th>Subject</th>
        </tr>
      </thead>
    `;
  Object.keys(subjects_for_pdf).forEach(function (key) {
    table += `
            <tr>
                <td><button class="btn-rmv-subject" onclick="remove_from_list('${key}')">Remove</button></td>
                <td><a href="${subjects_for_pdf[key]}">${
      key.split(",")[0]
    }</a></td>
            </tr>`;
  });
  table += `</table>`;
  pdf_list.innerHTML = count_subjects > 0 ? table : "No subject added yet.";
}

function generate_timetable() {
  btn_build_tt.disabled = true;
  btn_build_tt.innerText = "Loading..";

  let pdfs = [];

  Object.keys(subjects_for_pdf).forEach(function (key) {
    pdfs.push(subjects_for_pdf[key]);
  });

  fetch(`${api}/api/pdf`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(pdfs),
  })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      build_timetable(data);

      let btn_dw_img = element_mapping.get("btn-dw-img");
      btn_dw_img.disabled = false;

      btn_build_tt.disabled = false;
      btn_build_tt.innerText = "Build";
    })
    .catch(function (error) {
      console.error(error);
    });
}

let day_mapping = {
  0: "Monday",
  1: "Tuesday",
  2: "Wednesday",
  3: "Thursday",
  4: "Friday",
  5: "Saturday",
  6: "Sunday",
};

function build_timetable(data) {
  var timetable = new Timetable();

  timetable.setScope(8, 19);

  timetable.addLocations([
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ]);

  Object.keys(data).forEach(function (key) {
    let startTime = data[key]["start"].split(":");
    let endTime = data[key]["end"].split(":");

    let start_h = parseInt(startTime[0], 10);
    let start_m = parseInt(startTime[1], 10);

    let end_h = parseInt(endTime[0], 10);
    let end_m = parseInt(endTime[1], 10);

    timetable.addEvent(
      `
        ${data[key]["subject"].split(" (")[0]}<br />
        ${data[key]["venue"].split(" (")[0]}<br />
        ${data[key]["lecturer"]}
      `,
      day_mapping[data[key]["day"]],
      new Date(null, null, null, start_h, start_m),
      new Date(null, null, null, end_h, end_m),
      "#"
    );
  });

  var renderer = new Timetable.Renderer(timetable);
  renderer.draw(".timetable");
}

function download_img_timetable() {
  let div = document.getElementsByClassName("timetable")[0];
  html2canvas(div).then(function (canvas) {
    return Canvas2Image.saveAsPNG(canvas);
  });
}
