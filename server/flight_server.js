const http = require('http');
const soap = require('soap');
const axios = require('axios');

const API_KEY = 'f7bd90dace6a69f4b3d7e7ca8317c5cf'; 

// SOAP servisi için flightService tanımı
const flightService = {
    FlightService: {
        FlightPort: {
            getFlightInfo: async (args) => {
                try {
                    const airport = args.airport;
                    const url = `https://api.aviationstack.com/v1/flights?access_key=${API_KEY}&dep_iata=${airport}`; // API URL'i
                    const response = await axios.get(url);

                    const flights = response.data?.data || []; // Güvenli veri erişimi
                    return {
                        airport: airport,
                        flights: JSON.stringify(flights), // JSON formatında döndürme
                    };
                } catch (error) {
                    console.error("Uçuş bilgisi alınırken hata:", error.response?.data || error.message);
                    return {
                        airport: args.airport,
                        flights: "Hata: Uçuş bilgisi alınamadı",
                    };
                }
            },
        },
    },
};

// WSDL tanımı
const wsdlXML = `
<definitions xmlns="http://schemas.xmlsoap.org/wsdl/" xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/" xmlns:tns="http://example.com/flight" xmlns:xsd="http://www.w3.org/2001/XMLSchema" name="FlightService" targetNamespace="http://example.com/flight">
    <message name="GetFlightInfoRequest">
        <part name="airport" type="xsd:string"/>
    </message>
    <message name="GetFlightInfoResponse">
        <part name="airport" type="xsd:string"/>
        <part name="flights" type="xsd:string"/>
    </message>
    <portType name="FlightPortType">
        <operation name="getFlightInfo">
            <input message="tns:GetFlightInfoRequest"/>
            <output message="tns:GetFlightInfoResponse"/>
        </operation>
    </portType>
    <binding name="FlightBinding" type="tns:FlightPortType">
        <soap:binding style="rpc" transport="http://schemas.xmlsoap.org/soap/http"/>
        <operation name="getFlightInfo">
            <soap:operation soapAction="getFlightInfo"/>
            <input>
                <soap:body use="literal"/>
            </input>
            <output>
                <soap:body use="literal"/>
            </output>
        </operation>
    </binding>
    <service name="FlightService">
        <port name="FlightPort" binding="tns:FlightBinding">
            <soap:address location="http://localhost:3500/soap/flight"/>
        </port>
    </service>
</definitions>
`;

// HTTP sunucusu oluşturma
const server = http.createServer((req, res) => {
    res.end("SOAP servisi çalışıyor!");
});

// Port numarasını ayarlama
const port = 3500;

// Sunucuyu başlatma
server.listen(port, () => {
    console.log(`SOAP servisi http://localhost:${port}/soap/flight adresinde çalışıyor.`);
});

// SOAP servisini başlatma
soap.listen(server, '/soap/flight', flightService, wsdlXML);
