# TAPANGO Development Environment Setup
# PowerShell script to set up complete development environment
# Run as Administrator for best results

param(
    [switch]$SkipNodeCheck,
    [switch]$SkipSupabase,
    [switch]$SkipDependencies
)

Write-Host "🚀 Setting up TAPANGO development environment..." -ForegroundColor Blue

# Function to check if command exists
function Test-Command {
    param($CommandName)
    return [bool](Get-Command $CommandName -ErrorAction SilentlyContinue)
}

# Function to install Node.js if needed
function Install-NodeJS {
    if ($SkipNodeCheck) {
        Write-Host "⏭️  Skipping Node.js check" -ForegroundColor Yellow
        return
    }

    Write-Host "🔍 Checking Node.js installation..." -ForegroundColor Green
    
    if (Test-Command node) {
        $nodeVersion = node --version
        $majorVersion = [int]($nodeVersion -replace 'v(\d+)\..*', '$1')
        
        if ($majorVersion -ge 18) {
            Write-Host "✅ Node.js $nodeVersion is installed and compatible" -ForegroundColor Green
        } else {
            Write-Host "❌ Node.js $nodeVersion found but version 18+ required" -ForegroundColor Red
            Write-Host "Please install Node.js 18+ from https://nodejs.org/" -ForegroundColor Yellow
            exit 1
        }
    } else {
        Write-Host "❌ Node.js not found" -ForegroundColor Red
        Write-Host "Please install Node.js 18+ from https://nodejs.org/" -ForegroundColor Yellow
        exit 1
    }
}

# Function to install global tools
function Install-GlobalTools {
    Write-Host "📦 Installing global tools..." -ForegroundColor Green
    
    if (-not (Test-Command expo)) {
        Write-Host "Installing Expo CLI..." -ForegroundColor Yellow
        npm install -g @expo/cli
    } else {
        Write-Host "✅ Expo CLI already installed" -ForegroundColor Green
    }
    
    if (-not (Test-Command supabase)) {
        Write-Host "Installing Supabase CLI..." -ForegroundColor Yellow
        npm install -g supabase
    } else {
        Write-Host "✅ Supabase CLI already installed" -ForegroundColor Green
    }
    
    if (-not (Test-Command eas)) {
        Write-Host "Installing EAS CLI..." -ForegroundColor Yellow
        npm install -g eas-cli
    } else {
        Write-Host "✅ EAS CLI already installed" -ForegroundColor Green
    }
}

# Function to install project dependencies
function Install-Dependencies {
    if ($SkipDependencies) {
        Write-Host "⏭️  Skipping dependency installation" -ForegroundColor Yellow
        return
    }

    Write-Host "📦 Installing project dependencies..." -ForegroundColor Green
    
    # Install mobile app dependencies
    if (Test-Path "tapango/package.json") {
        Write-Host "Installing mobile app dependencies..." -ForegroundColor Yellow
        Push-Location "tapango"
        npm install
        Pop-Location
        Write-Host "✅ Mobile app dependencies installed" -ForegroundColor Green
    }
    
    # Install admin dashboard dependencies
    if (Test-Path "admin/package.json") {
        Write-Host "Installing admin dashboard dependencies..." -ForegroundColor Yellow
        Push-Location "admin"
        npm install
        Pop-Location
        Write-Host "✅ Admin dashboard dependencies installed" -ForegroundColor Green
    }
}

