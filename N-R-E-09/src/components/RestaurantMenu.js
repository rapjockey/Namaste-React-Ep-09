import { useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router";
import { RESMENU_URL } from "../utils/constants";


const  RestaurantMenu = () => {
    const [resMenu, setResMenu] = useState(null);
    const {ResId} = useParams([]);
    useEffect(() => {
        fetchMenu();
    },[]);
    const fetchMenu = async () => {
        const data =  await fetch( RESMENU_URL + ResId );
        const json = await data.json();

        console.log(json);
        setResMenu(json?.data);
    };

    if (resMenu === null) return <Shimmer/>;

//    const {name,city,costForTwoMessage }= resMenu?.cards[2]?.card?.card?.info;

//    const {itemCards} = resMenu?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;

const info = resMenu?.cards[2]?.card?.card?.info ?? {};
const { name, city, costForTwoMessage } = info;

const {itemCards} = resMenu?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card ?? [];
   
   
    return (
       <div className="ResMenu-Main">
           <div className="ResMenu">
           <h1>{name}</h1>
            <h4>{costForTwoMessage}</h4>
            <p>{city}</p>
            <h4>Menu</h4>
            <ul>
                 {itemCards?.map((items) => (
                  <li key={items?.card?.info?.id }>{items?.card?.info?.name} - {items?.card?.info?.price / 100}</li> 
                ))}
            </ul>
           </div>
        </div>
    )}
export default RestaurantMenu;