import {useState} from 'react'
import {useAuth} from '../services/useAuth'
import {useNavigate} from 'react-router-dom'

export default function SignUp() {const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const { signUp} = useAuth()
  const navigate = useNavigate()

const handleSignUp = async (_e: React.FormEvent) => {
e.preventDefault()
    setError('')
    try {
const { error } = await signUp(email, password)
      if (error) {
setError(error.message)
      } else {
        // On Supabase, a confirmation email is sent by default.
        // You might want to navigate to a page that informs the user to check their email.
alert('Check your email for the confirmation link!')
        navigate('/login')
      }
    } catch (error) {
setError('Failed to sign up')
      console.error(error)
    }
  }

return (
_<div>
      <h2>Sign Up</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSignUp}>
        <input
type="email"
value={email}
onChange={(e) => setEmail(e.target.value)}
placeholder="Email"
required
        />
        <input
type="password"
value={password}
onChange={(_e) => setPassword(e.target.value)}
placeholder="Password"
required
        />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  )
}
