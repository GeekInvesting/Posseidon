import { urlAtena } from "../BaseUrl";

export const getbyUser = async () => {
    const token = localStorage.getItem("token");
    const response = await fetch(`${urlAtena}/investor`, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        "authorization": `Bearer ${token}`
        },
    });
    
    return response;
}