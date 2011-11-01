$(document).ready(function () {
    var canvas = document.getElementById("imageCanvas"),
		context = canvas.getContext("2d"),
		img = document.createElement("img"),
		mouseDown = false,
		brushColor = "rgb(0, 0, 0)",

		clearCanvas = function () {
		    context.clearRect(0, 0, canvas.width, canvas.height);
		};

		if (!canvas.getContext) {
		    // not supported
		    return;
		}

    // Adding instructions
    context.fillText("Drop an image onto the canvas", 240, 200);

    // Image for loading
    img.addEventListener("load", function () {
        clearCanvas();
        context.drawImage(img, 0, 0);
    }, false);

    // Detect mousedown
    canvas.addEventListener("mousedown", function (evt) {
        clearCanvas();
        mouseDown = true;
        context.beginPath();
    }, false);

    // Detect mouseup
    canvas.addEventListener("mouseup", function (evt) {
        mouseDown = false;
    }, false);

    // Draw, if mouse button is pressed
    canvas.addEventListener("mousemove", function (evt) {
        if (mouseDown) {
            context.strokeStyle = brushColor;
            context.lineWidth = 20;
            context.lineJoin = "round";
            context.lineTo(evt.layerX + 1, evt.layerY + 1);
            context.stroke();
        }
    }, false);

    // To enable drag and drop
    canvas.addEventListener("dragover", function (evt) {
        evt.preventDefault();
    }, false);

    // Handle dropped image file - only Firefox and Google Chrome
    canvas.addEventListener("drop", function (evt) {
        var files = evt.dataTransfer.files;
        clearCanvas();

        if (files.length > 0) {
            var file = files[0];

            if (typeof FileReader !== "undefined" && file.type.indexOf("image") != -1) {
                var reader = new FileReader();

                reader.onload = function (evt) {
                    img.src = evt.target.result;
                };

                reader.readAsDataURL(file);
            }
        }

        evt.preventDefault();
        var saveImage = document.getElementById("imageBase64String");
        saveImage.value = canvas.toDataURL("image/png");

    }, false);
});