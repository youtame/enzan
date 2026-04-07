import os
from PIL import Image

def process_images(input_dir, output_dir, long_side=1200):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    valid_extensions = ('.jpg', '.jpeg', '.png', '.webp')
    
    # ターゲットの短辺サイズを計算しておく
    short_side = int(long_side * (3 / 4))

    for filename in os.listdir(input_dir):
        if not filename.lower().endswith(valid_extensions):
            continue
            
        img_path = os.path.join(input_dir, filename)
        # 出力ファイル名はすべて .png になる
        base_name = os.path.splitext(filename)[0]
        output_path = os.path.join(output_dir, base_name + ".png")

        # ステップ1: 出力先にファイルが存在し、かつ入力が元々PNGなら中身をチェック
        # (入力がJPGなら、形式変換が必要なので一律処理対象にする)
        with Image.open(img_path) as img:
            w, h = img.size
            format_ext = img.format.lower() # 'png', 'jpeg' など

            # ターゲットサイズの決定
            is_landscape = w >= h
            tw, th = (long_side, short_side) if is_landscape else (short_side, long_side)

            # ステップ2: すでに出力ファイルが存在し、サイズが一致しているか確認
            if os.path.exists(output_path):
                with Image.open(output_path) as check_img:
                    if check_img.size == (tw, th):
                        print(f"Skip: {filename} (Already processed)")
                        continue

            # --- ここから下の処理は必要な場合のみ実行される ---
            
            # クロップ（切り抜き）計算
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

            # リサイズと保存
            img = img.resize((tw, th), Image.LANCZOS)
            img.save(output_path, "PNG")
            print(f"Success: {filename} -> {tw}x{th}")

# --- 設定 ---
input_folder = '../docs/public/photos'
output_folder = '../docs/public/photos_output'
process_images(input_folder, output_folder)