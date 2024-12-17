const form = document.getElementById("to-do-form");
const input = document.getElementById("to-do-input");
// Globales Array für To-dos initialisieren
const todos = [];
form.addEventListener('submit', (event) => {
    event.preventDefault();
    let taskText = input.value.trim()
    console.log(taskText)
    checkInput(taskText);
    const todo =
    {
        text: taskText ,
        completed: false,
        id: Date.now()
    };
    todos.push(todo);
    input.value = '';
    
    function renderTodos() {
        todoList.innerHTML = ''; // Leert die Liste, bevor sie neu gerendert wird
    
        todos.forEach(todo => {   // iteriert über das todo-Array
            const li = document.createElement('li'); // erstellt ein neues Listenelement
    
            const checkbox = document.createElement('input'); // erstellt ein neues Checkbox-Element
            checkbox.type = 'checkbox'; // setzt den Typ der Checkbox
            checkbox.checked = todo.completed; // setzt den Checkbox-Status entsprechend dem completet Status der Aufgabe, wenn ich ein Häckchen reinmache
            checkbox.ariaLabel = "Aufgabe erledigen" // setzt ein aria-Label
    
            checkbox.addEventListener('change', () => {  // aktualisiert den completed-Status der Aufgabe und rendert die Liste neu
                todo.completed = checkbox.checked;
                renderTodos();
            });
    
            const span = document.createElement('span'); // erstellt ein neues span-Element für den Aufgabentext
            span.textContent = todo.text; // setzt den Text des span-Elements
            if (todo.completed) {
                span.style.textDecoration = 'line-through'; // fügt eine Durchstreichung hinzu, wenn man die Aufgabe als erledigt anklickt
            }
    
            const statusText = document.createElement('span'); // Neues Span für den Status
            statusText.classList.add('status-text');
            statusText.classList.add(todo.completed ? 'erledigt' : 'nicht-erledigt'); // legt eine Klasse fest, weil ich den Text stylen möchte
            statusText.textContent = todo.completed ? '(erledigt)' : '(noch nicht erledigt)';
    
    
    
            const deleteButton = document.createElement('button'); // erstellt einen Löschbutton, wird nicht geändert, deshalb const
            deleteButton.textContent = 'Löschen';
            deleteButton.ariaLabel = "Aufgabe löschen"
            deleteButton.addEventListener('click', () => {   // filtert die Aufgabe anhand ihrer id aus dem todos-Array und rendert die Liste neu.
                todos = todos.filter(t => t.id !== todo.id);
                renderTodos();
            });
    
            li.appendChild(checkbox);  // fügt die Checkbox, den Span und den Button dem li-Element hinzu
            li.appendChild(span);
            li.appendChild(statusText);
            li.appendChild(deleteButton);
            todoList.appendChild(li); // fügt das li-Element der ul-Liste hinzu
        });
    }

})


function checkInput(taskText) {
    //Überprüfe, ob der Wert des Eingabefeldes eine leere Zeichenkette ist
    if (taskText === '') {
        // Wenn ja, gib einen Fehlermeldung aus oder führe andere andeare Aktionen aus
        alert("Bitte gib einen Wert ein.");
        return false; // Beende die Funktion
    }
    // Wenn das Feld nicht leer ist , führe weitere Aktionen aus
    return true; // Gib true zurück, um anzuzeigen, dass die Eingabe gültig ist
}




