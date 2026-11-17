class SubscribeController {
    constructor(view, model) {
        this.view = view;
        this.model = model;

        this.view.bindSubmit(this.handleSubmit.bind(this));
    }

    async handleSubmit() {
        const { name, email } = this.view.getFormData();

        try {
            const newUser = await this.model.registerUser(name, email);
            this.view.showSuccess(newUser.name, newUser.email);
        } catch (error) {
            this.view.showError(error.message);
        }
    }
}

export default SubscribeController;
