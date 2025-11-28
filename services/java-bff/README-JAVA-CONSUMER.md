# Sentinel – Java Consumer (RabbitMQ → PostgreSQL)

Este servicio Java Spring Boot actúa como **consumidor de mensajes de RabbitMQ** y persiste los mensajes
en la tabla `connectivity_log` de PostgreSQL.

## Función principal

- Escuchar la cola `test_ping_queue` (configurada en `RabbitMQConfig`).
- Recibir mensajes `TestPingMessage`.
- Guardar el mensaje como JSON en la tabla `connectivity_log`.

No expone endpoints REST de negocio (solo los estándar de Spring Boot si se habilita Actuator).
Escucha en el puerto interno **8080**.

## Variables de entorno recomendadas

### PostgreSQL

- `POSTGRES_HOST` (por defecto: `postgres_db`)
- `POSTGRES_PORT` (por defecto: `5432`)
- `POSTGRES_DB`   (por defecto: `core_db`)
- `POSTGRES_USER`
- `POSTGRES_PASSWORD`

Estas variables se usan en `application-docker.yml` para construir:

```yaml
spring:
  datasource:
    url: jdbc:postgresql://${POSTGRES_HOST:postgres_db}:${POSTGRES_PORT:5432}/${POSTGRES_DB:core_db}
    username: ${POSTGRES_USER:core_user}
    password: ${POSTGRES_PASSWORD:core_password}
```

### RabbitMQ

Spring Boot permite configurar RabbitMQ vía variables de entorno:

- `SPRING_RABBITMQ_HOST` (ej: `rabbitmq`)
- `SPRING_RABBITMQ_PORT` (por defecto: `5672`)
- `SPRING_RABBITMQ_USERNAME`
- `SPRING_RABBITMQ_PASSWORD`

## Dependencias internas

Este servicio necesita:

- Acceso a RabbitMQ para consumir la cola `test_ping_queue`.
- Acceso a PostgreSQL para persistir en `connectivity_log`.

No se comunica directamente con el microservicio C#; C# solo publica mensajes en RabbitMQ.

## Cómo construir la imagen Docker

1. Empaquetar el JAR:

   ```bash
   mvn clean package
   ```

2. Construir la imagen:

   ```bash
   docker build -t sentinel-java-consumer .
   ```

3. Ejecutar el contenedor (ejemplo):

   ```bash
   docker run --rm \
     -e POSTGRES_HOST=postgres_db \
     -e POSTGRES_PORT=5432 \
     -e POSTGRES_DB=core_db \
     -e POSTGRES_USER=core_user \
     -e POSTGRES_PASSWORD=core_password \
     -e SPRING_RABBITMQ_HOST=rabbitmq \
     -e SPRING_RABBITMQ_USERNAME=guest \
     -e SPRING_RABBITMQ_PASSWORD=guest \
     --network=sentinel-net \
     sentinel-java-consumer
   ```

Ajusta los valores según tu `docker-compose.yml`.
