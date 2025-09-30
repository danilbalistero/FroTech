package com.example.FroTech.service;

import com.example.FroTech.dto.RegistrarDTO;
import com.example.FroTech.model.Usuario;
import com.example.FroTech.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Usuario registrarNovoUsuario(RegistrarDTO data){
        if (usuarioRepository.findByEmail(data.login()).isPresent()){
            throw new IllegalArgumentException("Ja existe um usuario cadastrado com este email");
        }

        String senhaCriptografada = passwordEncoder.encode(data.senha());

        Usuario novoUsuario = new Usuario();
        novoUsuario.setNome(data.nome());
        novoUsuario.setEmail(data.login());
        novoUsuario.setSenha(senhaCriptografada);
        novoUsuario.setRole(data.role());

        return usuarioRepository.save(novoUsuario);
    }

    public void definirNovaSenha(Usuario usuario, String novaSenha){
        String senhaCriptografada = passwordEncoder.encode(novaSenha);

        usuario.setSenha(senhaCriptografada);
        usuario.setAlterarSenha(false);

        usuarioRepository.save(usuario);
    }
}
