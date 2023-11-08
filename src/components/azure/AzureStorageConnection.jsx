/**
 * Copyright © 2023, Eden Sign Inc. ALL RIGHTS RESERVED.
 *
 * This software is the confidential information of Eden Sign Inc., and is licensed as
 * restricted rights software. The use, reproduction, or disclosure of this software is subject to
 * restrictions set forth in your license agreement with Eden Sign.
 */

import { BlobServiceClient } from "@azure/storage-blob";

const ENV = import.meta.env;

//This client we make, is used to interact with Azure Blob Storage
const blobServiceClientDoc = new BlobServiceClient(
    `${ENV.VITE_SAS_DOCUMENT_URL}?${ENV.VITE_SAS_DOCUMENT_TOKEN}`
);


export const downloadResumeFromAzure = async (fileName) => {
    /** Downloads the document file blob from azure storage container
     */

    //Through this line, we get a reference to the container
    const containerClient = blobServiceClientDoc.getContainerClient('job-seeker');
    //Through this line, we get a reference to the specific blob within the above specified container
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);

    try {
        //This fetches blob content to download
        const response = await blockBlobClient.download();
        //Extracting the blob's content as a Blob object & creating a downloadable Link for the blob data
        const blob = await response.blobBody;
        const url = window.URL.createObjectURL(blob);
        //Creating HTML anchor <a> element & appending it as a child to HTML document body
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        //Triggering a click event on the <a> element to initiate the download process
        a.click();
        //After the download is initiated, we revoke the URL created earlier to free up resources, memory efficient
        window.URL.revokeObjectURL(url);
    } catch (error) {
        console.error('Error downloading blob:', error);
    }
};
