// "use client";

// import React, { useState } from "react";
// import {
//   Search,
//   Heart,
//   Share2,
//   Camera,
//   MapPin,
//   Bed,
//   Bath,
//   Square,
//   Filter,
//   Grid3X3,
//   Map,
//   ChevronDown,
//   Star,
//   Menu,
//   User,
//   Phone,
//   Mail,
//   Home,
//   Building,
//   Calendar,
//   DollarSign,
// } from "lucide-react";
// import styles from "./propertyList.module.css";

// const ZillowPage = () => {
//   const [viewMode, setViewMode] = useState("split"); // split, list, map
//   const [selectedFilters, setSelectedFilters] = useState({
//     price: "",
//     bedrooms: "",
//     bathrooms: "",
//     homeType: "",
//     moreFilters: false,
//   });
//   const [savedHomes, setSavedHomes] = useState(new Set());

//   // Sample property data based on the image
//   const properties = [
//     {
//       id: 1,
//       price: "$675,000",
//       beds: 4,
//       baths: 3,
//       sqft: "2,100",
//       address: "188 Canterbury Pl, Royal Palm Beach, FL 33414",
//       images: ["/api/placeholder/300/200"],
//       daysOnZillow: 4,
//       agent: "BERKSHIRE HATHAWAY FLORIDA REALTY",
//       priceHistory: [
//         { date: "2024-01-15", price: "$675,000", event: "Listed" },
//       ],
//     },
//     {
//       id: 2,
//       price: "$420,000",
//       beds: 3,
//       baths: 2,
//       sqft: "1,812",
//       address: "122 Newberry Ln, Royal Palm Beach, FL 33414",
//       images: ["/api/placeholder/300/200"],
//       daysOnZillow: 28,
//       agent: "EXIT REALTY MIZNER",
//       priceHistory: [
//         { date: "2024-01-01", price: "$420,000", event: "Listed" },
//       ],
//     },
//     {
//       id: 3,
//       price: "$410,000",
//       beds: 3,
//       baths: 2,
//       sqft: "1,812",
//       address: "381 River Bluff Ln, Royal Palm Beach, FL 33411",
//       images: ["/api/placeholder/300/200"],
//       daysOnZillow: 21,
//       agent: "AFFINITY REALTY SERVICES LLC",
//       priceHistory: [
//         { date: "2024-01-08", price: "$410,000", event: "Listed" },
//       ],
//     },
//     {
//       id: 4,
//       price: "$330,000",
//       beds: 2,
//       baths: 3,
//       sqft: "1,448",
//       address: "10710 Old Hammock Way, Wellington, FL 33414",
//       images: ["/api/placeholder/300/200"],
//       daysOnZillow: 7,
//       agent: "PRIME HOME REALTY GROUP INC",
//       type: "Townhouse",
//       priceHistory: [
//         { date: "2024-01-20", price: "$330,000", event: "Listed" },
//       ],
//     },
//     {
//       id: 5,
//       price: "$825,000",
//       beds: 5,
//       baths: 3,
//       sqft: "3,167",
//       address: "15234 Oatland Dr, Wellington, FL 33414",
//       images: ["/api/placeholder/300/200"],
//       daysOnZillow: 15,
//       agent: "PARTNERSHIP REALTY INC",
//       priceHistory: [
//         { date: "2024-01-12", price: "$825,000", event: "Listed" },
//       ],
//     },
//     {
//       id: 6,
//       price: "$599,000",
//       beds: 3,
//       baths: 2,
//       sqft: "2,156",
//       address: "12845 Hyland Cir, Boca Raton, FL 33428",
//       images: ["/api/placeholder/300/200"],
//       daysOnZillow: 12,
//       agent: "COLDWELL BANKER REALTY",
//       priceHistory: [
//         { date: "2024-01-15", price: "$599,000", event: "Listed" },
//       ],
//     },
//   ];

//   const toggleSaved = (propertyId) => {
//     const newSaved = new Set(savedHomes);
//     if (newSaved.has(propertyId)) {
//       newSaved.delete(propertyId);
//     } else {
//       newSaved.add(propertyId);
//     }
//     setSavedHomes(newSaved);
//   };

