# =================================================================
# CIFERAUDIT MVCT V0.5: VARIABLES DE SECRETO
#
# ADVERTENCIA: NUNCA SUBIR ESTE ARCHIVO A GIT. 
# =================================================================

# --- 1. POSTGRESQL Y BASE DE DATOS ---
DB_USER=cipher_admin_mvct
DB_PASSWORD=SuperSecretPassword123!
POSTGRES_DB=cipheraudit

# --- 2. RABBITMQ BROKER ---
# ✅ CORREGIDO: Debe coincidir con docker-compose.yml
RABBITMQ_DEFAULT_USER=rabbit_user
RABBITMQ_DEFAULT_PASS=RabbitPass123!

# --- 3. KONG API GATEWAY & AUTH0/OIDC ---
# La URL de tu dominio de Auth0 (ej. https://tudominio.us.auth0.com/)
AUTH0_ISSUER=https://[TU_DOMINIO_AUTH0].auth0.com/

# ID público de tu aplicación cliente en Auth0
AUTH0_CLIENT_ID=TU_CLIENT_ID_DE_AUTH0_AQUI

# CLAVE privada de tu aplicación cliente en Auth0 (SECRETO)
AUTH0_CLIENT_SECRET=TU_CLIENT_SECRET_DE_AUTH0_AQUI

# --- 4. CORS ORIGINS (separados por coma) ---
CORS_ORIGINS=http://localhost:5173,http://localhost:3000,http://localhost,http://localhost:80

# --- 5. API URL para Frontend ---
VITE_API_URL=http://localhost/api/v1
