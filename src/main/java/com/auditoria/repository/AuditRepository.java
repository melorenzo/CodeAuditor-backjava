package com.auditoria.repository;

import com.auditoria.entity.AuditRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AuditRepository extends JpaRepository<AuditRecord, Long> {
    List<AuditRecord> findByUsernameOrderByCreatedAtDesc(String username);
}