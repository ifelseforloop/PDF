document.addEventListener('DOMContentLoaded', () => {
    const fileInput = document.getElementById('fileInput');
    const fileList = document.getElementById('fileList');
    const form = document.getElementById('mergeForm');
    const files = [];

    fileInput.addEventListener('change', (e) => {
        for (const file of e.target.files) {
            files.push(file);
        }
        renderList();
        fileInput.value = '';
    });

    function renderList() {
        fileList.innerHTML = '';
        files.forEach((file, index) => {
            const li = document.createElement('li');
            li.textContent = file.name;
            li.draggable = true;
            li.dataset.index = index;
            li.addEventListener('dragstart', handleDragStart);
            li.addEventListener('dragover', handleDragOver);
            li.addEventListener('drop', handleDrop);
            fileList.appendChild(li);
        });
    }

    let dragSrcIndex = null;

    function handleDragStart(e) {
        dragSrcIndex = +this.dataset.index;
        e.dataTransfer.effectAllowed = 'move';
    }

    function handleDragOver(e) {
        e.preventDefault();
    }

    function handleDrop(e) {
        e.preventDefault();
        const destIndex = +this.dataset.index;
        if (dragSrcIndex === null || destIndex === undefined) return;
        const [moved] = files.splice(dragSrcIndex, 1);
        files.splice(destIndex, 0, moved);
        renderList();
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        if (files.length === 0) {
            alert('Please select files');
            return;
        }
        const formData = new FormData();
        files.forEach(file => formData.append('files', file));
        const response = await fetch(form.action, {
            method: 'POST',
            body: formData
        });
        if (!response.ok) {
            alert('Error merging PDF');
            return;
        }
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'merged.pdf';
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
    });
});
