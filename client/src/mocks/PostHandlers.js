import { rest } from 'msw';
const prefix = 'posts';

export const PostHandlers = [
    /**
     * toggle likes a post
     */
    rest.put(`${process.env.REACT_APP_BASE_API}/${prefix}/somepostid/toggle_like`, (req, res, ctx) => {
        return res(
            ctx.status(200),
            ctx.json({
                data: {}
            })
        )
    })
]
