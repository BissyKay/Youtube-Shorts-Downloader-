async function downloadShort() {
  const url = document.getElementById("shortsUrl").value.trim();
  const preview = document.getElementById("preview");

  if (!url.includes("youtube.com/shorts")) {
    preview.innerHTML = "<p style='color:red;'>⚠️ Please enter a valid YouTube Shorts URL.</p>";
    return;
  }

  preview.innerHTML = "<p>⏳ Fetching your video from YouTube...</p>";

  try {
    const apiUrl = `https://api.letsdownload.app/youtube?url=${encodeURIComponent(url)}`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    if (data && data.media && data.media.length > 0) {
      const videoUrl = data.media[0].url;
      preview.innerHTML = `
        <h3>✅ Preview:</h3>
        <video src="${videoUrl}" controls width="100%" style="max-width: 400px; border-radius: 10px;"></video>
        <br><br>
        <a href="${videoUrl}" download class="download-link">⬇️ Click to download</a>
      `;
    } else {
      preview.innerHTML = "<p style='color:red;'>❌ No downloadable video found. Try a different Shorts link.</p>";
    }
  } catch (error) {
    console.error("Error:", error);
    preview.innerHTML = "<p style='color:red;'>🚫 Something went wrong. Please try again later.</p>";
  }
}
