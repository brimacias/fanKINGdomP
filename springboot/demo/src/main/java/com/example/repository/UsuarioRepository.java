package com.example.repository;

import com.example.demo.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Usuario findByCorreoElectronico(String CorreoElectronico);
}
