import gsap from "gsap";

const height = document.documentElement.clientHeight;
const loader  = document.querySelector(".loader-container");

const tl = gsap.timeline()
               .to(loader, {
                 scaleX: 0.001
               })
               .to(loader, {
                 scaleY: 0.001
               }, '<')
               .to(loader, {
                 duration: 1,
                 scaleY: 3
               }, '+=0.3')
               .to(loader, {
                 duration: 1,
                 scaleX: 3
               }, '<')
               .to(loader, { 
                 ease: "back.out(0.4)",
                 duration: 0.6, 
                 scaleY: 0.03
               }, '+=2.28')
               .to(loader, { 
                 ease: "back.out(0.4)",
                 duration: 0.6, 
                 scaleX: 0.03
               }, '<')
               .to(loader, {
                 ease: "back.in(1)",
                 duration: 0.8, 
                 y: height + 10
               }, '<');


let viewing = false;
document.querySelectorAll(".banner .slider .active .profile").forEach((element) => {
  gsap.to(element, { opacity: 0, duration: 0 });
});

let sliderTransforms = {value: "rotateX(-25deg) rotateY(0deg) rotateZ(0deg)"}, 
    slider = document.querySelector(".banner .slider");

let carouselRotationAnimation = gsap.to(sliderTransforms, {
    value: "rotateX(-25deg) rotateY(360deg) rotateZ(0deg)",
    duration: 10,
    repeat: -1, 
    ease: "none",
    onUpdate: () => slider.style.transform = sliderTransforms.value
  });

// let centerPieceAdjustment = gsap.to(centerTransforms, {
//     value: "rotateX(15deg) rotateY(0deg) rotateZ(0deg)",
//     duration: 10,
//     repeat: -1,
//     ease: "none",
//     onUpdate: () => center.style.transform = centerTransforms.value
//   });

function setSpeed(speed) {
  carouselRotationAnimation.timeScale(speed);
}


slider.addEventListener("mouseenter", () => { 
  if(!viewing){
    setSpeed(0.2); 
  }
});
slider.addEventListener("mouseleave", () => { 
  if(!viewing){
    setSpeed(1);
  }
});

function bioAnimation() {
  document.querySelectorAll(".banner .slider .active .profile").forEach((element) => {
    gsap.to(element, { opacity: viewing ? 1 : 0, duration: 0.5 });
  });
} 

document.querySelectorAll(".banner .slider .active").forEach((element) => {
  const style = window.getComputedStyle(element);
  const position = style.getPropertyValue('--position');
  const quantity = style.getPropertyValue('--quantity');
  const blurFilter  = document.querySelector(".blur-filter");
  const centerpiece  = document.querySelector(".banner .accents .centerpiece");

  element.addEventListener("click", function(event) {
    event.stopPropagation();
    
    if (!viewing){
      viewing = true;
      setSpeed(0);

      const currentRotation = sliderTransforms.value;

      const otherCards = [...document.querySelectorAll(".banner .slider .user")].filter(card => card !== element);
      
      const noStory = [...document.querySelectorAll(".banner .slider .user")]
        .filter(card => !card.classList.contains("active"));

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
        }, '<')
        .to(noStory, { 
          duration: 0.4, 
          filter: "grayscale(1) blur(6px)"
        }, '<')
        .to(blurFilter, { 
          duration: 0.4, 
          backdropFilter: "blur(6px)"
        }, '<')
        .to(centerpiece, { 
          duration: 0.4, 
          filter: "blur(6px)"
        }, '<');
      
      bioAnimation();

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
            .to(noStory, { 
              duration: 0.4, 
              filter: "grayscale(1) blur(0px)"
            }, '<')
            .to(blurFilter, { 
              duration: 0.4, 
              backdropFilter: "blur(1px)"
            }, '<')
            .to(centerpiece, { 
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
          
          bioAnimation();
          
          document.removeEventListener('click', handleOutsideClick);
        }
      };
      document.addEventListener('click', handleOutsideClick);
    }
  });
});