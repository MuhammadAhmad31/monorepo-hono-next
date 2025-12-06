/**
 * Standalone route validator
 * Automatically discovers and validates all route files
 */

import { readdirSync } from 'fs'

console.log('\n🔍 Validating API Routes Against Contract...\n')

let hasErrors = false
const routesDir = './src/routes'

const routeFiles = readdirSync(routesDir)
  .filter(file => file.endsWith('.ts') && !file.endsWith('.test.ts'))

console.log(`Found ${routeFiles.length} route file(s): ${routeFiles.join(', ')}\n`)

for (const file of routeFiles) {
  const routeName = file.replace('.ts', '')
  
  try {
    console.log(`  → Checking ${routeName} routes...`)
    const routeModule = await import(`./routes/${file}`)
    
    if (routeModule.validator) {
      if (routeModule.validator.hasViolations()) {
        hasErrors = true
        const violations = routeModule.validator.getViolations()
        console.error(`  ❌ ${routeName} routes have contract violations:`)
        violations.forEach((v: string) => console.error(v))
      } else {
        console.log(`  ✅ ${routeName} routes OK`)
      }
    } else {
      console.warn(`  ⚠️  ${routeName} routes: validator not exported (skipping)`)
    }
  } catch (error) {
    hasErrors = true
    console.error(`  ❌ Failed to load ${routeName} routes`)
    if (error instanceof Error) {
      console.error(`     ${error.message}`)
    }
  }
}

console.log('')

if (hasErrors) {
  console.error('❌ VALIDATION FAILED\n')
  console.error('Contract violations detected. Please fix the errors above.')
  console.error('Update packages/shared/src/routes.ts to match your API implementation.\n')
  process.exit(1)
} else {
  console.log('✅ All routes validated successfully!\n')
  process.exit(0)
}