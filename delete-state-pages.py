import os
import logging

# This file deletes state pages from the professions directories

# Set up logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')

# List of directories
directories = [
    'audiologists', 'chiropractors', 'dental', 'doctors', 
    'med-spa', 'nutritionists', 'mental-health', 'physical-therapy'
]

# List of files to delete
files_to_delete = [
    'alabama.html', 'alaska.html', 'arizona.html', 'arkansas.html', 'california.html',
    'colorado.html', 'connecticut.html', 'dc.html', 'delaware.html', 'florida.html', 'georgia.html',
    'hawaii.html', 'idaho.html', 'illinois.html', 'indiana.html', 'iowa.html',
    'kansas.html', 'kentucky.html', 'louisiana.html', 'maine.html', 'maryland.html',
    'massachusetts.html', 'michigan.html', 'minnesota.html', 'mississippi.html', 'missouri.html',
    'montana.html', 'nebraska.html', 'nevada.html', 'new-hampshire.html', 'new-jersey.html',
    'new-mexico.html', 'new-york.html', 'north-carolina.html', 'north-dakota.html', 'ohio.html',
    'oklahoma.html', 'oregon.html', 'pennsylvania.html', 'rhode-island.html', 'south-carolina.html',
    'south-dakota.html', 'tennessee.html', 'texas.html', 'utah.html', 'vermont.html',
    'virginia.html', 'washington.html', 'west-virginia.html', 'wisconsin.html', 'wyoming.html'
]

def delete_files():
    total_deleted = 0
    for directory in directories:
        for filename in files_to_delete:
            file_path = os.path.join(directory, filename)
            if os.path.exists(file_path):
                try:
                    os.remove(file_path)
                    logging.info(f"Deleted: {file_path}")
                    total_deleted += 1
                except Exception as e:
                    logging.error(f"Error deleting {file_path}: {e}")
            else:
                logging.warning(f"File not found: {file_path}")
    
    logging.info(f"Total files deleted: {total_deleted}")

if __name__ == "__main__":
    delete_files()