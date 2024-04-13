



let isSharing = false;

async function shareContent() {
  if (navigator.share && !isSharing) {
    try {
      isSharing = true;
      await navigator.share({
        title: "Free Download 3D Wallpaper",
        text: "Developed By Bansh Sharma , Github - https://github.com/ayushman542",
        url: "https://awesomewallpapers.netlify.app/",
      });
    } catch (error) {
      console.error("Error sharing:", error);
    } finally {
      // Reset the isSharing flag to false even if an error occurs
      isSharing = false;
    }
  } else {
    alert("Sharing not supported or already in progress.");
  }
}
document.addEventListener("DOMContentLoaded", function () {
  function showAlert(message) {
    createCustomAlert(message);
  }

  console.log("developer ayushman , github =>  https://github.com/ayushman542" , "Insta =>https://www.instagram.com/bansh_sharma_001" );

  // Function to show download alert
  function showDownloadAlert(message) {
    createCustomAlert(message);
  }

  // Function to create a custom alert
  function createCustomAlert(message) {
    // Create the alert container
    const alertContainer = document.createElement("div");
    alertContainer.setAttribute("role", "alert");
    alertContainer.className = "rounded-xl border border-gray-100 bg-white p-4";

    // Add custom style for positioning at the top
    alertContainer.style.position = "fixed";
    alertContainer.style.top = "0";
    alertContainer.style.left = "50%";
    alertContainer.style.transform = "translateX(-50%)";

    // Create the alert content
    alertContainer.innerHTML = `
      <div class="flex items-start gap-4">
        <span class="text-green-600">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        </span>
        <div class="flex-1">
          <strong class="block font-medium text-gray-900">${message}</strong>
          <p class="mt-1 text-sm text-gray-700">${
            message === "Download Successful...."
              ? "Download Successful"
              : "Download free Wallpapers"
          }</p>
        </div>
        <button class="text-gray-500 transition hover:text-gray-600" onclick="dismissAlert()">
          <span class="sr-only">Dismiss popup</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-6 w-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    `;

    // Append the alert to the body
    document.body.appendChild(alertContainer);

    // Automatically dismiss the alert after 3 seconds
    setTimeout(() => {
      dismissAlert();
    }, 3000);
  }

  // Function to dismiss the alert
  function dismissAlert() {
    const alertContainer = document.querySelector("[role='alert']");
    if (alertContainer) {
      alertContainer.remove();
    }
  }

  // Example usage
  showAlert("Developer Bansh Sharma 🚀");

  // Rest of your code...

  const searchInput = document.querySelector(".search");
  const sumButtons = document.querySelectorAll(".sumbit");
  const imageGrid = document.getElementById("imageGrid");

  // Replace 'YOUR_API_KEY' with your actual Pexels API key
  const apiKey = "0knJ4ij3un0QRZCGpdW0ditJ3weRdLG6TYHrgrmjjqZHW2EpJxBlhbXp";
  const apiUrl = "https://api.pexels.com/v1/search";
  const customHeaders = {
    Authorization: apiKey,
    "Content-Type": "application/json",
  };

  // Adding a click event listener to each sumButton (assuming there are multiple)
  sumButtons.forEach((sumButton) => {
    sumButton.addEventListener("click", async (event) => {
      event.preventDefault();

      const query = encodeURIComponent(searchInput.value.trim()); // Ensure proper URL encoding
      const fullUrl =  `${apiUrl}?query=${query}&per_page=10000`; // Adjust per_page as needed
      const options = {
        method: "GET",
        headers: {
          ...customHeaders,
        },
      };

      try {
        const response = await fetch(fullUrl, options);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        imageGrid.innerHTML = "";

        data.photos.forEach((photo) => {
          const imageContainer = document.createElement("div");
          imageContainer.className = "relative rounded-lg";

          const imageElement = document.createElement("img");
          imageElement.src = photo.src.original;
          imageElement.alt = photo.alt_description;
          imageElement.width = 300;
          imageElement.height = 500;

          const downloadLink = document.createElement("a");
          downloadLink.href = photo.src.original; // Use the original image URL
          downloadLink.download = "wallpaper.jpg";
          downloadLink.target = "_blank"; // Open the link in a new tab

          // Creating a download icon
          const downloadIcon = document.createElement("span");
          downloadIcon.innerHTML = "⬇"; // Replace with your preferred download icon

          // Styling the download icon
          downloadIcon.style.position = "absolute";
          downloadIcon.style.top = "5px";
          downloadIcon.style.left = "5px";
          downloadIcon.style.fontSize = "27px";

          // Add a click event listener to the download icon for triggering download
          downloadIcon.addEventListener("click", async (event) => {
            event.stopPropagation(); // Stop the event from propagating

            // Fetch the image file
            const imageResponse = await fetch(photo.src.original);
            const imageBlob = await imageResponse.blob();

            // Create object URL for the image blob
            const imageUrl = URL.createObjectURL(imageBlob);

            // Create an invisible anchor and trigger click
            const invisibleLink = document.createElement("a");
            invisibleLink.href = imageUrl;
            invisibleLink.download = downloadLink.download;
            invisibleLink.style.display = "none";
            document.body.appendChild(invisibleLink);
            // showAlert("Download Successfull... 🚀");

            invisibleLink.click();
            document.body.removeChild(invisibleLink);
          });

          downloadLink.appendChild(downloadIcon);
          imageContainer.appendChild(downloadLink);
          imageContainer.appendChild(imageElement);
          imageGrid.appendChild(imageContainer);
        });
      } catch (error) {
        console.error("Error:", error);
      }
    });
  });
});































       