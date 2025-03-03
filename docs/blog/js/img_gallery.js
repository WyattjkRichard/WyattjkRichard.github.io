var img_gallery = document.getElementById("img_gallery");
var inner_html = img_gallery.innerHTML;

function checkImageExists(url, callback) {
    var img = new Image();
    img.onload = function() { callback(true); };
    img.onerror = function() { callback(false); };
    img.src = url;
}

function loadImages() {
    var i = 0;
    var is_image_exists = true;

    function loadNextImage() {
        var image_url = "./images/image-" + i + ".png";
        checkImageExists(image_url, function(exists) {
            if (!exists) {
                is_image_exists = false;
                inner_html += '</div>';
                img_gallery.innerHTML = inner_html;
            }
            else {
                if (i % 4 == 0) {
                    inner_html += '<div class="row">';
                }
                inner_html += '<div class="col-12 col-md-3 mb-3 text-center"><img src="' + image_url + '" class="img-fluid rounded"></div>';
                if (i % 4 == 3) {
                    inner_html += '</div>';
                }
                i++;
                loadNextImage();
            }
        });
    }
    loadNextImage();
}

loadImages();