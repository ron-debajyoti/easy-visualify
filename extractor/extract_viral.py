import spotipy, pymongo, pprint 
import settings,daily_viral_playlists
from spotipy.oauth2 import SpotifyClientCredentials
import json


clientCredentialsManager = SpotifyClientCredentials(settings.SPOTIFY_CLIENT_ID,settings.SPOTIFY_CLIENT_SECRET)
sp = spotipy.Spotify(client_credentials_manager=clientCredentialsManager)
db_client = pymongo.MongoClient(settings.MONGODB_HOST)
db = db_client["visualify"]
col = db["viralCollections"]

playlists = daily_viral_playlists.viralPlaylists
username = 'spotifycharts'

for item in playlists:
    try:
        print(item)
        count = 0
        uri = item['uri']
        playlist_id = uri.split(':')[4]
        result = sp.user_playlist(user=username,playlist_id=playlist_id,fields=uri)
        #string = result['tracks']['items'][0:5]
        data ={
            'playlist_id' : result['id'],
            'country_code' : item['country_code'],
            'data':result['tracks']['items'][0:9] 
            }
        with open('data.json','w') as outfile:
            json.dump(data,outfile)
        
        query = col.find( { 'playlist_id': data['playlist_id']})
        if query.count():
            print('Updating extry for this country : ', data['country_code'])
            res = col.replace_one({'playlist_id' : data['playlist_id']}, data)
        else:
            res = col.insert_one(data)
    except Error:
        print(Error)
        continue



