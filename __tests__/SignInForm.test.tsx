import '@testing-library/jest-dom';
import { fireEvent, waitFor, render, screen } from '@testing-library/react';
import SignInForm from '@/components/SignInForm';

jest.mock('next/navigation', () => ({
    useRouter() {
        return {
            prefetch: () => null
        };
    }
}));

describe('Sign In Form', () => {
    it('renders sign in form', () => {
        render(<SignInForm />)

        expect(screen.getByTestId('signin-form')).toBeInTheDocument();
        expect(screen.getByTestId('email')).toBeInTheDocument();
        expect(screen.getByTestId('password')).toBeInTheDocument();
        expect(screen.getByTestId('submit-btn')).toBeInTheDocument();
    });

    it('displays error messages for invalid email and password', async () => {
        render(<SignInForm />);

        fireEvent.change(screen.getByTestId('email'), { target: { value: 'invalid-email' } });
        fireEvent.change(screen.getByTestId('password'), { target: { value: '123' } });
        fireEvent.submit(screen.getByTestId('submit-btn'));

        await screen.findByText('Submit');

        expect(screen.getByTestId('email-feedback')).toHaveTextContent('Invalid email');
        expect(screen.getByTestId('password-feedback')).toHaveTextContent('String must contain at least 8 character(s)');
    });

    it('successfully signs in with valid email and password', async () => {
        render(<SignInForm />);

        fireEvent.change(screen.getByTestId('email'), { target: { value: 'user@gmail.com' } });
        fireEvent.change(screen.getByTestId('password'), { target: { value: '12345678' } });
        fireEvent.submit(screen.getByTestId('submit-btn'));

        await waitFor(() => {
            expect(screen.queryByTestId('email-feedback')).not.toBeInTheDocument();
            expect(screen.queryByTestId('password-feedback')).not.toBeInTheDocument();
            expect(screen.queryByTestId('submit-btn')).toHaveTextContent('Loading...');
        });
    });
})