import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const startBtn = document.querySelector('[data-start]');
const dateTimeInput = document.getElementById('datetime-picker');

const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let selectedDate = null;
let timerId = null;

startBtn.disabled = true;

//ініціалізація бібліотеки
flatpickr(dateTimeInput, {
     enableTime: true,
     time_24hr: true,
     defaultDate: new Date(),
     minuteIncrement: 1,
     onClose(selectedDates) {
          const pickedDate = selectedDates[0];
          if (pickedDate <= new Date()) {
               iziToast.error({
                    title: 'Error',
                    message: 'Please choose a date in the future',
                    position: 'topRight',
               });
               startBtn.disabled = true;
          } else {
               selectedDate = pickedDate;
               startBtn.disabled = false;
          }
     },
     
});


// Обробка кліку на Start
startBtn.addEventListener('click', () => {
     if (!selectedDate) return;
     
     startBtn.disabled = true;
     dateTimeInput.disabled = true;
     
     timerId = setInterval(() => {
          const now = new Date();
          const diff = selectedDate - now;
          
          if (diff <= 0) {
               clearInterval(timerId);
               updateTimer(0);
               dateTimeInput.disabled = false;
               return;
          }
          
          updateTimer(diff);
     }, 1000);
     
});

// Оновлення таймера
function updateTimer(ms) {
     const { days, hours, minutes, seconds } = convertMs(ms);
     
     daysEl.textContent = addLeadingZero(days);
     hoursEl.textContent = addLeadingZero(hours);
     minutesEl.textContent = addLeadingZero(minutes);
     secondsEl.textContent = addLeadingZero(seconds);
     
}

// Форматування з 0 попереду
function addLeadingZero(value) {
     return String(value).padStart(2, '0');
     
}


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}
