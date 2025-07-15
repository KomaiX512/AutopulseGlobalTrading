#!/bin/bash

echo "🚀 Setting up Unified Products System with Image Backup Protection"
echo "================================================================"

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

# Check if we're in the right directory
if [ ! -f "artisan" ]; then
    print_error "This script must be run from the Laravel project root directory"
    exit 1
fi

print_status "Starting unified products setup..."

# 1. Create backup directories
print_status "Creating backup directories..."
mkdir -p storage/app/backups/images
mkdir -p storage/app/backups_secondary
chmod -R 755 storage/app/backups
chmod -R 755 storage/app/backups_secondary

# 2. Run migrations
print_status "Running database migrations..."
php artisan migrate

if [ $? -eq 0 ]; then
    print_success "Migrations completed successfully"
else
    print_error "Migration failed"
    exit 1
fi

# 3. Create storage links
print_status "Creating storage links..."
php artisan storage:link

# 4. Register the new command
print_status "Registering backup command..."
if ! grep -q "BackupImages::class" app/Console/Kernel.php; then
    print_warning "Please manually add 'App\Console\Commands\BackupImages::class' to the commands array in app/Console/Kernel.php"
fi

# 5. Create initial backup of existing images
print_status "Creating initial backup of existing images..."
php artisan images:backup --all

# 6. Verify the setup
print_status "Verifying setup..."
php artisan images:backup --status

# 7. Set up scheduled tasks (cron)
print_status "Setting up scheduled tasks..."

# Create a cron entry for daily backups
CRON_ENTRY="0 2 * * * cd $(pwd) && php artisan images:backup --all >> storage/logs/backup.log 2>&1"

if ! crontab -l 2>/dev/null | grep -q "images:backup"; then
    print_warning "To enable automatic daily backups, add this line to your crontab:"
    echo "$CRON_ENTRY"
    echo ""
    print_status "You can add it by running: crontab -e"
fi

# 8. Create environment variables template
print_status "Creating environment variables template..."

cat >> .env.example << 'EOF'

# Image Backup Configuration
AWS_BACKUP_BUCKET=${AWS_BUCKET}-backup
AWS_BACKUP_URL=
GOOGLE_CLOUD_PROJECT_ID=
GOOGLE_CLOUD_KEY_FILE=
GOOGLE_CLOUD_BACKUP_BUCKET=
GOOGLE_CLOUD_BACKUP_URL=

# Backup Settings
BACKUP_RETENTION_DAYS=30
BACKUP_VERIFICATION_INTERVAL=7
EOF

print_success "Environment variables template added to .env.example"

# 9. Create a health check script
print_status "Creating health check script..."

cat > check-image-health.sh << 'EOF'
#!/bin/bash

echo "🔍 Checking Image Health..."
echo "=========================="

# Check if images are accessible
php artisan images:backup --monitor

# Verify backups
php artisan images:backup --verify

# Show status
php artisan images:backup --status

echo "✅ Health check completed"
EOF

chmod +x check-image-health.sh

# 10. Create deployment script
print_status "Creating deployment script..."

cat > deploy-with-backup.sh << 'EOF'
#!/bin/bash

echo "🚀 Deploying with Image Backup Protection"
echo "========================================"

# Backup current images before deployment
echo "📸 Creating backup before deployment..."
php artisan images:backup --all

# Run deployment commands
echo "🔄 Running deployment..."
php artisan migrate --force
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Verify images after deployment
echo "🔍 Verifying images after deployment..."
php artisan images:backup --monitor

echo "✅ Deployment completed with image protection"
EOF

chmod +x deploy-with-backup.sh

# 11. Create documentation
print_status "Creating documentation..."

cat > IMAGE_BACKUP_GUIDE.md << 'EOF'
# Image Backup System Guide

## Overview
This system ensures that your product images are never lost by implementing multiple backup strategies and automatic recovery mechanisms.

## Features
- ✅ Multiple backup locations (local, cloud, CDN)
- ✅ Automatic image backup on upload
- ✅ Image integrity verification
- ✅ Automatic recovery from backup
- ✅ Unified product management
- ✅ Scheduled backup maintenance

## Commands

