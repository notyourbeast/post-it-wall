const addNoteButton = document.getElementById('add-note');
const clearNotesButton = document.getElementById('clear-notes');
const themeSelector = document.getElementById('theme-selector');
const wall = document.querySelector('.wall');

// Colors for Post-It notes
const noteColors = ['#fffcab', '#ffd3b6', '#d4fc79', '#d1d4ff'];

// Create a new note
function createNote(text = '', color = '', rotation = '', x = '', y = '') {
  const note = document.createElement('div');
  note.classList.add('note');

  // Assign properties
  const randomColor = color || noteColors[Math.floor(Math.random() * noteColors.length)];
  const randomRotation = rotation || `${Math.random() * 10 - 5}deg`;

  note.style.setProperty('--note-color', randomColor);
  note.style.setProperty('--rotate', randomRotation);
  note.style.left = x || '0px';
  note.style.top = y || '0px';

  // Add textarea
  const textarea = document.createElement('textarea');
  textarea.value = text;
  note.appendChild(textarea);
  wall.appendChild(note);

  // Drag functionality
  note.draggable = true;
  note.addEventListener('dragstart', dragStart);
  note.addEventListener('dragend', dragEnd);
}

// Add Note Button
addNoteButton.addEventListener('click', () => createNote());

// Clear Notes Button
clearNotesButton.addEventListener('click', () => {
  wall.innerHTML = '';
});

// Drag and Drop
let currentNote = null;

function dragStart(e) {
  currentNote = this;
  setTimeout(() => this.classList.add('hidden'), 0);
}

function dragEnd(e) {
  currentNote.classList.remove('hidden');
  const rect = wall.getBoundingClientRect();
  currentNote.style.position = 'absolute';
  currentNote.style.left = `${e.clientX - rect.left - 75}px`;
  currentNote.style.top = `${e.clientY - rect.top - 75}px`;
}

// Theme Selector
themeSelector.addEventListener('change', (e) => {
  wall.className = `wall ${e.target.value}`;
});
