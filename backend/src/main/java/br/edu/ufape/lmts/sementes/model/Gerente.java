package br.edu.ufape.lmts.sementes.model;

import java.util.Date;
import java.util.List;

import org.apache.commons.lang3.builder.ToStringExclude;

import br.edu.ufape.lmts.sementes.enums.TipoUsuario;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.EqualsAndHashCode;
import lombok.ToString;

@Entity
@ToString(callSuper = true)
public class Gerente extends Usuario {

	@ManyToOne
	@ToString.Exclude
	@JoinColumn(name = "banco_sementes_id")
	private BancoSementes bancoSementes;

	public Gerente(Long id, String nome, String nomePopular, String email, String senha, Endereco endereco, String cpf,
			Date dataNascimento, String contato, String imagem, String sexo, String estadoCivil, Conjuge conjuge,
			List<Post> posts) {
		super(id, nome, nomePopular, email, senha, endereco, cpf, dataNascimento, contato, imagem, sexo, estadoCivil,
				conjuge, posts);
		super.addRole(TipoUsuario.GERENTE);
	}

	public Gerente() {
		super.addRole(TipoUsuario.GERENTE);
	}

	public BancoSementes getBancoSementes() {
		return bancoSementes;
	}

	public void setBancoSementes(BancoSementes bancoSementes) {
		this.bancoSementes = bancoSementes;
	}
}
