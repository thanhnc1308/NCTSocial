import Post from "./Post";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Post Test", () => {
    test("toggle like", () => {
        // using enzyme
        // wrapper.find("#increment-btn").simulate("click");
        // expect(wrapper.find("#counter-value").text()).toBe("1");

        // using RTL
        const post = {

        }
        render(<Post post={post} />);
        const likeButton = screen.getByTestId("like-button");
        userEvent.click(likeButton);
        const count = screen.queryByText("people liked it");
        expect(count).toBeVisible();
    })
})
