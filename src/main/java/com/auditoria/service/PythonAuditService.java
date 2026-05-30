package com.auditoria.service;

import com.auditoria.dto.CodeAnalysisRequest;
import com.auditoria.dto.CodeAnalysisResponse;
import com.fasterxml.jackson.databind.DeserializationFeature;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.PropertyNamingStrategies;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.codec.json.Jackson2JsonDecoder;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
public class PythonAuditService {

    private final WebClient webClient;

    public PythonAuditService(@Value("${python.service.url}") String pythonUrl) {

        ObjectMapper mapper = new ObjectMapper()
                .configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false)
                .setPropertyNamingStrategy(PropertyNamingStrategies.SNAKE_CASE);

        this.webClient = WebClient.builder()
                .baseUrl(pythonUrl)
                .codecs(configurer -> configurer
                        .defaultCodecs()
                        .jackson2JsonDecoder(new Jackson2JsonDecoder(mapper)))
                .build();
    }

    public Mono<CodeAnalysisResponse> analyzeCode(String code, String language) {
        CodeAnalysisRequest request = new CodeAnalysisRequest(code, language);

        return webClient.post()
                .uri("/analyze")
                .bodyValue(request)
                .retrieve()
                .onStatus(HttpStatusCode::isError, response -> response.bodyToMono(String.class).flatMap(
                        errorBody -> Mono.error(new RuntimeException("Error del servicio Python: " + errorBody))))
                .bodyToMono(CodeAnalysisResponse.class);
    }
}