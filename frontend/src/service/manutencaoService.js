const API_URL = 'http://localhost:8080';

const getToken = () => {
    return localStorage.getItem('authToken');
}

export const listarManutencoes = async () => {
    try {
        const response = await fetch(`${API_URL}/manutencoes`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        });
        if (!response.ok) {
            throw new Error('Erro ao buscar manutenções');
        }
        return await response.json();
    } catch (error) {
        console.error('Erro ao listar manutenções:', error);
        throw error;
    }
};

export const registrarManutencao = async (dadosManutencao) => {
    try {
        const response = await fetch(`${API_URL}/manutencoes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify(dadosManutencao)
        });
        if (!response.ok) {
            const erro = await response.text();
            throw new Error(erro || 'Erro ao registrar manutenção');
        }
        return await response.json();
    } catch (error) {
        console.error('Erro ao registrar manutenção:', error);
        throw error;
    }
};

export const agendarManutencao = async (id, dadosAgendamento) => {
    try{
        const response = await fetch(`${API_URL}/manutencoes/${id}/agendar`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify(dadosAgendamento)
        });
        if (!response.ok){
            throw new Error('Erro ao agendar manutenção');
        }
        return await response.json();
    } catch(error){
        console.error('Erro ao agendar manutenção:', error);
        throw error;
    }
};

export const iniciarManutencao = async (id) => {
    try{
        const response = await fetch(`${API_URL}/manutencoes/${id}/iniciar`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        });
        if(!response.ok){
            throw new Error('Erro ao iniciar manutenção');
        }
        return await response.json();
    } catch(error){
        console.error('Erro ao iniciar manutenção:', error);
        throw error;
    }
};

export const concluirManutencao = async (id, dadosConclusao) => {
    try{
        const response = await fetch(`${API_URL}/manutencoes/${id}/concluir`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify(dadosConclusao)
        });
        if(!response.ok){
            throw new Error('Erro ao concluir manutenção');
        }
        return await response.json();
    } catch(error){
        console.error('Erro ao concluir manutenção:', error);
        throw error;
    }
}

export const cancelarManutencao = async (id, dadosCancelamento) => {
    try{
        const response = await fetch(`${API_URL}/manutencoes/${id}/cancelar`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify(dadosCancelamento)
        });
        if(!response.ok){
            throw new Error('Erro ao cancelar manutenção');
        }
        return await response.json();
    } catch(error){
        console.error('Erro ao cancelar manutenção:', error);
        throw error;
    }
}