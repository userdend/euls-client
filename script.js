window.addEventListener("load", async function () {
  let btn_build_tt = element_mapping.get("btn-build-tt");
  let btn_dw_img = element_mapping.get("btn-dw-img");
  let search_label_box = element_mapping.get("label-search-box");
  let filter_subject = element_mapping.get("filter-subject");

  btn_build_tt.disabled = true;
  btn_dw_img.disabled = true;
  search_label_box.innerText = `Loading...`;
  filter_subject.disabled = true;

  fetch(`${api}/api/html`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      subjects = data;
      search_label_box.innerText = `Search ${subjects.length} subjects`;
      filter_subject.disabled = false;
    })
    .catch(function (error) {
      console.error(error);
      search_label_box.innerText = `Failed: ${error}`;
    });
});
