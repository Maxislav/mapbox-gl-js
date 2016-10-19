/**
 * Created by maxislav on 17.10.16.
 */

"use strict";
function init() {


    mapboxgl.accessToken = 'pk.eyJ1IjoibWF4aXNsYXYiLCJhIjoiY2lxbmlsNW9xMDAzNmh4bms4MGQ1enpvbiJ9.SvLPN0ZMYdq1FFMn7djryA';
    let elMap = document.getElementById("id-map");
    var map = new mapboxgl.Map({
        container: elMap, // container id
        //style: 'mapbox://styles/mapbox/streets-v9',
        style: 'myCustomStyle.json', //'mapbox://styles/mapbox/streets-v9', //stylesheet location
        center: [30.50, 50.5], // starting position
        zoom: 9 // starting zoom
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


           /* setTimeout(function () {
                map.updateSourceSprite('sprite2/sprite');
                console.log("go update sprite")
                setTimeout(function () {
                    map.addSource("points2", {"type": "geojson", "data": data});

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
                },1000)

            },2000);*/


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


        /*    setTimeout(function () {
                map.getSource('points').setData(data2)
            }, 5000)
*/


        }, 1000)

    })
};