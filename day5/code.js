// export const handler = async (event) => {
//   const employees = [
//     {name: "Peter", id: "01"},
//     {name: "Michael", id: "02"},
//     {name: "Ann", id: "03"},
//   ];
//   const response = {
//     statusCode: 200,
//     body: JSON.stringify(employees),
//   };
//   return response;
// };

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, GetCommand, ScanCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

// Initialize DynamoDB client
const client = new DynamoDBClient({ region: "us-east-1" });
const docClient = DynamoDBDocumentClient.from(client);

const TABLE_NAME = "users";

export const handler = async (event) => {
    try {
        // console.log("my event: ", event);
        // if (event.httpMethod === "POST") {
        // const body = JSON.parse(event.body || "{}");

        // return {
        //     statusCode: 200,
        //     body: JSON.stringify(event)
        // };
        const body = event || {};
        if (body.id && body.name) {
            const putCommand = new PutCommand({
                TableName: TABLE_NAME,
                Item: {
                    userId: body.id,         // Unique ID
                    name: body.name,     // Name field
                    // age: user.age,       // Age field
                    createdAt: new Date().toISOString()
                }
            });
            await docClient.send(putCommand);

            return {
                statusCode: 201,
                body: JSON.stringify({ message: "Data inserted successfully!" })
            };
        }
        
        // }
        // if (event.httpMethod === "GET") {
          // Query data from DynamoDB (Get single item by ID)
          if (event.queryStringParameters && event.queryStringParameters.id) {
              const getCommand = new GetCommand({
                  TableName: TABLE_NAME,
                  Key: { userId: event.queryStringParameters.id }
              });

              const data = await docClient.send(getCommand);

              return {
                  statusCode: 200,
                  body: JSON.stringify(data.Item || { message: "Item not found" })
              };
          }

          // Scan DynamoDB (Get all items)
          const scanCommand = new ScanCommand({ TableName: TABLE_NAME });
          const data = await docClient.send(scanCommand);

          return {
              statusCode: 200,
              body: JSON.stringify(data.Items)
          };
        // }

        // return {
        //     statusCode: 400,
        //     body: JSON.stringify({ message: "Invalid HTTP method" + event.httpMethod })
        // };
    } catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message + " " + event })
        };
    }
};
