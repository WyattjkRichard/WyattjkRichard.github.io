
// from the main page, user uploads an image, a canvas is then created with the dimensions of the image and the image is drawn onto the canvas
// the imageURL is saved so it can be sent to the second page via BroadcastChannel
// from the first page, the user can upload and resize different images for player tokens/items on the live map
// they can also add a 'fog of war' which will be semi-transparent on the main page but fully opaque on the second page
// there will be a resizable rectangle that the user can move around to reveal parts of the map on the second page

const imginput = document.getElementById('fileInput');
const preview = document.getElementById('preview');
var mapImageURL = '';

imginput.addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Create an object URL for the selected file
    mapImageURL = URL.createObjectURL(file);

    // Show preview
    preview.src = mapImageURL;
    preview.style.display = 'block';
});

/*
const channel = new BroadcastChannel('my_channel');
const status = document.getElementById('status');
const input = document.getElementById('msg');

// Receive messages
channel.onmessage = (e) => {
    status.textContent = 'Received: ' + e.data;
};

// Open the second page
document.getElementById('openTab').onclick = () => {
    window.open('second.html', '_blank');
};

// Send a message
document.getElementById('send').onclick = () => {
    channel.postMessage(input.value);
    input.value = '';
};
*/