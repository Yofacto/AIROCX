# 📹 How to Add AIROCX YouTube Videos to the Website

## ✅ YES - YouTube Integration is Fully Enabled!

The admin dashboard allows you to add/edit YouTube videos in the **Showcase** section.

## How to Add Your AIROCX YouTube Videos:

### Step 1: Get the YouTube Video ID
From any AIROCX YouTube video URL, extract the Video ID:

**Examples:**
- URL: `https://www.youtube.com/watch?v=ABC123XYZ`
  - **Video ID**: `ABC123XYZ`
  
- URL: `https://youtu.be/ABC123XYZ`
  - **Video ID**: `ABC123XYZ`

### Step 2: Access Admin Dashboard
1. Go to: `http://localhost:3000/admin`
2. Enter password: `AIROCXIP06`
3. Click on **"Showcase"** tab

### Step 3: Add/Edit Video
**To Edit Existing Video:**
1. Click "Edit" on any video item
2. Set **Type**: `Video`
3. Set **Category**: `Video` (or `Behind the Scenes` for BTS content)
4. Enter **Title**: e.g., "AIROCX Season 1 Trailer"
5. Enter **Description**: e.g., "Official launch trailer"
6. Enter **YouTube Video ID**: Paste your AIROCX video ID here
7. *Optional*: Add thumbnail **Image URL** (if blank, shows play icon)
8. *Optional*: Set **Background Color** (fallback color)
9. Check **Large** for 2x width display
10. Click **Save**

**To Add New Video:**
1. Click "+ Add Item" button
2. Follow the same steps as above

### Step 4: Test on Website
1. Go to main website: `http://localhost:3000`
2. Scroll to "Content Universe" section
3. Click "Videos" filter
4. Click on your video card
5. Video will open in a lightbox modal and auto-play!

## Current Test Videos
Right now, the showcase has placeholder YouTube IDs (`dQw4w9WgXcQ`). Simply replace these with your actual AIROCX channel video IDs.

## Video Display Features:
- ✅ Auto-plays when clicked
- ✅ Opens in beautiful lightbox modal
- ✅ Fully responsive
- ✅ ESC key to close
- ✅ Play icon overlay on hover
- ✅ Filterable by category (Videos / Behind the Scenes)
- ✅ Support for custom thumbnails via Image URL

## Example:
If your AIROCX channel has a trailer at:
`https://www.youtube.com/watch?v=XYZ789ABC`

Just enter `XYZ789ABC` in the "YouTube Video ID" field in the admin panel!

---

**No coding required** - just paste your YouTube video IDs and they'll appear on your website instantly! 🎬
