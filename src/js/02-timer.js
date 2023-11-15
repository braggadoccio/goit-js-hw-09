import flatpickr from 'flatpickr';

import 'flatpickr/dist/flatpickr.min.css';

// DOM
const datetimePickerElement = document.querySelector('#datetime-picker');
const startButtonElement = document.querySelector('button[data-start]');
const daysElement = document.querySelector('span[data-days]');
const hoursElement = document.querySelector('span[data-hours]');
const minutesElement = document.querySelector('span[data-minutes]');
const secondsElement = document.querySelector('span[data-seconds]');

// Default
startButtonElement.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];
    const dateNow = Date.now();

    // Past Date
    if (selectedDate < dateNow) {
      window.alert('Please choose a date in the future');
      startButtonElement.disabled = true;
      return;
    }

    //Future Date
    startButtonElement.disabled = false;

    // Countdown Start
    let timerID = null;

    // Countdown Handler
    function handleCountdown() {
      startButtonElement.disabled = true;
      datetimePickerElement.disabled = true;

      timerID = setInterval(() => {
        const currentTime = Date.now();
        // Timer Ends
        if (selectedDate < currentTime) {
          clearInterval(timerID);
          datetimePickerElement.disabled = false;
          return;
        }

        const timeDifference = selectedDate - currentTime;
        const { days, hours, minutes, seconds } = convertMs(timeDifference);

        daysElement.textContent = addLeadingZero(days);
        hoursElement.textContent = addLeadingZero(hours);
        minutesElement.textContent = addLeadingZero(minutes);
        secondsElement.textContent = addLeadingZero(seconds);
      }, 1000);
    }
    startButtonElement.addEventListener('click', handleCountdown);
  },
};

// Create flatpickr
flatpickr('#datetime-picker', options);

// ConvertMS
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

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
