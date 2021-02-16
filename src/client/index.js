import { handleSubmit } from './js/app';
import logo from './img/logo.png';

import './styles/styling.scss';

document.getElementById('btn').addEventListener('click', handleSubmit);
document.getElementById('logo').src = logo;


export {
    handleSubmit
};
