import SubscribeView from './views/subscribeView.js';
import UserModel from './models/userModel.js';
import SubscribeController from './controllers/subscribeController.js';

document.addEventListener('DOMContentLoaded', () => {
    const view = new SubscribeView();
    const model = new UserModel();
    new SubscribeController(view, model);
});
