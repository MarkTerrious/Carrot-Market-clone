"use server"

async function handleForm(prevState:any, data:FormData) {
    console.log("client data : ", data);
    console.log("Previous state >> ", prevState)
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    return {
        errors:["wrong password", "password is too short"]
    }
}


export default handleForm;