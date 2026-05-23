import re

with open('src/App.jsx', 'r') as f:
    content = f.read()

# FIX A - Remove imports
content = re.sub(r'import.*supabase.*?\n', '', content)
content = re.sub(r'import.*@supabase.*?\n', '', content)
content = re.sub(r'import.*createClient.*?\n', '', content)
content = re.sub(r'import.*AuthPortal.*?\n', '', content)

# FIX B - Add Firebase import
firebase_import = "import { firebaseAuth, firestoreHelpers } from './lib/firebase'"
# Add after the last import line
content = re.sub(r'(import .* from .*\n)', r'\1' + firebase_import + '\n', content, count=1)

# FIX F - Rename AuthPortal to AuthScreen
content = content.replace('AuthPortal', 'AuthScreen')

# FIX G - Rename loadData to loadUserData
content = content.replace('loadData(', 'loadUserData(')

with open('src/App.jsx', 'w') as f:
    f.write(content)
