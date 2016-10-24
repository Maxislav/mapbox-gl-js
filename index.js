/**
 * Created by maxislav on 17.10.16.
 */

"use strict";
function init() {


    mapboxgl.accessToken = 'pk.eyJ1IjoibWF4aXNsYXYiLCJhIjoiY2lxbmlsNW9xMDAzNmh4bms4MGQ1enpvbiJ9.SvLPN0ZMYdq1FFMn7djryA';
    let elMap = document.getElementById("id-map");

    getImg('http://c.tile.openstreetmap.org/12/2396/1380.png', function (img) {


        var map = new mapboxgl.Map({
            container: elMap, // container id
            //style: 'mapbox://styles/mapbox/streets-v9',
            style: 'myCustomStyle.json', //'mapbox://styles/mapbox/streets-v9', //stylesheet location
            center: [30.50, 50.5], // starting position
            zoom: 9, // starting zoom,
            sprite: {
                img: img,
                data: {
                    "japan": {
                        "width": 34,
                        "height": 34,
                        "x": 0,
                        "y": 0,
                        "pixelRatio": 1
                    },
                    "artillery":{
                        "width": 34,
                        "height": 34,
                        "x": 40,
                        "y": 0,
                        "pixelRatio": 1
                    }
                }

            }

        });

        map.on('load', ()=>{
            let data = {
                "type": "FeatureCollection",
                "features": [{
                    "type": "Feature",
                    "geometry": {
                        "type": "Point",
                        "coordinates": [30.50, 50.5]
                    },
                    "properties": {
                        "title": "Mapbox DC",
                        "icon": "japan"
                        //"icon-url": "sprite2/sprite"
                    }
                }]
            };



            setTimeout(function () {



                map.addSource("points", {
                    "type": "geojson",
                    "data": data
                });



                setTimeout(function () {
                    map.addLayer({
                        "id": "points",
                        "type": "symbol",
                        "source": "points",
                        "layout": {
                            "icon-image": "{icon}"
                            // "text-field": "{title}",
                            //"text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
                            //"text-offset": [1,-1],
                            //"text-anchor": "left"
                        }
                    });
                }, 1000);




            }, 1000)

        })

    });



};



function getImg(url, callback) {
    var xhr = createCORSRequest("GET",url);
    xhr.open('GET', url, true);
    xhr.responseType = 'arraybuffer';
    xhr.onerror = function(e) {
        callback(e);
    };
    xhr.onload = function() {
        if (xhr.status >= 200 && xhr.status < 300 && xhr.response) {
            //callback( xhr.response);
            const imgData = xhr.response;


            const img = new window.Image();

            const blob = new window.Blob([new Uint8Array(imgData)], { type: 'image/png' });

            img.onload = function() {
                callback && callback(img);
                (window.URL || window.webkitURL).revokeObjectURL(img.src);
            };

            img.src = (window.URL || window.webkitURL).createObjectURL(blob);



        } else {
            callback(new Error(xhr.statusText));
        }
    };
    xhr.send();
    return xhr;
}

function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        xhr = null;
    }
    return xhr;
}