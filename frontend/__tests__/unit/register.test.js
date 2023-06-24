import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Register from '../components/Register'
import '@testing-library/jest-dom'
import axios from 'axios'
import { useRouter } from 'next/router'

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

jest.mock('axios')

describe('Register Component', () => {
  let mockPush;
  beforeEach(() => {
    mockPush = jest.fn();
    useRouter.mockReturnValue({
      push: mockPush,
    });
    axios.post.mockResolvedValue({ data: {} })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders form fields', () => {
    render(<Register />)
 
    expect(screen.getByLabelText(/Email-Address:/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Confirm your Email-Address:/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Password:/i)).toBeInTheDocument()
  })

  it('calls the register API with form data on submit', async () => {
    render(<Register />)
    
    userEvent.type(screen.getByLabelText(/Email-Address:/i), 'test@example.com')
    userEvent.type(screen.getByLabelText(/Confirm your Email-Address:/i), 'test@example.com')
    userEvent.type(screen.getByLabelText(/Password:/i), 'Test@12345')

    fireEvent.click(screen.getByRole('button', { name: /Next/i }))

    userEvent.type(screen.getByLabelText(/First-Name:/i), 'John')
    userEvent.type(screen.getByLabelText(/Last-Name:/i), 'Doe')
    userEvent.type(screen.getByLabelText(/Phone number:/i), '0412345678')

    fireEvent.click(screen.getByRole('button', { name: /Register/i }))

    await waitFor(() => expect(axios.post).toHaveBeenCalledTimes(1))

    expect(axios.post).toHaveBeenCalledWith('/register', {
      email: 'test@example.com',
      password: 'Test@12345',
      first_name: 'John',
      last_name: 'Doe',
      phone_number: '0412345678',
    })
  })
})
