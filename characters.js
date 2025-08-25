console.log('Welcome');

// Cambiar título
const title = document.querySelector('#title');
title.innerText = 'Kawaii Kaiwai';

// Clase para personajes
class Person {
    constructor(name, power, color) {
        this.name = name;
        this.power = power;
        this.color = color;
    }
}

// Obtener personajes almacenados
let characters = JSON.parse(localStorage.getItem('characters')) || [];
console.log("Personajes en localStorage:", characters);

// Renderizar personajes al cargar
renderCharacters();

// Botón principal
const btn = document.getElementById('botonUno');
btn.onclick = () => {
    const entrada = document.getElementById('entradaUno');
    const entradau = document.getElementById('entradaDos');
    const entradad = document.getElementById('entradaTres');

    // Validar campos
    if (!entrada.value || !entradau.value || !entradad.value) {
        alert("Por favor completa todos los campos.");
        return;
    }

    // Crear personaje
    const perso = new Person(
        entrada.value.toUpperCase(),
        entradau.value.toUpperCase(),
        entradad.value.toUpperCase()
    );

    console.log("Nuevo personaje:", perso);

    // Guardar personaje
    characters.push(perso);
    localStorage.setItem('characters', JSON.stringify(characters));

    // Renderizar lista
    renderCharacters();

    // Reset inputs
    entrada.value = '';
    entradau.value = '';
    entradad.value = '';

    // Ejemplo de lógica con colores
    if (perso.color === 'RED') console.log("Encontré RED");
    if (perso.color === 'YELLOW') console.log("Encontré YELLOW");
};

function renderCharacters() {
    const ppl = document.getElementById('ppl');
    ppl.innerHTML = ''; // Limpiar lista antes de renderizar

    characters.forEach((character, index) => {
        const newLi = document.createElement('li');

        // Mostrar personaje en modo "texto"
        const span = document.createElement('span');
        span.textContent = `${character.name} - ${character.power} - ${character.color}`;
        newLi.appendChild(span);

        // Botón editar
        const editBtn = document.createElement('button');
        editBtn.textContent = "Edit";
        editBtn.classList.add('edit-btn');
        editBtn.onclick = () => {
            // Cambiar a modo edición
            newLi.innerHTML = '';

            const nameInput = document.createElement('input');
            nameInput.value = character.name;

            const powerInput = document.createElement('input');
            powerInput.value = character.power;

            const colorInput = document.createElement('input');
            colorInput.value = character.color;

            // Botón guardar
            const saveBtn = document.createElement('button');
            saveBtn.textContent = "Save";
            saveBtn.classList.add('save-btn');
            saveBtn.onclick = () => {
                characters[index] = new Person(
                    nameInput.value.toUpperCase(),
                    powerInput.value.toUpperCase(),
                    colorInput.value.toUpperCase()
                );
                localStorage.setItem('characters', JSON.stringify(characters));
                renderCharacters();
            };

            // Botón cancelar
            const cancelBtn = document.createElement('button');
            cancelBtn.textContent = "Cancel";
            cancelBtn.classList.add('cancel-btn');
            cancelBtn.onclick = () => renderCharacters();

            newLi.appendChild(nameInput);
            newLi.appendChild(powerInput);
            newLi.appendChild(colorInput);
            newLi.appendChild(saveBtn);
            newLi.appendChild(cancelBtn);
        };

        // Botón eliminar
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "Delete";
        deleteBtn.classList.add('delete-btn');
        deleteBtn.onclick = () => {
            characters.splice(index, 1);
            localStorage.setItem('characters', JSON.stringify(characters));
            renderCharacters();
        };

        newLi.appendChild(editBtn);
        newLi.appendChild(deleteBtn);
        ppl.appendChild(newLi);
    });
}
