import { MDCRipple } from "@material/ripple";
import { MDCTopAppBar } from "@material/top-app-bar";
import { MDCDrawer } from "@material/drawer";
import { MDCTextField } from "@material/textfield";
import { MDCDialog } from "@material/dialog";

const topAppBar = new MDCTopAppBar(document.querySelector(".mdc-top-app-bar"));
new MDCRipple(document.querySelector(".foo-button"));
const drawer = MDCDrawer.attachTo(document.querySelector(".mdc-drawer"));

const menuButton = document.getElementById("menuButton");
menuButton.addEventListener("click", () => {
  console.log("tada");
  drawer.open = true;
});

const username = new MDCTextField(document.querySelector(".username"));
const password = new MDCTextField(document.querySelector(".password"));

new MDCRipple(document.querySelector(".cancel"));
new MDCRipple(document.querySelector(".next"));

const fabButton = document.getElementById("myFab");
new MDCRipple(fabButton);
const addGuideAnchor = document.getElementById("addGuides");
const guideTitle = new MDCTextField(document.querySelector(".title"));
const guideContent = new MDCTextField(document.querySelector(".content"));
const createDialog = new MDCDialog(document.querySelector(".mdc-dialog"));
fabButton.addEventListener("click", e => {
  createDialog.open();
});
addGuideAnchor.addEventListener("click", () => {
  drawer.open = false;
  createDialog.open();
});

//JS for cards
const selector = ".mdc-button, .mdc-icon-button, .mdc-card__primary-action";
const ripples = [].map.call(document.querySelectorAll(selector), function(el) {
  return new MDCRipple(el);
});
