import GameSavingLoader from '../js/GameSavingLoader';
import GameSaving from '../js/GameSaving';
import read from '../js/reader';

jest.mock('../js/reader');

describe('GameSavingLoader', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should correctly load and parse game saving data (resolve)', async () => {
    const data = '{"id":9,"created":1546300800,"userInfo":{"id":1,"name":"Hitman","level":10,"points":2000}}';
    const buffer = new ArrayBuffer(data.length * 2);
    const bufferView = new Uint16Array(buffer);
    for (let i = 0; i < data.length; i++) bufferView[i] = data.charCodeAt(i);
    read.mockResolvedValue(buffer);

    const saving = await GameSavingLoader.load();
    expect(saving).toBeInstanceOf(GameSaving);
    expect(saving.id).toBe(9);
    expect(saving.userInfo.name).toBe('Hitman');
  });

  test('should handle error when read() rejects', async () => {
    read.mockRejectedValue(new Error('Read error'));
    await expect(GameSavingLoader.load()).rejects.toThrow('Read error');
  });

  test('reader should return ArrayBuffer (unmocked)', async () => {
    jest.unmock('../js/reader');
    const realRead = require('../js/reader').default;
    const buffer = await realRead();
    expect(buffer).toBeInstanceOf(ArrayBuffer);
    jest.mock('../js/reader'); 
  });
});
