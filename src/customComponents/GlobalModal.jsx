import { useState } from 'react';

export let showModal = () => {};

export let closeOpenModals = () => {};

export const GlobalModalComponent = () => {
  const [view, setView] = useState(null);

  showModal = (view) => {
    setView(view);

    return () => {
      setView(null);
    };
  };

  closeOpenModals = () => {
    setView(null);
  };

  return <>{view}</>;
};
