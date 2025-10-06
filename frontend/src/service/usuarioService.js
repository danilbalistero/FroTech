const API_URL = 'http://localhost:8080';

const getToken = () => {
    return localStorage.getItem('authToken');
};

export const listarUsuariosAtivos = async () => {
    try {
        const response = await fetch(`${API_URL}/usuario`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${getToken()}` }
        });
        if (!response.ok) throw new Error('Erro ao listar usuários ativos');
        return await response.json();
    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }
};

export const listarUsuariosInativos = async () => {
    try {
        const response = await fetch(`${API_URL}/usuario/inativos`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${getToken()}` }
        });
        if (!response.ok) throw new Error('Erro ao listar usuários inativos');
        return await response.json();
    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }
};

export const cadastrarUsuario = async (dadosUsuario) => {
    try {
        const response = await fetch(`${API_URL}/auth/registrar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify(dadosUsuario)
        });
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao cadastrar usuário');
        }
        return await response.json();
    } catch (error) {
        console.error('Erro em cadastrarUsuario:', error);
        throw error;
    }
};

export const editarUsuario = async (id, dadosUsuario) => {
    try {
        const response = await fetch(`${API_URL}/usuario/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify(dadosUsuario)
        });
        if (!response.ok) throw new Error('Erro ao editar usuário');
        return await response.json();
    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }
};

export const definirNovaSenha = async (dadosSenha) => {
    try {
        const response = await fetch(`${API_URL}/usuario/definir-senha`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify(dadosSenha)
        });
        if (!response.ok) throw new Error('Erro ao definir a nova senha');
        return true;
    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }
};

export const recuperarUsuario = async (id) => {
    try {
        const response = await fetch(`${API_URL}/usuario/${id}/recuperar`, {
            method: 'PUT',
            headers: { 'Authorization': `Bearer ${getToken()}` }
        });
        if (!response.ok) throw new Error('Erro ao recuperar usuário');
        return true;
    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }
};

export const resetarSenha = async (id) => {
    try {
        const response = await fetch(`${API_URL}/usuario/${id}/resetar-senha`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${getToken()}` }
        });
        if (!response.ok) throw new Error('Erro ao tentar resetar senha');

        return await response.text();
    } catch (error) {
        console.error('Erro ao resetar senha:', error);
        throw error;
    }
};

export const inativarUsuario = async (id) => {
    try {
        const response = await fetch(`${API_URL}/usuario/${id}`, {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${getToken()}` }
        });
        if (!response.ok) throw new Error('Erro ao inativar usuário');
        return true;
    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }
};