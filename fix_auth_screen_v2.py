with open('src/App.jsx', 'r') as f:
    lines = f.readlines()

# Replace the AuthScreen component body
# Finding the start of AuthScreen
start = 0
for i, line in enumerate(lines):
    if 'const AuthScreen' in line:
        start = i
        break

# Removing old AuthScreen content and adding the new one
new_lines = lines[:start+1]
new_lines.extend([
    '  const [isSignup, setIsSignup] = useState(false)\n',
    '  const [email, setEmail] = useState("")\n',
    '  const [password, setPassword] = useState("")\n',
    '  const [fullName, setFullName] = useState("")\n',
    '  const [confirmPassword, setConfirmPassword] = useState("")\n',
    '  const [storeName, setStoreName] = useState("")\n',
    '  const [loading, setLoading] = useState(false)\n',
    '  const [authError, setAuthError] = useState(null)\n',
    '  const clearMessages = () => setAuthError(null)\n',
    '\n',
    '  const handleLogin = async () => {\n',
    '    clearMessages(); setLoading(true)\n',
    '    const { user, error } = await firebaseAuth.signInWithEmail(email, password)\n',
    '    setLoading(false)\n',
    '    if (error) { setAuthError(error); return }\n',
    '    if (user) onAuthSuccess(user)\n',
    '  }\n',
    '\n',
    '  const handleSignup = async () => {\n',
    '    if (password !== confirmPassword) { setAuthError("Passwords do not match."); return }\n',
    '    clearMessages(); setLoading(true)\n',
    '    const { user, error } = await firebaseAuth.signUpWithEmail(email, password, fullName, storeName)\n',
    '    setLoading(false)\n',
    '    if (error) { setAuthError(error); return }\n',
    '    if (user) onAuthSuccess(user)\n',
    '  }\n',
    '\n',
    '  const handleGoogle = async () => {\n',
    '    clearMessages(); setLoading(true)\n',
    '    const { user, error } = await firebaseAuth.signInWithGoogle()\n',
    '    setLoading(false)\n',
    '    if (error) { setAuthError(error); return }\n',
    '    if (user) onAuthSuccess(user)\n',
    '  }\n',
    '\n',
    '  return (\n',
    '    <div style={{minHeight:"100vh",background:"#07070F",display:"flex",alignItems:"center",justifyContent:"center",padding:"20px"}}>\n',
    '      <div style={{background:"#11111A",padding:"40px",borderRadius:"16px",width:"100%",maxWidth:"400px",color:"white"}}>\n',
    '        <h1 style={{textAlign:"center",marginBottom:"30px"}}>{isSignup ? "Sign Up" : "Login"}</h1>\n',
    '        {authError && <div style={{color:"#EF4444",marginBottom:"20px",textAlign:"center"}}>{authError}</div>}\n',
    '        <input style={{width:"100%",padding:"12px",marginBottom:"10px",borderRadius:"8px",border:"1px solid #333",background:"#07070F",color:"white"}} type="email" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />\n',
    '        <input style={{width:"100%",padding:"12px",marginBottom:"10px",borderRadius:"8px",border:"1px solid #333",background:"#07070F",color:"white"}} type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />\n',
    '        {isSignup && <>\n',
    '          <input style={{width:"100%",padding:"12px",marginBottom:"10px",borderRadius:"8px",border:"1px solid #333",background:"#07070F",color:"white"}} type="text" placeholder="Full Name" value={fullName} onChange={e=>setFullName(e.target.value)} />\n',
    '          <input style={{width:"100%",padding:"12px",marginBottom:"10px",borderRadius:"8px",border:"1px solid #333",background:"#07070F",color:"white"}} type="text" placeholder="Store Name" value={storeName} onChange={e=>setStoreName(e.target.value)} />\n',
    '          <input style={{width:"100%",padding:"12px",marginBottom:"20px",borderRadius:"8px",border:"1px solid #333",background:"#07070F",color:"white"}} type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} />\n',
    '        </>}\n',
    '        <button style={{width:"100%",padding:"12px",borderRadius:"8px",border:"none",background:"#6366F1",color:"white",fontWeight:"bold",cursor:"pointer",marginBottom:"10px"}} onClick={isSignup ? handleSignup : handleLogin} disabled={loading}>{loading ? "Loading..." : (isSignup ? "Sign Up" : "Login")}</button>\n',
    '        <button style={{width:"100%",padding:"12px",borderRadius:"8px",border:"1px solid #333",background:"transparent",color:"white",cursor:"pointer",marginBottom:"20px"}} onClick={handleGoogle} disabled={loading}>Sign In with Google</button>\n',
    '        <div style={{textAlign:"center",cursor:"pointer",color:"#6366F1"}} onClick={()=>setIsSignup(!isSignup)}>{isSignup ? "Already have an account? Login" : "Need an account? Sign Up"}</div>\n',
    '      </div>\n',
    '    </div>\n',
    '  )\n',
    '}\n'
])
# I have to find where the old function ends.
# I'll just replace everything after start until the export default.
end = 0
for i in range(start, len(lines)):
    if 'export default App' in lines[i]:
        end = i
        break
new_lines.extend(lines[end:])

with open('src/App.jsx', 'w') as f:
    f.writelines(new_lines)
