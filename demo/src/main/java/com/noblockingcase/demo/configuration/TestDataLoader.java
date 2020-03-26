package com.noblockingcase.demo.configuration;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.function.LongSupplier;
import java.util.stream.BaseStream;

import org.springframework.boot.CommandLineRunner;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Component;

import com.noblockingcase.demo.model.Extrato;
import com.noblockingcase.demo.repository.ExtratoRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import reactor.core.publisher.Flux;

@Component
public class TestDataLoader implements CommandLineRunner {

	private static final Logger log = LoggerFactory.getLogger(TestDataLoader.class);
	private ExtratoRepository extratoRepository;

	TestDataLoader(final ExtratoRepository extratoRepository) {
		this.extratoRepository = extratoRepository;
	}

	@Override
	public void run(final String... args) throws Exception {
		if (extratoRepository.count().block() == 0L) {
			final LongSupplier longSupplier = new LongSupplier() {
				Long l = 0L;

				@Override
				public long getAsLong() {
					return l++;
				}
			};

			extratoRepository.deleteAll();

			extratoRepository
					.save(new Extrato(String.valueOf(longSupplier.getAsLong()), "Qualquer descrição 1", "texto 1", 1))
					.block();

			extratoRepository
					.save(new Extrato(String.valueOf(longSupplier.getAsLong()), "Qualquer descrição 2", "texto 2", 2))
					.block();

			extratoRepository
					.save(new Extrato(String.valueOf(longSupplier.getAsLong()), "Qualquer descrição 3", "texto 3", 3))
					.block();

		}
	}

}
