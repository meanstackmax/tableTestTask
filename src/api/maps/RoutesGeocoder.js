export default class RoutesGeocoder extends google.maps.Geocoder {

    async geocodeRoutes(routes) {
        const latLngRoutes = []
        for (const route of routes) {
            latLngRoutes.push({
                ...route,
                origin: await this.geocodePoint(route.origin),
                destination: await this.geocodePoint(route.destination)
            })
        }

        return latLngRoutes
    }

    async geocodePoint(point) {
        return new Promise((resolve, reject) => {
            if (typeof point === "string") {
                this.geocode({"address": point})
                    .then((results => {
                        const location = results[0].geometry.location
                        resolve({
                            lat: location.lat(),
                            lng: location.lng()
                        })
                    })).catch(err => {
                    resolve(err)
                })
            } else {
                resolve(point)
            }
        })
    }

    geocode(request) {
        return new Promise((resolve, reject) => {
            super.geocode(request, (results, status) => {
                if (status === 'OK') {
                    resolve(results)
                } else {
                    reject(status)
                }
            })
        })
    }
}