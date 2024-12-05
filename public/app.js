
document.addEventListener('DOMContentLoaded', function () {
    const previewContent = document.getElementById('preview-content');
    const tools = document.querySelectorAll('.tool');
    const contextMenu = document.getElementById('context-menu');
    let currentElement = null;

    tools.forEach(tool => {
        tool.addEventListener('dragstart', handleDragStart);
    });

    previewContent.addEventListener('dragover', handleDragOver);
    previewContent.addEventListener('drop', handleDrop);

    previewContent.addEventListener('click', function (e) {
        // Remove existing highlights
        const highlightedElements = previewContent.querySelectorAll('.select');
        highlightedElements.forEach(element => {
            element.classList.remove('select');
        });

        // Add highlight to the clicked element if it's a valid target
        if (e.target !== previewContent && e.target !== e.currentTarget) {
            e.target.classList.add('select');
        }
    });

    previewContent.addEventListener('contextmenu', function (e) {
        e.preventDefault();
        const highlightedElements = previewContent.querySelectorAll('.select');
        highlightedElements.forEach(element => {
            element.classList.remove('select');
        });

        if (e.target !== previewContent && e.target !== e.currentTarget) {
            currentElement = e.target;
            currentElement.classList.add('select');

            const rect = previewContent.getBoundingClientRect();
            const offsetX = e.clientX - rect.left;
            const offsetY = e.clientY - rect.top;
            const adjustedX = Math.min(Math.max(offsetX, 0), rect.width - contextMenu.offsetWidth);
            const adjustedY = Math.min(Math.max(offsetY, 0), rect.height - contextMenu.offsetHeight);

            contextMenu.style.top = `${adjustedY}px`;
            contextMenu.style.left = `${adjustedX}px`;
            contextMenu.style.display = 'block';
        } else {
            contextMenu.style.display = 'none';
        }
    });


    // Hover event listener to add highlight class on mouseover
    previewContent.addEventListener('mouseover', function (e) {
        if (e.target !== previewContent && e.target !== e.currentTarget) {
            if (!e.target.classList.contains('select')) {
                e.target.classList.add('hovering');
            }
        }
    });

    // Hover event listener to remove highlight class on mouseout
    previewContent.addEventListener('mouseout', function (e) {
        if (e.target !== previewContent && e.target !== e.currentTarget) {
            e.target.classList.remove('hovering');
        }
    });

    document.addEventListener('click', function (e) {
        if (!contextMenu.contains(e.target)) {
            contextMenu.style.display = 'none';
        }
    });

    contextMenu.addEventListener('click', function (e) {
        if (e.target.tagName.toLowerCase() === 'li') {
            if (e.target.innerText === 'Delete' && currentElement) {
                currentElement.remove();
            }
            // Add other menu item functionalities here
        }
        contextMenu.style.display = 'none';
    });

    function handleDragStart(e) {
        e.dataTransfer.setData('text/plain', e.target.id);
    }

    function handleDragOver(e) {
        e.preventDefault();
    }

    function handleDrop(e) {
        e.preventDefault();
        const toolId = e.dataTransfer.getData('text/plain');
        let newElement;

        const rect = previewContent.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const offsetY = e.clientY - rect.top;

        if (toolId === 'tool-text') {
            newElement = document.createElement('div');
            newElement.contentEditable = 'true';
            newElement.className = 'draggable';
            newElement.innerText = 'Edit Text';
        } else if (toolId === 'tool-image') {
            const imageUrl = prompt('Enter image URL');
            if (imageUrl) {
                newElement = document.createElement('img');
                newElement.src = imageUrl;
                newElement.className = 'draggable';
                newElement.style.width = '100px';
                newElement.style.height = '100px';
            }
        } else if (toolId === 'tool-color') {
            const color = prompt('Enter a background color (e.g., #ff0000 or red)');
            if (color) {
                const targetElement = document.elementFromPoint(e.clientX, e.clientY);
                if (targetElement && targetElement.classList.contains('draggable')) {
                    targetElement.style.backgroundColor = color;
                }
            }
        }

        if (newElement) {
            newElement.style.position = 'absolute';
            const adjustedX = Math.min(Math.max(offsetX, 0), rect.width - newElement.offsetWidth);
            const adjustedY = Math.min(Math.max(offsetY, 0), rect.height - newElement.offsetHeight);
            newElement.style.left = `${adjustedX}px`;
            newElement.style.top = `${adjustedY}px`;
            previewContent.appendChild(newElement);
            makeDraggable(newElement);
        }
    }

    function makeDraggable(element) {
        element.addEventListener('mousedown', function (e) {
            const rect = element.getBoundingClientRect();
            const offsetX = e.clientX - rect.left;
            const offsetY = e.clientY - rect.top;

            function onMouseMove(e) {
                const previewRect = previewContent.getBoundingClientRect();
                const left = e.clientX - previewRect.left - offsetX;
                const top = e.clientY - previewRect.top - offsetY;

                element.style.left = `${left}px`;
                element.style.top = `${top}px`;
            }

            document.addEventListener('mousemove', onMouseMove);

            document.addEventListener('mouseup', function () {
                document.removeEventListener('mousemove', onMouseMove);
            }, { once: true });
        });
    }

    // Initialize existing elements as draggable
    const existingElements = previewContent.querySelectorAll('.draggable');
    existingElements.forEach(element => {
        makeDraggable(element);
    });
});



