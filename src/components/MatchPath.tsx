import { useMatch } from 'react-router';

interface Props {
  path: string;
  children(active: boolean): React.ReactNode;
}
export default function MatchPath({ path, children }: Props) {
  const match = useMatch(path);
  return children(!!match);
}
