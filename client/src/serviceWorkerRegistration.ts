export function register(){
    if ("serviceWorker" in navigator){
        window.addEventListener('load',()=>{
            navigator.serviceWorker.register("/serviceWorker.js").then((registration)=>{
                console.log('service worker registered:', registration)
            }) .catch((error)=>{
                console.log('service worker registration fail:', error)

            })
        })
    }
}