# Function to setup environment files
function Setup-EnvironmentFiles {
    Write-Host "⚙️  Setting up environment files..." -ForegroundColor Green
    
    # Mobile app environment
    if (-not (Test-Path "tapango/.env")) {
        if (Test-Path "tapango/.env.example") {
            Copy-Item "tapango/.env.example" "tapango/.env"
            Write-Host "📋 Copied tapango/.env.example to tapango/.env" -ForegroundColor Yellow
        } else {
            # Create basic .env file
            @"
# Supabase Configuration
EXPO_PUBLIC_SUPABASE_URL=your_supabase_project_url
EXPO_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# API Configuration
EXPO_PUBLIC_API_BASE_URL=http://localhost:3000

# Development Settings
EXPO_PUBLIC_ENVIRONMENT=development
"@ | Out-File -FilePath "tapango/.env" -Encoding UTF8
            Write-Host "📋 Created tapango/.env template" -ForegroundColor Yellow
        }
    } else {
        Write-Host "✅ tapango/.env already exists" -ForegroundColor Green
    }
    
    # Admin dashboard environment
    if (-not (Test-Path "admin/.env.local")) {
        if (Test-Path "admin/.env.local.example") {
            Copy-Item "admin/.env.local.example" "admin/.env.local"
            Write-Host "📋 Copied admin/.env.local.example to admin/.env.local" -ForegroundColor Yellow
        } else {
            # Create basic .env.local file
            @"
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Development Settings
NODE_ENV=development
"@ | Out-File -FilePath "admin/.env.local" -Encoding UTF8
            Write-Host "📋 Created admin/.env.local template" -ForegroundColor Yellow
        }
    } else {
        Write-Host "✅ admin/.env.local already exists" -ForegroundColor Green
    }
}

# Function to setup Supabase
function Setup-Supabase {
    if ($SkipSupabase) {
        Write-Host "⏭️  Skipping Supabase setup" -ForegroundColor Yellow
        return
    }

    Write-Host "🏗️  Setting up Supabase..." -ForegroundColor Green
    
    if (Test-Path "supabase/config.toml") {
        Write-Host "✅ Supabase already initialized" -ForegroundColor Green
    } else {
        Write-Host "Initializing Supabase..." -ForegroundColor Yellow
        supabase init
    }
    
    # Check if Docker is available for local development
    if (Test-Command docker) {
        Write-Host "🐳 Docker found - you can run 'supabase start' for local development" -ForegroundColor Green
    } else {
        Write-Host "⚠️  Docker not found - local Supabase development not available" -ForegroundColor Yellow
        Write-Host "   You can still connect to a remote Supabase project" -ForegroundColor Gray
    }
}

# Function to setup Git hooks
function Setup-GitHooks {
    Write-Host "🔧 Setting up Git hooks..." -ForegroundColor Green
    
    if (Test-Path ".git") {
        if (Test-Path ".husky") {
            Write-Host "✅ Git hooks already configured" -ForegroundColor Green
        } else {
            if (Test-Path "package.json") {
                npm run prepare 2>$null
                Write-Host "✅ Git hooks configured with Husky" -ForegroundColor Green
            }
        }
    } else {
        Write-Host "⚠️  Not a Git repository - skipping Git hooks setup" -ForegroundColor Yellow
    }
}

# Function to validate TypeScript configuration
function Validate-TypeScriptConfig {
    Write-Host "🔍 Validating TypeScript configuration..." -ForegroundColor Green
    
    $tsErrors = @()
    
    # Check mobile app TypeScript
    if (Test-Path "tapango/tsconfig.json") {
        Push-Location "tapango"
        $result = npx tsc --noEmit 2>&1
        if ($LASTEXITCODE -ne 0) {
            $tsErrors += "Mobile app TypeScript errors found"
        } else {
            Write-Host "✅ Mobile app TypeScript configuration valid" -ForegroundColor Green
        }
        Pop-Location
    }
    
    # Check admin dashboard TypeScript
    if (Test-Path "admin/tsconfig.json") {
        Push-Location "admin"
        $result = npx tsc --noEmit 2>&1
        if ($LASTEXITCODE -ne 0) {
            $tsErrors += "Admin dashboard TypeScript errors found"
        } else {
            Write-Host "✅ Admin dashboard TypeScript configuration valid" -ForegroundColor Green
        }
        Pop-Location
    }
    
    if ($tsErrors.Count -gt 0) {
        Write-Host "⚠️  TypeScript configuration issues found:" -ForegroundColor Yellow
        $tsErrors | ForEach-Object { Write-Host "   - $_" -ForegroundColor Gray }
        Write-Host "   Run 'npm run typecheck' in respective directories for details" -ForegroundColor Gray
    }
}