//   const PropertyCard = ({ property }) => (
//     <div className={styles.propertyCard}>
//       <div className={styles.propertyImageContainer}>
//         <img
//           src="/api/placeholder/280/200"
//           //   alt={property.address}
//           className={styles.propertyImage}
//         />
//         <button
//           onClick={() => toggleSaved(property.id)}
//           className={styles.saveButton}
//         >
//           <Heart
//             className={`${styles.heartIcon} ${
//               savedHomes.has(property.id) ? styles.heartSaved : ""
//             }`}
//           />
//         </button>
//         <div className={styles.daysOnZillow}>
//           {property.daysOnZillow} days on Zillow
//         </div>
//       </div>
//       <div className={styles.propertyInfo}>
//         <div className={styles.propertyHeader}>
//           <h3 className={styles.propertyPrice}>{property.price}</h3>
//           <button className={styles.shareButton}>
//             <Share2 className={styles.shareIcon} />
//           </button>
//         </div>
//         <div className={styles.propertyDetails}>
//           <span className={styles.propertyDetail}>
//             <Bed className={styles.detailIcon} />
//             {property.beds} bd
//           </span>
//           <span className={styles.propertyDetail}>
//             <Bath className={styles.detailIcon} />
//             {property.baths} ba
//           </span>
//           <span className={styles.propertyDetail}>
//             <Square className={styles.detailIcon} />
//             {property.sqft} sqft
//           </span>
//         </div>
//         <p className={styles.propertyAddress}>{property.address}</p>
//         <p className={styles.propertyAgent}>{property.agent}</p>
//         {property.type && (
//           <div className={styles.propertyTypeContainer}>
//             <span className={styles.propertyType}>{property.type}</span>
//           </div>
//         )}
//       </div>
//     </div>
//   );

//   return (
//     <div className={styles.container}>
//       {/* Header */}
//       <header className={styles.header}>
//         <div className={styles.headerContent}>
//           <div className={styles.headerLeft}>
//             {/* Logo */}
//             <div className={styles.logo}>Zillow</div>
//           </div>

//           {/* Navigation */}
//           <nav className={styles.navigation}>
//             <a href="#" className={styles.navLink}>
//               Buy
//             </a>
//             <a href="#" className={styles.navLink}>
//               Rent
//             </a>
//             <a href="#" className={styles.navLink}>
//               Sell
//             </a>
//             <a href="#" className={styles.navLink}>
//               Home Loans
//             </a>
//             <a href="#" className={styles.navLink}>
//               Agent finder
//             </a>
//           </nav>

//           {/* Right side */}
//           <div className={styles.headerRight}>
//             <button className={styles.headerButton}>Manage Rentals</button>
//             <button className={styles.headerButton}>Advertise</button>
//             <button className={styles.headerButton}>Help</button>
//             <button className={styles.headerButton}>Sign in</button>
//           </div>
//         </div>
//       </header>

//       {/* Search Bar */}
//       <div className={styles.searchSection}>
//         <div className={styles.searchContainer}>
//           <div className={styles.searchInputContainer}>
//             <Search className={styles.searchIcon} />
//             <input
//               type="text"
//               placeholder="Royal Palm Beach FL"
//               className={styles.searchInput}
//               defaultValue="Royal Palm Beach FL"
//             />
//           </div>
//           <button className={styles.searchButton}>Search</button>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className={styles.filtersSection}>
//         <div className={styles.filtersContainer}>
//           <div className={styles.filtersLeft}>
//             <select className={styles.filterSelect}>
//               <option>For sale</option>
//               <option>For rent</option>
//             </select>

//             <select className={styles.filterSelect}>
//               <option>Price</option>
//               <option>$0 - $200k</option>
//               <option>$200k - $400k</option>
//               <option>$400k - $600k</option>
//               <option>$600k+</option>
//             </select>

//             <select className={styles.filterSelect}>
//               <option>Beds & Baths</option>
//               <option>1+ beds</option>
//               <option>2+ beds</option>
//               <option>3+ beds</option>
//               <option>4+ beds</option>
//             </select>

