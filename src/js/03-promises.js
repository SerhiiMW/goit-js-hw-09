import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
  button: document.querySelector('button[type="submit"]'),
  delay: document.querySelector('input[name="delay"]'),
  step: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
};

refs.form.addEventListener('submit', startPromiseGener);

function startPromiseGener(e) {
  let i = 0;
  let amount = 0;
  let step = 0;
  let position = 0;
  let delay = 0;
  e.preventDefault();
  amount = refs.amount.value;
  step = Number(refs.step.value);
  delay = Number(refs.delay.value);
  for (i; i < amount; i += 1) {
    position += 1;

    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.success(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay += step;
  }
  position = 0;
  i = 0;
  refs.form.reset();

  function createPromise(position, delay) {
    return new Promise((resolve, reject) => {
      const shouldResolve = Math.random() > 0.3;
      timerId = setTimeout(() => {
        if (shouldResolve) {
          resolve({ position, delay });
        } else {
          reject({ position, delay });
        }
      }, delay);
    });
  }
}
