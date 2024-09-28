import { render, screen, fireEvent } from "@testing-library/react";
import Burger from "./Burger";

describe("Компонент Burger", () => {
  test("вызывает toggleMenu при клике", () => {
    const toggleMenu = jest.fn();
    render(<Burger isOpen={false} toggleMenu={toggleMenu} />);

    const burger = screen.getByRole("button", { name: /toggle menu/i });
    fireEvent.click(burger);

    expect(toggleMenu).toHaveBeenCalledTimes(1);
  });
});
