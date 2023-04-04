import type { RequestHandler } from "./$types";
import { error } from '@sveltejs/kit';
import { SPOTIFY_APP_CLIENT_ID, SPOTIFY_APP_CLIENT_SECRET } from '$env/static/private';

export const GET: RequestHandler = ({ url, cookies }) => {
    const code = url.searchParams.get('code') || null;
    const state = url.searchParams.get('state') || null;

    const storedState = cookies.get('spotify_auth_state') || null;
    const storedChallengeVerifier = cookies.get('spotify_auth_challenge_verifier') || null;

    if (state !== storedState) {
        throw error(400, 'State Mismatch!');
    }

    const response = await fetch('https://accounts.spotify.com/api/tokens', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${Buffer.from(`${SPOTIFY_APP_CLIENT_ID}:${SPOTIFY_APP_CLIENT_SECRET}`).toString('base64')}`
        },
        body: new URLSearchParams({
            code: code || '',
            redirect_uri: `${BASE_URL}/api/auth/callback`,
            grant_type: 'authorization_code',
            code_verifier:
        })
    })
}