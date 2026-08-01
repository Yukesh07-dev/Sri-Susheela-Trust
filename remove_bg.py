"""
Script to remove background from founder and founder_2 images.
Uses the 'rembg' library for AI-powered background removal.
"""

from rembg import remove
from PIL import Image
import os

ASSETS_DIR = os.path.join("client", "src", "assets", "images")

images = ["founder.jpeg", "founder_2.jpeg"]

for img_name in images:
    input_path = os.path.join(ASSETS_DIR, img_name)
    output_name = os.path.splitext(img_name)[0] + "_no_bg.png"
    output_path = os.path.join(ASSETS_DIR, output_name)

    print(f"Processing {img_name}...")
    inp = Image.open(input_path)
    output = remove(inp)
    output.save(output_path)
    print(f"  Saved to {output_name}")

print("\nDone! Background removed from both images.")
