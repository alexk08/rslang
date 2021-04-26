import React from 'react';

interface OverlayProps {
  isMenuOpen: boolean
  onOverlayClick: () => void
}

const Overlay: React.FC<OverlayProps> = ({ isMenuOpen, onOverlayClick }) => {
  const clazz =  isMenuOpen ? 'overlay--show' : '';

  return <div className={`overlay ${clazz}`}
              onClick={onOverlayClick}></div>
}

export { Overlay };