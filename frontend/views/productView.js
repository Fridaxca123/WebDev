class ProductView {
    constructor() {
        this.list = document.getElementById('products-list');
        this.registerBtn = document.getElementById('register-product-btn');
        this.modal = document.getElementById('product-modal');
        this.closeBtn = document.getElementById('close-product-modal');
        this.form = document.getElementById('product-form');
        this.modalContent = this.modal.querySelector('.modal-content');
        this.modalTitle = document.getElementById('product-modal-title');
        this.modalSubmit = document.getElementById('product-modal-submit');
        this.productIdInput = document.getElementById('product-id');

        this.mode = 'register';
    }

    renderProducts(products) {
        this.list.innerHTML = '';

        if (products.length === 0) {
            this.list.innerHTML = '<p>No products found.</p>';
            return;
        }

        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'border p-4 rounded shadow bg-white';
            card.innerHTML = `
                <h3 class="font-bold">${product.product_name}</h3>
                <p>Price: ${product.price}</p>
                <p>Quantity: ${product.quantity}</p>
                <div class="button-container">
                    <button class="btn-primary btn-edit" data-id="${product.product_id}">Edit</button>
                    <button class="btn-primary btn-delete" data-id="${product.product_id}">Delete</button>
                </div>
            `;
            this.list.appendChild(card);
        });
    }

    openModal() {
        this.modal.style.display = 'flex';
    }

    closeModal() {
        this.modal.style.display = 'none';
    }

    clearForm() {
        this.form.reset();
        this.productIdInput.value = '';
    }

    openModalForRegister() {
        this.mode = 'register';
        this.clearForm();
        this.modalTitle.textContent = 'Register Product';
        this.modalSubmit.textContent = 'Register Product';
        this.openModal();
    }

    openModalForEdit(product) {
        this.mode = 'edit';
        document.getElementById('product-name').value = product.product_name;
        document.getElementById('product-price').value = product.price;
        document.getElementById('product-quantity').value = product.quantity;
        this.productIdInput.value = product.product_id;
        this.modalTitle.textContent = 'Edit Product';
        this.modalSubmit.textContent = 'Save Changes';
        this.openModal();
    }

    getFormData() {
        return {
            product_id: this.productIdInput.value,
            product_name: document.getElementById('product-name').value,
            price: document.getElementById('product-price').value,
            quantity: document.getElementById('product-quantity').value,
        };
    }

    bindRegisterProduct(handler) {
        this.registerBtn.addEventListener('click', () => this.openModalForRegister());
        this.closeBtn.addEventListener('click', () => this.closeModal());
        this.modal.addEventListener('click', (event) => {
            if (event.target === this.modal) {
                this.closeModal();
            }
        });

        this.form.addEventListener('submit', (event) => {
            event.preventDefault();
            this.clearError();
            handler(this.mode);
        });
    }

    bindDeleteProduct(handler) {
        this.list.addEventListener('click', (event) => {
            if (event.target.classList.contains('btn-delete')) {
                const productId = event.target.getAttribute('data-id');
                handler(productId);
            }
        });
    }

    bindChangeProduct(handler) {
        this.list.addEventListener('click', (event) => {
            if (event.target.classList.contains('btn-edit')) {
                const productId = event.target.getAttribute('data-id');
                const productCard = event.target.closest('.border');
                const product = {
                    product_id: productId,
                    product_name: productCard.querySelector('h3').textContent,
                    price: productCard.querySelector('p:nth-of-type(1)').textContent.replace('Price: ', ''),
                    quantity: productCard.querySelector('p:nth-of-type(2)').textContent.replace('Quantity: ', ''),
                };
                handler(product);
            }
        });
    }

    clearError() {
        const existingError = this.modalContent.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
    }

    showError(message) {
        this.clearError();
        const errorEl = document.createElement('p');
        errorEl.className = 'error-message';
        errorEl.textContent = message;
        this.form.insertBefore(errorEl, this.form.querySelector('button[type="submit"]'));
    }

    showSuccess() {
        this.clearForm();
        this.closeModal();
    }
}

export default ProductView;
