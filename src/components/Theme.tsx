import { CssBaseline, CssVarsProvider } from '@mui/joy';
import HeroiconsStyles from './HeroiconsStyles';

export default function Theme({ children }: React.PropsWithChildren) {
  return (
    <CssVarsProvider>
      <CssBaseline />
      <HeroiconsStyles />
      {children}
    </CssVarsProvider>
  );
}
