#!/bin/bash

# Glowify AI - Firestore Rules Deployment Script

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}Glowify AI: Starting Firestore rules deployment...${NC}"

# 1. Check if firebase-tools is installed
if ! command -v firebase &> /dev/null
then
    echo -e "${RED}Error: firebase-tools is not installed.${NC}"
    echo "Please run: npm install -g firebase-tools"
    exit 1
fi

# 2. Check if user is logged in
echo -e "${BLUE}Checking Firebase authentication...${NC}"
firebase login:list | grep -q "@"
if [ $? -ne 0 ]; then
    echo -e "${RED}Error: You are not logged into Firebase.${NC}"
    echo "Please run: firebase login"
    exit 1
fi

# 3. Check for .firebaserc (project selection)
if [ ! -f ".firebaserc" ]; then
    echo -e "${BLUE}No .firebaserc found. Please select your Firebase project:${NC}"
    firebase use --add
fi

# 4. Deploy rules
echo -e "${BLUE}Deploying Firestore rules...${NC}"
firebase deploy --only firestore:rules

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Firestore rules deployed successfully!${NC}"
else
    echo -e "${RED}✗ Deployment failed. Check the error messages above.${NC}"
    exit 1
fi
