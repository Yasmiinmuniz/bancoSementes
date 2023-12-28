package br.edu.ufape.lmts.sementes.service;

import java.util.List;

import br.edu.ufape.lmts.sementes.exceptions.EmailExistsException;
import br.edu.ufape.lmts.sementes.model.Agricultor;

public interface AgricultorServiceInterface {
	Agricultor saveAgricultor(Agricultor o) throws EmailExistsException;
	Agricultor findAgricultorById(long id);
	Agricultor updateAgricultor(Agricultor u);
	void deleteAgricultor(Agricultor u);
	void deleteAgricultor(long id);
	List<Agricultor> getAllAgricultor();
    
}