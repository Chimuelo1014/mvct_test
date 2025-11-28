package com.mvct.demo.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.mvct.demo.dto.TestPingMessage;
import com.mvct.demo.entity.ConnectivityLog;
import com.mvct.demo.repository.ConnectivityLogRepository;

@Service
public class ConnectivityLogService {

    @Autowired
    private ConnectivityLogRepository repository;   // <-- FALTABA ESTO

    @Autowired
    private ObjectMapper objectMapper;

    public void save(TestPingMessage msg) {
        ConnectivityLog log = new ConnectivityLog();
        log.setMessage(msg);  // <-- YA FUNCIONA, se guarda como JSONB
        repository.save(log);
    }
}
