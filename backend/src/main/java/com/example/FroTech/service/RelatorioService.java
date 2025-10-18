package com.example.FroTech.service;

import com.example.FroTech.dto.RelatorioEficienciaDTO;
import com.example.FroTech.model.Abastecimento;
import com.example.FroTech.model.TipoCombustivel;
import com.example.FroTech.model.Veiculo;
import com.example.FroTech.repository.AbastecimentoRepository;
import com.example.FroTech.repository.VeiculoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Service
public class RelatorioService {

    @Autowired
    private AbastecimentoRepository abastecimentoRepository;

    @Autowired
    private VeiculoRepository veiculoRepository;

    public List<RelatorioEficienciaDTO> gerarRelatorioEficiencia(LocalDate dataInicio, LocalDate dataFim){
        //prepara lista do relatorio final + busca todos veiculos para analisar
        List<RelatorioEficienciaDTO> relatorioFinal = new ArrayList<>();
        List<Veiculo> todosVeiculos = veiculoRepository.findAllByAtivoTrue();

        //analisa um veiculo
        for(Veiculo veiculo : todosVeiculos){
            //busca apenas os abastecimentos  deste veiculo que tiveram o tanque cheio
            List<Abastecimento> abastecimentosVeiculo = abastecimentoRepository.findByVeiculoAndTanqueCheioTrueAndDataBetweenOrderByDataAsc(veiculo, dataInicio, dataFim);

            //se n houve pelo menos 2 registros n calculamos e pulamos para o prox veiculo
            if (abastecimentosVeiculo.size() < 2) {
                continue;
            }

            //contadores: separando os dados gasolina e etanol
            double totalDistanciaGasolina = 0.0;
            double totalLitrosGasolina = 0.0;
            double totalCustoGasolina = 0.0;
            double somaValorLitroGasolina = 0.0;
            int contadorGasolina = 0;

            double totalDistanciaEtanol = 0.0;
            double totalLitrosEtanol = 0.0;
            double totalCustoEtanol = 0.0;
            double somaValorLitroEtanol = 0.0;
            int contadorEtanol = 0;

            //calcula os totais
            for (int i = 1; i < abastecimentosVeiculo.size(); i++) {
                //pega o abastecimento atual
                Abastecimento atual = abastecimentosVeiculo.get(i);
                //pega o abastecimento anterior
                Abastecimento anterior = abastecimentosVeiculo.get(i - 1);

                //calcula a distancia percorrida neste trecho
                int distanciaTrecho = atual.getKmAbastecimento() - anterior.getKmAbastecimento();

                if(anterior.getTipoCombustivel() == TipoCombustivel.GASOLINA){
                    totalDistanciaGasolina += distanciaTrecho;
                    totalLitrosGasolina += atual.getLitros();
                    totalCustoGasolina += atual.getCusto();
                    somaValorLitroGasolina += atual.getValorLitro();
                    contadorGasolina++;
                } else if (anterior.getTipoCombustivel() == TipoCombustivel.ETANOL) {
                    totalDistanciaEtanol += distanciaTrecho;
                    totalLitrosEtanol += atual.getLitros();
                    totalCustoEtanol += atual.getCusto();
                    somaValorLitroEtanol += atual.getValorLitro();
                    contadorEtanol++;
                }
            }

            //se o total de litros for maior q zero ele calcula as medias finais
            if( totalLitrosGasolina > 0){
                double consumoMedioGasolina = totalDistanciaGasolina / totalLitrosGasolina;
                double custoPorKmGasolina = totalDistanciaGasolina > 0 ? totalCustoGasolina / totalDistanciaGasolina : 0.0;
                double precoMedioLitroGasolina = contadorGasolina > 0 ? somaValorLitroGasolina / contadorGasolina : 0.0;

                RelatorioEficienciaDTO relatorioGasolina = new RelatorioEficienciaDTO(
                        veiculo.getPlaca(),
                        veiculo.getModelo(),
                        "GASOLINA",
                        consumoMedioGasolina,
                        custoPorKmGasolina,
                        totalDistanciaGasolina,
                        precoMedioLitroGasolina,
                        totalCustoGasolina
                );
                relatorioFinal.add(relatorioGasolina);
            }

            if( totalLitrosEtanol > 0){
                double consumoMedioEtanol = totalDistanciaEtanol / totalLitrosEtanol;
                double custoPorKmEtanol = totalDistanciaEtanol > 0 ? totalCustoEtanol / totalDistanciaEtanol : 0.0;
                double precoMedioLitroEtanol = contadorEtanol > 0 ? somaValorLitroEtanol / contadorEtanol : 0.0;

                RelatorioEficienciaDTO relatorioEtanol = new RelatorioEficienciaDTO(
                        veiculo.getPlaca(),
                        veiculo.getModelo(),
                        "ETANOL",
                        consumoMedioEtanol,
                        custoPorKmEtanol,
                        totalDistanciaEtanol,
                        precoMedioLitroEtanol,
                        totalCustoEtanol
                );
                relatorioFinal.add(relatorioEtanol);
            }

        }
        return relatorioFinal;
    }
}
