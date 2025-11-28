// src/ui/components/Navbar.tsx
import { useTheme } from '../../utils/store/themeContext';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import { Button } from './Button';

export const Navbar = () => {
  const { theme, toggleTheme, mode } = useTheme();
  const { i18n, t } = useTranslation();
  const [scrollY, setScrollY] = useState(0);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'es' ? 'en' : 'es');
  };

  return (
    <nav style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 40px',
        backdropFilter: 'blur(10px)',
        borderBottom: `1px solid ${theme.colors.border}`,
        position: 'sticky',
        top: 0,
        zIndex: 100
      }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold', letterSpacing: '2px' }}>
          SEN<span style={{ color: theme.colors.primary }}>TIN</span>EL
        </div>
        
        <div style={{ display: 'flex', gap: '30px', alignItems: 'center' }}>
          <a href="#" style={{ color: theme.colors.text.secondary, textDecoration: 'none', cursor: 'pointer' }}>{t('nav.home')}</a>
          <a href="#" style={{ color: theme.colors.text.secondary, textDecoration: 'none', cursor: 'pointer' }}>{t('nav.about')}</a>
          <a href="#" style={{ color: theme.colors.text.secondary, textDecoration: 'none', cursor: 'pointer' }}>{t('nav.services')}</a>
          <a href="#" style={{ color: theme.colors.text.secondary, textDecoration: 'none', cursor: 'pointer' }}>{t('nav.contact')}</a>
        </div>

        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          <button
            onClick={toggleTheme}
            style={{
              background: 'none',
              border: 'none',
              color: theme.colors.primary,
              fontSize: '20px',
              cursor: 'pointer'
            }}
          >
            {mode === 'dark' ? '☀️' : '🌙'}
          </button>
          <button
            onClick={toggleLanguage}
            style={{
              background: 'none',
              border: 'none',
              color: theme.colors.primary,
              fontSize: '16px',
              cursor: 'pointer'
            }}
          >
            {i18n.language === 'es' ? '🇪🇸' : '🇺🇸'}
          </button>
          <Button 
  text="Sing In /" 
  icon="Up"
  iconPosition="right"
  variant="primary"
  pill={true}
/>
        </div>
      </nav>
  );
};