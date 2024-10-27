package main.java.com.example.repository;  

import org.springframework.data.jpa.repository.JpaRepository;
import main.java.com.example.demo.usuario;  

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {

    Usuario findByNombreUsuario(String nombreUsuario);
}
