---
date: 2025-06-17
---

# Generate Large Text Files

As part of my task, I need to ensure I can upload and download a reasonably large document. Just to ensure that I can validate that downloaded document is the same document after uploading, I decided to find a way to create a large text file with random string. 

After quick search, the easiest and reliable way for me is to use Linux. On Windows, I simply use WSL and change directory to `/mnt/c/...` which is the same directory as `C:\...` in Windows, e.g. `/mnt/c/Users/username/Downloads`. That way I know where the file is saved to and can access it on Windows side.

And to generate the text file, I modified the command that I found online a little since I want to specify the size of the file and ends up with:

`tr -dc "A-Za-z0-9" < /dev/urandom | fold -w100 | head -c 100M > textfile.txt`

- `tr -dc "A-Za-z0-9" < /dev/urandom` will generate random alphanumeric string.

- `fold -w100` will insert a new line every 100 characters. This helps to be able to open the file fast which works very well in Notepad++ compared to putting all the characters in a single line.

- `head -c 100M > textfile.txt` will take the first 100MB of randomly generated characters and save them in textfile.txt.

There you go. I managed to create text files with various sizes for my testing. Obviously, the larger the file, the longer it takes.

