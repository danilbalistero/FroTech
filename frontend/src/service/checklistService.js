const API_URL = 'http://localhost:8080';

const getToken = () => {
    return localStorage.getItem('authToken');
}

export const realizarChecklist = async (dadosChecklist, veiculoId) => {
    try{
        let url = `${API_URL}/checklists?veiculoId=${veiculoId}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${getToken()}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dadosChecklist),
        });
        if(!response.ok){
            throw new Error('Erro ao realizar checklist');
        }
        const data = await response.json();
        return data;
    } catch(error){
        console.error('Erro ao realizar checklist:', error);
        throw error;
    }
}