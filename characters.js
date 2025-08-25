console.log('Welcome');

const title = document.querySelector('#title');
title.innerText = 'Kawaii Kaiwai';

// Obtener personajes almacenados o array vacío
let characters = JSON.parse(localStorage.getItem('characters')) || [];
renderCharacters();

// Clase Person con ID único
class Person {
    constructor(name, power, color) {
        this.id = Date.now();
        this.name = name;
        this.power = power;
        this.color = color;
    }
}

// Guardar en localStorage
function saveCharacters() {
    localStorage.setItem('characters', JSON.stringify(characters));
}

// Renderizar personajes
function renderCharacters() {
    const ppl = document.getElementById('ppl');
    ppl.innerHTML = '<h3>List</h3>';

    characters.forEach(character => {
        const li = document.createElement('li');
        li.innerHTML = `<span>${character.name} - ${character.power} - ${character.color}</span>`;

        // Botón editar
        const editBtn = document.createElement('button');
        editBtn.textContent = "✏️";
        editBtn.classList.add('edit-btn');
        editBtn.onclick = () => editCharacter(character.id, li);

        // Botón eliminar
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "❌";
        deleteBtn.classList.add('delete-btn');
        deleteBtn.onclick = () => deleteCharacter(character.id);

        li.append(editBtn, deleteBtn);
        ppl.appendChild(li);
    });
}

// Agregar personaje
document.getElementById('botonUno').onclick = () => {
    const name = document.getElementById('entradaUno').value.trim();
    const power = document.getElementById('entradaDos').value.trim();
    const color = document.getElementById('entradaTres').value.trim();

    if (!name || !power || !color) {
        alert("Please complete all the required fields.");
        return;
    }

    const perso = new Person(name.toUpperCase(), power.toUpperCase(), color.toUpperCase());
    characters.push(perso);
    saveCharacters();
    renderCharacters();

    // limpiar inputs
    document.getElementById('entradaUno').value = '';
    document.getElementById('entradaDos').value = '';
    document.getElementById('entradaTres').value = '';
};

// Eliminar personaje
function deleteCharacter(id) {
    characters = characters.filter(c => c.id !== id);
    saveCharacters();
    renderCharacters();
}

// Editar personaje (inline edit)
function editCharacter(id, li) {
    const character = characters.find(c => c.id === id);
    li.innerHTML = '';

    const nameInput = document.createElement('input');
    nameInput.value = character.name;

    const powerInput = document.createElement('input');
    powerInput.value = character.power;

    const colorInput = document.createElement('input');
    colorInput.value = character.color;

    const saveBtn = document.createElement('button');
    saveBtn.textContent = "Save";
    saveBtn.classList.add('save-btn');
    saveBtn.onclick = () => {
        character.name = nameInput.value.toUpperCase();
        character.power = powerInput.value.toUpperCase();
        character.color = colorInput.value.toUpperCase();
        saveCharacters();
        renderCharacters();
    };

    const cancelBtn = document.createElement('button');
    cancelBtn.textContent = "Cancel";
    cancelBtn.classList.add('cancel-btn');
    cancelBtn.onclick = renderCharacters;

    li.append(nameInput, powerInput, colorInput, saveBtn, cancelBtn);
}