//             <select className={styles.filterSelect}>
//               <option>Home Type</option>
//               <option>Houses</option>
//               <option>Townhomes</option>
//               <option>Condos</option>
//               <option>Apartments</option>
//             </select>

//             <button className={styles.moreFiltersButton}>
//               <Filter className={styles.filterIcon} />
//               <span>More</span>
//             </button>
//           </div>

//           <div className={styles.filtersRight}>
//             <span className={styles.resultsCount}>240 results</span>
//             <select className={styles.sortSelect}>
//               <option>Homes for You</option>
//               <option>Price (High to Low)</option>
//               <option>Price (Low to High)</option>
//               <option>Newest</option>
//             </select>
//           </div>
//         </div>
//       </div>

//       {/* View Toggle */}
//       <div className={styles.viewToggleSection}>
//         <div className={styles.viewToggleContainer}>
//           <div className={styles.viewToggle}>
//             <button
//               onClick={() => setViewMode("split")}
//               className={`${styles.viewButton} ${
//                 viewMode === "split" ? styles.viewButtonActive : ""
//               }`}
//             >
//               <Grid3X3 className={styles.viewIcon} />
//               <span>Split</span>
//             </button>
//             <button
//               onClick={() => setViewMode("list")}
//               className={`${styles.viewButton} ${
//                 viewMode === "list" ? styles.viewButtonActive : ""
//               }`}
//             >
//               <span>List</span>
//             </button>
//             <button
//               onClick={() => setViewMode("map")}
//               className={`${styles.viewButton} ${
//                 viewMode === "map" ? styles.viewButtonActive : ""
//               }`}
//             >
//               <MapPin className={styles.viewIcon} />
//               <span>Map</span>
//             </button>
//           </div>

//           <button className={styles.saveSearchButton}>Save Search</button>
//         </div>
//       </div>

//       {/* Main Content */}
//       <div className={styles.mainContent}>
//         <div className={styles.contentWrapper}>
//           {/* Map Section */}
//           {(viewMode === "split" || viewMode === "map") && (
//             <div
//               className={`${styles.mapSection} ${
//                 viewMode === "split" ? styles.mapSplit : styles.mapFull
//               }`}
//             >
//               <div className={styles.mapContainer}>
//                 {/* Mock Map */}
//                 <div className={styles.mapBackground}></div>

//                 {/* Map Controls */}
//                 <div className={styles.mapControlsLeft}>
//                   <button className={styles.mapControl}>
//                     <span>Draw</span>
//                   </button>
//                   <button className={styles.mapControl}>
//                     <span>Schools</span>
//                   </button>
//                 </div>

//                 <div className={styles.mapControlsRight}>
//                   <button className={styles.mapControl}>
//                     <span>Layers</span>
//                   </button>
//                 </div>

//                 <div className={styles.mapControlsBottom}>
//                   <button className={styles.mapControl}>
//                     <span>+</span>
//                   </button>
//                   <button className={styles.mapControl}>
//                     <span>-</span>
//                   </button>
//                 </div>

//                 {/* Sample Property Pins */}
//                 <div
//                   className={styles.propertyPin}
//                   style={{ top: "25%", left: "25%" }}
//                 >
//                   $675K
//                 </div>
//                 <div
//                   className={styles.propertyPin}
//                   style={{ top: "33%", left: "33%" }}
//                 >
//                   $420K
//                 </div>
//                 <div
//                   className={styles.propertyPin}
//                   style={{ top: "40%", left: "40%" }}
//                 >
//                   $410K
//                 </div>
//                 <div
//                   className={styles.propertyPin}
//                   style={{ top: "50%", left: "50%" }}
//                 >
//                   $330K
//                 </div>
//                 <div
//                   className={styles.propertyPin}
//                   style={{ top: "60%", left: "60%" }}
//                 >
//                   $825K
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Listings Section */}
//           {(viewMode === "split" || viewMode === "list") && (
//             <div
//               className={`${styles.listingsSection} ${
//                 viewMode === "split"
//                   ? styles.listingsSplit
//                   : styles.listingsFull
//               }`}
//             >
//               <div className={styles.listingsContainer}>
//                 {/* Results Header */}
//                 <div className={styles.resultsHeader}>
//                   <h1 className={styles.resultsTitle}>
//                     Royal Palm Beach FL Real Estate & Homes for Sale
//                   </h1>
//                   <p className={styles.resultsSubtitle}>
//                     240 homes for sale in Royal Palm Beach, FL
//                   </p>
//                 </div>

