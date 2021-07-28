// test for Utility functions
import * as utils from '../utils/Utility';

jest.mock('../utils/Utility');

describe(' Testing Utility functions : ', () => {
  test('should fetch playlist data for Map rendering : ', () => {
    utils.fetchData().then((result) => {
      expect(result).toHaveLength(2);
      expect(result[0].topPlaylists).toHaveLength(2);
      expect(result[1].viralPlaylists).toHaveLength(2);
    });
  });

  test('should fetch User Data :', () =>
    utils.fetchUserData().then((result) => {
      expect(result.display_name).toBe('Ron');
      expect(result.country).toBe('US');
      expect(result.followers.total).toBe(7);
      expect(result.images).toHaveLength(1);
    }));

  test('should fetch Top Tracks : ', () =>
    utils.fetchTopTracks().then((result) => {
      expect(result.limit).toBe(12);
      expect(result.total).toBe(50);
      expect(result.items).toHaveLength(3);
      expect(result.items[0]).toEqual(result.items[1]);
    }));

  test('should fetch User Playlists : ', () =>
    utils.fetchUserPlaylists().then((result) => {
      expect(result.limit).toBe(12);
      expect(result.total).toBe(50);
      expect(result.items).toHaveLength(2);
      expect(result.items[0]).toEqual(result.items[1]);
    }));

  test('should fetch Top Artists : ', () =>
    utils.fetchTopArtists().then((result) => {
      expect(result.limit).toBe(12);
      expect(result.total).toBe(50);
      expect(result.items).toHaveLength(2);
      expect(result.items[0]).toEqual(result.items[1]);
    }));
});
