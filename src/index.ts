import * as fs from 'fs';
import { CommissionService } from './models/commission/commission.service';
import { OperationsService } from './models/operation/operation.service';

const inputFilePath = process.argv[2]; // Get the input file path from the command-line arguments

if (!inputFilePath) {
  console.error('Please provide the path to the input file.');
  process.exit(1);
}

// Function to read the input file and parse the JSON content
function readInputFile(filePath: string): Promise<any[]> {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        try {
          const operations = JSON.parse(data);
          resolve(operations);
        } catch (parseError) {
          reject(parseError);
        }
      }
    });
  });
}

// Main function to process operations
async function processOperations() {
  try {
    const operations = await readInputFile(inputFilePath);
    const operationsService = new OperationsService(new CommissionService()); // Inject CommissionService here

    for (const operation of operations) {
      try {
        const commission = operationsService.processOperation(operation);
        console.log(commission.toFixed(2)); // Output the commission to stdout
      } catch (operationError) {
        console.error('Error processing operation:', operationError);
      }
    }
  } catch (error) {
    console.error('Error processing operations:', error);
  }
}

processOperations();