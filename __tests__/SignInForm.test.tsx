import '@testing-library/jest-dom'
import {fireEvent, render, screen} from '@testing-library/react'
import SignInForm from '@/components/SignInForm';

jest.mock("next/navigation", () => ({
    useRouter() {
        return {
            prefetch: () => null
        };
    }
}));

describe('Page', () => {
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
        fireEvent.click(screen.getByTestId('submit-btn'));

        await screen.findByText('Submit');

        expect(screen.getByText('Invalid email address')).toBeInTheDocument();
        expect(screen.getByText('Password must be at least 8 characters')).toBeInTheDocument();
    });
})