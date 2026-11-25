class ProductController {
    constructor(view, model) {
        this.view = view;
        this.model = model;

        this.view.bindRegisterProduct(this.handleSaveProduct.bind(this));
        this.view.bindDeleteProduct(this.handleDeleteProduct.bind(this));
        this.view.bindChangeProduct(this.handleEditProduct.bind(this));

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

    async handleSaveProduct(mode) {
        const { product_id, product_name, price, quantity } = this.view.getFormData();

        if (!product_name.trim() || !price || !quantity) {
            this.view.showError('All fields are required');
            return;
        }

        const parsedPrice = Number(price);
        const parsedQuantity = Number(quantity);

        if (!Number.isFinite(parsedPrice) || parsedPrice < 0 || !Number.isInteger(parsedQuantity) || parsedQuantity < 0) {
            this.view.showError('Invalid price or quantity');
            return;
        }

        try {
            if (mode === 'edit' && product_id) {
                await this.model.changeProduct(Number(product_id), {
                    product_name: product_name.trim(),
                    price: parsedPrice,
                    quantity: parsedQuantity,
                });
            } else {
                await this.model.registerProduct(product_name.trim(), parsedPrice, parsedQuantity);
            }
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

    handleEditProduct(product) {
        this.view.openModalForEdit(product);
    }
}

export default ProductController;
