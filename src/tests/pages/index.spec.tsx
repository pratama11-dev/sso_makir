import React from "react";
import { render } from "@testing-library/react";
import MatchMediaMock from "jest-matchmedia-mock";
import Header from "@components/Global/Header/Header";

let matchMedia: MatchMediaMock;

describe("Home", () => {
  beforeAll(() => {
    matchMedia = new MatchMediaMock();
    jest.spyOn(console, "warn").mockImplementation(() => {});
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    matchMedia.clear();
  });

  it("Renders a Header Without Session", () => {
    const HeaderComp = render(<Header session={{ code: -1 }} />);
    const headerLoginCTA = HeaderComp.container.querySelector("#login-CTA")?.innerHTML;
    expect(headerLoginCTA).toBe("Sign In");
  });

  it("Renders a Header With Session", () => {
    const name = "test root";
    const HeaderComp = render(
      <Header session={{ code: 0, data: { user: { name } } }} />
    );
    const headerUser = HeaderComp.container.querySelector("#headerPeopleName")?.innerHTML;
    expect(headerUser).toBe(name);
  });
});
