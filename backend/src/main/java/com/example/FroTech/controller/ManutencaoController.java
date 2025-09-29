package com.example.FroTech.controller;

import com.example.FroTech.dto.AgendamentoDTO;
import com.example.FroTech.dto.CancelamentoDTO;
import com.example.FroTech.dto.ConcluirDTO;
import com.example.FroTech.model.Manutencao;
import com.example.FroTech.service.ManutencaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/manutencoes")
public class ManutencaoController {

    @Autowired
    private ManutencaoService manutencaoService;

    @GetMapping
    public ResponseEntity<List<Manutencao>> listarManutencoes(){
        List<Manutencao> manutencoes = manutencaoService.listarManutencoes();
        return ResponseEntity.ok(manutencoes);
    }

    @PostMapping
    public ResponseEntity<Manutencao> registrarManutencao(@RequestBody Manutencao manutencao){
        Manutencao novaManutencao = manutencaoService.registrar(manutencao);
        return ResponseEntity.status(HttpStatus.CREATED).body(novaManutencao);
    }

    @PatchMapping("/{id}/agendar")
    public ResponseEntity<Manutencao> agendarManutencao(@PathVariable Long id, @RequestBody AgendamentoDTO dto){
        Manutencao manutencaoAgendada = manutencaoService.agendar(id, dto.dataAgendada());
        return ResponseEntity.ok(manutencaoAgendada);
    }

    @PatchMapping("/{id}/iniciar")
    public ResponseEntity<Manutencao> iniciarManutencao(@PathVariable Long id){
        Manutencao manutencaoIniciada = manutencaoService.iniciar(id);
        return ResponseEntity.ok(manutencaoIniciada);
    }

    @PatchMapping("/{id}/concluir")
    public ResponseEntity<Manutencao> concluirManutencao(@PathVariable Long id, @RequestBody ConcluirDTO dto){
        Manutencao manutencaoConcluida = manutencaoService.concluir(id, dto.dataRealizada(), dto.custo());
        return ResponseEntity.ok(manutencaoConcluida);
    }

    @PatchMapping("/{id}/cancelar")
    public ResponseEntity<Manutencao> cancelarManutencao(@PathVariable Long id, @RequestBody CancelamentoDTO dto){
        Manutencao manutencaoCancelada = manutencaoService.cancelar(id, dto.motivoCancelamento(), dto.dataCancelamento());
        return ResponseEntity.ok(manutencaoCancelada);
    }
}
