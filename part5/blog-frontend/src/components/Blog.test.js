import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import Blog from './Blog';

test('renders content', () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Gatsby Gregor',
        url: 'www.url.com',
        likes: 5,
        user: { username: 'test' },
    };
    const user = { user: { username: 'test' } };

    const component = render(<Blog blog={blog} user={user} />);

    expect(component.container).toHaveTextContent(
        'Component testing is done with react-testing-library'
    );
});
