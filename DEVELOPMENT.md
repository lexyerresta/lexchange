# Lexchange Development Guide

## Git Workflow

### First Time Setup (Already Done)
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/lexyerresta/lexchange.git
git push -u origin main
```

### Making Changes and Pushing

#### Option 1: Using the Auto-Push Script (Recommended)
```powershell
# Windows PowerShell
.\push.ps1

# Or Git Bash
./push.sh
```

#### Option 2: Manual Git Commands
```bash
# Add all changes
git add .

# Commit with message
git commit -m "Your commit message here"

# Push to GitHub
git push origin main
```

### Common Git Commands

```bash
# Check status
git status

# View commit history
git log --oneline

# Create new branch
git checkout -b feature-name

# Switch branches
git checkout main

# Pull latest changes
git pull origin main

# View remote URL
git remote -v
```

## Development Workflow

### Starting Development
```bash
npm run dev
```

### Before Committing
1. Test the application
2. Run build to check for errors
```bash
npm run build
```
3. Review changes
```bash
git status
git diff
```
4. Commit and push

### Recommended Commit Message Format

```
feat: Add new feature
fix: Fix bug in component
style: Update styling
refactor: Refactor code structure
docs: Update documentation
test: Add tests
chore: Update dependencies
```

Examples:
- `feat: Add portfolio analytics dashboard`
- `fix: Resolve trading balance calculation issue`
- `style: Improve mobile responsiveness`
- `refactor: Optimize API calls`

## Project Structure

```
lexchange/
├── src/
│   ├── app/              # Next.js pages
│   ├── components/       # React components
│   └── context/          # React context
├── public/               # Static assets
├── .gitignore           # Git ignore rules
├── push.sh              # Auto-push script (Bash)
├── push.ps1             # Auto-push script (PowerShell)
└── README.md            # Project documentation
```

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Deploy automatically

### Manual Build
```bash
npm run build
npm start
```

## Environment Variables

Create `.env.local` for local development:
```env
NEXT_PUBLIC_API_URL=your_api_url
```

## Troubleshooting

### Git Issues
```bash
# Reset to last commit
git reset --hard HEAD

# Discard local changes
git checkout -- .

# Force push (use carefully)
git push -f origin main
```

### Build Issues
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install

# Clear Next.js cache
rm -rf .next
npm run build
```

## Tips

1. Always pull before pushing if working with others
2. Use meaningful commit messages
3. Test before committing
4. Keep commits focused and small
5. Use branches for new features
