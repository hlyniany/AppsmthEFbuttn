export default {
    ActionClick(a) {
        // Get the task ID from Input2
        const taskId = Input2.text;
        const actionText = a;
        // Construct the JSON body with the task ID
        const body = {
            "id": taskId
        };
        Text1.setText("Launching script...");
        // Send the POST request
        fetch("https://hook.eu1.make.com/k839iaao560v979hysykbcyeo5rxi6vg", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        .then(response => {
            // Check if the response is OK
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            // Return the response as a blob for binary data
            return Promise.all([response.blob(), response.headers.get('content-disposition')]);
        })
        .then(([blob, contentDisposition]) => {
            // Extract filename from content-disposition header
            const filename = contentDisposition
                ? contentDisposition.split('filename=')[1].replace(/"/g, '').trim()
                : 'downloaded_file.xlsx'; // Fallback filename

            // Create a link element to download the file
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = filename; // Set the filename from headers
            document.body.appendChild(a);
            a.click(); // Trigger the download
            a.remove(); // Clean up
            window.URL.revokeObjectURL(url); // Release the blob URL
        })
        .catch((error) => {
            // Handle error response and set error message to Text1
            console.error("Error:", error);
            Text1.setText(`Error: ${error.message}`); // Send error message to Text1
        });
    }
};