//                 {/* Property Grid */}
//                 <div className={styles.propertyGrid}>
//                   {properties.map((property) => (
//                     <PropertyCard key={property.id} property={property} />
//                   ))}
//                 </div>

//                 {/* Load More */}
//                 <div className={styles.loadMoreContainer}>
//                   <button className={styles.loadMoreButton}>
//                     Show more results
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Footer Content */}
//       <div className={styles.footer}>
//         <div className={styles.footerContent}>
//           <div className={styles.footerGrid}>
//             <div className={styles.footerColumn}>
//               <h3 className={styles.footerHeading}>Buy</h3>
//               <ul className={styles.footerLinks}>
//                 <li>
//                   <a href="#" className={styles.footerLink}>
//                     Homes for sale
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className={styles.footerLink}>
//                     Open houses
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className={styles.footerLink}>
//                     New homes
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className={styles.footerLink}>
//                     Recently sold
//                   </a>
//                 </li>
//               </ul>
//             </div>
//             <div className={styles.footerColumn}>
//               <h3 className={styles.footerHeading}>Rent</h3>
//               <ul className={styles.footerLinks}>
//                 <li>
//                   <a href="#" className={styles.footerLink}>
//                     Rental listings
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className={styles.footerLink}>
//                     Rental manager
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className={styles.footerLink}>
//                     Rental buildings
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className={styles.footerLink}>
//                     Rental application
//                   </a>
//                 </li>
//               </ul>
//             </div>
//             <div className={styles.footerColumn}>
//               <h3 className={styles.footerHeading}>Sell</h3>
//               <ul className={styles.footerLinks}>
//                 <li>
//                   <a href="#" className={styles.footerLink}>
//                     Sell your home
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className={styles.footerLink}>
//                     Home values
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className={styles.footerLink}>
//                     Sellers guide
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className={styles.footerLink}>
//                     Foreclosures
//                   </a>
//                 </li>
//               </ul>
//             </div>
//             <div className={styles.footerColumn}>
//               <h3 className={styles.footerHeading}>Finance</h3>
//               <ul className={styles.footerLinks}>
//                 <li>
//                   <a href="#" className={styles.footerLink}>
//                     Mortgage rates
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className={styles.footerLink}>
//                     Mortgage lenders
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className={styles.footerLink}>
//                     Mortgage calculator
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className={styles.footerLink}>
//                     Affordability calculator
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ZillowPage;

"use client";

import React, { useState } from "react";
import {
  Search,
  Heart,
  Share2,
  Camera,
  MapPin,
  Bed,
  Bath,
  Square,
  Filter,
  Grid3X3,
  Map,
  ChevronDown,
  Star,
  Menu,
  User,
  Phone,
  Mail,
  Home,
  Building,
  Calendar,
  DollarSign,
} from "lucide-react";
import styles from "./propertyList.module.css";

