import spotipy
import settings,daily_playlists
from spotipy.oauth2 import SpotifyClientCredentials
import json


clientCredentialsManager = SpotifyClientCredentials(settings.SPOTIFY_CLIENT_ID,settings.SPOTIFY_CLIENT_SECRET)
sp = spotipy.Spotify(client_credentials_manager=clientCredentialsManager)

playlists = daily_playlists.dailyPlaylists
data = []
username = 'spotifycharts'

for item in playlists:
    print(item)
    count = 0
    uri = item['uri']
    playlist_id = uri.split(':')[4]
    result = sp.user_playlist(user=username,playlist_id=playlist_id,fields=uri)
    string = result['tracks']['items'][0:5]
    data.append({
        'country_code':item['country_code'],
        'data':string})


with open('playlists_data.json','w') as outfile:
    json.dump(data,outfile)


#


