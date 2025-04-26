export default {
    Input1onTextChanged() {
        // Get the text value from Input1
        const input1Text = Input1.text;

        // Extract task ID using regular expression to match the ClickUp URL format
        const match = input1Text.match(/https:\/\/app\.clickup\.com\/t\/([a-zA-Z0-9]+)/);

        if (match && match[1]) {
            // Set extracted task ID to Input2
          ClickUpId.setValue(match[1]);
					Text1.setText("");
        } else {
            // Clear Input2 if no match is found
           ClickUpId.setValue("");
        }
    }
};
