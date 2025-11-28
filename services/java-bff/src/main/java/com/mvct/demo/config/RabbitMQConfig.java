package com.mvct.demo.config;

import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    public static final String TEST_QUEUE = "test_ping_queue";

    @Bean
    public Queue testQueue() {
        return new Queue(TEST_QUEUE, true);
    }
}
