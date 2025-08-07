#!/bin/bash

#
# A script to concatenate multiple specified files into a single output file.
# Each file's content is preceded by a clear header indicating the source file.
#

# The name of the final output file where all content will be saved.
OUTPUT_FILE="combined_output.txt"

# An array of file paths to be included in the output.
# These are the files you provided.
FILES=(
  ".gitignore"
  "README.md"
  "bak.sh"
  "eslint.config.js"
  "index.html"
  "package-lock.json"
  "package.json"
  "postcss.config.js"
  "public/index.html"
  "public/vite.svg"
  "src/App.tsx"
  "src/components/BufferingIndicator.tsx"
  "src/components/Player.tsx"
  "src/components/buttons.tsx"
  "src/components/layouts/captions.module.css"
  "src/components/layouts/video-layout.module.css"
  "src/components/layouts/video-layout.tsx"
  "src/components/menus.tsx"
  "src/components/sliders.tsx"
  "src/components/time-group.tsx"
  "src/components/title.tsx"
  "src/contexts/PlayerContext.tsx"
  "src/hooks/useMovieData.ts"
  "src/index.css"
  "src/main.tsx"
  "src/pages/MoviePlayer.tsx"
  "src/vite-env.d.ts"
  "tailwind.config.cjs"
  "tsconfig.app.json"
  "tsconfig.json"
  "tsconfig.node.json"
  "vite.config.ts"
)

# Clear the output file to start fresh on each run.
# The '>' operator truncates the file if it exists or creates it if it doesn't.
> "$OUTPUT_FILE"

echo "Starting to combine files into $OUTPUT_FILE..."

# Loop through each file path specified in the FILES array.
# Using "${FILES[@]}" ensures that filenames with spaces are handled correctly.
for file in "${FILES[@]}"; do
  # Check if the file actually exists and is a regular file before trying to read it.
  if [ -f "$file" ]; then
    echo "Appending: $file"
    
    # Append a header to the output file to identify the start of a new file's content.
    echo "==================================================" >> "$OUTPUT_FILE"
    echo "### START OF FILE: $file" >> "$OUTPUT_FILE"
    echo "==================================================" >> "$OUTPUT_FILE"
    echo "" >> "$OUTPUT_FILE" # Add a blank line for readability.
    
    # Append the content of the current file to the output file.
    cat "$file" >> "$OUTPUT_FILE"
    
    # Append two newlines to create space before the next file's header.
    echo -e "\n\n" >> "$OUTPUT_FILE"
  else
    # If a file is not found, print a warning to the console and continue.
    echo "Warning: File not found, skipping: $file"
  fi
done

echo "✅ Done! All files have been combined into $OUTPUT_FILE"

