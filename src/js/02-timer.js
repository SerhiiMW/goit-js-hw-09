import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};
const startBtn = document.querySelector('button[data-start]');
const selector = document.querySelector('input#datetime-picker');
const refs = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
let timerId = null;

function addLeadingZero(value) {
  const newValue = value.toString().padStart(2, '0');
  return newValue;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}
flatpickr(selector, options);

selector.addEventListener('input', () => {

  if (new Date(selector.value) <= new Date()) {
    startBtn.disabled = true;
    window.alert('Please choose a date in the future');
  } else {
    startBtn.addEventListener('click', () => {
      selector.disabled = true;
      startBtn.disabled = true;
      timerId = setInterval(() => {
        const currentDate = new Date();
        const userDate = new Date(selector.value);
        const timeForEnd = userDate - currentDate;

        refs.days.textContent = addLeadingZero(convertMs(timeForEnd).days);
        refs.hours.textContent = addLeadingZero(convertMs(timeForEnd).hours);
        refs.minutes.textContent = addLeadingZero(
          convertMs(timeForEnd).minutes
        );
        refs.seconds.textContent = addLeadingZero(
          convertMs(timeForEnd).seconds
        );
      }, 1000);
      setInterval(() => {
        if (refs.seconds.textContent === '00' &&
        refs.minutes.textContent === '00' &&
        refs.hours.textContent === '00' &&
        refs.days.textContent === '00') {
          clearInterval(timerId);
          selector.disabled = false;
          startBtn.disabled = false;
        }
      }, 1000);
    });
  }
});

