import { convertMs } from './convertMs';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  date: document.querySelector('#datetime-picker'),
  start: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onOpen() {
    offSetTimeOut();
    offBtnStart();
  },
  onClose(selectedDates) {
    checkData(selectedDates);
  },
};

let timerId = null;
let timerIdTimeOut = null;
let chosenDate = null;
const elementStart = refs.start;
const elementDate = refs.date;

function checkData(time) {
  chosenDate = time[0].getTime();
  const checkDate = chosenDate - new Date();

  if (checkDate < 0) return errorDate();

  onBtnStart();
  onSetTimeOut(checkDate);
}

function onStartTimer(e) {
  if (e.target.nodeName !== 'BUTTON') return;

  offSetTimeOut();
  offBtnStart();
  offItputDate();
  startTimer();
}

function startTimer() {
  timerId = setInterval(() => {
    const controlDate = chosenDate - new Date() + 1000;

    if (controlDate < 0) {
      offTime();
      offSetInterval();
      onItputDate();
      return;
    }

    addLeadingZero(convertMs(controlDate));
  }, 1000);
}

function addLeadingZero({ days, hours, minutes, seconds }) {
  refs.days.textContent = pad(days);
  refs.hours.textContent = pad(hours);
  refs.minutes.textContent = pad(minutes);
  refs.seconds.textContent = pad(seconds);
}

function pad(value) {
  return String(value).padStart(2, 0);
}

function errorDate() {
  Notiflix.Report.failure('', 'Please choose a date in the future', 'Close');
  // Notiflix.Notify.failure('Please choose a date in the future', { timeout: 3000 });
}

function offTime() {
  Notiflix.Report.success('', 'Time is over!', 'Close');
  // Notiflix.Notify.success('Time is over!', { timeout: 3000 });
}

function endTime() {
  Notiflix.Report.warning('', 'Date is overdue, select a new date.', 'Close');
  // Notiflix.Notify.warning('Date is overdue, select a new date.', { timeout: 3000 });
}

function onBtnStart() {
  elementStart.removeAttribute('disabled');
}

function offBtnStart() {
  elementStart.setAttribute('disabled', 'disabled');
}

function onItputDate() {
  elementDate.removeAttribute('disabled');
}

function offItputDate() {
  elementDate.setAttribute('disabled', 'disabled');
}

function offSetInterval() {
  clearInterval(timerId);
}

function offSetTimeOut() {
  clearTimeout(timerIdTimeOut);
}

function onSetTimeOut(value) {
  timerIdTimeOut = setTimeout(() => {
    endTime();
    offBtnStart();
  }, value);
}

flatpickr(refs.date, options);
offBtnStart();
refs.start = document.addEventListener('click', onStartTimer);
