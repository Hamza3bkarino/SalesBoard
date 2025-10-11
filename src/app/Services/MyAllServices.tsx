import { BaseUrlApi } from "../Utils/BaseUrl"
import axios from "axios";

export const SalesBoard = {
    async NewProduct(ProductName:string){
        try {
          const response = await axios.post(`${BaseUrlApi}/AddNewProduct?ProductName=${ProductName}`);
            console.log(response);
            
            return response.data; // Return the response data
        } catch (error) {
            console.error(error);
            
            throw error; // Throw an error containing the server error message
        }
    },
    async GetAllProducts(){
        try {
          const response = await axios.get(`${BaseUrlApi}/GetAllProducts`);
            console.log(response);
            
            return response.data; // Return the response data
        } catch (error) {
            console.error(error);
            
            throw error; // Throw an error containing the server error message
        }
    },
}