/* const toolbox = document.getElementById('toolbox');
const preview = document.querySelector('.preview');
const sideMenu = document.querySelector('.side-menu');

preview.addEventListener('click', function() {
    preview.classList.add('full-size');
    toolbox.style.display = preview.classList.contains('full-size') ? 'block' : 'none';
    sideMenu.classList.add('none');
}); */


// انتخاب المان‌ها
const toolbox = document.getElementById('toolbox');
const preview = document.querySelector('.preview');
const sideMenu = document.querySelector('.side-menu');
const resizeHandle = document.querySelector('.resize');
const div = document.querySelector('.div');

let isResizing = false;
let startX, startWidth;

resizeHandle.addEventListener('mousedown', function (e) {
    isResizing = true;
    startX = e.clientX;
    startWidth = parseFloat(getComputedStyle(preview, null).getPropertyValue('width'));
    document.addEventListener('mousemove', resize);
    document.addEventListener('mouseup', stopResize);
});

function resize(e) {
    if (isResizing) {
        const deltaX = e.clientX - startX;
        const newWidth = startWidth - deltaX;
        const newWidthPercent = (newWidth / window.innerWidth) * 100;
        if (newWidthPercent >= 25 && newWidthPercent <= 100) { // حداقل و حداکثر عرض به درصد
            preview.style.width = newWidthPercent + '%';
            resizeHandle.classList.add('active');
        }
    }
}
function stopResize() {
    isResizing = false;
    document.removeEventListener('mousemove', resize);
    document.removeEventListener('mouseup', stopResize);
}

// اضافه کردن رویداد کلیک به پیش‌نمایش
preview.addEventListener('click', function () {
    preview.classList.add('full-size');
    /* toolbox.style.display = preview.classList.contains('full-size') ? 'block' : 'none'; */
    sideMenu.classList.add('hide');
    div.classList.add('hide-div');
    resizeHandle.classList.add('none');
});



// Stack to keep track of states
const undoStack = [];
const redoStack = [];

// Function to save the current state
function saveState() {
    const content = document.getElementById('preview-content').innerHTML;
    undoStack.push(content);
    console.log("Saved state:", content); // Debugging line
    // Clear redo stack whenever a new state is saved
    redoStack.length = 0;
}

// Function to undo the last action
function undo() {
    if (undoStack.length > 0) {
        // Save current state to redo stack before changing
        const currentState = document.getElementById('preview-content').innerHTML;
        redoStack.push(currentState);

        const lastState = undoStack.pop();
        document.getElementById('preview-content').innerHTML = lastState || '';
        console.log("Undo to state:", lastState); // Debugging line
    }
}

// Function to redo the last undone action
function redo() {
    if (redoStack.length > 0) {
        // Save current state to undo stack before changing
        const currentState = document.getElementById('content').innerHTML;
        undoStack.push(currentState);

        const nextState = redoStack.pop();
        document.getElementById('preview-content').innerHTML = nextState || '';
        console.log("Redo to state:", nextState); // Debugging line
    }
}

// Attach event listeners to buttons
document.getElementById('undo').addEventListener('click', (e) => {
    e.preventDefault();
    undo();
});

document.getElementById('redo').addEventListener('click', (e) => {
    e.preventDefault();
    redo();
});

// Initial state
saveState();


