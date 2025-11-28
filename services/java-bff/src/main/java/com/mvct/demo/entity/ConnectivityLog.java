package com.mvct.demo.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import java.util.UUID;
import io.hypersistence.utils.hibernate.type.json.JsonType;
import org.hibernate.annotations.Type;
@Entity
@Table(name = "connectivity_log")
public class ConnectivityLog {

    @Id
    @GeneratedValue
    private UUID id;

    @Type(JsonType.class)
    @Column(columnDefinition = "jsonb")
    private Object message;   

    private LocalDateTime receivedAt = LocalDateTime.now();

    public UUID getId() {
        return id;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public Object getMessage() {
        return message;
    }

    public void setMessage(Object message) {  // <-- OK
        this.message = message;
    }

    public LocalDateTime getReceivedAt() {
        return receivedAt;
    }

    public void setReceivedAt(LocalDateTime receivedAt) {
        this.receivedAt = receivedAt;
    }
}
