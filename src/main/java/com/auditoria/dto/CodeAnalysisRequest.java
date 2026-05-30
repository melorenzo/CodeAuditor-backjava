package com.auditoria.dto;

public class CodeAnalysisRequest {
    private String code;
    private String language;

    // Constructor vacío (necesario para Jackson)
    public CodeAnalysisRequest() {
    }

    public CodeAnalysisRequest(String code, String language) {
        this.code = code;
        this.language = language;
    }

    // Getters y Setters
    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }
}