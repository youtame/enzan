import os
from PIL import Image

def get_image_resolutions(directory_path):
    valid_extensions = ('.jpg', '.jpeg', '.png', '.webp', '.gif')
    
    print(f"{'ファイル名':<30} | {'解像度 (幅 x 高さ)':<20}")
    print("-" * 55)

    for filename in os.listdir(directory_path):
        if filename.lower().endswith(valid_extensions):
            file_path = os.path.join(directory_path, filename)
            
            try:
                with Image.open(file_path) as img:
                    width, height = img.size
                    print(f"{filename:<30} | {width:>5} x {height:<5} px")
            except Exception as e:
                print(f"{filename:<30} | エラー: {e}")

target_dir = '../docs/public/photos' 
get_image_resolutions(target_dir)