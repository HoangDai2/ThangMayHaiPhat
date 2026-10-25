FROM php:8.3-fpm-alpine

# Cài đặt các thư viện hệ thống cần thiết
RUN apk add --no-cache \
    curl \
    libpng-dev \
    libjpeg-turbo-dev \
    freetype-dev \
    libzip-dev \
    zip \
    unzip \
    git \
    oniguruma-dev \
    icu-dev \
    linux-headers

# Cài đặt các extension PHP cần thiết cho Laravel và xử lý ảnh (Intervention Image)
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) \
        pdo_mysql \
        mbstring \
        exif \
        pcntl \
        bcmath \
        gd \
        zip \
        intl \
        opcache

# Cài Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/backend

# Copy mã nguồn
COPY . .

# Cài đặt PHP dependencies
RUN composer install --no-dev --optimize-autoloader --no-interaction

# Phân quyền thư mục
RUN chown -R www-data:www-data /var/www/backend/storage /var/www/backend/bootstrap/cache \
    && chmod -R 775 /var/www/backend/storage /var/www/backend/bootstrap/cache \
    && chmod +x /var/www/backend/docker/entrypoint.sh

EXPOSE 9000

ENTRYPOINT ["/var/www/backend/docker/entrypoint.sh"]
CMD ["php-fpm"]
