import GameSavingLoader from './GameSavingLoader';

GameSavingLoader.load()
  .then((saving) => console.log('Game loaded:', saving))
  .catch((error) => console.error('Error loading game:', error));
