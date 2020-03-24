package com.noblockingcase.demo.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document
public class Extrato {

	@Id
	private String id;
	private String descricao;
	private String valor;
	// private String status;

	public Extrato(String id, String descricao, String valor) {
		super();
		this.id = id;
		this.descricao = descricao;
		this.valor = valor;
		// this.status = status;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public String getValor() {
		return valor;
	}

	public void setValor(String valor) {
		this.valor = valor;
	}

}
