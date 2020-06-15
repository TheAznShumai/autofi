## Project 

This project takes has a single endpoint that takes in the following inputs.

`POST /api/v1/import`

file | attachment
provider | String

The following fields will be mapped and stored onto a mongo db memory server.

* UUID
* VIN (alphanumerical vehicle id)
* Make
* Model
* Mileage
* Year
* Price

Depending on the provider `withHeader` or `withoutHeader`, the system will use preloaded mapping data to locate the data corresponding to the uploaded csv file.

See `test/fixtures/provider-source-config-data.js` for more details on the mappings. We will be mapping the csv to the corresponding mongo db fields based on the header or the column number.

## Project Setup

`yarn install`

`yarn start`

## Testing

`yarn test`

## Known Issues

* Right now, superTest is having issues creating a multi-part request where multer (the express middleware for handling uploads).  I've commented the integration test out for the time being.  You can test file uploads using the test fixtures csv files to do an upload after starting the server.
`curl --location --request POST 'localhost:3000/api/v1/import' --form 'file=@<ROOTDIR>/test/fixtures/withHeader.csv' --form 'provider=withHeader'`