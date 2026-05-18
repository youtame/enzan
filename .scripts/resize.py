import os
from PIL import Image

def process_images(input_dir, output_dir, long_side=1200):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    valid_extensions = ('.jpg', '.jpeg', '.png', '.webp')
    
    short_side = int(long_side * (3 / 4))

    for filename in os.listdir(input_dir):
        if not filename.lower().endswith(valid_extensions):
            continue
            
        img_path = os.path.join(input_dir, filename)
        base_name = os.path.splitext(filename)[0]
        output_path = os.path.join(output_dir, base_name + ".webp")

        with Image.open(img_path) as img:
            w, h = img.size
            format_ext = img.format.lower()

            is_landscape = w >= h
            tw, th = (long_side, short_side) if is_landscape else (short_side, long_side)

            if os.path.exists(output_path):
                with Image.open(output_path) as check_img:
                    if check_img.size == (tw, th):
                        print(f"Skip: {filename} (Already processed)")
                        continue

            target_ratio = tw / th
            current_ratio = w / h

            if current_ratio > target_ratio:
                new_w = int(h * target_ratio)
                offset = (w - new_w) // 2
                img = img.crop((offset, 0, offset + new_w, h))
            else:
                new_h = int(w / target_ratio)
                offset = (h - new_h) // 2
                img = img.crop((0, offset, w, offset + new_h))

            img = img.resize((tw, th), Image.LANCZOS)
            img.save(output_path, "WEBP", quality=85)
            print(f"Success: {filename} -> {tw}x{th}")

input_folder = '../docs/public/photos'
output_folder = '../docs/public/photos_output'
process_images(input_folder, output_folder)