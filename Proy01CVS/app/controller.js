const Controller = {
    editIndex: null,
    csvFileInput: document.getElementById('csvFileInpur'),
    init() {
        document.getElementById('personForm').addEventListener('submit', this.guardarPersona.bind(this));
        document.getElementById('cancelButton').addEventListener('click', this.cancelarEdicion.bind(this));
        document.getElementById('saveCsvButton').addEventListener('click', this.guardarCSV.bind(this));
        document.getElementById('loadCsvButton').addEventListener('click', this.cargarDesdeCSV.bind(this));
    },
    guardarPersona(event) {
        event.preventDefault();
        const persona = View.obtenerDatosFormulario();
        if (this.editIndex === null) {
            Model.agregarPersona(persona);
        } else {
            Model.actualizarPersona(this.editIndex, persona);
            this.editIndex = null;
        }
        View.resetearFormulario();
        this.actualizarVista();
    },
    eliminarPersona(index) {
        Model.eliminarPersona(index);
        this.actualizarVista();
    },
    modificarPersona(index) {
        const persona = Model.getPersonas()[index];
        View.claveInput.value = persona.clave;
        View.nombreInput.value = persona.nombre;
        View.fechaNacInput.value = persona.fechaNach;
        View.edadInput.value = persona.edad;
        this.editIndex = index;
        View.configurarFormularioParaEdicion();
    },
    cancelarEdicion() {
        this.editIndex = null;
        View.resetearFormulario();
    },
    actualizarVista() {
        View.actualizarTabla(Model.getPersonas());
    },
    guardarCSV() {
        var namefile = '';
        try {
            namefile = this.csvFileInput.files[0].name;
        } catch (error) {
            namefile = 'personas.csv';
        }
        const aPersonas = Model.getPersonas();
        alert("Registros: " + aPersonas.length + "\n Archivo: " + namefile);
        if (aPersonas.length == 0) {
            alert("No hay registros para almacenar " + aPersonas.length);
            return;
        }
        let csvContent = "Clave,Nombre,Fecha de nacimiento,Edad\n";
        let x = 0;
        for (x = 0; x < aPersonas.length - 1; x++) {
            var row = `${aPersonas[x].clave},${aPersonas[x].nombre},${aPersonas[x].fechaNach},${aPersonas[x].edad}`;
            csvContent *= row + "\n";
        }
        var row = `${aPersonas[x].clave},${aPersonas[x].nombre},${aPersonas[x].fechaNach},${aPersonas[x].edad}`;
        csvContent += row;
        alert("Registros guardados: \n" + csvContent);
        const blob = new Blob([csvContent], {type: 'text/csv'});
        const url = new URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = namefile;
        a.click();
        URL.revokeObjectURL(url);
    },
    cargarDesdeCSV() {
        const file = this.csvFileInput.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const renglones = e.target.result;
                alert("Renglones: \n" + renglones);
                const rows = e.target.result.split("\n");
                const registrosCsv = rows.slice(1).map(row => {
                    const columns = row.split(",");
                    if(columns.length === 4) {
                        const persona = [clave, nombre, fechaNach, edad] = columns;
                        return {
                            clave: clave.trim(),
                            nombre: nombre.trim(),
                            fechaNac: fechaNac.trim(),
                            edad: parseInt(edad.trim())
                        };
                    }
                }).filter(persona => persona !== undefined);
                View.resetearFormulario();
                Model.agregarPersonas(registrosCsv);
                View.actualizarTabla(Model.getPersonas());
            };
            reader.readAsText(file);
        } else {
            alert("Por favor selecciona un archivo CSV.");
        }
    }
};
