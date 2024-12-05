
const projectFeature = document.querySelector('.project-feature');
const imagesFeature = document.querySelector('.images-feature');
const yourTemplatesFeature = document.querySelector('.your-templates-feature');
const w2TemplatesFeature = document.querySelector('.w2-templates-feature');
const usersTemplatesFeature = document.querySelector('.users-templates-feature');
const laravelFeature = document.querySelector('.laravel-feature');


const boxItemWebsite = document.querySelector('.box-item-website');
const boxItemImages = document.querySelector('.box-item-images');
const boxItemOwner = document.querySelector('.box-item-owner');
const boxItemW2 = document.querySelector('.box-item-w2');
const boxItemUsers = document.querySelector('.box-item-users');
const boxItemLaravel = document.querySelector('.box-item-laravel');


function toggleVisibility(target) {

    boxItemWebsite.classList.add('none');
    boxItemImages.classList.add('none');
    boxItemOwner.classList.add('none');
    boxItemW2.classList.add('none');
    boxItemUsers.classList.add('none');
    boxItemLaravel.classList.add('none');

    target.classList.remove('none');
}

projectFeature.addEventListener('click', () => toggleVisibility(boxItemWebsite));
imagesFeature.addEventListener('click', () => toggleVisibility(boxItemImages));
yourTemplatesFeature.addEventListener('click', () => toggleVisibility(boxItemOwner));
w2TemplatesFeature.addEventListener('click', () => toggleVisibility(boxItemW2));
usersTemplatesFeature.addEventListener('click', () => toggleVisibility(boxItemUsers));
laravelFeature.addEventListener('click', () => toggleVisibility(boxItemLaravel));


function showPromptModal(callback) {
    const modal = document.getElementById('promptModal');
    const input = document.getElementById('projectNameInput');
    const cancelBtn = document.getElementById('promptCancel');
    const confirmBtn = document.getElementById('promptConfirm');

    input.value = ''; 
    modal.style.display = 'flex';

    cancelBtn.onclick = () => {
        modal.style.display = 'none';
    };

    confirmBtn.onclick = () => {
        const projectName = input.value.trim();
        if (projectName) {
            modal.style.display = 'none';
            callback(projectName);
        } else {
            alert('Project name cannot be empty.');
        }
    };
}

function showAlertModal(message) {
    const modal = document.getElementById('alertModal');
    const messageElem = document.getElementById('alertMessage');
    const closeBtn = document.getElementById('alertClose');

    messageElem.textContent = message;
    modal.style.display = 'flex';

    closeBtn.onclick = () => {
        modal.style.display = 'none';
    };
}




document.querySelector('.bx-website').addEventListener('click', () => {
    showPromptModal(async (projectName) => {
        const response = await fetch('/create-template', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            },
            body: JSON.stringify({ projectName }),
        });

        const data = await response.json();

        if (data.success) {
            const dashboardContainer = document.querySelector('.grid-3x-website');
            const newProject = `
                <div class="create-website" data-template-id="${data.templateId}">
                    <div class="flex-sb-align">
                        <div class="simple-div" style="width: 32px; height: 32px;"></div>
                        <img class="normal-img m-r-10 delete-icon"style="z-index: 1;" src="/Icon/garbage.png" alt="Delete" onclick="deleteProject(${data.templateId})">
                    </div>
                    <div class="center-website">
                        <img class="position-center big-img" src="/Images/w2-2.png" alt="Project Image">
                        <button class="btn-go-to-project none" onclick="location.href='/project/${data.templateId}'">Go to Project</button>
                    </div>
                    <div class="title-bottom-w2">
                        <h1>Project: ${projectName}</h1>
                    </div>
                </div>`;
            dashboardContainer.insertAdjacentHTML('beforeend', newProject);

            attachHoverEffect();

            showAlertModal('Project created successfully!');
        } else {
            showAlertModal('Failed to create the template.');
        }
    });
});

function attachHoverEffect() {
    document.querySelectorAll('.create-website').forEach((project) => {
        const goToProjectBtn = project.querySelector('.btn-go-to-project');
        const centerWebsite = project.querySelector('.center-website');

        project.addEventListener('mouseover', () => {
            goToProjectBtn.classList.remove('none');
            centerWebsite.classList.add('active');
        });

        project.addEventListener('mouseout', () => {
            goToProjectBtn.classList.add('none');
            centerWebsite.classList.remove('active');
        });
    });
}


attachHoverEffect();


