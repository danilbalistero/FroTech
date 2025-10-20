const API_URL = 'http://localhost:8080';

const getToken = () => {
    return localStorage.getItem('authToken');
}

export const listarVeiculos = async () => {
    try{
        const response = await fetch(`${API_URL}/veiculos`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        });

        if(!response.ok){
            throw new Error('Erro ao listar veículos');
        }
        const data = await response.json();
        return data;
    } catch(error){
        console.error('Erro ao listar veículos:', error);
        throw error;
    }
};

export const cadastrarVeiculo = async (dadosVeiculo) => {
    try{
        const response = await fetch(`${API_URL}/veiculos`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dadosVeiculo),
        });
        if(!response.ok){
            throw new Error('Erro ao adicionar veiculo');
        }
        const data = await response.json();
        return data;
    } catch(error){
        console.error('Erro ao criar veiculo:', error);
        throw error;
    }
};

export const editarVeiculo = async (id, dadosVeiculo) => {
    try{
        const response = await fetch (`${API_URL}/veiculos/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/json',
            }, 
            body: JSON.stringify(dadosVeiculo),
        });
        if(!response.ok){
            throw new Error ('Erro ao editar veiculo');
        }
        const data  = await response.json();
        return data;
    } catch (error){
        console.error('Erro ao editar veiculo:', error);
        throw error;
    }
};

export const inativarVeiculo = async (id) => {
    try{
        const response = await fetch(`${API_URL}/veiculos/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        });

        if(!response.ok){
            throw new Error('Erro ao inativar veiculo');
        }
        return true;
    } catch (error){
        console.error('Erro ao inativar veiculo:', error);
        throw error;
    }
};

export const listarVeiculosInativos = async () => {
    try{
        const response = await fetch(`${API_URL}/veiculos/inativos`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        });

        if(!response.ok){
            throw new Error('Erro ao listar veiculos inativos');
        }
        const data = await response.json();
        return data;
    } catch (error){
        console.error('Erro ao listar veiculos inativos:', error);
        throw error;
    }
};

export const recuperarVeiculo = async (id) => {
    try{
        const response = await fetch(`${API_URL}/veiculos/${id}/recuperar`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        })
        if(!response.ok){
            throw new Error('Erro ao recuperar veiculos:');
        }
        return true;
    } catch(error){
        console.error('Erro ao recuperar veiculos inativos:', error);
        throw error;
    }
};

export const listarVeiculosDisponiveis = async () => {
    try{
        const response = await fetch(`${API_URL}/veiculos/disponiveis`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        })
        if(!response.ok){
            throw new Error('Erro ao listar veiculos com Status Disponivel');
        }
        const data = await response.json();
        return data;
    } catch(error) {
        console.error('Erro ao listar veiculos com Status Disponivel:', error);
        throw error;
    }
}

export const devolverVeiculo = async (id) => {
    try {
        const response = await fetch(`${API_URL}/veiculos/${id}/devolver`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${getToken()}`
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao devolver veículo');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Erro ao devolver veículo:', error);
        throw error;
    }
};