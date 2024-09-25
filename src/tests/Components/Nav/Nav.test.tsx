import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

import Nav from "@/components/Nav/Nav";
import useUserAuth from "@/hooks/useUserAuth";
import { useRouter } from "next/navigation";

jest.mock("@/hooks/useUserAuth", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Nav", () => {
  const mockSetLogout = jest.fn();
  const mockRouterPush = jest.fn();

  beforeEach(() => {
    (useUserAuth as jest.Mock).mockImplementation(() => ({
      isAuth: false,
      setLogout: mockSetLogout,
      setLogin: jest.fn(),
      checkLogin: jest.fn(),
    }));

    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Должно вернуться разметка неавторизованного пользователя", () => {
    render(<Nav />);

    expect(screen.getByAltText(/Skypro logo/i)).toBeInTheDocument();
    expect(screen.getByText(/Главное/i)).toBeInTheDocument();
    expect(screen.queryByText(/Мой плейлист/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Войти/i)).toBeInTheDocument();
  });

  it("Должно редиректнуть на страницу авторизации", () => {
    render(<Nav />);

    fireEvent.click(screen.getByText(/Войти/i));
    expect(mockRouterPush).toHaveBeenCalled();
  });

  it("Должна вернуться разметка авторизованного пользователя", () => {
    (useUserAuth as jest.Mock).mockReturnValue({
      isAuth: true,
      setLogout: mockSetLogout,
      setLogin: jest.fn(),
      checkLogin: jest.fn(),
    });

    render(<Nav />);

    expect(screen.getByAltText(/Skypro logo/i)).toBeInTheDocument();
    expect(screen.getByText(/Главное/i)).toBeInTheDocument();
    expect(screen.queryByText(/Мой плейлист/i)).toBeInTheDocument();
    expect(screen.queryByText(/Выйти/i)).toBeInTheDocument();
  });

  it("Должно вызвать деавторизацию при нажатии", () => {
    (useUserAuth as jest.Mock).mockReturnValue({
      isAuth: true,
      setLogout: mockSetLogout,
      setLogin: jest.fn(),
      checkLogin: jest.fn(),
    });

    render(<Nav />);

    fireEvent.click(screen.getByText(/Выйти/i));
    expect(mockSetLogout).toHaveBeenCalled();
  });
});
