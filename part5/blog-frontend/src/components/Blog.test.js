import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
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

    const div = component.container.querySelector('.togglableContent');
    expect(div).toHaveStyle('display: none');
});

test('display hidden content after click', () => {
    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Gatsby Gregor',
        url: 'www.url.com',
        likes: 5,
        user: { username: 'test' },
    };
    const user = { user: { username: 'test' } };

    const component = render(<Blog blog={blog} user={user} />);

    const button = component.getByText('show');
    fireEvent.click(button);

    const div = component.container.querySelector('.togglableContent');
    expect(div).not.toHaveStyle('display: none');
});

test('2 like clicks equals 2 calls', () => {
    const updateBlog = jest.fn();

    const blog = {
        title: 'Component testing is done with react-testing-library',
        author: 'Gatsby Gregor',
        url: 'www.url.com',
        likes: 5,
        user: { username: 'test' },
    };
    const user = { user: { username: 'test' } };

    const component = render(
        <Blog blog={blog} user={user} updateBlog={updateBlog} />
    );

    const button = component.getByText('like');
    fireEvent.click(button);
    fireEvent.click(button);

    expect(updateBlog.mock.calls).toHaveLength(2);
});
