package br.edu.ufape.lmts.sementes.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import br.edu.ufape.lmts.sementes.model.TabelaPerguntaUsuario;

@Repository
public interface TabelaPerguntaUsuarioRepository  extends JpaRepository<TabelaPerguntaUsuario, Long> {

}
