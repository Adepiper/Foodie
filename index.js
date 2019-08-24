import './index.css'
function initAutocomplete() {
    const map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -33.8688, lng: 151.2195 },
        zoom: 13,
        mapTypeId: 'roadmap'
    });
const searchBar = document.getElementById('searchBar');
const searchButton = document.getElementById('searchButton')
const findRestaurants = document.getElementById('findRestaurants')
const searchBox = new google.maps.places.SearchBox(searchBar)
map.controls[google.maps.ControlPosition.TOP_LEFT].push(searchBar)
map.controls[google.maps.ControlPosition.TOP_LEFT].push(searchButton)

map.addListener('bounds_changed', function(){
    searchBox.setBounds(map.getBounds())
})

const markers = [];
searchBox.addListener('places_changed', function(){
    displaySearchResults(map, searchBox, markers)
})

const displaySearchResults = (map, searchBox, markers) => {
    const places = searchBox.getPlaces()
    if (places.length == 0){
        return;
    }
    markers.forEach(function (marker){
        marker.setMap(null)
    })
    markers =[]

    const bounds = new google.maps.LatLngBounds()
    places.forEach(function (place){
        if (!place.geometry){
            console.log("returned place contains no geometry")
            return
        }
        const icon = {
            url: place.icon,
            size: new google.maps.Size(71,71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
        }
        markers.push(new google.maps.Marker({
            map: map,
            icon: icon,
            title: place.name,
            position: place.geometry.location
        }))
        if (place.geometry.viewport) {
            
            bounds.union(place.geometry.viewport);
        } else {
            bounds.extend(place.geometry.location);
        }
    })
    map.fitBounds(bounds);
} 
}

const links = () =>{
    const twitter = document.getElementById('twitter')
    const facebook = document.getElementById('facebook')
    const instagram = document.getElementById('instagram')
    const gmail = document.getElementById('gmail')
    const phoneNo = document.getElementById('phoneNo')
    const signUp = document.getElementById('signUpCompany')

    twitter.addEventListener('click', twitterLink)
    function twitterLink(){
        window.open("https://twitter.com/home")
    }
    facebook.addEventListener('click', facebookLink)
    function facebookLink(){
        window.open("https://www.facebook.com/")
    }
    instagram.addEventListener('click', instagramLink)
    function instagramLink(){
        window.open("https://www.instagram.com/")
    }
    signUp.addEventListener('click', signupLink)
    function signupLink(){
        window.open('login.html')
    }
   
}
links();
initAutocomplete();
