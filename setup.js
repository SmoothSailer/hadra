#!/usr/bin/env node

/**
 * Setup script for Wadi Hadramout Restaurant Website
 * Run this after installing dependencies to set up everything
 */

const fs = require('fs')
const path = require('path')

console.log('\n🌅 Wadi Hadramout Restaurant Setup\n')
console.log('=' .repeat(50))

// Check if .env.local exists
const envPath = path.join(__dirname, '.env.local')
if (!fs.existsSync(envPath)) {
  console.log('\n⚠️  .env.local file not found!')
  console.log('\n📝 Setup Instructions:\n')
  console.log('1. Create a Supabase account at https://supabase.com')
  console.log('2. Create a new project')
  console.log('3. Get your credentials from Settings → API')
  console.log('4. Copy .env.example to .env.local')
  console.log('5. Fill in your Supabase credentials\n')
  process.exit(1)
}

console.log('\n✅ .env.local file found!')

// Check Node version
const nodeVersion = parseInt(process.version.split('.')[0].slice(1))
if (nodeVersion < 18) {
  console.log('\n❌ Node.js 18+ is required!')
  console.log(`   You have: ${process.version}\n`)
  process.exit(1)
}

console.log('✅ Node.js version OK\n')

console.log('📋 Project Structure:')
console.log('   ✓ app/          - Next.js app directory')
console.log('   ✓ components/   - React components')
console.log('   ✓ lib/          - Utilities and helpers')
console.log('   ✓ public/       - Static files\n')

console.log('🚀 Quick Start:\n')
console.log('   1. npm run dev   - Start development server')
console.log('   2. Open http://localhost:3000 in your browser')
console.log('   3. Test the features!\n')

console.log('📚 Documentation:')
console.log('   - README.md        - Full documentation')
console.log('   - QUICKSTART.md    - Quick start guide')
console.log('   - DATABASE_SETUP.md - Database setup')
console.log('   - DEPLOYMENT.md     - Deployment guide\n')

console.log('=' .repeat(50))
console.log('✨ Setup complete! Run "npm run dev" to start\n')
