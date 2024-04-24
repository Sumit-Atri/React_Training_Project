import { useForm, Controller } from "react-hook-form";
import * as yup from 'yup'
import {yupResolver} from '@hookform/resolvers/yup'
import axios from "axios";
import Select from 'react-select';
import dataJson from "../data.json";
import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import '../index.css'
import UpdatePizza from "./UpdatePizza";



function PizzaDetail()
{

    
    const [PizzaData, setPizzaData] = useState([]);
    const id = useParams()['id'];

    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await axios.get(`http://localhost:3000/pizzas/${id}`);
              
              console.log(response.data);
              setPizzaData(response.data);
            } catch (error) {
              console.error("Error fetching pizza data:", error);
            }
          };
      fetchData();
    }, []); 

let deliveryValue = PizzaData.delivery === 'Yes' ? '1' : '0';
let deliveryLabel = PizzaData.delivery === 'Yes' ? 'Yes' : 'No';

    const defaultPizza = {
        pizzaname: PizzaData.name,
        fanfavorite: PizzaData.fanFavorite,
        delivery: { value: deliveryValue, label: deliveryLabel }
         
        
      };

    
    if(typeof PizzaData.toppings !== "undefined")
    {
        PizzaData.toppings.forEach(topping => {
            defaultPizza[topping] = true;
          });
    }
      

    

   

    return PizzaData ? <UpdatePizza defaultPizza={defaultPizza} id = {id}/> : <div>Loading...</div>

}

export default PizzaDetail;

