import googleMapReact from "google-map-react";


export default function GoogleMap(center, zoom) {
    return (
        <div className="GoogleMap">
            <googleMapReact>
                bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
                defaultCenter={center}
                defaultZoom={zoom}
            </googleMapReact>
        </div>
    );
    }