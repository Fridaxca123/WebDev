//crear clase
class SubscribeView {
    //constructor obtiene elementos html
    constructor() {
        //ejecuta elemento con ese id
        this.subscribeBtn = document.getElementById("subscribe-btn");
        this.modal = document.getElementById("subscribe-modal");
        this.closeBtn = document.getElementById("close-modal");
        this.form = document.getElementById("subscribe-form");
        this.modalContent = this.modal.querySelector('.modal-content');

        this.bindModalEvents();
    }
    //introduce event listeners 
    bindModalEvents() {
        this.subscribeBtn.addEventListener("click", () => this.openModal());
        this.closeBtn.addEventListener("click", () => this.closeModal());
        this.modal.addEventListener("click", (event) => {
            if (event.target === this.modal) {
                this.closeModal();
            }
        });
    }

    openModal() {
        this.modal.style.display = "flex";
    }

    closeModal() {
        this.modal.style.display = "none";
    }

    getFormData() {
        return {
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
        };
    }

    bindSubmit(handler) {
        this.form.addEventListener("submit", (event) => {
            event.preventDefault();
            this.clearError();
            handler();
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

    showSuccess(name, email) {
        this.modal.innerHTML = `
            <div class="modal-content">
                <h2>Thank you, ${name}!</h2>
                <p>You have successfully subscribed with ${email}.</p>
                <button id="finish-btn">Close</button>
            </div>
        `;

        document.getElementById("finish-btn").addEventListener("click", () => {
            this.modal.style.display = "none";
        });
    }
}

export default SubscribeView;
