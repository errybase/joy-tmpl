import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import { IconButton, type IconButtonProps, useColorScheme } from '@mui/joy';

export default function ColorSchemeToggle(props: IconButtonProps) {
  const { mode, setMode } = useColorScheme();
  const Icon = mode === 'dark' ? SunIcon : MoonIcon;

  return (
    <IconButton
      data-screenshot="toggle-mode"
      size="sm"
      variant="outlined"
      color="neutral"
      {...props}
      onClick={(event) => {
        if (mode === 'light') {
          setMode('dark');
        } else {
          setMode('light');
        }
        props.onClick?.(event);
      }}
    >
      <Icon />
    </IconButton>
  );
}
