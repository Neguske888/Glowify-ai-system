#!/bin/bash

# Glowify AI - Vercel Environment Variables Update Script

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Glowify AI: Starting Vercel environment variables update...${NC}"

# 1. Check if Vercel CLI is installed
if ! command -v vercel &> /dev/null
then
    echo -e "${RED}Error: Vercel CLI is not installed.${NC}"
    echo "Please run: npm install -g vercel"
    exit 1
fi

# 2. Define the variables
declare -A ENV_VARS
ENV_VARS["VITE_FIREBASE_API_KEY"]="AIzaSyCJqT-DKaEyuMGqp-Iyx9XFAjQdimswS90"
ENV_VARS["VITE_FIREBASE_AUTH_DOMAIN"]="glowify-ai-system.firebaseapp.com"
ENV_VARS["VITE_FIREBASE_PROJECT_ID"]="glowify-ai-system"
ENV_VARS["VITE_FIREBASE_STORAGE_BUCKET"]="glowify-ai-system.firebasestorage.app"
ENV_VARS["VITE_FIREBASE_MESSAGING_SENDER_ID"]="507485872156"
ENV_VARS["VITE_FIREBASE_APP_ID"]="1:507485872156:web:fb8782bd039a71a14e3fd9"

# 3. Update variables in Vercel
echo -e "${BLUE}Updating variables in Vercel...${NC}"

for key in "${!ENV_VARS[@]}"; do
    value="${ENV_VARS[$key]}"
    echo -e "Setting ${BLUE}$key${NC}..."
    
    # Remove existing variable first to avoid conflicts, then add it
    echo "$value" | vercel env add "$key" production --force &> /dev/null
    echo "$value" | vercel env add "$key" preview --force &> /dev/null
    echo "$value" | vercel env add "$key" development --force &> /dev/null
    
    if [ $? -eq 0 ]; then
        echo -e "${GREEN}✓ $key updated successfully${NC}"
    else
        echo -e "${RED}✗ Failed to update $key${NC}"
    fi
done

echo -e "\n${GREEN}✓ All environment variables have been updated!${NC}"
echo -e "${BLUE}Note: You may need to redeploy your project for the changes to take effect:${NC}"
echo "vercel --prod"
