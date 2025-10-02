const API_URL = 'http://localhost:8080';

export const login = async (login, senha) => {
    try {
        const response = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ login, senha })
        });
        if (!response.ok) {
            const erroTexto = await response.text();
            throw new Error(erroTexto || 'Falha no login');
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error('Erro ao fazer login:', error);
        throw error;
    }
}