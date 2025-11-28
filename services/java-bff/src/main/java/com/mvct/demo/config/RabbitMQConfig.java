package com.mvct.demo.config;

import org.springframework.amqp.core.Queue;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    public static final String TEST_QUEUE = "test_ping_queue";

    @Bean
    public Queue testQueue() {
        return new Queue(TEST_QUEUE, true);
    }

    // ✅ CRÍTICO: Agregar este bean para deserializar JSON
    @Bean
    public MessageConverter jsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }
}