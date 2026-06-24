with open('src/App.jsx', 'r') as f:
    content = f.read()

# Define the AuthScreen block
auth_screen_code = """const AuthScreen = ({ onAuthSuccess }) => {
  const [isSignup, setIsSignup] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [storeName, setStoreName] = useState('')
  const [loading, setLoading] = useState(false)
  const [authError, setAuthError] = useState(null)
  const clearMessages = () => setAuthError(null)

  const handleLogin = async () => {
    if (!email || !password) { setAuthError('Please fill in all fields.'); return }
    clearMessages(); setLoading(true)
    const { user, error } = await firebaseAuth.signInWithEmail(email, password)
    setLoading(false)
    if (error) { setAuthError(error); return }
    if (user) { console.log('Glowify AuthScreen: calling onAuthSuccess'); onAuthSuccess(user) }
  }

  const handleSignup = async () => {
    if (!fullName||!email||!password||!confirmPassword) { setAuthError('Please fill in all fields.'); return }
    if (password!==confirmPassword) { setAuthError('Passwords do not match.'); return }
    if (password.length<6) { setAuthError('Password must be at least 6 characters.'); return }
    clearMessages(); setLoading(true)
    const { user, error } = await firebaseAuth.signUpWithEmail(email, password, fullName, storeName)
    setLoading(false)
    if (error) { setAuthError(error); return }
    if (user) onAuthSuccess(user)
  }

  const handleGoogle = async () => {
    clearMessages(); setLoading(true)
    const { user, error } = await firebaseAuth.signInWithGoogle()
    setLoading(false)
    if (error) { setAuthError(error); return }
    if (user) onAuthSuccess(user)
  }

  return null
}"""

new_auth_screen_code = """const AuthScreen = ({ onAuthSuccess }) => {
  const [isSignup, setIsSignup] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [storeName, setStoreName] = useState('')
  const [loading, setLoading] = useState(false)
  const [authError, setAuthError] = useState(null)
  const clearMessages = () => setAuthError(null)

  const handleLogin = async () => {
    if (!email || !password) { setAuthError('Please fill in all fields.'); return }
    clearMessages(); setLoading(true)
    const { user, error } = await firebaseAuth.signInWithEmail(email, password)
    setLoading(false)
    if (error) { setAuthError(error); return }
    if (user) { console.log('Glowify AuthScreen: calling onAuthSuccess'); onAuthSuccess(user) }
  }

  const handleSignup = async () => {
    if (!fullName||!email||!password||!confirmPassword) { setAuthError('Please fill in all fields.'); return }
    if (password!==confirmPassword) { setAuthError('Passwords do not match.'); return }
    if (password.length<6) { setAuthError('Password must be at least 6 characters.'); return }
    clearMessages(); setLoading(true)
    const { user, error } = await firebaseAuth.signUpWithEmail(email, password, fullName, storeName)
    setLoading(false)
    if (error) { setAuthError(error); return }
    if (user) onAuthSuccess(user)
  }

  const handleGoogle = async () => {
    clearMessages(); setLoading(true)
    const { user, error } = await firebaseAuth.signInWithGoogle()
    setLoading(false)
    if (error) { setAuthError(error); return }
    if (user) onAuthSuccess(user)
  }

  return (
    <div style={{minHeight:"100vh",background:"#07070F",display:"flex",alignItems:"center",justifyContent:"center",padding:"20px"}}>
      <div style={{background:"#11111A",padding:"40px",borderRadius:"16px",width:"100%",maxWidth:"400px",color:"white"}}>
        <h1 style={{textAlign:"center",marginBottom:"30px"}}>{isSignup ? "Sign Up" : "Login"}</h1>
        {authError && <div style={{color:"#EF4444",marginBottom:"20px",textAlign:"center"}}>{authError}</div>}
        <input style={{width:"100%",padding:"12px",marginBottom:"10px",borderRadius:"8px",border:"1px solid #333",background:"#07070F",color:"white"}} type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input style={{width:"100%",padding:"12px",marginBottom:"10px",borderRadius:"8px",border:"1px solid #333",background:"#07070F",color:"white"}} type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        {isSignup && <>
          <input style={{width:"100%",padding:"12px",marginBottom:"10px",borderRadius:"8px",border:"1px solid #333",background:"#07070F",color:"white"}} type="text" placeholder="Full Name" value={fullName} onChange={e=>setFullName(e.target.value)} />
          <input style={{width:"100%",padding:"12px",marginBottom:"10px",borderRadius:"8px",border:"1px solid #333",background:"#07070F",color:"white"}} type="text" placeholder="Store Name" value={storeName} onChange={e=>setStoreName(e.target.value)} />
          <input style={{width:"100%",padding:"12px",marginBottom:"20px",borderRadius:"8px",border:"1px solid #333",background:"#07070F",color:"white"}} type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} />
        </>}
        <button style={{width:"100%",padding:"12px",borderRadius:"8px",border:"none",background:"#6366F1",color:"white",fontWeight:"bold",cursor:"pointer",marginBottom:"10px"}} onClick={isSignup ? handleSignup : handleLogin} disabled={loading}>{loading ? "Loading..." : (isSignup ? "Sign Up" : "Login")}</button>
        <button style={{width:"100%",padding:"12px",borderRadius:"8px",border:"1px solid #333",background:"transparent",color:"white",cursor:"pointer",marginBottom:"20px"}} onClick={handleGoogle} disabled={loading}>Sign In with Google</button>
        <div style={{textAlign:"center",cursor:"pointer",color:"#6366F1"}} onClick={()=>setIsSignup(!isSignup)}>{isSignup ? "Already have an account? Login" : "Need an account? Sign Up"}</div>
      </div>
    </div>
  )
}"""

content = content.replace(auth_screen_code, new_auth_screen_code)
with open('src/App.jsx', 'w') as f:
    f.write(content)
