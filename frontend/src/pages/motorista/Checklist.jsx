import React, { useEffect, useState } from 'react';
import { listarVeiculosDisponiveis } from '../../service/veiculoService';
import { realizarChecklist } from '../../service/checklistService';
import { useNavigate } from 'react-router-dom';
import './Checklist.css';

const Checklist = () => {
    const [veiculos, setVeiculos] = useState([]);
    const [veiculoId, setVeiculoId] = useState('');
    const [itens, setItens] = useState({ pneusOk: false, nivelOleoOk: false, nivelAguaOk: false });
    const [observacoes, setObservacoes] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const buscarDados = async () => {
            try {
                const veiculos = await listarVeiculosDisponiveis();
                setVeiculos(veiculos);
            } catch (error) {
                console.error('Erro ao listar veiculos com status disponivel:', error);
                alert('Não foi possível carregar os veículos. Tente novamente.');
            }
        };
        buscarDados();
    }, []);

    const handleItemChange = (e) => {
        const { name, checked } = e.target;
        setItens(prevItens => ({
            ...prevItens,
            [name]: checked
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!veiculoId) {
            alert('Por favor, selecione um veículo!');
            return;
        }

        const todosItensMarcados = Object.values(itens).every(item => item === true);

        if (!todosItensMarcados) {
            alert('Por favor, marque todos os itens de verificação antes de continuar.');
            return;
        }

        try {
            const dadosChecklist = { ...itens, observacoes };

            await realizarChecklist(dadosChecklist, veiculoId);

            alert('Checklist enviado com sucesso!');
            navigate('/motorista/dashboard');

        } catch (error) {
            console.error('Erro ao enviar o checklist:', error);
            alert('Falha ao enviar o checklist. Verifique os dados e tente novamente.');
        }
    };

    return (
        <div className="checklist-container">
            <h1 className="checklist-titulo">Realizar Checklist</h1>
            <form className="checklist-form" onSubmit={handleSubmit}>

                <label htmlFor="veiculo-select">Selecione o Veículo</label>
                <select
                    id="veiculo-select"
                    value={veiculoId}
                    onChange={e => setVeiculoId(e.target.value)}
                    required
                >
                    <option value="">Selecione...</option>
                    {veiculos.map(veiculo => (
                        <option key={veiculo.id} value={veiculo.id}>
                            {veiculo.placa} - {veiculo.modelo}
                        </option>
                    ))}
                </select>

                <h2 className="items-titulo">Itens de Verificação</h2>
                <div className="checklist-item" onClick={() => handleItemChange({ target: { name: 'pneusOk', checked: !itens.pneusOk } })}>
                    <div className={`custom-checkbox ${itens.pneusOk ? 'checked' : 'unchecked'}`}>
                        {itens.pneusOk ? 'V' : 'X'}
                    </div>
                    <label>Pneus calibrados e em bom estado</label>
                </div>

                <div className="checklist-item" onClick={() => handleItemChange({ target: { name: 'nivelOleoOk', checked: !itens.nivelOleoOk } })}>
                    <div className={`custom-checkbox ${itens.nivelOleoOk ? 'checked' : 'unchecked'}`}>
                        {itens.nivelOleoOk ? 'V' : 'X'}
                    </div>
                    <label>Nível do Óleo</label>
                </div>

                <div className="checklist-item" onClick={() => handleItemChange({ target: { name: 'nivelAguaOk', checked: !itens.nivelAguaOk } })}>
                    <div className={`custom-checkbox ${itens.nivelAguaOk ? 'checked' : 'unchecked'}`}>
                        {itens.nivelAguaOk ? 'V' : 'X'}
                    </div>
                    <label>Nível da Água / Radiador</label>
                </div>

                <label htmlFor="observacoes">Observações</label>
                <textarea
                    id="observacoes"
                    placeholder="Algum problema ou observação? Informe aqui."
                    value={observacoes}
                    onChange={e => setObservacoes(e.target.value)}
                />

                <button type="submit" className="submit-btn">Finalizar Checklist</button>
            </form>
        </div>
    );
}

export default Checklist;
