import { Controller } from '../controllers/controller.js';

const View = {
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
                <button onclick = "Controller.eliminarPersona(${index})">Eliminar</button>
                <button onclick = "Controller.modificarPersona(${index})">Modificar</button>
            </td>
            `;
            this.tableBody.appendChild(row);
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
        this.submitButton.value = "Agregar persona";
        this.cancelButton.value = 'none';
    },
    configurarFormularioParaEdicion() {
        this.submitButton.textContent = "Guardar Cambios";
        this.cancelButton.style.display = "inline";
    }
};