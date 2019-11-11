import { MDCRipple } from "@material/ripple";
import { MDCTopAppBar } from "@material/top-app-bar";
import { MDCDrawer } from "@material/drawer";
import { MDCTextField } from "@material/textfield";

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
const fabRipple = new MDCRipple(document.querySelector(".mdc-fab"));
