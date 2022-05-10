 // modules
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
// dependencies
// const { cloudinary } = require('../configs/cloudinary.config.js');
// env variables
const mapboxToken = process.env.MAPBOX_TOKEN;



/*
To Create a Campground you need:
  1. the request body
  2. the image files
  3. the geo location
  4. the user
You will also need the campground model.
Since I don't want to require it in the utils file, I will pass it as argument!
*/


// init geocoder
const geocoder = mbxGeocoding({ accessToken: mapboxToken });


function createCampground({ campgroundBody, imageFiles, CampgroundModel, userId }) {
    const images = imageFiles.map(f => ({ url: f.path, filename: f.filename }))
    
    const campground = new CampgroundModel({
        // ...campgroundBody,
        title: campgroundBody.title,
        description: campgroundBody.description,
        price: campgroundBody.price,
        images,
        location: campgroundBody.location,
        author: userId
    });
    
    return campground;
}
// function createCampground({ campgroundBody, imageFiles, geoLocation, CampgroundModel, userId }){
//     // parse images
//     const images = imageFiles.map(f => ({ url: f.path, filename: f.filename }))

//     // get location
//     const forwardGeocodeParams = {
//         query: campgroundBody.locationName,
//         limit: 1
//     };
    
//     const geoData = await geocoder.forwardGeocode(forwardGeocodeParams).send();

//     const location = {
//         ...geoData.body.features[0].geometry,
//         name: campgroundBody.locationName,
        
//     }
    
    
    
//     const campground = new CampgroundModel({
//         title: campgroundBody.title,
//         description: campgroundBody.description,
//         price: campgroundBody.price,
//         images,
//         location,
//         author: userId
//     });
    
//     return campground;
// }


// function createCampground({ campgroundBody, imageFiles, geoLocation, CampgroundModel, userId }) {
//     return new Promise((resolve, reject) => {
//         // parse images
//         const images = imageFiles.map(f => ({ url: f.path, filename: f.filename }));
//         // get location
//         const forwardGeocodeParams = {
//             query: campgroundBody.locationName,
//             limit: 1
//         };
//         geocoder.forwardGeocode(forwardGeocodeParams).send().then(geoData => {
//             const location = {
//                 ...geoData.body.features[0].geometry,
//                 name: campgroundBody.locationName,
                        
//             }
//             const campground = new CampgroundModel({
//                 title: campgroundBody.title,
//                 description: campgroundBody.description,
//                 price: campgroundBody.price,
//                 images,
//                 location,
//                 author: userId
//             });
//             resolve(campground)
//         }).catch(error => reject(error));
        

//     }) 

    
// }

module.exports = createCampground;

