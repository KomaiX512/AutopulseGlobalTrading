# Product Page Components

This directory contains reusable components for building professional product pages with enhanced features.

## Components

### 1. ProductImageGallery

A responsive image gallery component with main image display, thumbnail navigation, and zoom functionality.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `images` | Array | `[]` | Array of image objects with `image_path` property |
| `fallbackImage` | String | `'/storage/images/default-product.jpg'` | Default image when no images available |
| `height` | String | `'400px'` | Height of the main image container |
| `showThumbnails` | Boolean | `true` | Whether to show thumbnail navigation |
| `thumbnailCount` | Number | `4` | Number of thumbnails to show at once |

#### Usage

```jsx
import ProductImageGallery from '../Components/ProductImageGallery';

// Basic usage
<ProductImageGallery images={product?.images} />

// Custom configuration
<ProductImageGallery 
    images={product?.images}
    height="500px"
    showThumbnails={true}
    thumbnailCount={5}
/>

// Compact version without thumbnails
<ProductImageGallery 
    images={product?.images}
    height="250px"
    showThumbnails={false}
/>
```

#### Features

- **Responsive Design**: Adapts to different screen sizes
- **Image Zoom**: Click on images to zoom and view in full screen
- **Thumbnail Navigation**: Navigate through multiple images
- **Fallback Support**: Shows default image when no images available
- **Loading States**: Displays loading placeholder while images load
- **Touch Support**: Swipe navigation on mobile devices

### 2. ProductSpecificationTable

A flexible specification table component that displays product details in a clean, professional format.

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `product` | Object | `{}` | Product object with specification data |
| `title` | String | `'Specifications'` | Table title |
| `customFields` | Array | `[]` | Additional custom specification fields |
| `showDefaults` | Boolean | `true` | Whether to show default specification fields |

#### Usage

```jsx
import ProductSpecificationTable from '../Components/ProductSpecificationTable';

// Basic usage with default fields
<ProductSpecificationTable product={product} />

// Custom title
<ProductSpecificationTable 
    product={product} 
    title="Technical Specifications" 
/>

// With custom fields
const customSpecs = [
    {
        key: 'engine_power',
        parameter: 'Engine Power',
        details: product?.engine_power ? `${product.engine_power} HP` : null,
        condition: () => product?.engine_power
    }
];

<ProductSpecificationTable 
    product={product}
    customFields={customSpecs}
/>

// Only custom fields (no defaults)
<ProductSpecificationTable 
    product={product}
    showDefaults={false}
    customFields={customSpecs}
/>
```

#### Default Fields

The component automatically includes these fields when available:

- Model
- Condition (defaults to "Used, Excellent")
- Year
- Operating Weight
- Category
- Brand
- Price
- Location (defaults to "China")
- Availability (based on stock)

#### Custom Field Structure

```jsx
{
    key: 'unique_key',           // Unique identifier
    parameter: 'Display Name',   // Label shown in table
    details: 'Value',           // Value to display
    condition: () => boolean    // Function to determine if field should show
}
```

### 3. ProductPageExample

A demonstration component showing various ways to use the image gallery and specification table components.

#### Usage

```jsx
import ProductPageExample from '../Components/ProductPageExample';

<ProductPageExample 
    product={product} 
    productType="excavator" 
/>
```

## Product Page Structure

The enhanced product page follows this structure:

1. **Hero Section**: Category image with overlay title
2. **Product Title**: Large, prominent product name
3. **Main Content Grid**:
   - Left: Image gallery with main image and thumbnails
   - Right: Specifications table and key features
4. **Action Buttons**: WhatsApp contact button
5. **Description Section**: Detailed product description
6. **Related Products**: Suggested similar items

## Styling

The components use SCSS for styling with:

- **Professional Design**: Clean, modern appearance
- **Responsive Layout**: Works on all device sizes
- **Consistent Branding**: Uses brand colors and typography
- **Smooth Animations**: Hover effects and transitions
- **Accessibility**: Proper contrast and keyboard navigation

## Best Practices

### Image Optimization

- Use high-quality images (minimum 800x600px)
- Optimize file sizes for web
- Provide alt text for accessibility
- Include multiple angles/views

### Specification Data

- Keep parameter names consistent
- Use appropriate units (kg, HP, m³, etc.)
- Provide fallback values for missing data
- Group related specifications together

### Responsive Design

- Test on various screen sizes
- Ensure touch-friendly navigation
- Optimize loading performance
- Consider mobile-first approach

## Examples

### Excavator Product Page

```jsx
const excavatorSpecs = [
    {
        key: 'bucket_capacity',
        parameter: 'Bucket Capacity',
        details: product?.bucket_capacity ? `${product.bucket_capacity} m³` : null,
        condition: () => product?.bucket_capacity
    },
    {
        key: 'max_digging_depth',
        parameter: 'Max Digging Depth',
        details: product?.max_digging_depth ? `${product.max_digging_depth} m` : null,
        condition: () => product?.max_digging_depth
    }
];

<Row gutter={[24, 24]}>
    <Col xs={24} lg={12}>
        <ProductImageGallery 
            images={product?.images}
            height="400px"
        />
    </Col>
    <Col xs={24} lg={12}>
        <ProductSpecificationTable 
            product={product}
            title="Excavator Specifications"
            customFields={excavatorSpecs}
        />
    </Col>
</Row>
```

### Spare Parts Product Page

```jsx
const sparePartSpecs = [
    {
        key: 'part_number',
        parameter: 'Part Number',
        details: product?.part_number,
        condition: () => product?.part_number
    },
    {
        key: 'compatibility',
        parameter: 'Compatible Models',
        details: product?.compatibility,
        condition: () => product?.compatibility
    }
];

<ProductSpecificationTable 
    product={product}
    title="Part Specifications"
    customFields={sparePartSpecs}
/>
```

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+
- Mobile browsers (iOS Safari, Chrome Mobile)

## Dependencies

- React 16.8+
- Ant Design 4.0+
- React Slick 0.28+
- Slick Carousel CSS 