package com.noblockingcase.demo.controller;

import java.time.Duration;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.noblockingcase.demo.repository.ExtratoRepository;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import com.noblockingcase.demo.model.Extrato;

@RestController
@RequestMapping("/extrato")
public class ExtratoController {

	@Autowired
	ExtratoRepository extratoRepository;

	@GetMapping("/{id}")
	public Mono<Extrato> getExtrato(@PathVariable String id) {
		return extratoRepository.findById(id);
	}

	@GetMapping()
	public Flux<Extrato> getExtratos() {
		return extratoRepository.findAll().delayElements(Duration.ofMillis(5000));
	}

//	@GetMapping("/paged")
//	public Mono<Extrato> getExtratoPaged(final @RequestParam(name = "page") int page,
//			final @RequestParam(name = "size") int size) {
//		return extratoRepository.retrieveAllExtratosPaged(PageRequest.of(page, size));
//	}

	@GetMapping("/paged")
	public Flux<Extrato> getExtratoPaged(final @RequestParam(name = "page") int page,
			final @RequestParam(name = "size") int size) {
		return extratoRepository.retrieveAllExtratosPaged(PageRequest.of(page, size));
	}
}