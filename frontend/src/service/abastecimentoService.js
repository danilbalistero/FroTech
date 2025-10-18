const API_URL = 'http://localhost:8080';

const getToken = () => {
    return localStorage.getItem('authToken');
}

export const registrarAbastecimento = async (dadosAbastecimento) => {
    try {
        const response = await fetch(`${API_URL}/abastecimentos`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            },
            body: JSON.stringify(dadosAbastecimento)
        });

        if (!response.ok) {
            const erro = await response.text();
            throw new Error(erro || 'Erro ao registrar abastecimento');
        }

        return await response.json();

    } catch (error) {
        console.error('Erro ao registrar abastecimento:', error);
        throw error;
    }
}