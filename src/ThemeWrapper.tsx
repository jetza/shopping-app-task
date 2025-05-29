import { useEffect } from 'react';
import App from '@/App';
import { useSelector } from 'react-redux';
import type { RootState } from '@/store/store';

function ThemeWrapper() {
  const theme = useSelector((state: RootState) => state.theme.current);

  useEffect(() => {
    document.body.classList.remove('light', 'dark');
    document.body.classList.add(theme);
  }, [theme]);

  return <App />;
}

export default ThemeWrapper;
