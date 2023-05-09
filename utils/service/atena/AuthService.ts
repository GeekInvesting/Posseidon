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