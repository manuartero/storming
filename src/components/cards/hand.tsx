import Card from './card';

import './hand.scss';

interface Props {
  foo?: string;
}

function Hand({ foo }: Props): JSX.Element {
  return <div className='player-hand'>
    <Card action='build' />
    <Card action='diplo' />
    <Card action='move' />
    <Card action='move' />
    <Card action='recruit' />
  </div>;
}

export default Hand;
