//crea clase
class SubscribeController {
    //constructor recibe view y model
    constructor(view, model) {
        this.view = view;
        this.model = model;
        //conecta formulario con controller 
        this.view.bindSubmit(this.handleSubmit.bind(this));
    }
    //gestiona registro
    async handleSubmit() {
        //obtener datos
        const { name, email, password } = this.view.getFormData();
        if (password.trim().length < 8) {
            this.view.showError('The password must be 8 characters long');
            return;

        }

        try {
            //llama model
            const newUser = await this.model.registerUser(name, email, password);
            //muestra res exitoso
            this.view.showSuccess(newUser.name, newUser.email);
            //si error 
        } catch (error) {
            this.view.showError(error.message);
        }
    }
}

export default SubscribeController;
