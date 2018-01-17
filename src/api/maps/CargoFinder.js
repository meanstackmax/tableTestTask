import StartMarker from "./Marker/StartMarker"
import StopMarker from "./Marker/StopMarker"
import BoxDrawer from "./Boxer/BoxDrawer"

import {
    DirectionsRenderer, DirectionsService, DirectionsStatus, DirectionsTravelMode, InfoWindow, LatLng, MapTypeId,
    places
} from './googleMaps'
import RoutesGeocoder from "./RoutesGeocoder";

export default class CargoFinder {

    constructor(map, routes) {


        this.routes = routes
        this.map = new google.maps.Map(map, {
            mapTypeId: 'roadmap',
            zoom: 9
        })

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(({coords}) => {
                this.map.setCenter(new google.maps.LatLng(coords.latitude, coords.longitude));
            });
        }

        this.directionService = new google.maps.DirectionsService()
        this.directionsRenderer = new google.maps.DirectionsRenderer({
            map: this.map
        })
        this.originMarkers = []
        this.destinationMarkers = []
        this.boxDrawer = new BoxDrawer(this.map)
        this.routesGeocoder = new RoutesGeocoder()

        this.waypoints = []
    }


    deleteMarkers() {
        for (const originMarker of this.originMarkers)
            originMarker.destroy()

        for (const destinationMarker of this.destinationMarkers)
            destinationMarker.destroy()
    }

    setDriveRoute(request) {

        request = {
            ...request,
            waypoints: this.waypoints,
            optimizeWaypoints: true,
            travelMode: "DRIVING"
        }


        return new Promise((resolve, reject) => {

            this.directionService.route(request, (result, status) => {
                if (status === "OK") {

                    this.directionsRenderer.setDirections(result)

                    resolve(result, status)
                } else {
                    reject(status)
                    console.error("Directions query failed: " + status)
                }
            })
        })
    }

    async find(request) {
        this.boxDrawer.clear()
        this.deleteMarkers()
        const distance = request.distance
        delete request.distance
        const direction = await this.setDriveRoute(request)

        const boxes = this.boxDrawer.draw(direction, distance)

        const routes = await this.routesGeocoder.geocodeRoutes(this.routes)

        return this.findRoutesInBoxes(routes, boxes)

    }

    findRoutesInBoxes(routes, boxes) {

        const routesInBoxes = []
        for (const route of routes) {


            if ((typeof route.origin === 'object') && (typeof route.destination === 'object')) {
                const routeInBox = this.findRouteInBoxes(route, boxes)

                routesInBoxes.push(routeInBox)

            }
        }

        return routesInBoxes
    }

    findRouteInBoxes(route, boxes) {
        if (this.isPointInBoxes(route.origin, boxes) && this.isPointInBoxes(route.destination, boxes)) {

            const startMarker = new StartMarker(this.map, route.origin)

            this.originMarkers.push(startMarker)

            const stopMarker = new StopMarker(this.map, route.destination)
            this.destinationMarkers.push(stopMarker)

            return route

        }
    }

    isPointInBoxes(point, boxes) {
        let result = false

        for (const box of boxes) {
            if (box.contains(point)) {
                result = true
            }
        }
        return result
    }
}