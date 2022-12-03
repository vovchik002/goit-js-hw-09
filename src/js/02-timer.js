import "flatpickr/dist/flatpickr.min.css";
import flatpickr from "flatpickr";
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const dataInput = document.querySelector('#datetime-picker')
const startBtn = document.querySelector('button[data-start]')
const timeValues = document.querySelectorAll('.value')

const options = {
  enableTime: true,
 time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
  if (options.defaultDate.getTime() > selectedDates[0].getTime() ) {
  Notify.failure("Please choose a date in the future");
  startBtn.setAttribute('disabled', 'disabled');
    return;
    }
  
 if (options.defaultDate.getTime() < selectedDates[0].getTime() ) { 
   startBtn.removeAttribute('disabled')
   presentTime = selectedDates[0].getTime();
   console.log(selectedDates[0])
   console.log(options.defaultDate)
  }},
};

const flatpick = flatpickr('#datetime-picker', options); 

startBtn.addEventListener("click", onClickStart)
  function onClickStart() {
  timer.start()
}
let presentTime = null;
 
const timer = {
  intervalId: null,
  isActive:false,
    start() {
      if (this.isActive) return;
      this.isActive = true;
      
      this.intervalId = setInterval(() => {
     const currentTime = Date.now()
     const deltaTime = presentTime - currentTime;
     if(deltaTime<1000)clearInterval(this.intervalId);
      console.log(deltaTime)
        const convertTime = convertMs(deltaTime);
        changeHtmlValues(convertTime)
         },1000)
  },
 }

  
function pad(value) {
  return String(value).padStart(2, '0');
}

  function convertMs(ms) {
 
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = pad(Math.floor(ms / day));
  const hours = pad(Math.floor((ms % day) / hour));
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
  return { days, hours, minutes, seconds };
}

function changeHtmlValues({ days, hours, minutes, seconds }) {
  timeValues.forEach(value => {
    if (value.hasAttribute('data-days')) value.textContent = days;
    if (value.hasAttribute('data-hours')) value.textContent = hours;
    if (value.hasAttribute('data-minutes')) value.textContent = minutes;
    if (value.hasAttribute('data-seconds')) value.textContent = seconds;
  });
}







































// import "flatpickr/dist/flatpickr.min.css";
// import flatpickr from "flatpickr";
// import { Notify } from 'notiflix/build/notiflix-notify-aio';

// const dataInput = document.querySelector('#datetime-picker')
// const startBtn = document.querySelector('button[data-start]')
// const timeValues = document.querySelectorAll('.value')


// let presentTime = null;
// let currentTime = null;
// let intervalId = null;

// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//   if (options.defaultDate.getTime() > selectedDates[0].getTime() ) {
//   Notify.failure("Please choose a date in the future");
//   startBtn.setAttribute('disabled', 'disabled');
//     return;
//     }
//   presentTime = selectedDates[0].getTime();
//  if (options.defaultDate.getTime() < selectedDates[0].getTime() ) {
//   startBtn.removeAttribute('disabled')
//   }},
// };
// const flatpick = flatpickr('#datetime-picker', options);

// startBtn.addEventListener("click", onClickStart)

// function onClickStart() {
//   intervalId = setInterval(runTimer, 1000);
 
// }
// function runTimer() {
//   const deltaTime = findDeltaTime();
//    if (deltaTime < 1000) clearInterval(intervalId);
//   const convertTime = convertMs(deltaTime);
//   changeHtmlValues(convertTime);
// }

// function findDeltaTime() {
//   currentTime = Date.now();
//   return presentTime - currentTime;
// }

// function pad(value) {
//   return String(value).padStart(2, '0');
// }

// function convertMs(ms) {
//   // Number of milliseconds per unit of time
//   const second = 1000;
//   const minute = second * 60;
//   const hour = minute * 60;
//   const day = hour * 24;

//   const days = pad(Math.floor(ms / day));
//   const hours = pad(Math.floor((ms % day) / hour));
//   const minutes = pad(Math.floor(((ms % day) % hour) / minute));
//   const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
//   return { days, hours, minutes, seconds };
// }

// function changeHtmlValues({ days, hours, minutes, seconds }) {
//   timeValues.forEach(value => {
//     if (value.hasAttribute('data-days')) value.innerHTML = days;
//     if (value.hasAttribute('data-hours')) value.innerHTML = hours;
//     if (value.hasAttribute('data-minutes')) value.innerHTML = minutes;
//     if (value.hasAttribute('data-seconds')) value.innerHTML = seconds;
//   });
// }




