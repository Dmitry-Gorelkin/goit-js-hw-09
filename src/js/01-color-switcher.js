import { getRandomHexColor } from './random-color';

const refs = {
  body: document.querySelector('body'),
  start: document.querySelector('[data-start]'),
  stop: document.querySelector('[data-stop]'),
};

const elementStart = refs.start;
const elementStop = refs.stop;
let timerId = null;

function onStart(e) {
  if (e.target.dataset.start !== '') return;

  timerId = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  elementStart.setAttribute('disabled', 'disabled');
  elementStop.removeAttribute('disabled');
}

function onStop(e) {
  if (e.target.dataset.stop !== '') return;

  clearInterval(timerId);

  elementStart.removeAttribute('disabled');
  elementStop.setAttribute('disabled', 'disabled');
}

elementStop.setAttribute('disabled', 'disabled');
refs.start = addEventListener('click', onStart);
refs.stop = addEventListener('click', onStop);
