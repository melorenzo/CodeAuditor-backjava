package com.auditoria.controller;

import com.auditoria.dto.CodeAnalysisRequest;
import com.auditoria.dto.CodeAnalysisResponse;
import com.auditoria.entity.AuditRecord;
import com.auditoria.repository.AuditRepository;
import com.auditoria.service.PythonAuditService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/audit")
public class AuditController {

    @Autowired
    private PythonAuditService pythonAuditService;

    @Autowired
    private AuditRepository auditRepository;

    @PostMapping
    public ResponseEntity<CodeAnalysisResponse> analyze(
            @RequestBody CodeAnalysisRequest request,
            @AuthenticationPrincipal UserDetails user) {

        System.out.println(">>> [AuditController] Petición POST recibida de: " + user.getUsername());
        System.out.println(">>> Lenguaje: " + request.getLanguage());
        System.out.println(">>> Código: " +
                (request.getCode().length() > 50 ? request.getCode().substring(0, 50) + "..." : request.getCode()));

        // Guardar el registro en BD
        AuditRecord record = new AuditRecord();
        record.setUsername(user.getUsername());
        record.setCode(request.getCode());
        record.setLanguage(request.getLanguage());
        record.setCreatedAt(LocalDateTime.now());
        auditRepository.save(record);
        System.out.println(">>> Registro guardado con ID: " + record.getId());

        try {
            System.out.println(">>> Llamando a Python...");
            // .block() convierte el Mono reactivo en llamada síncrona bloqueante
            CodeAnalysisResponse response = pythonAuditService
                    .analyzeCode(request.getCode(), request.getLanguage())
                    .block();
            System.out.println(">>> Respuesta de Python recibida correctamente");
            System.out.println(">>> Devolviendo respuesta exitosa al cliente");
            return ResponseEntity.ok(response);

        } catch (Exception e) {
            System.err.println(">>> Falló la auditoría: " + e);
            CodeAnalysisResponse errorResponse = new CodeAnalysisResponse();
            errorResponse.setSeverity("Crítico");
            errorResponse.setExplanation("Error al comunicarse con el servicio de IA: " + e.getMessage());
            errorResponse.setVulnerabilities(List.of("Fallo de comunicación con Python"));
            errorResponse
                    .setCleanCodeTips(List.of("Verificar que el microservicio Python esté corriendo en puerto 8000"));
            errorResponse.setRefactoredCode(null);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping("/history")
    public ResponseEntity<List<AuditRecord>> getHistory(@AuthenticationPrincipal UserDetails user) {
        System.out.println(">>> Historial solicitado por: " + user.getUsername());
        List<AuditRecord> history = auditRepository.findByUsernameOrderByCreatedAtDesc(user.getUsername());
        return ResponseEntity.ok(history);
    }

    @GetMapping("/test")
    public String test() {
        return "AuditController OK";
    }
}