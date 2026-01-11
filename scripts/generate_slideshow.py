import os
import cv2
import numpy as np
from PIL import Image, ImageDraw, ImageFont

def create_slideshow(image_folder, output_path, duration_per_slide=3, fps=30):
    images = sorted([img for img in os.listdir(image_folder) if img.endswith(".png") and img.startswith("0")])
    if not images:
        print("No images found!")
        return

    # Set video dimensions (vertical 9:16)
    width, height = 1080, 1920
    fourcc = cv2.VideoWriter_fourcc(*'mp4v')
    video = cv2.VideoWriter(output_path, fourcc, fps, (width, height))

    for img_name in images:
        img_path = os.path.join(image_folder, img_name)
        img = Image.open(img_path).convert("RGBA")
        
        # Resize image to fit width, maintain aspect ratio
        aspect_ratio = img.height / img.width
        new_height = int(width * aspect_ratio)
        img = img.resize((width, new_height), Image.Resampling.LANCZOS)
        
        # Create background (black)
        background = Image.new("RGBA", (width, height), (0, 0, 0, 255))
        
        # Center image
        y_offset = (height - new_height) // 2
        background.paste(img, (0, y_offset), img)
        
        # Convert to OpenCV format
        frame = cv2.cvtColor(np.array(background), cv2.COLOR_RGBA2BGR)
        
        # Add slide for duration
        for _ in range(duration_per_slide * fps):
            video.write(frame)
            
        # Add transition (fade out)
        for i in range(fps // 2):
            alpha = 1 - (i / (fps // 2))
            fade_frame = cv2.addWeighted(frame, alpha, np.zeros_like(frame), 1 - alpha, 0)
            video.write(fade_frame)

    video.release()
    print(f"Slideshow saved to {output_path}")

if __name__ == "__main__":
    image_folder = "/home/ubuntu/yanbao-screenshots-showcase/client/public/images"
    output_path = "/home/ubuntu/yanbao-screenshots-showcase/client/public/videos/demo.mp4"
    create_slideshow(image_folder, output_path)
