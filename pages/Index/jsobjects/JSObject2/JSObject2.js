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
	},

	DeletePOClick() {
		const ponumber = ponum.text;
		// Construct the JSON body with the task ID
		const body = {
			"ponumber":ponumber
		};

		fetch("https://hook.eu1.make.com/51yilhhip5bmg724lk8bxzhlbif7wtt6", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		})
			.then(response => response.json())
			.then(data => {
			try {
				// Parse the JSON in data.responce
				const responseObject = JSON.parse(data.responce);

				if (responseObject.profound === true) {
					// Set Group1 visible
					Group1.setVisibility(true);
				} else {
					// Log a message if "profound" is false or not found
					console.log("PO is not found");
				}
			} catch (error) {
				console.error("Error parsing JSON:", error);
			}
		})
			.catch((error) => {
			// Handle error response
			console.error("Error:", error);
		});
	},
	
	ButtonGroup1groupButtonsgroupButton3onClick () {
			Group1.setVisibility(false);
	}

};
