export default {
	async ActionClick(a) {
		// Get the task ID from Input2
		const taskId = ClickUpId.text;
		const actionText = a;
		
		// Construct the JSON body with the task ID
		const body = {
			"payload": {
				"id": taskId
			},
			"action" : actionText,
			"override_cs": !ValidateCS.isSwitchedOn,
			"override_rfq":!ValidateRFQ.isSwitchedOn,
			"revision":RevisionTemp.selectedOptionValue
		};
		await Text1.setText("Launching script. Validation override is " + !ValidateCS.isSwitchedOn);
		// Send the POST request
		try {
		const response = await fetch("https://hook.eu1.make.com/34kfn422g71sf526mhh6bnbfc3lldexh", 
				{
    		method: "POST",	headers: {"Content-Type": "application/json"}, body: JSON.stringify(body)
				});
		
		const jsonResponse = await response.json();
		// console.log(jsonResponse);
		await Text1.setText(jsonResponse.response);
		await ValidateCS.setValue(true);
		await ValidateRFQ.setValue(true);
		showModal(ModalWait.name);
		while (true) {
        const response = await script_status.run({ executionId: jsonResponse.executionId, scenarioId: jsonResponse.scenarioId });
        if (response.eventType === "EXECUTION_END") {
          //console.log("Execution completed:", response);
          break; // Stop polling
        }
		  await new Promise(resolve => setTimeout(resolve, 30000));
	}
	closeModal(ModalWait.name);
	} catch (error) {
	//console.log(error);
	closeModal(ModalWait.name);
	}
},

	DeletePOClick() {
		// Disable the button immediately
		DeletePO.setDisabled(true);

		const ponumber = ponum.text;
		// Construct the JSON body with the PO number
		const body = {
			"ponumber": ponumber
		};

		// Make the fetch request
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
				console.log(data);

				if (data.pofound === true) {
					// Set Group1 visible and display PO details
					Group1.setVisibility(true);
					POinfo.setText(data.details);
				} else {
					// Show a modal if PO is not found
					showModal(Modal1.name);
				}
			} catch (error) {
				console.error("Error processing response data:", error);
			}
		})
			.catch(error => {
			// Handle fetch error
			console.error("Error:", error);
		})
			.finally(() => {
			// Re-enable the button after the request completes
			DeletePO.setDisabled(false);
		});
	},

	DeleteCancel () {
		Group1.setVisibility(false);
	},

	DoDelete()
	{
		DeletePO.setDisabled(true);
		Group1.setVisibility(false);
		const ponumber = ponum.text;
		// Construct the JSON body with the PO number
		const body = {
			"ponumber": ponumber
		};
		fetch("https://hook.eu1.make.com/0djk7ikuxp586ll0775ey1ik4riy8omi", {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(body)
		})
			.then(response => response.json())
			.then(data => {
			try {


				if (data.result === "ok") {
					showModal(Modal2.name);
				} else {
					// Show a modal if PO is not found
					storeValue('errmsg',data.error,false);
					showModal(Modal3.name);
				}
			} catch (error) {
				console.error("Error processing response data:", error);
			}
		})
			.catch(error => {
			// Handle fetch error
			console.error("Error:", error);
		})
			.finally(() => {
			// Re-enable the button after the request completes
			DeletePO.setDisabled(false);

		});

	}

};
