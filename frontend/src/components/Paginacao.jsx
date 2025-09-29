import React from 'react';
import './Paginacao.css';

const Paginacao = ({ itensPorPagina, totalItens, mudarPagina, paginaAtual}) =>{
    const numeroDePagina = [];

    for (let i = 1; i <= Math.ceil(totalItens / itensPorPagina); i++) {
        numeroDePagina.push(i);
    }

    return (
        <nav>
            <ul className='paginacao-lista'> 
                {numeroDePagina.map(numero => ( 
                    <li key={numero} className='paginacao-item'>
                        <button 
                            onClick={() => mudarPagina(numero)} 
                            className={paginaAtual === numero ? 'ativo' : ''}
                        >
                            {numero}
                        </button>
                    </li>
                ))}
            </ul>
        </nav>
    );

}

export default Paginacao;