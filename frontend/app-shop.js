import Header from './components/header.js';
import Footer from './components/footer.js';
import ProductView from './views/productView.js';
import ProductModel from './models/productModel.js';
import ProductController from './controllers/productController.js';

document.addEventListener('DOMContentLoaded', () => {
    const header = new Header();
    header.render('header');

    const footer = new Footer();
    footer.render('footer');

    const view = new ProductView();
    const model = new ProductModel();
    new ProductController(view, model);
});
