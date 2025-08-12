// Mock API com localStorage para simulação
const MockAPI = {
    _data: {
        clients: [
            { id: 1, name: 'João da Silva', cpf: '111.222.333-44', email: 'joao@example.com', phone: '11987654321' },
            { id: 2, name: 'Maria Oliveira', cpf: '222.333.444-55', email: 'maria@example.com', phone: '21987654321' }
        ],
        medics: [
            { id: 1, name: 'Dra. Ana Souza', speciality: 'Cardiologia', crm: '12345/SP' },
            { id: 2, name: 'Dr. Carlos Lima', speciality: 'Ortopedia', crm: '67890/RJ' }
        ],
        exams: [
            { id: 1, name: 'Hemograma Completo' },
            { id: 2, name: 'Raio-X do Tórax' },
            { id: 3, name: 'Eletrocardiograma' }
        ],
        schedules: []
    },

    init: function() {
        if (!localStorage.getItem('api_data')) {
            localStorage.setItem('api_data', JSON.stringify(this._data));
        }
    },

    getData: function(resource) {
        const data = JSON.parse(localStorage.getItem('api_data'));
        return data[resource] || [];
    },

    saveData: function(resource, newData) {
        let data = JSON.parse(localStorage.getItem('api_data'));
        data[resource] = newData;
        localStorage.setItem('api_data', JSON.stringify(data));
    },

    // Funções CRUD
    getClients: function() { return this.getData('clients'); },
    getMedics: function() { return this.getData('medics'); },
    getExams: function() { return this.getData('exams'); },
    
    createSchedule: function(scheduleData) {
        let schedules = this.getData('schedules');
        scheduleData.id = Date.now(); // ID único
        schedules.push(scheduleData);
        this.saveData('schedules', schedules);
        return scheduleData;
    }
};

MockAPI.init();