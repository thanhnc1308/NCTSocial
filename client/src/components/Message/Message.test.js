import Message from "./Message";
import { shallow } from "enzyme";
import { render, screen } from "@testing-library/react";

describe("Login Testing", () => {
  let wrapper,
    message = {
    text: "some messages",
  };
  beforeEach(() => {
    // create a component but not render the children components
    wrapper = shallow(<Message own={true} message={message} />);
  })
  test("render message", () => {
    expect(wrapper.find("p.message-text").text()).toContain("some messages");
  });

  test("render class own", () => {
    const wrapperTrue = shallow(<Message own={true} message={message} />);
    expect(wrapperTrue.find("div.message").hasClass("own")).toBe(true);

    const wrapperFalse = shallow(<Message own={false} message={message} />);
    expect(wrapperFalse.find("div.message").hasClass("own")).toBe(false);
  });
});
