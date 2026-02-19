import axios from "axios";
import { config } from "../config/config.js"

export const spotifyService = {
    getAccessTokenBySpotify: async () => {
        try {
            const response = await axios.post(config.services.spotify.basePath, 'grant_type=client_credentials', {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': 'Basic ' + Buffer.from(`${config.services.spotify.userId}:${config.services.spotify.key}`).toString('base64')
                }
            })

            return response.data.access_token;


        } catch (error) {
            console.error("Spotify Auth Error:", error.message);
            throw error;
        }
    },
    searchTracks: async (query) => {
        if (!query) {
            throw new Error('The query is required');
        }
        try {
            const token = await spotifyService.getAccessTokenBySpotify();
            const response = await axios.get(config.services.spotify.searchPath, {
                headers: { Authorization: `Bearer ${token}` },
                params: { q: query, type: 'track', limit: 5 }
            })

            const cleanTracks = response.data.tracks.items.map(t => ({
                title: t.name,
                artist: t.artists[0].name,
                album: t.album.name,
                preview: t.preview_url
            }));    

            return cleanTracks;
        } catch (error) {
            console.error("Spotify Get Tracks Error:", error.message);
            throw error;
        }


    }
}