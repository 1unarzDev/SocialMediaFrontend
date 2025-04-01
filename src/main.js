import gsap from "gsap";

let sliderTransforms = {value: "rotateX(-15deg) rotateY(0deg) rotateZ(0deg)"}, 
    slider = document.querySelector(".banner .slider");

let carouselRotationAnimation = gsap.to(sliderTransforms, {
    value: "rotateX(-15deg) rotateY(360deg) rotateZ(0deg)",
    duration: 20,
    repeat: -1, 
    ease: "none",
    onUpdate: () => slider.style.transform = sliderTransforms.value
  });

function setSpeed(speed) {
  carouselRotationAnimation.timeScale(speed);
}

/// Event listeners for hover effect
slider.addEventListener("mouseenter", () => setSpeed(0.3));
slider.addEventListener("mouseleave", () => setSpeed(1));

  
document.querySelectorAll(".banner .slider .story").forEach((element) => {
  const tl = gsap.timeline({ paused: true })
    .to(element, { duration: 0.4, rotationY: "+=180" })
    .to(element, { duration: 0.4, rotationY: "-=180" }, 0);
  
  element.addEventListener("mouseenter", function() {
    setSpeed(0);
    tl.play();
  });
  element.addEventListener("mouseleave", function() {
    setSpeed(1);
    tl.reverse();
  });
});