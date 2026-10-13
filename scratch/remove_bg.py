from PIL import Image
import numpy as np

def remove_white_background(input_path, output_path, threshold=245, softness=25):
    img = Image.open(input_path).convert('RGBA')
    data = np.array(img, dtype=np.float32)
    
    r = data[:, :, 0]
    g = data[:, :, 1]
    b = data[:, :, 2]
    
    # Calculate distance from white (255, 255, 255)
    # Brightness / minimum distance from white
    min_dist = 255.0 - np.minimum(np.minimum(r, g), b)
    
    # Calculate alpha
    # If min_dist is 0 (pure white), alpha is 0
    # If min_dist >= softness, alpha is 1
    alpha = np.clip(min_dist / softness, 0.0, 1.0)
    
    # For very bright pixels close to threshold, fade alpha
    whiteness = (r + g + b) / 3.0
    mask_white = whiteness > threshold
    fade = np.clip((255.0 - whiteness) / (255.0 - threshold), 0.0, 1.0)
    alpha[mask_white] = np.minimum(alpha[mask_white], fade[mask_white])
    
    # Unmultiply white to prevent white halo fringe
    # C = alpha * F + (1 - alpha) * 255 => F = (C - (1 - alpha) * 255) / alpha
    safe_alpha = np.maximum(alpha, 0.01)[:, :, np.newaxis]
    unmultiplied = (data[:, :, :3] - (1.0 - safe_alpha) * 255.0) / safe_alpha
    unmultiplied = np.clip(unmultiplied, 0.0, 255.0)
    
    result = np.zeros_like(data, dtype=np.uint8)
    result[:, :, :3] = np.uint8(unmultiplied)
    result[:, :, 3] = np.uint8(alpha * 255.0)
    
    out_img = Image.fromarray(result, 'RGBA')
    out_img.save(output_path, 'PNG')
    print(f"Saved transparent logo to {output_path}")

# Backup original
import shutil
shutil.copyfile('frontend/public/logohp.png', 'frontend/public/logohp_backup.png')

# Process logohp.png and logo1.png
remove_white_background('frontend/public/logohp.png', 'frontend/public/logohp.png')
remove_white_background('frontend/public/logo1.png', 'frontend/public/logo1.png')

# Also let's create a brightened / light logo version for ultra dark mobile hero if needed
img = Image.open('frontend/public/logohp.png')
print("Complete!")
