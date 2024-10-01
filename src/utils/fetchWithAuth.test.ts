import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { refreshToken } from "../api/playlist";
import "whatwg-fetch";

// Мокаем функцию refreshToken
jest.mock("../api/playlist", () => ({
  refreshToken: jest.fn(),
}));

describe("fetchWithAuth", () => {
  const url = "https://example.com/data";
  const options = {
    method: "GET",
    headers: {
      Authorization: "Bearer oldAccessToken",
    },
  };
  const refresh = "refreshToken";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("возврат ответа при успешном выполнении первоначального запроса", async () => {
    const mockResponse = new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
    global.fetch = jest.fn().mockResolvedValueOnce(mockResponse);

    const res = await fetchWithAuth(url, options, refresh);

    expect(res).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(url, options);
  });

  it("обновление токена и повтор запроса при статусе 401", async () => {
    const mockResponseUnauthorized = new Response(null, { status: 401 });
    const mockResponseSuccess = new Response(
      JSON.stringify({ success: true }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );

    global.fetch = jest
      .fn()
      .mockResolvedValueOnce(mockResponseUnauthorized) // Первоначальный запрос с 401
      .mockResolvedValueOnce(mockResponseSuccess); // Повторный запрос с новым токеном

    (refreshToken as jest.Mock).mockResolvedValueOnce("newAccessToken");

    const res = await fetchWithAuth(url, options, refresh);

    expect(res).toEqual(mockResponseSuccess);
    expect(refreshToken).toHaveBeenCalledWith(refresh);
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenCalledWith(url, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: "Bearer newAccessToken",
      },
    });
  });

  it("выдача сообщения об ошибке, если запрос завершается неудачей после обновления токена", async () => {
    const mockResponseUnauthorized = new Response(null, { status: 401 });
    const mockResponseFailure = new Response(null, {
      status: 500,
      statusText: "Internal Server Error",
    });

    global.fetch = jest
      .fn()
      .mockResolvedValueOnce(mockResponseUnauthorized) // Первоначальный запрос с 401
      .mockResolvedValueOnce(mockResponseFailure); // Повторный запрос, который также не удался

    (refreshToken as jest.Mock).mockResolvedValueOnce("newAccessToken");

    await expect(fetchWithAuth(url, options, refresh)).rejects.toThrow(
      "Internal Server Error"
    );

    expect(refreshToken).toHaveBeenCalledWith(refresh);
    expect(fetch).toHaveBeenCalledTimes(2);
  });

  it("выдача сообщения об ошибке, если запрос токена обновления завершается неудачей", async () => {
    const mockResponseUnauthorized = new Response(null, { status: 401 });

    global.fetch = jest.fn().mockResolvedValueOnce(mockResponseUnauthorized);

    (refreshToken as jest.Mock).mockRejectedValueOnce(
      new Error("Failed to refresh token")
    );

    await expect(fetchWithAuth(url, options, refresh)).rejects.toThrow(
      "Failed to refresh token"
    );

    expect(refreshToken).toHaveBeenCalledWith(refresh);
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
