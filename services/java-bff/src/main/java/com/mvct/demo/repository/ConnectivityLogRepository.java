package com.mvct.demo.repository;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.mvct.demo.entity.ConnectivityLog;

public interface ConnectivityLogRepository extends JpaRepository<ConnectivityLog, UUID> {}



