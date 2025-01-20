const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const axios = require('axios');

// Load the protobuf definition
const PROTO_PATH = './proto/weather_service.proto';
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true,
});
const weatherProto = grpc.loadPackageDefinition(packageDefinition).weather;

// Implement the WeatherService
const getWeather = async (call, callback) => {
  const city = call.request.city;
  const apiKey = 'b1944eef538c70677d819e0ab38b88c3';
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (!data.main || !data.weather || !data.wind) {
      throw new Error('Incomplete weather data from API');
    }

    const weatherResponse = {
      temperature: `${data.main.temp} °C`,
      wind: `${data.wind.speed} m/s`,
      pressure: `${data.main.pressure} hPa`,
      humidity: `${data.main.humidity}%`,
      description: data.weather[0].description,
    };

    callback(null, weatherResponse);
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    callback({
      code: grpc.status.INTERNAL,
      details: `Failed to retrieve data: ${error.response ? error.response.status : error.message
        }`,
    });
  }
};

// Create the server
const server = new grpc.Server();
server.addService(weatherProto.WeatherService.service, {
  GetWeather: getWeather,
});

server.bindAsync(
  '127.0.0.1:50051',
  grpc.ServerCredentials.createInsecure(),
  (err, port) => {
    if (err) {
      console.error('Server failed to start:', err.message);
      return;
    }
    console.log(`Server running at http://127.0.0.1:${port}`);
    server.start();
  }
);