# Function to run linting
function Run-Linting {
    Write-Host "🔍 Running code linting..." -ForegroundColor Green
    
    # Lint mobile app
    if (Test-Path "tapango/package.json") {
        Push-Location "tapango"
        Write-Host "Linting mobile app..." -ForegroundColor Yellow
        npm run lint --silent
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Mobile app linting passed" -ForegroundColor Green
        } else {
            Write-Host "⚠️  Mobile app linting issues found" -ForegroundColor Yellow
        }
        Pop-Location
    }
    
    # Lint admin dashboard
    if (Test-Path "admin/package.json") {
        Push-Location "admin"
        Write-Host "Linting admin dashboard..." -ForegroundColor Yellow
        npm run lint --silent
        if ($LASTEXITCODE -eq 0) {
            Write-Host "✅ Admin dashboard linting passed" -ForegroundColor Green
        } else {
            Write-Host "⚠️  Admin dashboard linting issues found" -ForegroundColor Yellow
        }
        Pop-Location
    }
}

# Function to display next steps
function Show-NextSteps {
    Write-Host ""
    Write-Host "🎉 Development environment setup complete!" -ForegroundColor Blue
    Write-Host ""
    Write-Host "📋 Next steps:" -ForegroundColor Green
    Write-Host "1. Configure your Supabase credentials in .env files" -ForegroundColor White
    Write-Host "   - Get credentials from https://supabase.com/dashboard" -ForegroundColor Gray
    Write-Host ""
    Write-Host "2. Start development servers:" -ForegroundColor White
    Write-Host "   Mobile app:        cd tapango && npm start" -ForegroundColor Gray
    Write-Host "   Admin dashboard:   cd admin && npm run dev" -ForegroundColor Gray
    Write-Host ""
    Write-Host "3. Available scripts:" -ForegroundColor White
    Write-Host "   npm test           # Run tests" -ForegroundColor Gray
    Write-Host "   npm run lint       # Run linting" -ForegroundColor Gray
    Write-Host "   npm run typecheck  # Check TypeScript" -ForegroundColor Gray
    Write-Host ""
    Write-Host "4. For local Supabase development:" -ForegroundColor White
    Write-Host "   supabase start     # Start local Supabase (requires Docker)" -ForegroundColor Gray
    Write-Host "   supabase db reset  # Reset database with migrations" -ForegroundColor Gray
    Write-Host ""
    Write-Host "📚 Documentation:" -ForegroundColor Green
    Write-Host "   README.md          # Main project documentation" -ForegroundColor Gray
    Write-Host "   PROJECT_RULES.md   # Coding standards and rules" -ForegroundColor Gray
    Write-Host "   docs/api.md        # API documentation" -ForegroundColor Gray
    Write-Host ""
    Write-Host "🆘 Need help? Check the troubleshooting guide or contact the team." -ForegroundColor Yellow
}

# Main execution
try {
    Write-Host "TAPANGO Development Environment Setup" -ForegroundColor Blue
    Write-Host "=====================================" -ForegroundColor Blue
    Write-Host ""
    
    Install-NodeJS
    Install-GlobalTools
    Install-Dependencies
    Setup-EnvironmentFiles
    Setup-Supabase
    Setup-GitHooks
    
    # Optional validations (won't stop setup if they fail)
    try {
        Validate-TypeScriptConfig
        Run-Linting
    } catch {
        Write-Host "⚠️  Some validation steps failed, but setup can continue" -ForegroundColor Yellow
    }
    
    Show-NextSteps
    
} catch {
    Write-Host "❌ Setup failed: $($_.Exception.Message)" -ForegroundColor Red
    Write-Host "Please check the error above and try again." -ForegroundColor Yellow
    exit 1
}

Write-Host ""
Write-Host "Happy coding! 🚀" -ForegroundColor Blue
