import { GoogleMap, Marker } from '@react-google-maps/api';
import { useSearchParams } from 'next/navigation';

export const GoogleMaps = ({ listings, setSelectedListing, addressData, isCasual }) => {
  const searchParams = useSearchParams();
  return (
    <div className="flex-grow">
      <GoogleMap
        id="circle-example"
        mapContainerStyle={{
          height: "100%",
          width: "100%"
        }}
        zoom={13}
        center={{
          lat: addressData ? addressData.lat : parseFloat(searchParams.get('lat')),
          lng: addressData ? addressData.lng : parseFloat(searchParams.get('lng'))
        }}
        options={{
          styles: [
            {
              "featureType": "poi",
              "stylers": [
                { "visibility": "off" }
              ]
            },
            {
              "featureType": "transit",
              "stylers": [
                { "visibility": "off" }
              ]
            },
          ]
        }}
      >
        {
          listings.map((listing, index) => (
            <Marker
              key={index}
              position={{ lat: listing.address.lat, lng: listing.address.lng }}
              onClick={() => setSelectedListing(listing)}
              icon={{
                url: '/assets/images/marker.png',
                scaledSize: new window.google.maps.Size(55, 55), // size of the icon
                fillColor: '#f89c3c',
              }}
              label={{
                text: `$${isCasual ? listing.pricing.hourly_rate : listing.pricing.monthly_rate}/${isCasual ? 'hr' : 'mth'}`,
                color: '#fff',
                fontSize: '7px',
                fontWeight: 'bold',
              }}
            />
          ))
        }
      </GoogleMap>
    </div>
  )
}

export default GoogleMaps