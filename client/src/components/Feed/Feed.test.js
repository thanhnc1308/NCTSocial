import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import API mocking utilities from Mock Service Worker
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
    rest.get('/greeting', (req, res, ctx) => {
        return res(ctx.json({
            greeting: 'Hello'
        }))
    })
)

// establishing API mocking before all tests
beforeAll(() => server.listen());

// reset any request handlers that are declared as a part of our tests
afterEach(() => server.resetHandlers());

// clean up once the tests are done
afterAll(() => server.close());

describe('Feed Test', () => {
    test('handlers server error', async () => {
        server.use(
            rest.get('/greeting', (req, res, ctx) => {
                return res(ctx.status(500));
            })
        )
    })
})
