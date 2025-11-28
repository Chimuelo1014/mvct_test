import { useState, useEffect } from 'react';
import { useTheme } from '../../utils/store/themeContext';
import { useTranslation } from 'react-i18next';

export default function HomePage() {
  // ✅ Fallback por si no está definida
  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost/api/v1';
  
  const { theme } = useTheme();
  const { i18n, t } = useTranslation();

  //////////////////
  // HOOKS / Tests the Api MVCT
  const [message, setMessage] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Test function
  const sendMessage = async () => {
    if (!message.trim()) return;

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/publish`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
        credentials: "include"  
      });

      const data = await res.json();
      setResponseMessage(data.message || JSON.stringify(data));
    } catch (err) {
      console.error(err);
      setResponseMessage("❌ Error al publicar");
    }

    setLoading(false);
  };

  const [healthStatus, setHealthStatus] = useState("");

  useEffect(() => {
    fetch(`${API_URL}/health`)
      .then(res => res.json())
      .then(data => setHealthStatus(data.status))
      .catch(() => setHealthStatus("Error"));
  }, [API_URL]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetch(`${API_URL}/last`)
        .then(res => res.json())
        .then(data => {
          if (data.message) {
            setResponseMessage(data.message);
          }
        })
        .catch(() => console.log("Error obteniendo mensaje"));
    }, 1000);

    return () => clearInterval(interval);
  }, [API_URL]);

  return (
    <>
      {/* Hero Section */}
      <section style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '60px',
        padding: '80px 40px',
        alignItems: 'center',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <div>
          <h1 style={{
            fontSize: '72px',
            fontWeight: 'bold',
            lineHeight: '1.2',
            marginBottom: '20px',
            backgroundImage: `linear-gradient(135deg, ${theme.colors.text.primary} 0%, ${theme.colors.primaryLight} 100%)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            backgroundColor: 'transparent'
          }}>
            {t('hero.title')}
          </h1>
          
          <p style={{
            fontSize: '16px',
            color: theme.colors.text.secondary,
            lineHeight: '1.6',
            marginBottom: '40px',
            maxWidth: '500px'
          }}>
            {t('hero.description')}
          </p>

          <button style={{
            backgroundColor: theme.colors.primary,
            color: '#fff',
            border: 'none',
            padding: '16px 40px',
            borderRadius: '50px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            letterSpacing: '1px',
            transition: 'all 0.3s ease',
            boxShadow: `0 0 20px ${theme.colors.primary}40`
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = theme.colors.primaryDark;
            e.currentTarget.style.transform = 'scale(1.05)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = theme.colors.primary;
            e.currentTarget.style.transform = 'scale(1)';
          }}>
            {t('hero.cta')}
          </button>
        </div>

        {/* Animated Circle with gradient */}
        <div style={{
          position: 'relative',
          height: '500px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            position: 'absolute',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            backgroundColor: 'transparent',
            backgroundImage: `radial-gradient(circle at 30% 30%, ${theme.colors.primary}80, ${theme.colors.primaryDark}40)`,
            filter: 'blur(40px)',
            animation: 'pulse 4s infinite'
          }} />
          
          <div style={{
            position: 'relative',
            fontSize: '200px',
            animation: 'float 3s ease-in-out infinite'
          }}>
            🐻
          </div>
        </div>
      </section>

      {/* Tagline Section */}
      <section
        style={{
          textAlign: "center",
          padding: "60px 40px",
          backgroundColor: "transparent",
          backgroundImage: `linear-gradient(180deg, transparent 0%, ${theme.colors.surface}40 100%)`,
          fontFamily: "inherit",
        }}
      >
        <h2
          style={{
            fontSize: "56px",
            fontWeight: "bold",
            lineHeight: "1.3",
            marginBottom: "20px",
          }}
        >
          {t("tagline.part1")}
          <br />
          <span style={{ color: theme.colors.primary }}>
            {t("tagline.highlight1")}
          </span>
          <br />
          {t("tagline.part2")}{" "}
          <span style={{ color: theme.colors.primary }}>
            {t("tagline.highlight2")}
          </span>
        </h2>

        {/* INPUT + BUTTON */}
        <div style={{ marginTop: "40px" }}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Escribe un mensaje..."
            style={{
              padding: "14px 18px",
              fontSize: "20px",
              fontWeight: "500",
              width: "380px",
              marginRight: "12px",
              borderRadius: "12px",
              border: `2px solid ${theme.colors.border}`,
              backgroundColor: theme.colors.surface,
              color: theme.colors.text.primary,
              fontFamily: "inherit",
            }}
          />

          <button
            onClick={sendMessage}
            style={{
              backgroundColor: theme.colors.primary,
              color: "#fff",
              padding: "14px 28px",
              borderRadius: "12px",
              border: "none",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "20px",
              fontFamily: "inherit",
              transition: "0.2s",
            }}
          >
            {loading ? "Enviando..." : "Enviar mensaje"}
          </button>
        </div>

        {/* RESPUESTA DEL POST */}
        {responseMessage && (
          <p
            style={{
              marginTop: "20px",
              fontSize: "20px",
              color: theme.colors.text.primary,
            }}
          >
            <span style={{ color: theme.colors.primary }}>POST: </span>{responseMessage}
          </p>
        )}

        {/* GET HEALTH */}
        {healthStatus && (
          <p
            style={{
              marginTop: "20px",
              fontSize: "20px",
              fontWeight: "600",
              color: theme.colors.text.primary,
            }}
          >
            <span style={{ color: theme.colors.primary }}>GET: </span> health: {healthStatus}
          </p>
        )}
      </section>

      {/* Services Section */}
      <section style={{
        padding: '80px 40px',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <h3 style={{
          fontSize: '48px',
          fontWeight: 'bold',
          textAlign: 'center',
          marginBottom: '20px'
        }}>
          {t('services.title.part1')} <span style={{ color: theme.colors.primary }}>{t('services.title.highlight')}</span>
          <br />
          <span style={{ color: theme.colors.primary }}>{t('services.title.part2')}</span> {t('services.title.part3')}
        </h3>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '20px',
          marginTop: '60px'
        }}>
          {[
            { key: 'content', highlight: false },
            { key: 'social', highlight: true },
            { key: 'analytics', highlight: false },
            { key: 'advertising', highlight: false }
          ].map((service, idx) => (
            <div
              key={idx}
              style={{
                padding: '30px',
                borderRadius: '16px',
                backgroundColor: service.highlight ? theme.colors.primary : theme.colors.surface,
                color: service.highlight ? '#fff' : theme.colors.text.primary,
                textAlign: 'center',
                transition: 'all 0.3s ease',
                cursor: 'pointer',
                border: `1px solid ${service.highlight ? theme.colors.primary : theme.colors.border}`,
                minHeight: '200px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center'
              }}
              onMouseEnter={(e) => {
                if (!service.highlight) {
                  e.currentTarget.style.backgroundColor = theme.colors.surfaceLight;
                  e.currentTarget.style.borderColor = theme.colors.primary;
                }
              }}
              onMouseLeave={(e) => {
                if (!service.highlight) {
                  e.currentTarget.style.backgroundColor = theme.colors.surface;
                  e.currentTarget.style.borderColor = theme.colors.border;
                }
              }}
            >
              <div style={{
                fontSize: '14px',
                fontWeight: 'bold',
                letterSpacing: '1px',
                lineHeight: '1.6',
                whiteSpace: 'pre-line'
              }}>
                {t(`services.items.${service.key}`)}
              </div>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </>
  );
}