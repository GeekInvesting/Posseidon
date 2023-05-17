export const authSignIn = async (userEmail: string, userPassword: string) => {
    const response = await fetch(`${urlAtena}/auth`, {
        method: "POST",
        headers: {
        "Content-Type": "application/json",
        },
        body: JSON.stringify({ userEmail, userPassword }),
    });
    
    return response;
}

export const validToken = async () => {
    const token = localStorage.getItem("token");
    
    const response = await fetch(`${urlAtena}/valid`, {
        method: "GET",
        headers: {
        "Content-Type": "application/json",
        "authorization": "Bearer " + token
        }
    });

    return response;
}