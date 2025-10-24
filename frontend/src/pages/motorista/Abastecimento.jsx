import React, { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import './Abastecimento.css';
import { registrarAbastecimento } from "../../service/abastecimentoService";
import Modal from '../../components/Modal/Modal';

const Abastecimento = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const veiculoIdUrl = searchParams.get('veiculoId');
    const veiculoPlacaUrl = searchParams.get('placa');
    const [modalInfo, setModalInfo] = useState({ isOpen: false, message: '', onConfirm: null });
    const [novoAbastecimento, setNovoAbastecimento] = useState({
        veiculoId: veiculoIdUrl || '',
        data: '',
        kmAbastecimento: '',
        litros: '',
        valorLitro: '',
        custo: '',
        tipoCombustivel: '',
        tanqueCheio: false
    });

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setNovoAbastecimento(prevState => ({
            ...prevState,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const enviarDados = {
            ...novoAbastecimento,
            veiculoId: parseInt(novoAbastecimento.veiculoId),
            kmAbastecimento: parseInt(novoAbastecimento.kmAbastecimento),
            litros: parseFloat(novoAbastecimento.litros),
            valorLitro: parseFloat(novoAbastecimento.valorLitro),
            custo: parseFloat(novoAbastecimento.custo)
        };

        try {
            await registrarAbastecimento(enviarDados);

            setModalInfo({
                isOpen: true,
                message: 'Abastecimento registrado com sucesso!',
                onConfirm: () => navigate('/motorista/dashboard')
            });

        } catch (error) {
            console.error('Erro ao enviar:', error);
            alert(`Erro ao registrar: ${error.message}`)
        }
    };

    return (
        <div className="abastecimento-container">
            <h1>Registrar Abastecimento</h1>

            <form onSubmit={handleSubmit} className="abastecimento-form">
                <label>Veículo:</label>
                <div>
                    <input
                        type="text"
                        value={`${veiculoPlacaUrl} (Em uso)`}
                        disabled
                        style={{ backgroundColor: '#eee' }}
                    />
                </div>

                <label htmlFor="data">Data do Abastecimento:</label>
                <input type="date" id="data" name="data" value={novoAbastecimento.data} onChange={handleInputChange} required />

                <label htmlFor="kmAbastecimento">Quilometragem no Odômetro:</label>
                <input type="number" id="kmAbastecimento" name="kmAbastecimento" value={novoAbastecimento.kmAbastecimento} onChange={handleInputChange} placeholder="Ex: 50600" required />

                <label htmlFor="litros">Litros Abastecidos:</label>
                <input type="number" id="litros" name="litros" step="0.01" min="0.01" value={novoAbastecimento.litros} onChange={handleInputChange} placeholder="Ex: 35.5" required />

                <label htmlFor="custo">Custo Total (R$):</label>
                <input type="number" id="custo" name="custo" step="0.01" min="0.01" value={novoAbastecimento.custo} onChange={handleInputChange} placeholder="Ex: 175.50" required />

                <label htmlFor="valorLitro">Valor por Litro (R$):</label>
                <input type="number" id="valorLitro" name="valorLitro" step="0.001" min="0.001" value={novoAbastecimento.valorLitro} onChange={handleInputChange} placeholder="Ex: 5.499" required />

                <label htmlFor="tipoCombustivel">Tipo de Combustível:</label>
                <select id="tipoCombustivel" name="tipoCombustivel" value={novoAbastecimento.tipoCombustivel} onChange={handleInputChange} required>
                    <option value="">Selecione o combustível</option>
                    <option value="GASOLINA">Gasolina</option>
                    <option value="ETANOL">Etanol</option>
                </select>

                <div className="checkbox-container">
                    <input type="checkbox" id="tanqueCheio" name="tanqueCheio" checked={novoAbastecimento.tanqueCheio} onChange={handleInputChange} />
                    <label htmlFor="tanqueCheio">Encheu o tanque?</label>
                </div>

                <button type="submit">Registrar</button>
            </form>

            <Modal isOpen={modalInfo.isOpen} onClose={() => setModalInfo({ isOpen: false, message: '', onConfirm: null })}>
                <h2>Aviso</h2>
                <p>{modalInfo.message}</p>
                <div className='botoes-modal'>
                    <button onClick={() => {
                        if (modalInfo.onConfirm) {
                            modalInfo.onConfirm();
                        }
                        setModalInfo({ isOpen: false, message: '', onConfirm: null });
                    }}>
                        OK
                    </button>
                </div>
            </Modal>

        </div>
    )
}

export default Abastecimento;