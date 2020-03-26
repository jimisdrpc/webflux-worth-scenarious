package com.noblockingcase.demo.repository;

import org.springframework.data.mongodb.repository.Query;
import org.springframework.data.repository.reactive.ReactiveCrudRepository;

import com.noblockingcase.demo.model.Extrato;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import org.springframework.data.domain.Pageable;

public interface ExtratoRepository extends ReactiveCrudRepository<Extrato, String> {
	@Query("{ id: { $exists: true }}")
	Flux<Extrato> retrieveAllExtratosPaged(final Pageable page);

//	@Query("{ id: { $exists: true }}")
//	Mono<Extrato> retrieveAllExtratosPaged(final Pageable page);
}
