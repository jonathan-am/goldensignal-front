export default function getConfig(){ 
    let test = false;
    return test ? { backend_url: "http://localhost:2204/v1", affiliateId: "teste" } : { backend_url: "https://api2.sinaldourado.com/v1" , affiliateId: window.location.origin.split('://')[1].split('.')[0]};
}