export default {
    ActionClick(a) {
        // Get the task ID from Input2
        const taskId = Input2.text;
				const actionText = a;
        // Construct the JSON body with the task ID
        const body = {
            "payload": {
                "id": taskId
            },
						"action" : actionText
        };
				Text1.setText("Launching script...");
        // Send the POST request
        fetch("https://hook.eu1.make.com/34kfn422g71sf526mhh6bnbfc3lldexh", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })
        .then(response => response.json())
        .then(data => {
            // Handle success response
            console.log("Success:", data);
						Text1.setText(data.responce);
        })
        .catch((error) => {
            // Handle error response
            console.error("Error:", error);
        });
    }
	
};
