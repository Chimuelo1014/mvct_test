package com.mvct.demo.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class TestPingMessage {
    
    @JsonProperty("eventId")
    private String eventId;
    
    @JsonProperty("timestamp")
    private String timestamp;
    
    @JsonProperty("tenantId")
    private String tenantId;
    
    @JsonProperty("message")
    private String message;

    // Constructor vacío (necesario para Jackson)
    public TestPingMessage() {
    }

    // Getters y Setters
    public String getEventId() {
        return eventId;
    }

    public void setEventId(String eventId) {
        this.eventId = eventId;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public String getTenantId() {
        return tenantId;
    }

    public void setTenantId(String tenantId) {
        this.tenantId = tenantId;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    @Override
    public String toString() {
        return "TestPingMessage{" +
                "eventId='" + eventId + '\'' +
                ", timestamp='" + timestamp + '\'' +
                ", tenantId='" + tenantId + '\'' +
                ", message='" + message + '\'' +
                '}';
    }
}