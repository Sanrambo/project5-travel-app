import { handleSubmit } from './js/app';
import { isCityValid } from './js/checkCity';

import logo from './img/logo.png';

import './styles/styling.scss';
import './styles/result.scss';


document.getElementById('btn').addEventListener('click', (e) => {

    e.preventDefault();
    handleSubmit();
});
document.getElementById('logo').src = logo;


export {
    handleSubmit,
    isCityValid
};
