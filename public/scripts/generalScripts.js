//produces csrf token for API calls 
async function getCsrfToken(){
    const response = await fetch(url+'csrf-token',{
        method: 'GET',
    });
    const result = await response.json();
    return result.csrfToken;
}