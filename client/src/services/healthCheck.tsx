export async function checkHealth(){
    try{
        const response = await fetch('http://localhost:5000/health');
        if(!response.ok)throw new Error('health check failed');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('health check error:', error);
        throw error;
    }
}