import { Controller } from '../controllers/controller.js';

export const View = {
    tableBody: document.getElementById('personTableBody'),
    claveInput: document.getElementById('clave'),
    nombreInput: document.getElementById('nombre'),
    fechaNacInput: document.getElementById('fechaNac'),
    edadInput: document.getElementById('edad'),
    submitButton: document.getElementById('submitButton'),
    cancelButton: document.getElementById('cancelButton'),
    actualizarTabla(personas) {
        this.tableBody.innerHTML = '';
        personas.forEach((persona, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${persona.clave}</td>
                <td>${persona.nombre}</td>
                <td>${persona.fechaNac}</td>
                <td>${persona.edad}</td>
                <td>
                    <button id="eliminar-${index}">Eliminar</button>
                    <button id="modificar-${index}">Modificar</button>
                </td>
            `;
            this.tableBody.appendChild(row);
            document.getElementById(`eliminar-${index}`).addEventListener('click', () => {
                Controller.eliminarPersona(index);
            });
            document.getElementById(`modificar-${index}`).addEventListener('click', () => {
                Controller.modificarPersona(index);
            });
        });
    },
    obtenerFormulario() {
        return {
            clave: this.claveInput.value,
            nombre: this.nombreInput.value,
            fechaNac: this.fechaNacInput.value,
            edad: parseInt(this.edadInput.value) 
        };
    },
    resetearFormulario() {
        this.claveInput.value = '';
        this.nombreInput.value = '';
        this.fechaNacInput.value = '';
        this.edadInput.value = '';
        this.submitButton.textContent = "Agregar persona";
        this.cancelButton.style.display = 'none';
    },
    configurarFormularioParaEdicion() {
        this.submitButton.textContent = "Guardar Cambios";
        this.cancelButton.style.display = "inline";
    }
};
