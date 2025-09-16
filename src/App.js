import React, { useState } from "react";
import "./App.css";

export default function App() {
  const hotels = {
    Jaipur: {
      location: "Hyaat Place Hotel, Jaipur, Rajasthan, India",
      images: [
        "https://www.royalorchidhotels.com/images/propertygallery/17_May_2024_04_01_034567543.jpg",
        "https://media.easemytrip.com/media/Hotel/SHL-18062677402495/Common/CommonElbbOf.jpg",
        "https://media.easemytrip.com/media/Hotel/SHL-18062677402495/Common/CommongJsqMK.jpg",
        "https://r1imghtlak.mmtcdn.com/ed356aac300b11ed8c860a58a9feac02.jpg",
      ],
      phone: "+917496835373",
      dayPrice: "₹5,999",   // Updated
      nightPrice: "₹6,999", // Updated
      ratings: [],
    },
    Gurgaon: {
      location: "Grand Hyatt, Sector 83, Gurgaon, Haryana, India",
      images: [
        "https://q-xx.bstatic.com/xdata/images/hotel/max500/666753877.jpg?k=fbdf33ea8dbb03e66f03c4d0df87690e081e870cad90e9f67445eb9a2482ec8e&o=",
        "https://imgcy.trivago.com/c_fill,d_dummy.jpeg,e_sharpen:60,f_auto,h_267,q_40,w_400/partner-images/27/6a/27a8f57273e07e3ba81003c3dbc34844b2ff1e359d4962f7932f1de6574c.jpeg",
        "https://q-xx.bstatic.com/xdata/images/hotel/max500/666753877.jpg?k=fbdf33ea8dbb03e66f03c4d0df87690e081e870cad90e9f67445eb9a2482ec8e&o=",
        "https://images.trvl-media.com/lodging/3000000/2280000/2270400/2270398/c864bbe1.jpg?impolicy=resizecrop&rw=575&rh=575&ra=fill",
      ],
      phone: "+919876543210",
      dayPrice: "₹5,999",
      nightPrice: "₹6,500",
      ratings: [],
    },
    Delhi: {
      location: "The Leela, Chanakyapuri, Janpath Road, Delhi, India",
      images: [
        "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/01/82/59/a5/deluxe-twin-room.jpg?w=700&h=-1&s=1",
        "https://www.theleela.com/prod/content/assets/aio-banner/dekstop/Premiere%20Room_1920x950.webp?VersionId=CVUL6KrvzA6hdKSjbIsWWoa9m7Fr8X9z",
        "https://cf.bstatic.com/xdata/images/hotel/max1024x768/232257471.jpg?k=a99a9b39e0508af02699e36ed8cc704bf4c8f628888f062297ab2e49df7051f0&o=&hp=1",
        "https://www.hotelscombined.com/himg/28/61/02/ice-24967-photo.aspx_did=2692_brochureid=24967_publicid=4296801_instanceid=11_resizing=4K-image.jpg",
      ],
      phone: "+919123456789",
      dayPrice: "₹5,500",
      nightPrice: "₹6,999",
      ratings: [],
    },
  };

  const [selectedCity, setSelectedCity] = useState("Jaipur");
  const [userRating, setUserRating] = useState(0);
  const [hotelData, setHotelData] = useState(hotels);

  const hotel = hotelData[selectedCity];

  const submitRating = (rating) => {
    const updatedRatings = [...hotel.ratings, rating];
    setHotelData({
      ...hotelData,
      [selectedCity]: { ...hotel, ratings: updatedRatings },
    });
    setUserRating(rating);
  };

  const avgRating =
    hotel.ratings.length > 0
      ? (hotel.ratings.reduce((a, b) => a + b, 0) / hotel.ratings.length).toFixed(1)
      : 0;

  // Share link
  const shareText = `Check out this hotel: ${selectedCity} - ${hotel.location}.\nCall: ${hotel.phone}\nGoogle Maps: https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(hotel.location)}`;
  const shareUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;

  return (
    <div className="app">
      {/* Filter / Location Selector */}
      <div className="filter-bar">
        <span>Choose your location:</span>
        <select
          value={selectedCity}
          onChange={(e) => {
            setSelectedCity(e.target.value);
            setUserRating(0);
          }}
          className="filter-select"
        >
          {Object.keys(hotelData).map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </div>

      {/* Carousel */}
      <div className="carousel">
        {hotel.images.map((url, i) => (
          <div className="carousel-item" key={i}>
            <img src={url} alt={`hotel-${i}`} className="carousel-image" />
            <div className="price-tag">
              <div>Day: {hotel.dayPrice}</div>
              <div>Night: {hotel.nightPrice}</div>
            </div>

            {/* Rating */}
            <div className="rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  className={star <= userRating ? "star filled" : "star"}
                  onClick={() => submitRating(star)}
                >
                  ★
                </span>
              ))}
              <span className="avg-rating">({avgRating} / 5)</span>
            </div>
          </div>
        ))}
      </div>

      {/* Fixed Bottom Buttons */}
      <div className="bottom-bar">
        <a href={`tel:${hotel.phone}`} className="call-btn">
          📞 Call
        </a>

        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
            hotel.location
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="dir-btn"
        >
          📍 Direction
        </a>

        <a
          href={shareUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="share-btn"
        >
          🔗 Share
        </a>
      </div>
    </div>
  );
}
