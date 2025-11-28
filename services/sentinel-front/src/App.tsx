import { RouterProvider } from 'react-router-dom';
import { router } from './utils/router';
import { ThemeProvider } from './utils/store/themeContext';
import { useThemeStyles } from './utils/hooks/useThemeStyles';
import { Navbar } from './components/commons/Navbar';
import { useTheme } from './utils/store/themeContext';
import './App.css';

function AppContent() {
  
  const { theme } = useTheme();
  const { getCSSVariables } = useThemeStyles();

  return (    
  <div style={{ 
      backgroundColor: theme.colors.background, 
      color: theme.colors.text.primary,
      minHeight: '100vh',
      overflow: 'hidden'
    }}>
    <Navbar />
    <div style={getCSSVariables()}>
      
      <RouterProvider router={router} />
    </div></div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;