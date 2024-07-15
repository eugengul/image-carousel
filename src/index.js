import "modern-normalize";
import "./css/styles.css";
import Carousel from "./carousel/index.js"

new Carousel(document.querySelector("#carousel1"));
new Carousel(document.querySelector("#carousel2"), 3000);
