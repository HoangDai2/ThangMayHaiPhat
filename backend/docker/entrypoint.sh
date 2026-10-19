#!/bin/sh
set -e

# Tạo storage link nếu chưa có
php artisan storage:link || true

# Phân quyền cho storage và cache
chown -R www-data:www-data /var/www/backend/storage /var/www/backend/bootstrap/cache || true
chmod -R 775 /var/www/backend/storage /var/www/backend/bootstrap/cache || true

exec "$@"
