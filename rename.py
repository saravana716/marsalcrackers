import os

directory = r"c:\Users\vsara\Desktop\Marselcrackers\Marselcrackers"
extensions = (".jsx", ".js", ".css", ".html")

for root, dirs, files in os.walk(directory):
    if "node_modules" in root or ".git" in root:
        continue
    for file in files:
        if file.endswith(extensions):
            path = os.path.join(root, file)
            with open(path, "r", encoding="utf-8") as f:
                content = f.read()
                
            if "Sai Sparkz Hub" in content or "Sai Sparkz" in content or "saisparks" in content:
                content = content.replace("Sai Sparkz Hub", "Marsel Traders")
                content = content.replace("Sai Sparkz", "Marsel Traders")
                content = content.replace("saisparks", "Marselcrackers")
                with open(path, "w", encoding="utf-8") as f:
                    f.write(content)
                print(f"Updated: {path}")

print("Done")
