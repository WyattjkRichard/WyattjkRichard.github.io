
// from the main page, user uploads an image, a canvas is then created with the dimensions of the image and the image is drawn onto the canvas
// the imageURL is saved so it can be sent to the second page via BroadcastChannel
// from the first page, the user can upload and resize different images for player tokens/items on the live map
// they can also add a 'fog of war' which will be semi-transparent on the main page but fully opaque on the second page



// communication between the pages
// when the second page is opened, it will request the imageURL from the main page
// second page will tell the main page its dimensions so the main page can generate a rectangle of the same ratio to select the visible area


// possibly save the file location of the images as cookies so that they can be reloaded on page refresh
// or use local storage to save the image data
// look into IndexedDB for storing larger files
// location of tokens/fog of war on the map will also need to be saved

const imginput = document.getElementById('fileInput');

const mapCanvas = document.getElementById('mapCanvas');
context = mapCanvas.getContext('2d');

imginput.addEventListener('change', (event) => {
    let mapFile = event.target.files[0];
    if (!mapFile) return;

    // Create an object URL for the selected file
    const mapImageURL = URL.createObjectURL(mapFile);
    
    const img = new Image();
    img.src = mapImageURL;
    
    img.onload = () => {
        mapCanvas.height = img.naturalHeight;
        mapCanvas.width = img.naturalWidth;
        context.drawImage(img, 0, 0);
    };
    img.onerror = () => {
        URL.revokeObjectURL(mapImageURL);
    }
});


const channel = new BroadcastChannel('my_channel');

// Receive messages
channel.onmessage = (e) => {
    switch(e.data.type) {
        case "page_loaded":
            console.log('Second page loaded with dimensions: ' + e.data.data.width + 'x' + e.data.data.height);
            // hide 'Open Second Page' button when second page is open
            document.getElementById('openTab').style.display = 'none';
            
            // if map image is loaded send the image URL to the second page
            // if tokens have been added, send their data as well
            // if it exists send fog of war data

            break;
        case "resize":
            console.log('Second page resized to: ' + e.data.data.width + 'x' + e.data.data.height);
            break;
        case "page_closed":
            console.log('Second page closed');
            // show 'Open Second Page' button when second page is closed
            document.getElementById('openTab').style.display = 'block';
            break;
        default:
            console.log('Unknown message type: ' + e.data.type);
    }
};

// Open the second page
document.getElementById('openTab').onclick = () => {
    window.open('second.html', '_blank');
};

// Send a message
// channel.postMessage(input.value);
