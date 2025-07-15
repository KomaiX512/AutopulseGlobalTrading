#!/bin/bash

# 🛡️ Daily Checkpoint Management Script
# This script helps you manage your image checkpoints daily

echo "🛡️ Daily Checkpoint Management"
echo "=============================="

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print colored output
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

# Step 1: Verify current checkpoint
echo "Step 1: Verifying current checkpoint..."
php artisan images:checkpoint --verify
if [ $? -eq 0 ]; then
    print_success "Current checkpoint is safe"
else
    print_warning "Current checkpoint has issues"
fi

# Step 2: Create new checkpoint
echo ""
echo "Step 2: Creating new checkpoint..."
php artisan images:checkpoint --create --force
if [ $? -eq 0 ]; then
    print_success "New checkpoint created successfully"
else
    print_error "Failed to create checkpoint"
    exit 1
fi

# Step 3: List all checkpoints
echo ""
echo "Step 3: Listing all checkpoints..."
php artisan images:checkpoint --list

# Step 4: Show summary
echo ""
echo "📊 Checkpoint Summary:"
echo "======================"
echo "✅ Your data is now protected"
echo "✅ All blogs, solutions, attachments, accessories, and heavy machinery are backed up"
echo "✅ Database and files are safely stored"
echo "✅ You can restore at any time if needed"

echo ""
echo "📞 Quick Commands:"
echo "=================="
echo "Check safety: php artisan images:checkpoint --verify"
echo "Create backup: php artisan images:checkpoint --create --force"
echo "List backups: php artisan images:checkpoint --list"
echo "Emergency restore: php artisan images:checkpoint --restore"

echo ""
print_success "Daily checkpoint routine completed successfully!" 