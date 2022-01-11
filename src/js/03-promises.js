import Notiflix from 'notiflix';

const refs = {
  formSubmit: document.querySelector('.form'),
};

function onFormSubmit(e) {
  e.preventDefault();

  const obj = {
    [e.target[0].name]: parseInt(e.target[0].value),
    [e.target[1].name]: parseInt(e.target[1].value),
    [e.target[2].name]: parseInt(e.target[2].value),
  };

  startPromis(obj);
}

function startPromis({ delay, step, amount }) {
  for (let i = 1; i <= amount; i++) {
    createPromise(i, delay)
      .then(value => {
        Notiflix.Notify.success(`${value}`, { timeout: 5000 });
      })
      .catch(value => {
        Notiflix.Notify.failure(`${value}`, { timeout: 5000 });
      });

    delay += step;
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;

      if (shouldResolve) {
        resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise ${position} in ${delay}ms`);
      }
    }, delay);
  });
}

refs.formSubmit = document.addEventListener('submit', onFormSubmit);
