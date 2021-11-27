import Post from './Post';
import { render , screen } from '../../utils/test-utils';
import userEvent from '@testing-library/user-event';


describe('Post Test', () => {
    test('render successfully', () => {
        const post = {
            desc: 'a test description',
            likes: []
        };
        render(<Post post={post} />);
        expect(screen.getByText('a test description')).toBeInTheDocument();
        expect(screen.getByText(/ncthanh/i)).toBeInTheDocument();
    })

    test('toggle like', async () => {
        const post = {
            _id: 'somepostid',
            likes: []
        };
        render(<Post post={post} />);
        const likeButton = screen.getByTestId('like-button');
        const countBeforeClick = screen.queryByText('0 people liked it');
        expect(countBeforeClick).toBeVisible();
        userEvent.click(likeButton);
        const countAfterClick = await screen.findByText('1 people liked it');
        expect(countAfterClick).toBeInTheDocument();
        userEvent.click(likeButton);
        const countAfterClickUnlike = await screen.findByText('0 people liked it');
        expect(countAfterClickUnlike).toBeInTheDocument();
    });
});
