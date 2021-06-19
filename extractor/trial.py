import spotipy, pymongo, pprint
import settings
from spotipy.oauth2 import SpotifyClientCredentials
import json

authManager = SpotifyClientCredentials(settings.SPOTIFY_CLIENT_ID,settings.SPOTIFY_CLIENT_SECRET)
sp = spotipy.Spotify(auth_manager=authManager)

username = 'spotifycharts'
playlists = sp.user_playlists(username)
while playlists:
  for i, playlist in enumerate(playlists['items']):
      print("%4d %s %s" % (i + 1 + playlists['offset'], playlist['uri'],  playlist['name']))
  if playlists['next']:
      playlists = sp.next(playlists)
  else:
      playlists = None
