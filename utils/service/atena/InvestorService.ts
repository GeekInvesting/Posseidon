export const getbyUser = async () => {
    const response = await fetch(`${urlAtena}/investor`, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        "authorization": "Bearer " + localStorage.getItem("token")
        },
    });
    
    return response;
}