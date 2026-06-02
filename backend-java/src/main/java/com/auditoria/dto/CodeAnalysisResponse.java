package com.auditoria.dto;

import java.util.List;

public class CodeAnalysisResponse {
    private String severity; // "Crítico", "Advertencia", "Sugerencia"
    private List<String> vulnerabilities;
    private String refactoredCode;
    private String explanation;
    private List<String> cleanCodeTips;

    // Constructor vacío
    public CodeAnalysisResponse() {
    }

    // Constructor con todos los campos (opcional, útil para pruebas)
    public CodeAnalysisResponse(String severity, List<String> vulnerabilities,
            String refactoredCode, String explanation,
            List<String> cleanCodeTips) {
        this.severity = severity;
        this.vulnerabilities = vulnerabilities;
        this.refactoredCode = refactoredCode;
        this.explanation = explanation;
        this.cleanCodeTips = cleanCodeTips;
    }

    // Getters y Setters
    public String getSeverity() {
        return severity;
    }

    public void setSeverity(String severity) {
        this.severity = severity;
    }

    public List<String> getVulnerabilities() {
        return vulnerabilities;
    }

    public void setVulnerabilities(List<String> vulnerabilities) {
        this.vulnerabilities = vulnerabilities;
    }

    public String getRefactoredCode() {
        return refactoredCode;
    }

    public void setRefactoredCode(String refactoredCode) {
        this.refactoredCode = refactoredCode;
    }

    public String getExplanation() {
        return explanation;
    }

    public void setExplanation(String explanation) {
        this.explanation = explanation;
    }

    public List<String> getCleanCodeTips() {
        return cleanCodeTips;
    }

    public void setCleanCodeTips(List<String> cleanCodeTips) {
        this.cleanCodeTips = cleanCodeTips;
    }
}