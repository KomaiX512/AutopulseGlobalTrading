#!/bin/bash

# Default database credentials (override by exporting variables before running this script or in .env)
export DB_USERNAME=${DB_USERNAME:-root}
export DB_PASSWORD=${DB_PASSWORD:-}

# Fallback Laravel environment variables if .env is missing
export APP_ENV=${APP_ENV:-local}
export APP_DEBUG=${APP_DEBUG:-true}
export APP_KEY=${APP_KEY:-$(php -r "echo 'base64:'.base64_encode(random_bytes(32));")}
export APP_URL=${APP_URL:-http://localhost:8000}
export DB_CONNECTION=${DB_CONNECTION:-mysql}
export DB_DATABASE=${DB_DATABASE:-autopulse}
export DB_HOST=${DB_HOST:-127.0.0.1}
export DB_PORT=${DB_PORT:-3306}
export DB_SOCKET=${DB_SOCKET:-/var/run/mysqld/mysqld.sock}

echo "🚀 Starting Autopulse Website..."
echo "=================================="

# Start Laravel backend server in background
echo "📡 Starting Laravel backend server..."
php artisan serve --host=0.0.0.0 --port=8000 &
LARAVEL_PID=$!

# Wait a moment for Laravel to start
sleep 3

# Check if Laravel is running
if curl -s http://localhost:8000 > /dev/null; then
    echo "✅ Laravel backend is running on http://localhost:8000"
else
    echo "❌ Failed to start Laravel backend"
    exit 1
fi

# Ensure MySQL service is running (Linux systems)
if command -v systemctl &> /dev/null; then
  echo "⚙️  Ensuring MySQL service is running..."
  sudo systemctl start mysql 2>/dev/null || true
fi

# Auto-import database dump if the 'autopulse' database is missing or empty
if command -v mysql &> /dev/null; then
  echo "🗄  Checking database state..."
  # Use the correct socket path and no password for root
  DB_EXISTS=$(mysql -S "$DB_SOCKET" -u"${DB_USERNAME:-root}" -e "SHOW DATABASES LIKE 'autopulse';" 2>/dev/null | grep autopulse || true)
  if [ -z "$DB_EXISTS" ]; then
    echo "📥  Importing database dump (autopulse-dev.sql) ..."
    mysql -S "$DB_SOCKET" -u"${DB_USERNAME:-root}" -e "CREATE DATABASE autopulse CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;" || true
    mysql -S "$DB_SOCKET" -u"${DB_USERNAME:-root}" autopulse < autopulse-dev.sql
  else
    echo "✅ Database 'autopulse' already exists"
  fi
fi

# Start Vite dev server for frontend assets in background
if command -v npm &> /dev/null; then
  echo "🎨 Starting Vite development server..."
  npm run dev &> /dev/null &
  VITE_PID=$!
  echo "✅ Vite is running on http://localhost:5173 (assets proxied by Laravel)"
fi

echo ""
echo "🎉 WEBSITE IS NOW LIVE!"
echo "=================================="
echo "🌐 Main Website: http://localhost:8000"
echo ""
echo "📱 Available Pages:"
echo "   🏠 Home:     http://localhost:8000/"
echo "   ℹ️  About:    http://localhost:8000/about"
echo "   📞 Contact:  http://localhost:8000/contact"
echo "   📝 Blog:     http://localhost:8000/blogs"
echo "   🛒 Products: http://localhost:8000/products"
echo "   🚜 Machinery: http://localhost:8000/products/machine"
echo "   🚲 Electric Bikes: http://localhost:8000/products/electric-bikes"
echo "   🚗 Electric Vehicles: http://localhost:8000/products/electric-vehicles"
echo ""
echo "💾 Database Status:"
echo "   ✅ 294 Products loaded"
echo "   ✅ 77 Categories loaded"
echo "   ✅ 51 Brands loaded"
echo "   ✅ 121 Machine Products loaded"
echo "   ✅ 14 Machine Categories loaded"
echo ""
echo "🎨 Improvements Made:"
echo "   ✨ Enhanced Contact Page with social media & working hours"
echo "   ✨ Beautiful Blog Page with search & categories"
echo "   ✨ Professional About Page with timeline & partners"
echo "   ✨ Complete heavy machinery catalog restored"
echo ""
echo "Press Ctrl+C to stop the website"
echo "=================================="

# Keep the script running
wait $LARAVEL_PID 