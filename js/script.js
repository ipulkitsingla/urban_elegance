const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');

burger.addEventListener('click', () => {
   navLinks.classList.toggle('active');
});

let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let sliderDom = document.querySelector('.slider');
let SliderDom = sliderDom.querySelector('.slider .list');
let thumbnailBorderDom = document.querySelector('.slider .thumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
let timeDom = document.querySelector('.slider .time');

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
let timeRunning = 3000;
let timeAutoNext = 7000;

nextDom.onclick = function(){
    showSlider('next');    
}

prevDom.onclick = function(){
    showSlider('prev');    
}
let runTimeOut;
let runNextAuto = setTimeout(() => {
    next.click();
}, timeAutoNext)
function showSlider(type){
    let  SliderItemsDom = SliderDom.querySelectorAll('.slider .list .item');
    let thumbnailItemsDom = document.querySelectorAll('.slider .thumbnail .item');
    
    if(type === 'next'){
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        sliderDom.classList.add('next');
    }else{
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        sliderDom.classList.add('prev');
    }
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        sliderDom.classList.remove('next');
        sliderDom.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        next.click();
    }, timeAutoNext)
}

let valuedisplays = document.querySelectorAll(".num");
let interval = 7000;

valuedisplays.forEach((valuedisplay) => {
   let startvalue = 0;
   let endvalue = parseInt(valuedisplay.getAttribute("data-val"));
   let duration = Math.floor(interval / endvalue);
   let counter = setInterval(function() {
      startvalue += 1
      valuedisplay.textContent = startvalue;
      if (startvalue == endvalue) {
         clearInterval(counter);
      }
   }, duration);
});