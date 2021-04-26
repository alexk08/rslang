import React, { useState } from 'react';

const Sound: React.FC = () => {
  const [mute, setMute] = useState<boolean>(false);

  return (
    <i className="material-icons minigames__sound"
      onClick={() => setMute(!mute)}>{mute ? 'notifications_off' : 'notifications'}</i>
  )
}

export { Sound };