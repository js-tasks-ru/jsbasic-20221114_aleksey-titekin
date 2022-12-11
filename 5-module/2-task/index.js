function toggleText() {
  let btn = document.querySelector(".toggle-text-button");
  btn.addEventListener("click", () => {
    let txt = document.querySelector("#text");
    txt.hidden = !txt.hidden;
  });
}
