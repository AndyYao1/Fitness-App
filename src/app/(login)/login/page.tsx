import { login, signup } from './actions';
import { Button } from 'react-bootstrap';

export default function LoginPage() {
  return (
    <form>
      <label htmlFor="email">Email:</label>
      <input id="email" name="email" type="email" required />
      <label htmlFor="password">Password:</label>
      <input id="password" name="password" type="password" required />
      <Button formAction={login} type='submit'>Log in</Button>
      <Button formAction={signup} type='submit'>Sign up</Button>
    </form>
  )
}