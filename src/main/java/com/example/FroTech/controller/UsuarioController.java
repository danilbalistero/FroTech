package com.example.FroTech.controller;

import com.example.FroTech.dto.LoginDTO;
import com.example.FroTech.dto.UsuarioDTO;
import com.example.FroTech.model.Usuario;
import com.example.FroTech.repository.UsuarioRepository;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/usuario")
public class UsuarioController {

    @Autowired
    private UsuarioRepository user;

    @GetMapping
    public List<UsuarioDTO> listarUsuarios() {
        List<Usuario> usuarios = (List<Usuario>) user.findAll();

        return usuarios.stream()
                .map(usuario -> new UsuarioDTO(usuario.getId(), usuario.getNome(), usuario.getEmail()))
                .toList();
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

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginDTO loginDTO) {
        Optional<Usuario> usuarioEncontrado = user.findByEmail(loginDTO.getEmail());

        if (usuarioEncontrado.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Usuário não encontrado");
        }

        if (!usuarioEncontrado.get().getSenha().equals(loginDTO.getSenha())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Senha incorreta");
        }

        return ResponseEntity.ok("Login realizado com sucesso!");
    }

}