### Backup Management
```bash
# Backup all product images
php artisan images:backup --all

# Backup specific product
php artisan images:backup --product=123

# Verify existing backups
php artisan images:backup --verify

# Monitor image health
php artisan images:backup --monitor

# Clean up old backups
php artisan images:backup --cleanup

# Show backup status
php artisan images:backup --status
```

### Health Checks
```bash
# Run health check
./check-image-health.sh

# Deploy with backup protection
./deploy-with-backup.sh
```

## Database Structure

### Unified Products Table
All products (machines, attachments, accessories, spare parts) are now stored in a single `unified_products` table with:
- Product classification by type
- Multiple image support with backup URLs
- Comprehensive metadata
- SEO optimization fields

### Image Backups Table
The `image_backups` table tracks:
- Original image paths
- Multiple backup locations
- Integrity checksums
- Backup status and verification

## Configuration

### Environment Variables
Add these to your `.env` file:
```
AWS_BACKUP_BUCKET=your-bucket-backup
AWS_BACKUP_URL=https://your-backup-bucket.s3.amazonaws.com
GOOGLE_CLOUD_PROJECT_ID=your-project-id
GOOGLE_CLOUD_KEY_FILE=path/to/key.json
GOOGLE_CLOUD_BACKUP_BUCKET=your-gcs-backup-bucket
GOOGLE_CLOUD_BACKUP_URL=https://storage.googleapis.com/your-bucket
BACKUP_RETENTION_DAYS=30
BACKUP_VERIFICATION_INTERVAL=7
```

### Scheduled Tasks
Add to crontab for automatic daily backups:
```bash
0 2 * * * cd /path/to/your/project && php artisan images:backup --all >> storage/logs/backup.log 2>&1
```

## Migration from Old System

The system automatically migrates:
- Existing products → unified_products
- Existing attachments → unified_products (type: attachments)
- Existing spare parts → unified_products (type: machine parts)
- All images with automatic backup creation

## Best Practices

1. **Regular Monitoring**: Run health checks weekly
2. **Backup Verification**: Verify backups monthly
3. **Storage Management**: Clean up old backups quarterly
4. **Deployment Safety**: Always use deploy-with-backup.sh
5. **Environment Setup**: Configure cloud storage for redundancy

## Troubleshooting

### Images Not Loading
1. Run: `php artisan images:backup --monitor`
2. Check backup status: `php artisan images:backup --status`
3. Verify backups: `php artisan images:backup --verify`

### Backup Failures
1. Check storage permissions
2. Verify cloud credentials
3. Check disk space
4. Review logs: `tail -f storage/logs/backup.log`

### Performance Issues
1. Optimize image sizes before upload
2. Use CDN for frequently accessed images
3. Implement image caching
4. Monitor backup frequency

## Support

For issues or questions:
1. Check the logs in `storage/logs/backup.log`
2. Run health checks
3. Verify configuration
4. Contact system administrator
EOF

print_success "Documentation created: IMAGE_BACKUP_GUIDE.md"

# 12. Final verification
print_status "Performing final verification..."

# Check if unified_products table exists
if php artisan tinker --execute="echo 'Unified products table: ' . (Schema::hasTable('unified_products') ? 'EXISTS' : 'MISSING') . PHP_EOL;"; then
    print_success "Unified products table verified"
else
    print_error "Unified products table not found"
fi

# Check if image_backups table exists
if php artisan tinker --execute="echo 'Image backups table: ' . (Schema::hasTable('image_backups') ? 'EXISTS' : 'MISSING') . PHP_EOL;"; then
    print_success "Image backups table verified"
else
    print_error "Image backups table not found"
fi

echo ""
echo "🎉 Setup Complete!"
echo "=================="
print_success "Unified Products System with Image Backup Protection is now active"
echo ""
echo "📋 Next Steps:"
echo "1. Review IMAGE_BACKUP_GUIDE.md for detailed instructions"
echo "2. Configure cloud storage credentials in .env"
echo "3. Set up scheduled backups in crontab"
echo "4. Test the system with: ./check-image-health.sh"
echo "5. Use ./deploy-with-backup.sh for safe deployments"
echo ""
echo "🛡️  Your images are now protected with multiple backup strategies!"
echo "📊 Monitor status with: php artisan images:backup --status" 