const soap = require('soap');

// WSDL dosyasının URL'si
const wsdlURL = 'http://localhost:3500/soap/flight?wsdl';

// SOAP istemcisi oluşturma ve servise bağlama
soap.createClient(wsdlURL, (err, client) => {
    if (err) {
        console.error('SOAP istemcisi oluşturulurken hata:', err);
        return;
    }

    // Servise gönderilecek argümanlar
    const args = { airport: 'SWA' }; // Havaalanı kodu örneği

    // Servis metodunu çağırma
    client.getFlightInfo(args, (err, result) => {
        if (err) {
            console.error('SOAP isteği sırasında hata:', err);
        } else {
            console.log('SOAP isteği sonucu:', result);
        }
    });
});
