// Unsplash API access key for making requests. Don't steal it!
const access_key = "we4W1RavqwCJN0fYi301S3Re5SfAIrkDZc559-aqQ0A";

// DOM elements references
const form = document.querySelector(".my-form");
const search = document.querySelector("#search");
const cards = document.querySelector(".cards-list");
const seeMoreButton = document.querySelector(".see-more");

let keyword = ""; // Variable to store the current search keyword
let page = 1; // Variable to keep track of the current page number for pagination

// Function to clear images in the cards container
function clearImages() {
  cards.innerHTML = "";
}

// Function to perform image search and display results
function imageSearch() {
  let keyword = search.value;

  if (!keyword) {
    alert("Please enter a search term.");
  }
  // Constructing the URL for making requests to the Unsplash API based on user input
  const fetchUrl = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${access_key}&per_page=12`;

  fetch(`${fetchUrl}`)
    .then((res) => res.json())
    .then((images) => {
      if (page === 1) {
        clearImages();
      }
      const pictures = images.results;

      // Checking if the Unsplash API returned no results for the given search query
      if (pictures.length === 0) {
        alert("No results found. Please try a different search term.");
      }

      // Iterating through the array of pictures received from the Unsplash API response
      for (let picture of pictures) {
        // Constructing HTML for each image and appending it to the cards container
        const pictureCard = `<div class="card">
    <div class="card_image">
      <img src="${picture.urls.small}" alt="${picture.alt_description}" title="${picture.alt_description}" />
    </div>
    <div class="card_title title-pink">
    <button type="button" onclick="saveImage('${picture.urls.small}', '${picture.alt_description}', ${picture.likes}, event)">
      <i class="fa fa-download" aria-hidden="true" title="Save the image"></i>
    </button>
  </form>
    </div>
  </div>`;
        cards.insertAdjacentHTML("beforeend", pictureCard);
      }
    })
    .catch((error) => {
      // Handle and log errors during the search process
      console.log(error.message);
    });
}

// Event listener for the form submit
form.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  clearImages();
  imageSearch();
});

// Event listener for the "See More" button
seeMoreButton.addEventListener("click", () => {
  page++;
  imageSearch();
});

// The local URL representing the endpoint for interacting with the server's image data
const localUrl = "http://localhost:3000/images";

// Function to save an image to the server
function saveImage(url, title, likes, event) {
  event.preventDefault();
  const newData = {
    image_url: url,
    title: title,
    likes: likes,
  };
  fetch(`${localUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newData),
  })
    .then((res) => res.json())
    .then((data) => {
      alert("Image has been successfully saved!");
    });
}

// Function to display saved images from the server
function displaySavedImages() {
  fetch(`${localUrl}`)
    .then((res) => res.json())
    .then((images) => {
      if (page === 1 || page > 1) {
        clearImages();
      }
      images.forEach((image) => {
        // Creating HTML for each saved image card
        const imageCard = `<div class="card" data-id="${image.id}">
        <div class="card_image">
          <img src="${image.image_url}" alt="${image.title}" title="${image.title}" />
        </div>
        <div class="card_title title-pink">
        <p>likes: ${image.likes}</p>
        <button type="button" onclick="addLikes(${image.id}, event)">
          <i class="fa fa-heart-o" aria-hidden="true" title="Like the image"></i>
          </button>
          <button type="button" onclick="deleteImages(${image.id})">
          <i class="fa fa-trash-o" aria-hidden="true" title="Delete the image"></i>
          </button>
        </div>
      </div>`;
        // Insert the saved image card into the cards container
        cards.insertAdjacentHTML("beforeend", imageCard);
      });
    });
}

// Function to add likes to an image
function addLikes(id, event) {
  event.preventDefault();

  // Find the card element by data-id attribute
  const card = document.querySelector(`.card[data-id="${id}"]`);
  const likesElement = card.querySelector(".card_title p");

  // Extract the current number of likes from the HTML content
  const currentLikes = parseInt(likesElement.textContent.split(":")[1].trim());

  // Increment the likes by 1
  const newLikes = currentLikes + 1;

  // Update the like count in the card
  likesElement.textContent = `likes: ${newLikes}`;
  updateLikesOnServer(id, newLikes);
}

//function that updates the number of likes for a specific image on the server
function updateLikesOnServer(id, newLikes) {
  // Create data object with the new number of likes
  const updatedData = {
    likes: newLikes,
  };

  // Send a PATCH request to update the likes on the server
  fetch(`${localUrl}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedData),
  })
    .then((response) => {
      // Check if the response is successful
      if (!response.ok) {
        throw new Error(`Failed to update likes. Status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      // Notify the user about the successful update
      alert(`Likes for image with ID ${imageId} updated successfully.`, data);
    })
    .catch((error) => {
      console.error("Error updating likes:", error.message);
    });
}

// Function to delete an image from the server and update the UI
function deleteImages(id) {
  fetch(`${localUrl}/${id}`, {
    method: "DELETE",
  })
    .then((res) => {
      if (res.ok) {
        alert(`Image with ID ${id} has been deleted.`);

        // Find and remove the deleted image card
        const cardToRemove = document.querySelector(`.card[data-id="${id}"]`);
        if (cardToRemove) {
          cardToRemove.remove();
        }
        // Update the displayed saved images
        displaySavedImages();
      } else {
        alert(`Failed to delete image with ID ${id}.`);
      }
    })
    .catch((error) => {
      console.error(`Error during deletion: ${error.message}`);
    });
}

// This line adds an event listener to the 'DOMContentLoaded' event of the document,
// ensuring that the 'displaySavedImages' function is executed when the HTML document is fully loaded.
document.addEventListener("DOMContentLoaded", displaySavedImages);
