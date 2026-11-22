class ProductController {
    constructor(view, model) {
        this.view = view;
        this.model = model;

        this.view.bindRegisterProduct(this.handleRegisterProduct.bind(this));
        this.view.bindDeleteProduct(this.handleDeleteProduct.bind(this));

        this.loadProducts();
    }

    async loadProducts() {
        try {
            const products = await this.model.getProducts();
            this.view.renderProducts(products);
        } catch (error) {
            this.view.showError(error.message);
        }
    }

    async handleRegisterProduct() {
        const { product_name, price, quantity } = this.view.getFormData();

        if (!product_name.trim() || !price || !quantity) {
            this.view.showError('All fields are required');
            return;
        }

        try {
            await this.model.registerProduct(product_name.trim(), price, quantity);
            this.view.showSuccess();
            this.loadProducts();
        } catch (error) {
            this.view.showError(error.message);
        }
    }

    async handleDeleteProduct(productId) {
        try {
            await this.model.deleteProduct(Number(productId));
            this.loadProducts();
        } catch (error) {
            this.view.showError(error.message);
        }
    }
}

export default ProductController;
