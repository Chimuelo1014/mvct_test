package com.mvct.demo.dto;

// ✅ Alineado con MessagePublishedEvent de C#
public class TestPingMessage {
    private String eventId;    // era "eventId" ✅
    private String timestamp;  // era "timestamp" ✅
    private String tenantId;   // era "tenantId" ✅
    private String message;    // ✅ Nuevo campo

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