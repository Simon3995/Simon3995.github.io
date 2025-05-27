// converts longitude/latitude (degrees) to XYZ coordinates
function ll2xyz(longitude, latitude, scale) {
    longitude = 2*Math.PI * longitude / 360;
    latitude = 2*Math.PI * latitude / 360;
    return [
        scale * -Math.cos(longitude)*Math.cos(latitude),
        scale *  Math.sin(longitude)*Math.cos(latitude),
        scale * -Math.sin(latitude)
    ];
}