package com.example.FroTech.controller;

import com.example.FroTech.model.Veiculo;
import com.example.FroTech.service.VeiculoService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/veiculos")
public class VeiculoController {

    @Autowired
    public VeiculoService veiculoService;

    @GetMapping
    public List<Veiculo> listarVeiculosAtivos() {
        return veiculoService.listarVeiculosAtivos();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Veiculo> buscarVeiculoPorId(@PathVariable Long id){
        Optional<Veiculo> veiculo = veiculoService.buscarIdAtivo(id);
        if (veiculo.isPresent()){
            return ResponseEntity.ok(veiculo.get());
        }
        else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping
    public Veiculo cadastrarVeiculo(@Valid @RequestBody Veiculo veiculo){
        return veiculoService.salvarNovoVeiculo(veiculo);
    }

    @PutMapping("/{id}")
    public Veiculo editarVeiculo(@PathVariable Long id, @Valid @RequestBody Veiculo veiculo) {
        return veiculoService.editarVeiculo(id, veiculo);
    }

    @DeleteMapping("/{id}")
    public void inativarVeiculo(@PathVariable Long id) {
        veiculoService.inativar(id);
    }

    @GetMapping("/inativos")
    public List<Veiculo> listarVeiculosInativos() {
        return veiculoService.listarVeiculosInativos();
    }

    @PutMapping("/{id}/recuperar")
    public void recuperarVeiculo(@PathVariable Long id){
        veiculoService.recuperar(id);
    }

    @GetMapping("/disponiveis")
    public List<Veiculo> listarVeiculosDisponiveis(){
        return veiculoService.listarVeiculosStatusDisponivel();
    }

    @PutMapping("/{id}/devolver")
    public ResponseEntity<Veiculo> devolverVeiculo(@PathVariable Long id){
        try {
            Veiculo veiculoDevolvido = veiculoService.devolverVeiculo(id);
            return ResponseEntity.ok(veiculoDevolvido);
        } catch (IllegalStateException e) {
            return ResponseEntity.badRequest().body(null);
        }
    }
}
