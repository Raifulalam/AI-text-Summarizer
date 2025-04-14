const textArea = document.getElementById("text_to_summarize");
const submitButton = document.getElementById("submit-button");
const summarizedTextArea = document.getElementById("summary");

submitButton.disabled = true;

textArea.addEventListener("input", verifyTextLength);
submitButton.addEventListener("click", submitData);

function verifyTextLength(e) {
  const textarea = e.target;

  // Enable or disable the submit button based on text length
  if (textarea.value.length > 200 && textarea.value.length < 100000) {
    submitButton.disabled = false;
  } else {
    submitButton.disabled = true;
  }
}

function submitData(e) {
  // Add loading animation to the submit button
  submitButton.classList.add("submit-button--loading");

  const text_to_summarize = textArea.value;
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  const raw = JSON.stringify({
    "text_to_summarize": text_to_summarize
  });

  const requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow'
  };

  // Send the text to the server using fetch API
  fetch('https://ai-summarizer-1.onrender.com/summarize', requestOptions)
    .then(response => {
      console.log("Response received from server:", response);
      return response.json(); // Assuming the response is JSON
    })
    .then(data => {
      // Assuming the response contains 'summary' field
      if (data.summary) {
        summarizedTextArea.value = data.summary;
      } else {
        summarizedTextArea.value = "No summary returned.";
      }

      // Stop the loading animation
      submitButton.classList.remove("submit-button--loading");
    })
    .catch(error => {
      console.log("Error:", error);
      // Stop the loading animation
      submitButton.classList.remove("submit-button--loading");
    });
}
