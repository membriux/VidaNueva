// Manuel was here! 
$(document).ready(function() {
  // Function to convert a Google Drive file link to a direct image link
  function generateGoogleDriveImageLink(googleDriveUrl) {
    const fileIdMatch = googleDriveUrl.match(/\/d\/(.*?)\//);

    if (fileIdMatch && fileIdMatch[1]) {
      const fileId = fileIdMatch[1];
      return `https://drive.google.com/uc?export=view&id=${fileId}`;
    } else {
      return googleDriveUrl; // If it's not a Google Drive URL, return the original URL
    }
  }

  // Update all images in blog cards
  $('.card img').each(function() {
    const originalUrl = $(this).attr('src');

    // If the image URL is a Google Drive link, convert it to a direct image link
    if (originalUrl.includes('drive.google.com')) {
      const updatedUrl = generateGoogleDriveImageLink(originalUrl);
      console.log('Converted URL:', updatedUrl); // Debugging to verify the conversion
      $(this).attr('src', updatedUrl); // Update the image source
    }
  });
});
