package com.mvct.demo.listener;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.mvct.demo.config.RabbitMQConfig;
import com.mvct.demo.dto.TestPingMessage;
import com.mvct.demo.service.ConnectivityLogService;

@Service
public class TestPingListener {

    private static final Logger logger = LoggerFactory.getLogger(TestPingListener.class);

    @Autowired
    private ConnectivityLogService service;

    @RabbitListener(queues = RabbitMQConfig.TEST_QUEUE)
    public void onMessage(TestPingMessage msg) {
        try {
            logger.info("📩 Mensaje recibido de RabbitMQ: {}", msg);
            service.save(msg);
            logger.info("✅ Mensaje guardado en PostgreSQL: eventId={}", msg.getEventId());
        } catch (Exception e) {
            logger.error("❌ Error procesando mensaje: {}", msg, e);
            throw e; // Reintenta según configuración de RabbitMQ
        }
    }
}