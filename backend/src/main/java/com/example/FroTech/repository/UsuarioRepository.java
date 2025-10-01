package com.example.FroTech.repository;

import com.example.FroTech.model.Usuario;
import com.example.FroTech.model.Veiculo;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Optional<Usuario> findByEmail(String email);

    List<Usuario> findAllByAtivoTrue();
    List<Usuario> findAllByAtivoFalse();

}
