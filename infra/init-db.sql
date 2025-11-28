-- ✅ Tabla mejorada con índices
CREATE TABLE IF NOT EXISTS connectivity_log (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_id VARCHAR(100) UNIQUE NOT NULL,
    message JSONB NOT NULL,
    received_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ✅ Índices para consultas rápidas
CREATE INDEX IF NOT EXISTS idx_connectivity_log_event_id ON connectivity_log(event_id);
CREATE INDEX IF NOT EXISTS idx_connectivity_log_received_at ON connectivity_log(received_at DESC);

-- ✅ Log de creación
DO $$
BEGIN
    RAISE NOTICE '✅ Tabla connectivity_log creada correctamente';
END $$;