import { login, signup } from './actions';
import { Button, Card, Form } from 'react-bootstrap';
import "./login.css"

export default function LoginPage() {
  return (
    <div className='loginPage'>
      <h1 className='loginTitle'> Fitness Tracker </h1>
      <div className='loginCard'>
        <Card>
          <Form>
            <div className='loginCardRow'>
              <Form.Label htmlFor="email">Email:</Form.Label>
              <Form.Control id="email" name="email" type="email" required />
            </div>
            <div className='loginCardRow'>
              <Form.Label htmlFor="password">Password:</Form.Label>
              <Form.Control id="password" name="password" type="password" required />
            </div>
            <div className='loginCardRow'>
              <Button formAction={login} type='submit' className='loginCardButton'>Log In</Button>
              <Button formAction={signup} type='submit' className='loginCardButton'>Sign Up</Button>
            </div>
          </Form>
        </Card>
      </div>
    </div>
  )
}