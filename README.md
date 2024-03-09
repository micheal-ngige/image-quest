# Picture-Quest



## Author

Michael Ngige

## Description

Picture Quest is a web application that allows users to search for images using the Unsplash API, save images to a server, and manage their saved images.

## Features

- **Image Search:** Users can enter a search term, and the application fetches relevant images from Unsplash.
- **Save Images:** Users can save images to a local server, enabling them to view their saved images later.
- **Likes:** Users can like saved images, and the like count is updated both locally and on the server.
- **Delete Images:** Users can delete saved images, removing them from both the UI and the server.

## Setup

1. Clone the repository.
2. Open `index.html` in a web browser.

## Usage

1. Enter a search term in the provided input field and submit the form to fetch and display relevant images.
2. Click on the "See More" button to load more images from the Unsplash API.
3. Click on the download button to save an image to the server.
4. View and manage saved images by clicking the "Saved Images" button.
5. Like or delete saved images to update the UI and server.

## Code Structure

- **index.html:** Contains the structure of the web page.
- **style.css:** Stylesheet for the application.
- **index.js:** JavaScript code for handling Unsplash API requests, saving, and managing images.

## Dependencies

- **Unsplash API:** Requires a valid API key for making requests. Get your key at [Unsplash Developer](https://unsplash.com/developers).

## Important Notes

- **Unsplash API Key:** The application uses an Unsplash API key (provided in the code). Replace it with your key to avoid unauthorized usage.
- **Server:** Ensure that the server (http://localhost:3000) is running to handle image data.

## Contributions

Contributions are welcome! Feel free to submit issues or pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
