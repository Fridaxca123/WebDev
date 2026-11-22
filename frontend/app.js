import Header from './components/header.js';
import Footer from './components/footer.js';
import SubscribeView from './views/subscribeView.js';
import UserModel from './models/userModel.js';
import SubscribeController from './controllers/subscribeController.js';

document.addEventListener('DOMContentLoaded', () => {
    const header = new Header();
    header.render('header');

    const footer = new Footer();
    footer.render('footer');

    const view = new SubscribeView();
    const model = new UserModel();
    new SubscribeController(view, model);
});
