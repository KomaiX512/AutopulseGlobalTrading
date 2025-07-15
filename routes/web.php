<?php

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\BrandController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\AttachmentController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\FAQController;
use App\Http\Controllers\HomeSettingController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductImageController;
use App\Http\Controllers\ProductReviewController;
use App\Http\Controllers\ProductTypeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\QueryController;
use App\Http\Controllers\UtilitiesController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\StripeController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\UserReviewsController;
use App\Http\Controllers\SolutionController;




Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::get('/track', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('track');

Route::get('/about', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('about.page');

Route::get('/contact', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('contact.page');

Route::get('/products/{slug?}', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('product.page');

Route::get('/products', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('products.list');


Route::get('/privacy-policy', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('privacy');

Route::get('/payment/successfull', function () {

    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('payment_success');

Route::get('/product/{slug}', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('product.single');

Route::get('/attachment/{slug}', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('attachment.single');


Route::get('/products/{slug}/search', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('product.search.home');

Route::get('/attachments', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('attachments.page');



// ****customer routes**************


Route::get('/parts', function () {
    return Inertia::render('SpareParts', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('parts.home');

Route::get('/parts/track', function () {
    return Inertia::render('SpareParts', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('parts.track');

Route::get('/parts/about', function () {
    return Inertia::render('SpareParts', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('parts.about.page');

Route::get('/parts/contact', function () {
    return Inertia::render('SpareParts', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('parts.contact.page');

Route::get('/parts/products/{slug?}', function () {
    return Inertia::render('SpareParts', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('parts.product.page');

Route::get('/parts/products', function () {
    return Inertia::render('SpareParts', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('parts.products.list');


Route::get('/parts/privacy-policy', function () {
    return Inertia::render('SpareParts', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('parts.privacy');

Route::get('/parts/payment/successfull', function () {

    return Inertia::render('SpareParts', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('parts.payment_success');

Route::get('/parts/product/{slug}', function () {
    return Inertia::render('SpareParts', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('parts.product.single');



Route::get('/parts/products/{slug}/search', function () {
    return Inertia::render('SpareParts', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('product.search.spare');

Route::get('/parts/attachments', function () {
    return Inertia::render('SpareParts', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('parts.attachments.page');




// ******Other Routes**********



Route::get('/blogs/{id?}', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('blogs.view');


Route::get('/search-products', [ProductController::class, 'searchProducts']);

Route::get('/dashboard/home', function () {

    return Inertia::render('DashRoot');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/dashboard/{link?}/{link2?}/{link3?}/{link4?}/{link5?}', function () {

    return Inertia::render('DashRoot');
})->middleware(['auth', 'verified'])->name('dashroot');


Route::middleware('auth')->group(function () {

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


Route::prefix('api')->group(function () {

    Route::get('get/category/{id?}', [CategoryController::class, 'getCategory'])->name('get.category');
    Route::get('get/categories', [CategoryController::class, 'index'])->name('get.category.list');
    Route::get('get/home/categories', [CategoryController::class, 'homeCategories'])->name('get.home.categories');
    Route::get('get/attachment/{id?}', [AttachmentController::class, 'getAttachment'])->name('get.attachment');
    Route::get('get/attachments', [AttachmentController::class, 'index'])->name('get.attachment.list');
    Route::get('get/home/attachments', [AttachmentController::class, 'homeAttachments'])->name('get.home.attachments');
    Route::get('filter/attachments', [AttachmentController::class, 'filterAttachments'])->name('get.filter.attachments');
    Route::get('get/attachment/categories', [AttachmentController::class, 'getAttachmentCategories'])->name('get.attachment.categories');
    Route::get('test/attachment/categories', function() { return response()->json(['test' => 'working', 'time' => now()]); });
    Route::get('get/attachment/categories/fixed', function() { 
        // Get all viewable "Attachments & Accessories" categories, regardless of whether they have attachments
        $categories = App\Models\Category::where('product_type_id', 7)
            ->where('is_viewable', 1)
            ->orderBy('name')
            ->get();
        return response()->json($categories);
    });
    Route::get('attachment/details/{slug}', [AttachmentController::class, 'getAttachmentDetails'])->name('attachment.details');
    Route::get('attachment/related/{slug}', [AttachmentController::class, 'getRelatedAttachments'])->name('attachment.related');
    Route::get('get/products/{id?}', [ProductController::class, 'index'])->name('get.products');
    Route::get('get/product/{slug?}', [ProductController::class, 'getProduct'])->name('get.product');
    Route::get('get/home/products', [ProductController::class, 'home_products'])->name('get.products.home');
    Route::get('get/home/orders', [ProductController::class, 'home_orders'])->name('home.orders');
    Route::get('get/product-types', [ProductTypeController::class, 'index'])->name('get.product.types');
});


Route::prefix('api')->group(function () {

    Route::get('get/reviews/{id}', [ProductReviewController::class, 'index'])->name('get.product.reviews');
    Route::post('save/review/{id}', [ProductReviewController::class, 'store'])->name('save.product.reviews');
    Route::post('update/review/{id}', [ProductReviewController::class, 'update'])->name('update.product.reviews');
    Route::delete('delete/review/{id}', [ProductReviewController::class, 'destroy'])->name('delete.product.reviews');
});

Route::prefix('api/user')->group(function () {

    Route::get('get/reviews', [UserReviewsController::class, 'index'])->name('get.user.reviews');
    Route::post('save/review', [UserReviewsController::class, 'store'])->name('save.user.reviews');
    Route::post('update/review', [UserReviewsController::class, 'update'])->name('update.user.reviews');
    Route::delete('delete/review/{id}', [UserReviewsController::class, 'destroy'])->name('delete.user.reviews');
});


Route::prefix('api/user')->group(function () {

    Route::get('get/faqs', [FAQController::class, 'index'])->name('get.user.faqs');
    Route::post('save/faqs', [FAQController::class, 'store'])->name('save.user.faqs');
    Route::post('update/faqs', [FAQController::class, 'update'])->name('update.user.faqs');
    Route::delete('delete/faqs/{id}', [FAQController::class, 'destroy'])->name('delete.user.faqs');
});

Route::prefix('api')->group(function () {

    Route::get('get/blogs/{slug?}', [BlogController::class, 'index'])->name('get.home.blogs');
    Route::post('save/blogs', [BlogController::class, 'store'])->name('save.home.blogs');
    Route::post('update/blog', [BlogController::class, 'update'])->name('update.home.blog');
    Route::delete('delete/blog/{id}', [BlogController::class, 'destroy'])->name('delete.home.blog');
});

Route::prefix('api')->group(function () {

    Route::get('get/slides/{view}', [HomeSettingController::class, 'getSlides'])->name('get.home.slides');
    Route::post('save/slide', [HomeSettingController::class, 'storeSlides'])->name('save.home.slides');
    Route::post('update/slide/{id}', [HomeSettingController::class, 'updateSlides'])->name('update.home.slides');
    Route::delete('delete/slide/{id}', [HomeSettingController::class, 'destroySlides'])->name('delete.home.slides');
    Route::get('get/all/settings', [HomeSettingController::class, 'getHomeSettings'])->name('get.home.settings');
    Route::post('save/contact/content', [HomeSettingController::class, 'saveContactHTML'])->name('contact.us.html');
    Route::post('save/about/content', [HomeSettingController::class, 'saveAboutHTML'])->name('about.us.html');
});


Route::prefix('api')->group(function () {

    Route::get('filter/products', [ProductController::class, 'filterProducts'])->name('get.filter.products'); // Use GET method
    Route::get('filter/product/type/{slug}', [ProductController::class, 'filterOnProdType'])->name('get.filter.products.type'); // Use GET method
    Route::get('/products/related/{slug}', [ProductController::class, 'getRelatedProducts'])->name('get.related.products');
});



Route::prefix('api')->group(function () {

    Route::post('queries', [QueryController::class, 'store'])->name('store.queries');
    Route::get('queries', [QueryController::class, 'filterQueries'])->name('get.queries');
    Route::post('queries/{id}/reply', [QueryController::class, 'reply'])->name('get.query.single');
    Route::post('queries/{id}/status', [QueryController::class, 'changeStatus'])->name('update.query.status');
    Route::delete('queries/{id}', [QueryController::class, 'destroy'])->name('delete.queries');
});


Route::prefix('api')->group(function () {

    Route::get('/get/brands/{id?}', [BrandController::class, 'index'])->name('get.brands');

    Route::post('/save/brand', [BrandController::class, 'store'])->name('save.brands');

    Route::post('update/brand', [BrandController::class, 'update'])->name('update.brands');

    Route::delete('delete/brand/{id}', [BrandController::class, 'destroy'])->name('delete.brands');
});


Route::prefix('api')->group(function () {

    Route::get('/get/product-type/cats-brands/{slug}', [ProductTypeController::class, 'getBrandsAndCats'])->name('get.producs.categories.combined');
    Route::get('/get/product-types', [ProductTypeController::class, 'index'])->name('get.product.types');
});


Route::middleware('auth')->group(function () {


    Route::get('/logout', [AuthenticatedSessionController::class, 'destroy'])->name('user.logout');

    Route::prefix('api')->group(function () {

        Route::controller(ProductController::class)->group(function () {

            Route::post('save/product', 'store')->name('save.product.details');
            Route::post('update/product', 'update')->name('update.product.details');
            Route::delete('delete/product/{id?}', 'destroy')->name('delete.product.details');
        });

        Route::controller(CategoryController::class)->group(function () {
            Route::post('save/category', 'store')->name('save.category.details');
            Route::post('update/category', 'update')->name('update.category.details');
            Route::delete('delete/category/{id?}', 'destroy')->name('delete.category.details');
        });

        Route::controller(AttachmentController::class)->group(function () {
            Route::post('save/attachment', 'store')->name('save.attachment.details');
            Route::post('update/attachment/{id}', 'update')->name('update.attachment.details');
            Route::delete('delete/attachment/{id}', 'destroy')->name('delete.attachment.details');
            Route::get('get/attachment/{id}', 'getAttachment')->name('get.attachment');
        });

        Route::controller(TransactionController::class)->group(function () {
            Route::get('get/transactions', 'index')->name('get.transactions');
        });

        Route::controller(OrderController::class)->group(function () {
            Route::get('get/all/orders/{id?}', 'orders')->name('get.all.orders');
        });

        Route::controller(UtilitiesController::class)->group(function () {
            Route::post('update/order/status', 'updateOrderStatus')->name('update.order.status');
            Route::post('upload/file', 'uploadFile')->name('update.file');
        });

        // Add CSRF refresh endpoint
        Route::get('refresh-csrf', function () {
            return response()->json(['success' => true, 'message' => 'CSRF token refreshed']);
        })->name('refresh.csrf');


        Route::controller(ProductImageController::class)->group(function () {
            Route::post('save/product/images', 'uploadImages')->name('save.product.images');
            Route::delete('/product/images/delete/{id?}', 'deleteImage')->name('delete.product.images');
        });

        Route::controller(CartController::class)->group(function () {
            Route::post('cart/add', 'addToCart')->name('add.cart.items');
            Route::get('cart/items', 'getCartItems')->name('get.cart.items');
            Route::post('cart/remove', 'removeFromCart')->name('remove.cart.items');
            Route::post('cart/change/quantity', 'changeQuantity')->name('change.cart.quantity');
        });

        Route::controller(UtilitiesController::class)->group(function () {

            Route::post('get/checkout_step', 'index')->name('get.checkout.step');
            Route::post('update/checkout_step', 'update')->name('update.checkout.steap');
        });

        Route::controller(RegisteredUserController::class)->group(function () {

            Route::post('update/user/details', 'update')->name('update.user.details');
        });
    });
});


Route::controller(StripeController::class)->group(function () {
    Route::post('/checkout/product', 'checkout')->name('checkout.product');
    Route::get('/payment/success', 'paymentSuccess')->name('payment.success');
    Route::get('/payment/cancel', 'paymentCancel')->name('payment.cancel');
    Route::get('/send/mail', 'sendMail')->name('send.mail');
});


Route::view('/checkout/test', 'checkout');

Route::view('/successs', 'checkout')->name('success.test');
Route::view('/cancell', 'checkout')->name('checkout.test');

Route::get('/solutions', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('solutions.list');

Route::get('/solutions/{slug}', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('solutions.show');



// Add Solutions API routes
Route::prefix('api')->group(function () {
    Route::get('get/home/solutions', [SolutionController::class, 'homeSolutions'])->name('get.home.solutions');
    Route::get('solution/details/{slug}', [SolutionController::class, 'solutionDetails'])->name('solution.details');
});

// Add admin solutions management routes (moved from routes/api.php because api.php is not loaded)
Route::middleware('auth')->group(function () {
    Route::prefix('api')->group(function () {
        Route::prefix('admin/solutions')->group(function () {
            Route::get('/', [App\Http\Controllers\SolutionController::class, 'index']);
            Route::post('/', [App\Http\Controllers\SolutionController::class, 'store']);
            Route::get('/{id}', [App\Http\Controllers\SolutionController::class, 'show']);
            Route::put('/{id}', [App\Http\Controllers\SolutionController::class, 'update']);
            Route::delete('/{id}', [App\Http\Controllers\SolutionController::class, 'destroy']);

            // product assignment
            Route::get('/products/available', [App\Http\Controllers\SolutionController::class, 'getAvailableProducts']);
            Route::post('/{id}/products/assign', [App\Http\Controllers\SolutionController::class, 'assignProducts']);
            Route::post('/{id}/products/remove', [App\Http\Controllers\SolutionController::class, 'removeProducts']);
        });
    });
});

require __DIR__ . '/auth.php';
