<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

# Autopulse - Heavy Machinery Website

A professional Laravel + React (Inertia.js) application for heavy machinery export business.

## Professional Design System

### Color Scheme
- **Primary Yellow**: `#F59E0B` (Professional industrial theme)
- **Secondary Gray**: `#374151` (Professional contrast)
- **Accent Colors**: Consistent yellow/orange/gray palette
- **Background**: Clean white/light gray backgrounds

### Button System
- **Primary Buttons**: Yellow background with professional hover effects
- **Secondary Buttons**: Gray outline with hover fill
- **Outline Buttons**: Transparent with colored borders
- **Ghost Buttons**: Minimal styling for subtle actions

### Professional Components
- **Cards**: Rounded corners, subtle shadows, hover animations
- **Typography**: Consistent heading hierarchy with proper spacing
- **Animations**: Smooth transitions and micro-interactions
- **Layout**: Clean sections with proper spacing

## Cache Management

### Clear All Caches
```bash
# Clear Laravel caches
php artisan optimize:clear

# Clear individual caches
php artisan cache:clear
php artisan config:clear
php artisan route:clear
php artisan view:clear
```

### Browser Cache Issues
If you see the old homepage intermittently:
1. Hard refresh: `Ctrl+F5` (Windows/Linux) or `Cmd+Shift+R` (Mac)
2. Clear browser cache and cookies
3. Use incognito/private browsing mode
4. Run the cache clear commands above

## Development

### Start Development Servers
```bash
# Terminal 1: Laravel server
php artisan serve

# Terminal 2: Vite development server
npm run dev
```

### Access the Application
- **Main Application**: http://localhost:8000
- **Vite Dev Server**: http://localhost:5173 (assets only)

**Important**: Always use `localhost:8000` to view the complete application.

## Professional Features Implemented

### Homepage Sections
1. **Hero Section**: Professional video/image slider with statistics
2. **Machines by Body Type**: 7 categories with consistent styling
3. **Machines by Brand**: 6 major brands with professional cards
4. **Machines by Project**: Industry-specific categorization
5. **Attachments Section**: Equipment attachments showcase
6. **Shipments Showcase**: Recent shipments carousel
7. **Blog Preview**: Latest posts with newsletter signup
8. **WhatsApp Button**: Professional floating chat button

### Styling Consistency
- All buttons use the professional button system
- Consistent color scheme throughout
- Professional animations and transitions
- Mobile-responsive design
- Clean typography hierarchy

### Technical Improvements
- Removed inconsistent Ant Design styling
- Unified CSS custom properties
- Professional animation system
- Consistent spacing and layout
- Optimized for performance

## Troubleshooting

### Cache Issues
If changes don't appear immediately:
```bash
php artisan optimize:clear && npm run dev
```

### Icon Errors
All React Icons have been verified and updated to existing icons.

### Styling Inconsistencies
The new professional design system ensures consistent styling across all components.

## About Laravel

Laravel is a web application framework with expressive, elegant syntax. We believe development must be an enjoyable and creative experience to be truly fulfilling. Laravel takes the pain out of development by easing common tasks used in many web projects, such as:

- [Simple, fast routing engine](https://laravel.com/docs/routing).
- [Powerful dependency injection container](https://laravel.com/docs/container).
- Multiple back-ends for [session](https://laravel.com/docs/session) and [cache](https://laravel.com/docs/cache) storage.
- Expressive, intuitive [database ORM](https://laravel.com/docs/eloquent).
- Database agnostic [schema migrations](https://laravel.com/docs/migrations).
- [Robust background job processing](https://laravel.com/docs/queues).
- [Real-time event broadcasting](https://laravel.com/docs/broadcasting).

Laravel is accessible, powerful, and provides tools required for large, robust applications.

## Learning Laravel

Laravel has the most extensive and thorough [documentation](https://laravel.com/docs) and video tutorial library of all modern web application frameworks, making it a breeze to get started with the framework.

You may also try the [Laravel Bootcamp](https://bootcamp.laravel.com), where you will be guided through building a modern Laravel application from scratch.

If you don't feel like reading, [Laracasts](https://laracasts.com) can help. Laracasts contains thousands of video tutorials on a range of topics including Laravel, modern PHP, unit testing, and JavaScript. Boost your skills by digging into our comprehensive video library.

## Laravel Sponsors

We would like to extend our thanks to the following sponsors for funding Laravel development. If you are interested in becoming a sponsor, please visit the [Laravel Partners program](https://partners.laravel.com).

### Premium Partners

- **[Vehikl](https://vehikl.com/)**
- **[Tighten Co.](https://tighten.co)**
- **[WebReinvent](https://webreinvent.com/)**
- **[Kirschbaum Development Group](https://kirschbaumdevelopment.com)**
- **[64 Robots](https://64robots.com)**
- **[Curotec](https://www.curotec.com/services/technologies/laravel/)**
- **[Cyber-Duck](https://cyber-duck.co.uk)**
- **[DevSquad](https://devsquad.com/hire-laravel-developers)**
- **[Jump24](https://jump24.co.uk)**
- **[Redberry](https://redberry.international/laravel/)**
- **[Active Logic](https://activelogic.com)**
- **[byte5](https://byte5.de)**
- **[OP.GG](https://op.gg)**

## Contributing

Thank you for considering contributing to the Laravel framework! The contribution guide can be found in the [Laravel documentation](https://laravel.com/docs/contributions).

## Code of Conduct

In order to ensure that the Laravel community is welcoming to all, please review and abide by the [Code of Conduct](https://laravel.com/docs/contributions#code-of-conduct).

## Security Vulnerabilities

If you discover a security vulnerability within Laravel, please send an e-mail to Taylor Otwell via [taylor@laravel.com](mailto:taylor@laravel.com). All security vulnerabilities will be promptly addressed.

## License

The Laravel framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).
