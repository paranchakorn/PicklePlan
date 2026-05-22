PIXELS / PLAN IMAGES DIRECTORY
==============================

You can upload your training plan illustration files directly into this directory!

The application is pre-configured to load local images from this folder:
- For Plan 1 (Stretch/Recovery): "plan-1.jpg"
- For Plan 2 (Footwork Day):   "plan-2.jpg"
- For Plan 3 (Strength Day):   "plan-3.jpg"
- For Plan 4 (Fix Position):   "plan-4.jpg"
- For Plan 5 (Serve & Return):  "plan-5.jpg"
- For Plan 6 (Soft Touch):     "plan-6.jpg"
- For Plan 7 (Wall Drill):     "plan-7.jpg"
- For Plan 8 (Pre-Match Warm):  "plan-8.jpg"
- For Plan 9 (Post-Match Cold): "plan-9.jpg"

Accepted/Pre-configured Format: JPEG/JPG (with the name plan-1.jpg through plan-9.jpg).

---
How to customize:
If your files are PNGs or named differently, you can open the file `src/data.ts` and change the `imageUrl` property for each plan! For example:
  imageUrl: '/images/my-own-cool-picture.png'

Backup/Fallback:
If any image in this folder is missing or fails to load, the app automatically switches to display a gorgeous, high-resolution sporting/tennis/pickleball image dynamically!
