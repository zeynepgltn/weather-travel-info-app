const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

const PROTO_PATH = './proto/weather_service.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH);
const weatherProto = grpc.loadPackageDefinition(packageDefinition).weather;

const client = new weatherProto.WeatherService(
    '127.0.0.1:50051',
    grpc.credentials.createInsecure()
);

const city = 'Paris'; // Test için bir şehir adı

client.GetWeather({ city }, (error, response) => {
    if (error) {
        console.error('Error:', error.message);
        return;
    }
    console.log('Weather Response:', response);
});
