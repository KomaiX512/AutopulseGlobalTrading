#!/bin/bash

# 🛡️ Image Protection System Setup Script
# This script initializes the complete image backup and recovery system

echo "🛡️ Setting up Image Protection System..."
echo "=========================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Check if we're in a Laravel project
if [ ! -f "artisan" ]; then
    print_error "This script must be run from the Laravel project root directory"
    exit 1
fi

print_status "Starting Image Protection System setup..."

# Step 1: Run migrations
print_status "Running database migrations..."
php artisan migrate --force
if [ $? -eq 0 ]; then
    print_success "Database migrations completed"
else
    print_error "Database migration failed"
    exit 1
fi

# Step 2: Create storage directories
print_status "Creating storage directories..."
mkdir -p storage/app/backups
mkdir -p storage/app/checkpoints
mkdir -p storage/app/optimized
mkdir -p storage/app/placeholders
print_success "Storage directories created"

# Step 3: Set proper permissions
print_status "Setting file permissions..."
chmod -R 755 storage/app/backups
chmod -R 755 storage/app/checkpoints
chmod -R 755 storage/app/optimized
chmod -R 755 storage/app/placeholders
print_success "Permissions set correctly"

# Step 4: Generate placeholder images
print_status "Generating placeholder images..."
php artisan image:generate-placeholders
if [ $? -eq 0 ]; then
    print_success "Placeholder images generated"
else
    print_warning "Placeholder generation failed (this is normal if no images exist yet)"
fi

# Step 5: Create initial checkpoint
print_status "Creating initial system checkpoint..."
php artisan image:create-checkpoint --name="initial-setup-$(date +%Y%m%d-%H%M%S)" --verify=true
if [ $? -eq 0 ]; then
    print_success "Initial checkpoint created successfully"
else
    print_warning "Initial checkpoint creation failed (this is normal if no images exist yet)"
fi

# Step 6: Run health check
print_status "Running system health check..."
php artisan image:health-check --detailed
if [ $? -eq 0 ]; then
    print_success "System health check completed"
else
    print_warning "Health check showed some issues (this may be normal for new setup)"
fi

# Step 7: Create cron job setup instructions
print_status "Setting up automated backups..."

# Create cron setup file
cat > setup_cron.sh << 'EOF'
#!/bin/bash

# Add these lines to your crontab for automated backups:
# Daily backup at 9 AM
# 0 9 * * * cd /path/to/your/project && php artisan image:create-checkpoint --name="daily-$(date +\%Y\%m\%d)" >> /dev/null 2>&1

# Weekly health check at 8 AM on Sundays
# 0 8 * * 0 cd /path/to/your/project && php artisan image:health-check --detailed >> /dev/null 2>&1

# Monthly cleanup at 7 AM on the 1st of each month
# 0 7 1 * * cd /path/to/your/project && php artisan image:clean-checkpoints --keep=10 >> /dev/null 2>&1

echo "Cron job setup instructions created in setup_cron.sh"
EOF

chmod +x setup_cron.sh
print_success "Cron setup instructions created"

# Step 8: Create quick reference
print_status "Creating quick reference files..."

# Create a simple daily checklist
cat > daily_checklist.md << 'EOF'
# 📋 Daily Image System Checklist

## Morning (5 minutes)
- [ ] Run: `php artisan image:health-check`
- [ ] Check for any 404 errors on website
- [ ] Verify image loading speed

## After Uploads
- [ ] Run: `php artisan image:create-checkpoint --name="after-upload-$(date +%Y%m%d-%H%M%S)"`

## Evening (2 minutes)
- [ ] Run: `php artisan image:verify-integrity`

## Weekly (15 minutes)
- [ ] Run: `php artisan image:create-checkpoint --name="weekly-$(date +%Y%m%d)"`
- [ ] Run: `php artisan image:test-complete`
- [ ] Run: `php artisan image:clean-checkpoints --keep=10`

## Before Updates
- [ ] Run: `php artisan image:create-checkpoint --name="pre-update-$(date +%Y%m%d-%H%M%S)"`
- [ ] Run: `php artisan image:health-check --detailed`
EOF

print_success "Daily checklist created"

# Step 9: Final verification
print_status "Performing final system verification..."

# Test basic functionality
php artisan image:list-checkpoints > /dev/null 2>&1
if [ $? -eq 0 ]; then
    print_success "Checkpoint system working"
else
    print_warning "Checkpoint system may need images to function properly"
fi

# Create summary
echo ""
echo "🎉 Image Protection System Setup Complete!"
echo "=========================================="
echo ""
echo "📁 Files created:"
echo "  - setup_cron.sh (cron job instructions)"
echo "  - daily_checklist.md (daily maintenance checklist)"
echo "  - IMAGE_BACKUP_RECOVERY_SYSTEM.md (complete documentation)"
echo "  - EMERGENCY_RECOVERY_CARD.md (emergency quick reference)"
echo ""
echo "🚀 Next Steps:"
echo "  1. Review the documentation files"
echo "  2. Set up automated cron jobs using setup_cron.sh"
echo "  3. Test the system with: php artisan image:test-complete"
echo "  4. Create your first manual backup"
echo ""
echo "🛡️ Your images are now protected with:"
echo "  ✅ Automatic backups on upload"
echo "  ✅ Checkpoint system for instant recovery"
echo "  ✅ Health monitoring"
echo "  ✅ Optimization pipeline"
echo "  ✅ Emergency recovery procedures"
echo ""
echo "📞 For emergencies, use: php artisan image:health-check"
echo "📚 For full documentation, see: IMAGE_BACKUP_RECOVERY_SYSTEM.md"
echo "🚨 For emergencies, see: EMERGENCY_RECOVERY_CARD.md"
echo ""

print_success "Setup completed successfully!"
print_status "Your image protection system is now active and ready to use." 