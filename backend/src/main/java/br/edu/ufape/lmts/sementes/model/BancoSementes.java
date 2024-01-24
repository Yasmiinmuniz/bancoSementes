package br.edu.ufape.lmts.sementes.model;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Inheritance;
import jakarta.persistence.InheritanceType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;



@Entity
@Inheritance(strategy = InheritanceType.JOINED)
@Getter @Setter @NoArgsConstructor @AllArgsConstructor 
@EqualsAndHashCode(onlyExplicitlyIncluded = true)
@ToString
public  class BancoSementes  {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@EqualsAndHashCode.Include
	private long id;
	@NotBlank
	private String nome;
	@NotBlank
	private String comunidade;
	private String anoFundacao;
	private String historiaBanco;
	private String variedadesTrabalhadas;
	
	@OneToMany(mappedBy = "bancoSementes")
	private List<Gerente> gerentes;
	
	private String contatoResponsavel1;
	private String contatoResponsavel2;
	@OneToOne(cascade = CascadeType.ALL,
		orphanRemoval = true		
	)
	@ToString.Exclude
	private Endereco endereco; 
	@OneToOne(cascade = CascadeType.ALL,
		orphanRemoval = true		
	)
	@ToString.Exclude
	private ObjetosBancoSementes objetosBancoSementes; 
	@OneToMany
	@JoinColumn(name = "bancoSementes_id")
	@ToString.Exclude
	private List<DoacaoUsuario> doacaoUsuario; 
	@OneToMany
	@JoinColumn(name = "bancoSementes_id")
	@ToString.Exclude
	private List<RetiradaUsuario> retiradaUsuario; 
	@OneToMany
	@JoinColumn(name = "bancoSementes_id")
	@ToString.Exclude
	private List<TransacaoGenerica> transacaoGenerica; 
}