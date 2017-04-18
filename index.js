exports.getElement = () => {
    var div = $('<li>').css("padding", 0);
    var btn = $('<a href="#">').appendTo(div);
    btn.html("<i class='fa fa-hourglass-end'></i>&nbsp;Sepia");
    btn.on('click', (e) => {
        btn.trigger('runOperation');
    });
    return div;
}

/**
 * @description Takes pixelData object (data:byteArray, width:number, height:number)
 */

exports.runOperation = (pixelData) => {
    let d = $.Deferred();

    var rowLength = 4;
    for (var i = 0; i < pixelData.data.length; i += rowLength) {
        var redValTotal = (pixelData.data[i] * .393) + (pixelData.data[i + 1] * .769) + (pixelData.data[i + 2] * .189);
        var greenValTotal = (pixelData.data[i] * .349) + (pixelData.data[i + 1] * .686) + (pixelData.data[i + 2] * .168);
        var blueValTotal = (pixelData.data[i] * .272) + (pixelData.data[i + 1] * .534) + (pixelData.data[i + 2] * .131);
        function checkVal(val) { return val > 255 ? 255 : val };
        pixelData.data[i] = checkVal(redValTotal);
        pixelData.data[i + 1] = checkVal(greenValTotal);
        pixelData.data[i + 2] = checkVal(blueValTotal);
    }
    let sepiaData = new ImageData(pixelData.data, pixelData.width, pixelData.height);

    d.resolve(sepiaData);
    return d.promise();
}