import re

with open('index.html', 'r', encoding='utf-8') as f:
    htmlStr = f.read()

# Change script path
updatedHtml = re.sub(r'<script src="/script\.js"></script>', '<script src="script.js"></script>', htmlStr)

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(updatedHtml)

print('Updated script path')
