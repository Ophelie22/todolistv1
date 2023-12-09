/**
 * Todolist
 */
const app = {
todo: document.getElementById('todo'),
list: null,
counter: null,
tasks: [{ // index = 0
    name: 'Faire une todo-list en JS',
    done: true
},
{ // index = 1
    name: 'Faire une todo-list en React',
    done: false
},
{ // index = 2
    name: 'Dominer le monde',
    done: false
}],
redraw: () => {
    // ici il faudrait effacer l'affichage...
    app.todo.innerHTML = '';
    // ensuite on redessine tout
    app.createForm();
    app.createCount();
    app.createList();
},
createForm: () => {
    // on crée un tag FORM
    const form = document.createElement('form');
    // on lui donne un ID
    form.id = 'todo-form';

    // on ajoute un écouteur d'evenement sur l'evenement "submit"
    form.addEventListener('submit', app.onSubmit);

    // on va lui donner un contenu (un input)
    const input = document.createElement('input');

    // on parametre notre input
    input.type = 'text';
    input.setAttribute('placeholder', 'Ajouter une tâche');
    input.id = 'todo-input';
    input.name = 'newTask';

    // on met l'input dans le form
    form.appendChild(input);

    // on va le placer dans notre HTML.
    app.todo.appendChild(form);
},
createCount: () => {
    app.counter = document.createElement('div');

    // on lui donne un ID
    app.counter.id = 'todo-counter';

    // on définit le contenu textuel de la balise
    // TODO il faudra ici trouver le bon nombre !
    app.counter.textContent = '0 tâches en cours';

    // on le met dans le HTML.
    app.todo.appendChild(app.counter);
},
createList: () => {
    // on stocke liste dans app afin de pouvoir y accéder plus tard (pour ajouter des éléments)
    app.list = document.createElement('ul');
    //on donne un id
    app.list.id = 'todo-list';

    // on ajoute la liste
    app.todo.appendChild(app.list);

    // on ajoute les taches contenues dans notre variable "tasks"
    app.tasks.forEach((task, index) => app.createTask(task, index));
},
// si done est true, la tache à été faite :)
// on déstructure notre tache en taskName et done
// c'est comme si on avait écrit : 
// createTask: (taskToCreate) => {
//  const name = taskToCreate.name;
//  const done = taskToCreate.done;
createTask: ({name, done}, index) => {
    const task = document.createElement('li');
    // on ajoute la classe et la classe done si besoin
    task.className = done ? 'todo-item todo-item--done' : 'todo-item';

    // maintenant, on veut un input de type checkbox
    const check = document.createElement('input');
    // on donne une classe
    check.className = 'todo-item-cb';
    // on donne le type checkbox
    check.type = 'checkbox';

    // calcul de l'id
    const newId = `todo-item-${index}`;

    // on donne a la checkbox un id
    check.id = newId;

    // on coche la checkbox si done === true
    check.checked = done;

    // on ajoute un event listener sur la checkbox
    check.addEventListener('change', () => {
    // j'utilise l'index pour trouver la task dans le tableau et j'inverse la valeur de done
    app.tasks[index].done = !done;
    // et on redessine
    app.redraw();
    });

    // on met la checkbox dans le LI
    task.appendChild(check);

    // on crée un label
    const label = document.createElement('label');
    // on donne une classe
    label.className = 'todo-item-text';
    // on donne le for au label
    label.setAttribute('for', newId);
    // on met le parametre dans le label (le nom de la tache)
    label.textContent = name;
    // on met le label dans le li
    task.appendChild(label);

    // on ajoute la tâche à la liste
    app.list.appendChild(task);

    // on met a jour le compteur du nombre de tâches
    app.updateCounter();
},
onSubmit: (event) => {
    // on doit empecher le comportement par défaut du SUBMIT !
    // ce comportement par défaut, c'est de recharger la page... 
    event.preventDefault();

    // on ajoute la tache au state (push ajoute à la fin)
    app.tasks.push({name: event.target.childNodes[0].value, done: false});

    // on vide l'input
    event.target.childNodes[0].value = '';

    // maintenant, on redessine tout !
    app.redraw();
},
updateCounter: () => {
    // mettre a jour le compteur !
    const taskNumber = app.tasks.filter(task => !task.done).length;

    // suivant différents cas, on affiche différents messages
    if (taskNumber === 1) {
    app.counter.textContent = 'Une tâche en cours';
    } else if (taskNumber === 0) {
    app.counter.textContent = 'Aucune tâche en cours';
    } else {
    // Interpolation de string
    app.counter.textContent = `${taskNumber} tâches en cours`;
    // version avec concaténation 
    // taskNumber + " taches en cours";
    }
}
};


// Chargement du DOM
document.addEventListener('DOMContentLoaded', app.redraw);