package com.noblockingcase.demo.client;

import org.springframework.web.reactive.function.client.WebClient;

import com.noblockingcase.demo.model.Extrato;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;


public class WebFluxClient {

    WebClient client;

    public WebClient openConnection(String url) {
        client = WebClient.create(url);
        return client;
    }


    public void getExtratoById(String id){
		Mono<Extrato> result = client.get()
                .uri("/extrato/{id}", "1")
                .retrieve()
                .bodyToMono(Extrato.class);

        result.subscribe(System.out::println);
    }

    /**
     * Request a collection
     */
    public void getAllExtratos(){
        Flux<Extrato> result = client.get()
                .uri("/extrato")
                .retrieve()
                .bodyToFlux(Extrato.class);

        result.subscribe(System.out::println);
    }
}
