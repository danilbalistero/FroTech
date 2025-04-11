package com.example.FroTech.controller;

import com.example.FroTech.model.Usuario;
import com.example.FroTech.repository.UsuarioRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioRepository user;

    @GetMapping
    public List<Usuario> listarUsuarios() {
        return (List<Usuario>) user.findAll();
    }

    @PostMapping
    public Usuario criarUsuario(@Valid @RequestBody Usuario usuario) {
        return user.save(usuario);
    }

    @PutMapping
    public Usuario atualizarUsuario(@RequestBody Usuario usuario) {
        return user.save(usuario);
    }

    @DeleteMapping("/{id}")
    public void deletarUsuario(@PathVariable Long id) {
        user.deleteById(id);
    }
}
