import "./styles.css"

class Carousel {
  #carouselContainer;
  #imgWrapper;
  #currentImgIndex;
  #images;
  #indicators;
  #interval;
  #intervalID;
  #leftArrow;
  #rightArrow;

  constructor(carouselContainer, interval = 2000) {
    this.#carouselContainer = carouselContainer;
    this.#carouselContainer.classList.add("carousel-container");
    this.#interval = interval;
    this.#currentImgIndex = 0;
    this.#images = this.#carouselContainer.querySelectorAll("img");
    this.#createCarousel();
    this.#initializeInterval();
  }

  #createCarousel() {
    this.#imgWrapper = document.createElement("div");
    this.#imgWrapper.classList.add("img-wrapper");
    this.#carouselContainer.append(this.#imgWrapper);
    this.#createSlides();
    this.#createIndicators();
    this.#createControls();
  }

  #createSlides() {
    this.#images.forEach((img) => {
      img.remove();
      // img.width = this.#carouselContainer.offsetWidth;
      this.#imgWrapper.append(img);
    });
  }

  #createIndicators() {
    this.#indicators = [];

    let indicatorsDiv = document.createElement("div");
    indicatorsDiv.classList.add("indicators");
    for (let i = 0; i < this.#images.length; i++) {
      let indicator = document.createElement("div");
      indicator.classList.add("indicator");
      if (i === this.#currentImgIndex) {
        indicator.classList.add("active");
      }
      indicator.addEventListener("click", () => this.setImageByIndex(i));
      indicatorsDiv.append(indicator);
      this.#indicators.push(indicator);
    }
    this.#carouselContainer.append(indicatorsDiv);
  }

  #createControls() {
    const controlsDiv = document.createElement("div");
    controlsDiv.classList.add("controls");
    this.#leftArrow = document.createElement("div");
    this.#leftArrow.classList.add("left-arrow");
    controlsDiv.append(this.#leftArrow);
    this.#rightArrow = document.createElement("div");
    this.#rightArrow.classList.add("right-arrow");
    controlsDiv.append(this.#rightArrow);
    this.#carouselContainer.append(controlsDiv);
    this.#addControlHandlers();
  }

  #addControlHandlers() {
    this.#leftArrow.addEventListener("click", () => this.prevImg());
    this.#rightArrow.addEventListener("click", () => this.nextImg());
  }

  setImageByIndex(imgIndex) {
    // Deactivate current indicator
    const previousIndicator = this.#indicators[this.#currentImgIndex];
    previousIndicator.classList.toggle("active");

    this.#currentImgIndex = imgIndex;
    const indicator = this.#indicators[this.#currentImgIndex];
    // Activate new indicator
    indicator.classList.toggle("active");
    // Set offset for current image
    let offset = this.#currentImgIndex * this.#carouselContainer.offsetWidth;
    this.#imgWrapper.style.left = `-${offset}px`;
    // Reset interval
    this.#initializeInterval();
  }

  nextImg() {
    let newImgIndex = this.#currentImgIndex + 1;
    newImgIndex %= this.#images.length;
    this.setImageByIndex(newImgIndex);
  }

  prevImg() {
    let newImgIndex = this.#currentImgIndex - 1;
    if (newImgIndex < 0) newImgIndex = this.#images.length - 1;
    this.setImageByIndex(newImgIndex);
  }

  #initializeInterval() {
    if (this.#intervalID) {
      clearTimeout(this.#intervalID);
      this.#intervalID = null;
    }

    this.#intervalID = setInterval(() => this.nextImg(), this.#interval);
  }
}

export default Carousel;