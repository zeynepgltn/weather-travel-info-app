# GRPC Weather and Travel Info App 🌍✈️

This project is a Node.js-based application integrating gRPC, SOAP, and REST protocols. It allows users to quickly query data about tourist destinations, weather conditions, and flight information.

## Features 🚀
- **Tourist Destination Search**: Retrieve detailed information about continents and countries using a REST API.
- **Weather Information**: Query temperature, humidity, and wind conditions using OpenWeather API via gRPC protocol.
- **Flight Information**: Fetch flight details using AviationStack API via SOAP protocol.

## Technologies 🛠️
- **Backend**: Node.js, Express.js
- **API Protocols**: gRPC, SOAP, REST
- **Third-Party API Integrations**: OpenWeatherMap, AviationStack
- **Dependencies**:
  - `@grpc/grpc-js`
  - `@grpc/proto-loader`
  - `axios`
  - `soap`
  - and others (see the `package.json` file).

## Installation 🛠️
1. **Clone the Repository**:
   ```bash
   git clone https://github.com/<your_username>/grpc-weather-travel-info-app.git
   cd grpc-weather-travel-info-app
