with open('src/App.jsx', 'r') as f:
    c = f.read()

old_str = "onAuthSuccess={(user)=>{console.log('Glowify: onAuthSuccess uid:',user?.uid);setFirebaseUser(user);setAuthReady(true)}}"
new_str = "onAuthSuccess={(user)=>{console.log('Glowify: onAuthSuccess uid:',user?.uid);setFirebaseUser(user);setAuthReady(true);loadUserData(user.uid)}}"
c = c.replace(old_str, new_str)

with open('src/App.jsx', 'w') as f:
    f.write(c)
