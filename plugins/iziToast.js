import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.css';

const toastVer = iziToast;

iziToast.settings({
  position: 'topCenter',
  progressBar: false,
});

export default ({ app }, inject) => {
  inject('toast', ({ type, text = '' }) => {
    return toastVer[type]({
      title: text,
    });
  });
};
