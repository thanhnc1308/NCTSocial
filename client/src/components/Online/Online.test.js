import Online from "./Online";
import { render, screen } from "@testing-library/react";

describe("Online Test", () => {
    test("render username", () => {
        const user = {
            username: "ncthanh"
        }
        render(<Online user={user} />)
        const username = screen.queryByText("ncthanh");
        expect(username).toBeVisible();
    })
})
