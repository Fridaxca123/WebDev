//importar clases
import SubscribeView from './views/subscribeView.js';
import UserModel from './models/userModel.js';
import SubscribeController from './controllers/subscribeController.js';
//dom content loaded
document.addEventListener('DOMContentLoaded', () => {
    const view = new SubscribeView();
    const model = new UserModel();
    //crea controller
    new SubscribeController(view, model);
});
