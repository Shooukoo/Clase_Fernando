const Model = {
    personas: [],
    agregarPersona(persona) {
        this.personas.push(persona);
    },
    agregarPersonas(Apersonas) {
        this.personas = Apersonas;
    },
    actualizarPersona(index, persona) {
        this.personas[index] = persona;
    },
    eliminarPersona(index) {
        this.personas.splice(index, 1);
    },
    getPersonas() {
        return this.personas;
    }
};