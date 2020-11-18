import formTpl from '../templates/form.hbs';
import getRefs from '../js/getRefs';

const refs = getRefs();

export default function renderForm(data) {
  const markup = formTpl(data);
  refs.gallery.insertAdjacentHTML('beforebegin', markup);
}