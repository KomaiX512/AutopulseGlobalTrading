<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;
use App\Traits\OptimizedImages;

class UnifiedProduct extends Model
{
    use HasFactory, SoftDeletes, OptimizedImages;

    protected $fillable = [
        'name',
        'description',
        'features',
        'slug',
        'category_id',
        'brand_id',
        'product_type_id',
        'price',
        'stock_price',
        'stock',
        'discount',
        'model',
        'make',
        'weight',
        'year',
        'serial_number',
        'primary_image',
        'primary_image_backup',
        'additional_images',
        'additional_images_backup',
        'is_viewable',
        'is_business_product',
        'status',
        'meta_title',
        'meta_description',
        'meta_keywords'
    ];

    protected $casts = [
        'is_viewable' => 'boolean',
        'is_business_product' => 'boolean',
        'price' => 'decimal:2',
        'stock_price' => 'decimal:2',
        'stock' => 'decimal:2',
        'discount' => 'decimal:2',
        'weight' => 'decimal:2',
        'additional_images' => 'array',
        'additional_images_backup' => 'array',
    ];

    protected static function boot()
    {
        parent::boot();
        
        static::creating(function ($product) {
            if (empty($product->slug)) {
                $product->slug = Str::slug($product->name) . '-' . uniqid();
            }
        });
    }

    // Relationships
    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function brand()
    {
        return $this->belongsTo(Brand::class);
    }

    public function productType()
    {
        return $this->belongsTo(ProductType::class);
    }

    public function imageBackups()
    {
        return $this->morphMany(ImageBackup::class, 'imageable');
    }

    public function reviews()
    {
        return $this->hasMany(ProductReview::class, 'product_id');
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    public function scopeViewable($query)
    {
        return $query->where('is_viewable', true);
    }

    public function scopeByType($query, $typeId)
    {
        return $query->where('product_type_id', $typeId);
    }

    public function scopeInStock($query)
    {
        return $query->where('stock', '>', 0);
    }

    // Image Management Methods
    public function getPrimaryImageUrlAttribute()
    {
        // Try primary image first, then backup, then fallback
        if ($this->primary_image && file_exists(storage_path('app/' . $this->primary_image))) {
            return asset('storage/' . str_replace('public/', '', $this->primary_image));
        }
        
        if ($this->primary_image_backup) {
            return $this->primary_image_backup;
        }
        
        return '/images/placeholder-product.jpg';
    }

    public function getAdditionalImagesUrlsAttribute()
    {
        $urls = [];
        
        if ($this->additional_images) {
            foreach ($this->additional_images as $imagePath) {
                if (file_exists(storage_path('app/' . $imagePath))) {
                    $urls[] = asset('storage/' . str_replace('public/', '', $imagePath));
                }
            }
        }
        
        // Add backup images if local images are missing
        if ($this->additional_images_backup) {
            foreach ($this->additional_images_backup as $backupUrl) {
                if (!in_array($backupUrl, $urls)) {
                    $urls[] = $backupUrl;
                }
            }
        }
        
        return $urls;
    }

    public function getAllImagesUrlsAttribute()
    {
        $images = [$this->primary_image_url];
        $images = array_merge($images, $this->additional_images_urls);
        return array_filter($images); // Remove empty values
    }

    // Backup Management
    public function createImageBackup($imagePath, $isPrimary = false)
    {
        $filename = basename($imagePath);
        $fullPath = storage_path('app/' . $imagePath);
        
        if (!file_exists($fullPath)) {
            return false;
        }
        
        $fileSize = filesize($fullPath);
        $mimeType = mime_content_type($fullPath);
        $checksum = md5_file($fullPath);
        
        // Get image dimensions
        $imageInfo = getimagesize($fullPath);
        $width = $imageInfo[0] ?? null;
        $height = $imageInfo[1] ?? null;
        
        return $this->imageBackups()->create([
            'original_path' => $imagePath,
            'filename' => $filename,
            'mime_type' => $mimeType,
            'file_size' => $fileSize,
            'checksum' => $checksum,
            'width' => $width,
            'height' => $height,
            'is_primary' => $isPrimary,
            'image_type' => 'product',
            'backup_status' => 'pending'
        ]);
    }

    // Product Type Helpers
    public function isMachine()
    {
        return $this->product_type_id == 1; // Machine
    }

    public function isElectricBike()
    {
        return $this->product_type_id == 2; // Electric Bikes
    }

    public function isVehicle()
    {
        return $this->product_type_id == 3; // Vehicles
    }

    public function isMachinePart()
    {
        return $this->product_type_id == 4; // Machine Part
    }

    public function isVehiclePart()
    {
        return $this->product_type_id == 5; // Vehicle Part
    }

    public function isBikePart()
    {
        return $this->product_type_id == 6; // Bike Part
    }

    public function isAttachment()
    {
        return $this->product_type_id == 7; // Attachments & Accessories
    }

    // SEO Helpers
    public function getMetaTitleAttribute($value)
    {
        return $value ?: $this->name;
    }

    public function getMetaDescriptionAttribute($value)
    {
        return $value ?: Str::limit(strip_tags($this->description), 160);
    }
} 