function showConfirmModal(message, onConfirm) {
    const modalHtml = `
        <div class="modal-overlay">
            <div class="modal-container">
                <h2>${message}</h2>
                <div class="modal-actions">
                    <button class="btn-confirm">Yes</button>
                    <button class="btn-cancel">No</button>
                </div>
            </div>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalHtml);

    const modal = document.querySelector('.modal-overlay');
    const confirmBtn = modal.querySelector('.btn-confirm');
    const cancelBtn = modal.querySelector('.btn-cancel');

    confirmBtn.addEventListener('click', () => {
        onConfirm();
        modal.remove();
    });

    cancelBtn.addEventListener('click', () => {
        modal.remove();
    });
}


window.deleteProject = async function (templateId) {
    showConfirmModal('Are you sure you want to delete this project?', async () => {
        const response = await fetch(`/delete-template/${templateId}`, {
            method: 'DELETE',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            },
        });

        const data = await response.json();

        if (data.success) {
            document.querySelector(`.create-website[data-template-id="${templateId}"]`).remove();
            showAlertModal('Project deleted successfully.');
        } else {
            showAlertModal(data.message || 'Failed to delete the project.');
        }
    });
}






































const uploadInput = document.getElementById('file-upload');
const uploadArea = document.querySelector('.bx-images');
const mediaGrid = document.querySelector('.grid-3x-images');

uploadArea.addEventListener('click', () => uploadInput.click());
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('hover');
});
uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('hover');
});
uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('hover');
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(file);
});

uploadInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) handleFileUpload(file);
});

async function handleFileUpload(file) {
    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await fetch('/upload-image', {
            method: 'POST',
            headers: {
                'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
            },
            body: formData,
        });

        const data = await response.json();

        if (data.success) {
            addMediaToGrid(data.fileUrl, data.fileName, data.fileSize, data.fileType, data.fileId);
        } else {
            showAlertModal(data.message || 'Failed to upload file.');
        }
    } catch (error) {
        console.error(error);
        showAlertModal('An error occurred while uploading the file.');
    }
}

function addMediaToGrid(fileUrl, fileName, fileSize, fileType, fileId) {
    let mediaContent = '';
    if (fileType === 'image') {
        mediaContent = `
            <img src="${fileUrl}" alt="Uploaded Image" 
                 onclick="openFileModal('${fileUrl}', '${fileName}', ${fileSize}, 'image')">`;
    } else if (fileType === 'video') {
        mediaContent = `
            <video controls>
                <source src="${fileUrl}" type="video/mp4">
                Your browser does not support the video tag.
            </video>`;
    } else if (fileType === 'audio') {
        mediaContent = `
            <audio controls>
                <source src="${fileUrl}" type="audio/mpeg">
                Your browser does not support the audio element.
            </audio>`;
    }

    const mediaElement = `
        <div class="create-files-users" data-file-id="${fileId}">
            <div class="flex-sb-align">
                <div class="simple-div" style="width: 32px; height: 32px;"></div>
                <img class="normal-img m-r-10 delete-icon2" src="Icon/garbage.png" alt="Delete"
                     onclick="deleteFile(${fileId})">
            </div>
            <div class="center-file">${mediaContent}</div>
        </div>`;




    mediaGrid.insertAdjacentHTML('beforeend', mediaElement);
}

window.openFileModal = function (fileUrl, fileName, fileSize) {
    const modalImage = document.getElementById('modal-image');
    modalImage.src = fileUrl;
    modalImage.style.display = 'block';

    document.getElementById('image-name').textContent = `Name: ${fileName}`;
    document.getElementById('image-size').textContent = `Size: ${formatBytes(fileSize)}`;
    document.getElementById('image-modal').classList.remove('none');
};

window.closeFileModal = function () {
    document.getElementById('modal-image').src = '';
    document.getElementById('image-modal').classList.add('none');
};

window.deleteFile = async function (fileId) {
    showConfirmModal('Are you sure you want to delete this file?', async () => {
        try {
            const response = await fetch(`/delete-image/${fileId}`, {
                method: 'DELETE',
                headers: {
                    'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').getAttribute('content'),
                },
            });

            const data = await response.json();

            if (data.success) {
                const fileElement = document.querySelector(`.create-files-users[data-file-id="${fileId}"]`);
                const fileSize = parseInt(fileElement.getAttribute('data-file-size'), 10);

                fileElement.remove();

                showAlertModal('File deleted successfully.');
            } else {
                showAlertModal(data.message || 'Failed to delete the file.');
            }
        } catch (error) {
            console.error(error);
            showAlertModal('An error occurred while deleting the file.');
        }
    });
};

function formatBytes(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}