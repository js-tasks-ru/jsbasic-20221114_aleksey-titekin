let btn = document.querySelector('.toggle-text-button');
btn.addEventListener('click',toggleText);
let txt = document.querySelector("#text");

function toggleText() {
  txt.hidden = !txt.hidden;
}
