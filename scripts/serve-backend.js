const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

// Tự động tìm PHP 8.3 trong Laragon nếu máy đang trỏ PHP phiên bản cũ hơn
const laragonPhp83 = 'C:\\laragon\\bin\\php\\php-8.3.32-Win32-vs16-x64\\php.exe';
const phpBin = fs.existsSync(laragonPhp83) ? laragonPhp83 : 'php';
const backendDir = path.resolve(__dirname, '..', 'backend');

const child = spawn(phpBin, ['artisan', 'serve'], {
  cwd: backendDir,
  stdio: 'inherit',
  shell: true,
});

child.on('exit', (code) => {
  process.exit(code || 0);
});
