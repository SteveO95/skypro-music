import { fetchWithAuth } from "@/helpers/fetchWithAuth";
import { CustomCatalogType } from "@/types/customCatalog";
import exp from "constants";

const BASE_URL = "https://webdev-music-003b5b991590.herokuapp.com";

export const registration = async ({
  username,
  email,
  password,
}: {
  username: string;
  email: string;
  password: string;
}) => {
  const response = await fetch(`${BASE_URL}/user/signup`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message);
  }

  const data = await response.json();
  return data;
};

export const login = async ({ email, password }: { email: string; password: string }) => {
  const response = await fetch(`${BASE_URL}/user/login`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message);
  }

  const data = await response.json();
  return data;
};

export const getJWTokens = async ({ email, password }: { email: string; password: string }) => {
  const response = await fetch(`${BASE_URL}/user/token/ `, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
    }),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.message);
  }

  const data = await response.json();
  return data;
};

export const getAccessToken = async (refresToken: string) => {
  const response = await fetch(`${BASE_URL}/user/token/refresh/`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify({
      refesh: refresToken,
    }),
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.detail);
  }

  const data = await response.json();
  return data.access;
};

export const getAllTracks = async () => {
  const response = await fetch(`${BASE_URL}/catalog/track/all/`);
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = await response.json();
  return data.data;
};

export async function likeTrack({
  trackId,
  access,
  refresh,
}: {
  trackId: number;
  access: string;
  refresh: string;
}) {
  const res = await fetchWithAuth(
    BASE_URL + `/catalog/track/${trackId}/favorite/`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${access}`,
      },
    },
    refresh
  );
  return res.json();
}

export async function dislikeTrack({
  trackId,
  access,
  refresh,
}: {
  trackId: number;
  access: string;
  refresh: string;
}) {
  const res = await fetchWithAuth(
    `${BASE_URL}/catalog/track/${trackId}/favorite/`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${access}`,
      },
    },
    refresh
  );
  return res.json();
}

export async function fetchFavoriteTracks({
  accessToken,
  refreshToken,
}: {
  accessToken: string;
  refreshToken: string;
}) {
  const res = await fetchWithAuth(
    `${BASE_URL}/catalog/track/favorite/all/`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
    refreshToken
  );

  return res.json();
}

export async function getCatalogs(): Promise<CustomCatalogType[]> {
  const response = await fetch(`${BASE_URL}/catalog/selection/all`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  });

  if (!response.ok) {
    const data = await response.json();
    throw new Error(data.detail);
  }

  const data = await response.json();
  return data.data;
}
