import os

def rename_jpg_files(directory):
    for filename in os.listdir(directory):
        if filename.lower().endswith(".jpg"):
            new_filename = filename.lower().replace("--", "-")
            
            if new_filename != filename:
                old_path = os.path.join(directory, filename)
                new_path = os.path.join(directory, new_filename)
                os.rename(old_path, new_path)
                print(f"Renamed: {filename} -> {new_filename}")

# Directory containing the image files
img_directory = "img"

# Call the function to rename the files
rename_jpg_files(img_directory)