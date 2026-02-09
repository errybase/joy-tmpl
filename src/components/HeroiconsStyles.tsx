import { GlobalStyles } from '@mui/joy';

export default function HeroiconsStyles() {
  return (
    <GlobalStyles
      styles={{
        svg: {
          color: 'var(--Icon-color)',
          margin: 'var(--Icon-margin)',
          fontSize: 'var(--Icon-fontSize)',
          width: '1em',
          height: '1em',
        },
      }}
    />
  );
}
