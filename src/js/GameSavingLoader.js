import read from './reader';
import json from './parser';
import GameSaving from './GameSaving';

export default class GameSavingLoader {
  static load() {
    return read()
      .then((data) => json(data))
      .then((text) => {
        const parsed = JSON.parse(text);
        return new GameSaving(parsed);
      });
  }
}
