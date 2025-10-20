package com.example.FroTech.service;

import com.example.FroTech.dto.AtualizarUsuarioDTO;
import com.example.FroTech.dto.RegistrarDTO;
import com.example.FroTech.dto.UsuarioDTO;
import com.example.FroTech.model.Usuario;
import com.example.FroTech.model.Veiculo;
import com.example.FroTech.repository.UsuarioRepository;
import com.example.FroTech.repository.VeiculoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private VeiculoRepository veiculoRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public UsuarioDTO registrarNovoUsuario(RegistrarDTO data){
        if (usuarioRepository.findByEmail(data.login()).isPresent()){
            throw new IllegalArgumentException("Ja existe um usuario cadastrado com este email");
        }

        String senhaCriptografada = passwordEncoder.encode(data.senha());

        Usuario novoUsuario = new Usuario();
        novoUsuario.setNome(data.nome());
        novoUsuario.setEmail(data.login());
        novoUsuario.setSenha(senhaCriptografada);
        novoUsuario.setRole(data.role());

        Usuario usuarioSalvo = usuarioRepository.save(novoUsuario);
        return new UsuarioDTO(usuarioSalvo);
    }

    public void definirNovaSenha(Usuario usuario, String novaSenha){
        String senhaCriptografada = passwordEncoder.encode(novaSenha);

        usuario.setSenha(senhaCriptografada);
        usuario.setAlterarSenha(false);

        usuarioRepository.save(usuario);
    }

    public List<UsuarioDTO> listarUsuariosAtivos() {
        List<Usuario> usuarios = (List<Usuario>) usuarioRepository.findAllByAtivoTrue();

        return usuarios.stream()
                .map(UsuarioDTO::new)
                .toList();
    }

    public UsuarioDTO editarUsuario(Long id, AtualizarUsuarioDTO dto){
        Usuario usuarioEditado = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario não encontrado"));

        usuarioEditado.setNome(dto.nome());
        usuarioEditado.setEmail(dto.email());
        usuarioEditado.setRole(dto.role());

        Usuario usuarioSalvo = usuarioRepository.save(usuarioEditado);
        return new UsuarioDTO(usuarioSalvo);
    }

    public void inativarUsuario(Long id){
        Optional<Usuario> inativarUsuario = usuarioRepository.findById(id);

        if (inativarUsuario.isPresent()){
            Usuario usuario = inativarUsuario.get();
            usuario.setAtivo(false);
            usuarioRepository.save(usuario);
        } else {
            throw new IllegalArgumentException("Usuario não encontrado");
        }
    }

    public void recuperarUsuario(Long id){
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Usuario não encontrado"));
        if (usuario.isAtivo()){
            throw new IllegalArgumentException("O usuario ja esta ativo");
        }

        usuario.setAtivo(true);
        usuarioRepository.save(usuario);
    }

    public List<UsuarioDTO> listarUsuariosInativos(){
        return usuarioRepository.findAllByAtivoFalse()
                .stream()
                .map(UsuarioDTO::new)
                .toList();
    }

    public String resetarSenha(Long id){
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Usuario não encontrado"));
        String senhaTemporaria = "FroTech@2025";
        String senhaCripto = passwordEncoder.encode(senhaTemporaria);

        usuario.setSenha(senhaCripto);
        usuario.setAlterarSenha(true);

        usuarioRepository.save(usuario);
        return senhaTemporaria;
    }

    public Optional<Veiculo> buscarVeiculoEmUso(String email){
        Optional<Usuario> usuario = usuarioRepository.findByEmail(email);

        if(usuario.isEmpty()){
            return Optional.empty();
        }

        Usuario usuarioEncontrado = usuario.get();

        return veiculoRepository.findByUsuario(usuarioEncontrado);
    }
}
