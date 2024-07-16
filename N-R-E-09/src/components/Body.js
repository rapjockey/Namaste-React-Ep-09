import ResturantCart from "./ResturantCart";
import { useState , useEffect } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";

const Body = () =>{
    //Hook
    const [listOfResturant, setlistOfResturant] = useState ([]);

    const[FilteredRestaurant, setFilteredRestaurant] = useState([]);

   const [SearchText, setSearchText] = useState("");

    useEffect(() => {
        fetchdata();
    }, [])

    fetchdata = async () => {
        const data = await fetch("https://corsproxy.io/?https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.9974533&lng=73.78980229999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");

        const json = await data.json();

        console.log(json);
        setlistOfResturant(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
        setFilteredRestaurant(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    };

    const online = useOnlineStatus();
    if(online === false) return <h1>Please Check Your Internet Connection</h1>

    if(listOfResturant.length === 0 ) return <Shimmer/> ;

    return (<div className="search">
        <div className="filter">
            <input type="text" className="search-btn" 
            value={SearchText} 
            onChange={(e) => {
                setSearchText(e.target.value)
            }}/>
            <button className="serach-btn" onClick={() => {
             const FilteredRes = listOfResturant?.filter((res) =>
                res?.data?.name.toLowerCase().includes(SearchText.toLowerCase())
            )[0];
            console.log(FilteredRes)
             setSearchText(FilteredRes);
            }}
            
            >Search</button>
            <button className="filter-btn"
                onClick={ () => {
                    const Filterlist = listOfResturant?.filter (
                        (res) => res.info.avgRating > 4.4
                    );
                    setFilteredRestaurant(Filterlist);
                 }}
            >
            Top Rated Resturants</button>
        </div>
        <div className="res-cart">
             {FilteredRestaurant?.map((info) => (
               <Link key={info.id}  to ={ "/restaurant/" + info.id}> <ResturantCart  resData={info} /></Link>
             ))}
        </div>
    </div>
)}

export default Body;