#!/usr/bin/env bash
# Generate placeholder images for all image paths referenced in DB so no 404s
# Requires: imagemagick 'convert', mysql CLI with root no-password (adjust if needed)

set -e
DB_USER="root"
DB_SOCK="/var/run/mysqld/mysqld.sock"
DB_NAME="autopulse"

# Query all relevant image columns and output unique paths
SQL="
SELECT image AS path FROM products WHERE image IS NOT NULL AND image!='';
SELECT image_path AS path FROM product_images WHERE image_path IS NOT NULL AND image_path!='';
SELECT image AS path FROM attachments WHERE image IS NOT NULL AND image!='';
SELECT image AS path FROM categories WHERE image IS NOT NULL AND image!='';
SELECT logo AS path FROM brands WHERE logo IS NOT NULL AND logo!='';
SELECT image AS path FROM blogs WHERE image IS NOT NULL AND image!='';
SELECT image AS path FROM sliders WHERE image IS NOT NULL AND image!='';
"

mapfile -t paths < <(mysql -u"$DB_USER" -S "$DB_SOCK" -N -D "$DB_NAME" -e "$SQL" | sort -u)

BASE="storage/app/public"
mkdir -p "$BASE"

for rel in "${paths[@]}"; do
  # strip leading 'public/' if present
  clean=${rel#public/}
  dest="$BASE/$clean"
  if [[ ! -f "$dest" ]]; then
    dir=$(dirname "$dest")
    mkdir -p "$dir"
    ext="${dest##*.}"
    # choose bg color based on ext
    color="lightgray"
    [[ "$ext" == "png" ]] && color="lightyellow"
    text=$(basename "$clean")
    if convert -size 600x400 xc:"$color" -pointsize 20 -gravity center -draw "text 0,0 '$text'" "$dest" 2>/dev/null; then
      echo "Created placeholder $dest"
    else
      # fallback to generic placeholder
      placeholder="public/images/placeholder-product.jpg"
      [[ "$rel" == *"categories"* ]] && placeholder="public/images/placeholder-category.jpg"
      mkdir -p "$(dirname "$dest")"
      cp "$placeholder" "$dest"
      echo "Copied generic placeholder to $dest"
    fi
  fi
done

echo "Placeholder generation complete. Total created: $(ls -1q $BASE | wc -l)" 