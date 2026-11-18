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
        const { name, email } = this.view.getFormData();

        try {
            //llama model
            const newUser = await this.model.registerUser(name, email);
            //muestra res exitoso
            this.view.showSuccess(newUser.name, newUser.email);
            //si error 
        } catch (error) {
            this.view.showError(error.message);
        }
    }
}

export default SubscribeController;
