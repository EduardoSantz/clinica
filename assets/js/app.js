document.addEventListener('DOMContentLoaded', () => {
    const page = window.location.pathname;

    if (page.endsWith('/') || page.endsWith('/index.html')) {
        // Lógica do Dashboard, se houver
    } else if (page.endsWith('/clientes/list.html')) {
        loadClients();
    } else if (page.endsWith('/medicos/list.html')) {
        loadMedics();
    } else if (page.endsWith('/exames/agendar.html')) {
        loadScheduleForm();
    }
});

function loadClients() {
    const clients = MockAPI.getClients();
    const tableBody = document.getElementById('clients-table-body');
    if (!tableBody) return;
    tableBody.innerHTML = '';
    clients.forEach(client => {
        tableBody.innerHTML += `
            <tr>
                <td>${client.name}</td>
                <td>${client.cpf}</td>
                <td><a href="/clientes/detalhes.html?id=${client.id}" class="btn btn-sm btn-outline-primary">Detalhes</a></td>
            </tr>
        `;
    });
}

function loadMedics() {
    const medics = MockAPI.getMedics();
    const tableBody = document.getElementById('medics-table-body');
    if (!tableBody) return;
    tableBody.innerHTML = '';
    medics.forEach(medic => {
        tableBody.innerHTML += `
            <tr>
                <td>${medic.name}</td>
                <td>${medic.speciality}</td>
                <td><a href="/medicos/detalhes.html?id=${medic.id}" class="btn btn-sm btn-outline-primary">Detalhes</a></td>
            </tr>
        `;
    });
}

function loadScheduleForm() {
    const clients = MockAPI.getClients();
    const medics = MockAPI.getMedics();
    const exams = MockAPI.getExams();

    const clientSelect = document.getElementById('client-id');
    const medicSelect = document.getElementById('medic-id');
    const examSelect = document.getElementById('exam-id');

    if (clientSelect) {
        clients.forEach(c => clientSelect.innerHTML += `<option value="${c.id}">${c.name}</option>`);
    }
    if (medicSelect) {
        medics.forEach(m => medicSelect.innerHTML += `<option value="${m.id}">${m.name}</option>`);
    }
    if (examSelect) {
        exams.forEach(e => examSelect.innerHTML += `<option value="${e.id}">${e.name}</option>`);
    }
}

function handleScheduleSubmit(event) {
    event.preventDefault();
    const scheduleData = {
        clientId: document.getElementById('client-id').value,
        medicId: document.getElementById('medic-id').value,
        examId: document.getElementById('exam-id').value,
        date: document.getElementById('scheduled-date').value,
        time: document.getElementById('scheduled-time').value,
        status: 'Agendado'
    };
    MockAPI.createSchedule(scheduleData);
    alert('Agendamento realizado com sucesso!');
    window.location.href = '/index.html';
}