const ZillowPage = () => {
  const [viewMode, setViewMode] = useState("split"); // split, list, map
  const [selectedFilters, setSelectedFilters] = useState({
    price: "",
    bedrooms: "",
    bathrooms: "",
    homeType: "",
    moreFilters: false,
  });
  const [savedHomes, setSavedHomes] = useState(new Set());

  // Sample property data based on the image
  const properties = [
    {
      id: 1,
      price: "$675,000",
      beds: 4,
      baths: 3,
      sqft: "2,100",
      address: "188 Canterbury Pl, Royal Palm Beach, FL 33414",
      images: ["/api/placeholder/300/200"],
      daysOnZillow: 4,
      agent: "BERKSHIRE HATHAWAY FLORIDA REALTY",
      priceHistory: [
        { date: "2024-01-15", price: "$675,000", event: "Listed" },
      ],
    },
    {
      id: 2,
      price: "$420,000",
      beds: 3,
      baths: 2,
      sqft: "1,812",
      address: "122 Newberry Ln, Royal Palm Beach, FL 33414",
      images: ["/api/placeholder/300/200"],
      daysOnZillow: 28,
      agent: "EXIT REALTY MIZNER",
      priceHistory: [
        { date: "2024-01-01", price: "$420,000", event: "Listed" },
      ],
    },
    {
      id: 3,
      price: "$410,000",
      beds: 3,
      baths: 2,
      sqft: "1,812",
      address: "381 River Bluff Ln, Royal Palm Beach, FL 33411",
      images: ["/api/placeholder/300/200"],
      daysOnZillow: 21,
      agent: "AFFINITY REALTY SERVICES LLC",
      priceHistory: [
        { date: "2024-01-08", price: "$410,000", event: "Listed" },
      ],
    },
    {
      id: 4,
      price: "$330,000",
      beds: 2,
      baths: 3,
      sqft: "1,448",
      address: "10710 Old Hammock Way, Wellington, FL 33414",
      images: ["/api/placeholder/300/200"],
      daysOnZillow: 7,
      agent: "PRIME HOME REALTY GROUP INC",
      type: "Townhouse",
      priceHistory: [
        { date: "2024-01-20", price: "$330,000", event: "Listed" },
      ],
    },
    {
      id: 5,
      price: "$825,000",
      beds: 5,
      baths: 3,
      sqft: "3,167",
      address: "15234 Oatland Dr, Wellington, FL 33414",
      images: ["/api/placeholder/300/200"],
      daysOnZillow: 15,
      agent: "PARTNERSHIP REALTY INC",
      priceHistory: [
        { date: "2024-01-12", price: "$825,000", event: "Listed" },
      ],
    },
    {
      id: 6,
      price: "$599,000",
      beds: 3,
      baths: 2,
      sqft: "2,156",
      address: "12845 Hyland Cir, Boca Raton, FL 33428",
      images: ["/api/placeholder/300/200"],
      daysOnZillow: 12,
      agent: "COLDWELL BANKER REALTY",
      priceHistory: [
        { date: "2024-01-15", price: "$599,000", event: "Listed" },
      ],
    },
  ];

  const toggleSaved = (propertyId) => {
    const newSaved = new Set(savedHomes);
    if (newSaved.has(propertyId)) {
      newSaved.delete(propertyId);
    } else {
      newSaved.add(propertyId);
    }
    setSavedHomes(newSaved);
  };

  const PropertyCard = ({ property }) => (
    <div className={styles.propertyCard}>
      <div className={styles.propertyImageContainer}>
        <img
          src="/api/placeholder/280/200"
          //   alt={property.address}
          className={styles.propertyImage}
        />
        <button
          onClick={() => toggleSaved(property.id)}
          className={styles.saveButton}
        >
          <Heart
            className={`${styles.heartIcon} ${
              savedHomes.has(property.id) ? styles.heartSaved : ""
            }`}
          />
        </button>
        <div className={styles.daysOnZillow}>
          {property.daysOnZillow} days on Zillow
        </div>
      </div>
      <div className={styles.propertyInfo}>
        <div className={styles.propertyHeader}>
          <h3 className={styles.propertyPrice}>{property.price}</h3>
          <button className={styles.shareButton}>
            <Share2 className={styles.shareIcon} />
          </button>
        </div>
        <div className={styles.propertyDetails}>
          <span className={styles.propertyDetail}>
            <Bed className={styles.detailIcon} />
            {property.beds} bd
          </span>
          <span className={styles.propertyDetail}>
            <Bath className={styles.detailIcon} />
            {property.baths} ba
          </span>
          <span className={styles.propertyDetail}>
            <Square className={styles.detailIcon} />
            {property.sqft} sqft
          </span>
        </div>
        <p className={styles.propertyAddress}>{property.address}</p>
        <p className={styles.propertyAgent}>{property.agent}</p>
        {property.type && (
          <div className={styles.propertyTypeContainer}>
            <span className={styles.propertyType}>{property.type}</span>
          </div>
        )}
      </div>
    </div>
  );

  // Google Map Component
  const GoogleMap = () => (
    <div className={styles.googleMapContainer}>
      <div className={styles.mapCanvas}>
        {/* Map Roads */}
        <div className={styles.mapRoads}>
          <div className={`${styles.road} ${styles.roadHorizontal}`}></div>
          <div className={`${styles.road} ${styles.roadVertical}`}></div>
          <div className={`${styles.road} ${styles.roadDiagonal}`}></div>
        </div>

        {/* Map Water Features */}
        <div className={`${styles.mapWater} ${styles.water1}`}></div>
        <div className={`${styles.mapWater} ${styles.water2}`}></div>

        {/* Map Parks */}
        <div className={`${styles.mapPark} ${styles.park1}`}></div>
        <div className={`${styles.mapPark} ${styles.park2}`}></div>

        {/* Map Labels */}
        <div className={styles.mapLabels}>
          <div className={styles.mapLabel} style={{ top: "25%", left: "45%" }}>
            Royal Palm Beach
          </div>
          <div
            className={`${styles.mapLabel} ${styles.streetLabel}`}
            style={{ top: "28%", left: "10%" }}
          >
            Royal Palm Beach Blvd
          </div>
          <div
            className={`${styles.mapLabel} ${styles.streetLabel}`}
            style={{ top: "58%", left: "25%" }}
          >
            Okeechobee Blvd
          </div>
          <div
            className={`${styles.mapLabel} ${styles.streetLabel}`}
            style={{ top: "15%", left: "42%", transform: "rotate(90deg)" }}
          >
            441
          </div>
          <div
            className={styles.mapLabel}
            style={{ bottom: "30%", left: "15%" }}
          >
            Wellington
          </div>
          <div className={styles.mapLabel} style={{ top: "15%", right: "20%" }}>
            West Palm Beach
          </div>
        </div>

        {/* Sample Property Pins with enhanced styling */}
        <div
          className={styles.propertyPin}
          style={{
            top: "25%",
            left: "25%",
            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
          }}
          title="4 bed, 3 bath - $675,000"
        >
          $675K
        </div>
        <div
          className={styles.propertyPin}
          style={{
            top: "33%",
            left: "33%",
            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
          }}
          title="3 bed, 2 bath - $420,000"
        >
          $420K
        </div>
        <div
          className={styles.propertyPin}
          style={{
            top: "40%",
            left: "40%",
            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
          }}
          title="3 bed, 2 bath - $410,000"
        >
          $410K
        </div>
        <div
          className={styles.propertyPin}
          style={{
            top: "50%",
            left: "50%",
            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
          }}
          title="2 bed, 3 bath Townhouse - $330,000"
        >
          $330K
        </div>
        <div
          className={styles.propertyPin}
          style={{
            top: "60%",
            left: "60%",
            boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
          }}
          title="5 bed, 3 bath - $825,000"
        >
          $825K
        </div>

        {/* Google Map Attribution */}
        <div className={styles.mapAttribution}>Map data ©2024 Google</div>
      </div>
    </div>
  );

  return (
    <div className={styles.container}>
      {/* Header */}

      {/* Search Bar */}
      <div className={styles.searchSection}>
        <div className={styles.searchContainer}>
          <div className={styles.searchInputContainer}>
            <Search className={styles.searchIcon} />
            <input
              type="text"
              placeholder="Royal Palm Beach FL"
              className={styles.searchInput}
              defaultValue="Royal Palm Beach FL"
            />
          </div>
          <button className={styles.searchButton}>Search</button>
        </div>
      </div>

      {/* Filters */}
      <div className={styles.filtersSection}>
        <div className={styles.filtersContainer}>
          <div className={styles.filtersLeft}>
            <select className={styles.filterSelect}>
              <option>For sale</option>
              <option>For rent</option>
            </select>

            <select className={styles.filterSelect}>
              <option>Price</option>
              <option>$0 - $200k</option>
              <option>$200k - $400k</option>
              <option>$400k - $600k</option>
              <option>$600k+</option>
            </select>

            <select className={styles.filterSelect}>
              <option>Beds & Baths</option>
              <option>1+ beds</option>
              <option>2+ beds</option>
              <option>3+ beds</option>
              <option>4+ beds</option>
            </select>

            <select className={styles.filterSelect}>
              <option>Home Type</option>
              <option>Houses</option>
              <option>Townhomes</option>
              <option>Condos</option>
              <option>Apartments</option>
            </select>

            <button className={styles.moreFiltersButton}>
              <Filter className={styles.filterIcon} />
              <span>More</span>
            </button>
          </div>

          <div className={styles.filtersRight}>
            <span className={styles.resultsCount}>240 results</span>
            <select className={styles.sortSelect}>
              <option>Homes for You</option>
              <option>Price (High to Low)</option>
              <option>Price (Low to High)</option>
              <option>Newest</option>
            </select>
          </div>
        </div>
      </div>

      {/* View Toggle */}
      <div className={styles.viewToggleSection}>
        <div className={styles.viewToggleContainer}>
          <div className={styles.viewToggle}>
            <button
              onClick={() => setViewMode("split")}
              className={`${styles.viewButton} ${
                viewMode === "split" ? styles.viewButtonActive : ""
              }`}
            >
              <Grid3X3 className={styles.viewIcon} />
              <span>Split</span>
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={`${styles.viewButton} ${
                viewMode === "list" ? styles.viewButtonActive : ""
              }`}
            >
              <span>List</span>
            </button>
            <button
              onClick={() => setViewMode("map")}
              className={`${styles.viewButton} ${
                viewMode === "map" ? styles.viewButtonActive : ""
              }`}
            >
              <MapPin className={styles.viewIcon} />
              <span>Map</span>
            </button>
          </div>

          <button className={styles.saveSearchButton}>Save Search</button>
        </div>
      </div>

      {/* Main Content */}
      <div className={styles.mainContent}>
        <div className={styles.contentWrapper}>
          {/* Map Section */}
          {(viewMode === "split" || viewMode === "map") && (
            <div
              className={`${styles.mapSection} ${
                viewMode === "split" ? styles.mapSplit : styles.mapFull
              }`}
            >
              <div className={styles.mapContainer}>
                {/* Google Map */}
                <GoogleMap />

                {/* Map Controls */}
                <div className={styles.mapControlsLeft}>
                  <button className={styles.mapControl}>
                    <span>Draw</span>
                  </button>
                  <button className={styles.mapControl}>
                    <span>Schools</span>
                  </button>
                </div>

                <div className={styles.mapControlsRight}>
                  <button className={styles.mapControl}>
                    <span>Layers</span>
                  </button>
                </div>

                <div className={styles.mapControlsBottom}>
                  <button className={styles.mapControl}>
                    <span>+</span>
                  </button>
                  <button className={styles.mapControl}>
                    <span>-</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Listings Section */}
          {(viewMode === "split" || viewMode === "list") && (
            <div
              className={`${styles.listingsSection} ${
                viewMode === "split"
                  ? styles.listingsSplit
                  : styles.listingsFull
              }`}
            >
              <div className={styles.listingsContainer}>
                {/* Results Header */}
                <div className={styles.resultsHeader}>
                  <h1 className={styles.resultsTitle}>
                    Royal Palm Beach FL Real Estate & Homes for Sale
                  </h1>
                  <p className={styles.resultsSubtitle}>
                    240 homes for sale in Royal Palm Beach, FL
                  </p>
                </div>

                {/* Property Grid */}
                <div className={styles.propertyGrid}>
                  {properties.map((property) => (
                    <PropertyCard key={property.id} property={property} />
                  ))}
                </div>

                {/* Load More */}
                <div className={styles.loadMoreContainer}>
                  <button className={styles.loadMoreButton}>
                    Show more results
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ZillowPage;
