#!/bin/bash
set -e

# ==============================================================================
# Script tự động cập nhật & triển khai Thang Máy Hải Phát trên VPS (Docker)
# ==============================================================================

BRANCH="release/v1.0.2"

echo "========================================================"
echo "🚀 [1/4] Kéo code mới nhất từ nhánh $BRANCH..."
echo "========================================================"
git fetch origin
git checkout $BRANCH
git pull origin $BRANCH

echo ""
echo "========================================================"
echo "🐳 [2/4] Build lại & khởi chạy Docker containers..."
echo "========================================================"
docker compose up -d --build

echo ""
echo "========================================================"
echo "⚡ [3/4] Cập nhật Database & tối ưu cache Backend..."
echo "========================================================"
docker compose exec -T backend php artisan migrate --force
docker compose exec -T backend php artisan optimize:clear
docker compose exec -T backend php artisan storage:link || true

echo ""
echo "========================================================"
echo "✅ [4/4] Trạng thái các dịch vụ:"
echo "========================================================"
docker compose ps

echo ""
echo "🎉 Triển khai cập nhật code thành công!"
