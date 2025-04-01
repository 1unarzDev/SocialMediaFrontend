import gsap from "gsap";

let viewing = false;

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

slider.addEventListener("mouseenter", () => { 
  if(!viewing){
    setSpeed(0.3); 
  }
});
slider.addEventListener("mouseleave", () => { 
  if(!viewing){
    setSpeed(1);
  }
});
  
document.querySelectorAll(".banner .slider .story").forEach((element) => {
  const style = window.getComputedStyle(element);
  const position = style.getPropertyValue('--position');
  const quantity = style.getPropertyValue('--quantity');

  element.addEventListener("click", function(event) {
    event.stopPropagation();
    
    if (!viewing){
      viewing = true;
      setSpeed(0);

      const currentRotation = sliderTransforms.value;

      const otherCards = [...document.querySelectorAll(".banner .slider .user")].filter(card => card !== element);
      
      const tl = gsap.timeline()
        .to(sliderTransforms, {
          value: `rotateX(0deg) rotateY(${-(position - 1) * (360 / quantity)}deg) rotateZ(0deg)`,
          duration: 0.6,
          onUpdate: () => slider.style.transform = sliderTransforms.value
        })
        .to(element, { 
          duration: 0.4, 
          scaleY: 2.5
        }, '<')
        .to(element, { 
          duration: 0.4, 
          scaleX: 2.5
        }, '<')
        .to(otherCards, { 
          duration: 0.4, 
          filter: "blur(10px)"
        }, '<');

      const handleOutsideClick = (event) => {
        if (!element.contains(event.target)){
          viewing = false;
          
          const reverseTl = gsap.timeline()
            .to(element, { 
              duration: 0.4, 
              scaleY: 1
            })
            .to(element, { 
              duration: 0.4, 
              scaleX: 1
            }, '<')
            .to(otherCards, { 
              duration: 0.4, 
              filter: "blur(0px)"
            }, '<')
            .to(sliderTransforms, {
              value: currentRotation,
              duration: 0.6,
              onUpdate: () => slider.style.transform = sliderTransforms.value,
              onComplete: () => {
                setSpeed(1);
                carouselRotationAnimation.play();
              }
            }, '<');
          
          document.removeEventListener('click', handleOutsideClick);
        }
      };
      document.addEventListener('click', handleOutsideClick);
    }
  });
});