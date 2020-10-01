import spotipy, pymongo, pprint 
import settings, daily_radar_playlists
from spotipy.oauth2 import SpotifyClientCredentials
import json, requests

clientCredentialsManager = SpotifyClientCredentials(settings.SPOTIFY_CLIENT_ID,settings.SPOTIFY_CLIENT_SECRET)
sp = spotipy.Spotify(client_credentials_manager=clientCredentialsManager)
db_client = pymongo.MongoClient(settings.MONGODB_HOST)
db = db_client["visualify"]
col = db["radarCollections"]

playlists = daily_radar_playlists.dailyPlaylists
username = 'spotifycharts'
for item in playlists:
    try:
        uri = item['uri']
        result = sp.user_playlist(user=username,playlist_id=uri)
        data ={
            'playlist_id' : result['id'],
            'country_code' : item['country_code'],
            'data':result['tracks']['items'][0:20] 
            }
        with open('data.json','w') as outfile:
            json.dump(data,outfile)
        query = col.find( { 'country_code': data['country_code']})
        if query.count():
            print('Updating top extry for this country : ', data['country_code'])
            res = col.replace_one({'country_code' : data['country_code']}, data)
        else:
            res = col.insert_one(data)

    except Error:
        print(Error)
        continue


