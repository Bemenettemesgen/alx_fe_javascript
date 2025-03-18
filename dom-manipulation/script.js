// Array to hold quotes
let quotes = [
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", category: "Motivation" },
    { text: "The only way to do great work is to love what you do.", category: "Inspiration" }
  ];
  
  // Function to display a random quote
  function showRandomQuote() {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const quote = quotes[randomIndex];
    document.getElementById("quoteDisplay").innerHTML = `"${quote.text}" - <em>${quote.category}</em>`;
  }
  
  // Function to add a new quote
  function addQuote() {
    const text = document.getElementById("newQuoteText").value;
    const category = document.getElementById("newQuoteCategory").value;
  
    if (text && category) {
      quotes.push({ text, category });
      document.getElementById("newQuoteText").value = '';
      document.getElementById("newQuoteCategory").value = '';
      alert("Quote added successfully!");
    } else {
      alert("Please fill out both fields.");
    }
  }
  
  // Event listener for "Show New Quote" button
  document.getElementById("newQuote").addEventListener("click", showRandomQuote);
  function saveQuotes() {
    localStorage.setItem("quotes", JSON.stringify(quotes));
  }
  
  function loadQuotes() {
    const savedQuotes = localStorage.getItem("quotes");
    if (savedQuotes) {
      quotes = JSON.parse(savedQuotes);
    }
  }
  
  // Call loadQuotes when the page loads
  window.onload = function() {
    loadQuotes();
  };
  function exportQuotes() {
    const dataStr = JSON.stringify(quotes);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
  
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.download = "quotes.json";
    downloadLink.click();
  }
  function importQuotes(event) {
    const file = event.target.files[0];
    const reader = new FileReader();
  
    reader.onload = function(e) {
      const importedQuotes = JSON.parse(e.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      alert("Quotes imported successfully!");
    };
    reader.readAsText(file);
  }
  // Populate category dropdown
function populateCategories() {
    const categories = [...new Set(quotes.map(q => q.category))];
    const categoryFilter = document.getElementById("categoryFilter");
  
    categoryFilter.innerHTML = '<option value="all">All Categories</option>';
    categories.forEach(category => {
      const option = document.createElement("option");
      option.value = category;
      option.textContent = category;
      categoryFilter.appendChild(option);
    });
  }
  
  // Filter quotes based on selected category
  function filterQuotes() {
    const selectedCategory = document.getElementById("categoryFilter").value;
    const quoteDisplay = document.getElementById("quoteDisplay");
  
    const filteredQuotes = selectedCategory === "all"
      ? quotes
      : quotes.filter(q => q.category === selectedCategory);
  
    if (filteredQuotes.length) {
      const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
      const quote = filteredQuotes[randomIndex];
      quoteDisplay.innerHTML = `"${quote.text}" - <em>${quote.category}</em>`;
    } else {
      quoteDisplay.innerHTML = "No quotes available in this category.";
    }
  }
  
  // Call populateCategories on page load
  window.onload = function() {
    loadQuotes();
    populateCategories();
  };
  async function fetchQuotesFromServer() {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    const data = await response.json();
  
    // Map data to quote format
    const serverQuotes = data.map(post => ({
      text: post.title,
      category: "Server"
    }));
  
    quotes = [...serverQuotes, ...quotes];
    saveQuotes();
    alert("Quotes synced with the server!");
  }
  }
  setInterval(fetchQuotesFromServer, 60000);
  function createAddQuoteForm() {
    // Create form elements
    const formDiv = document.createElement("div");
    const quoteInput = document.createElement("input");
    const categoryInput = document.createElement("input");
    const addButton = document.createElement("button");
  
    // Set attributes and placeholders
    quoteInput.setAttribute("id", "newQuoteText");
    quoteInput.setAttribute("type", "text");
    quoteInput.setAttribute("placeholder", "Enter a new quote");
  
    categoryInput.setAttribute("id", "newQuoteCategory");
    categoryInput.setAttribute("type", "text");
    categoryInput.setAttribute("placeholder", "Enter quote category");
    addButton.textContent = "Add Quote";
    addButton.onclick = addQuote;
    formDiv.appendChild(quoteInput);
    formDiv.appendChild(categoryInput);
    formDiv.appendChild(addButton);
    document.body.appendChild(formDiv);
  }function createAddQuoteForm() {
    const formDiv = document.createElement("div");
    formDiv.setAttribute("id", "addQuoteForm");
    const quoteInput = document.createE
  window.onload = function() {
    loadQuotes();
    populateCategories();
    createAddQuoteForm(); // Ensure the form is added dynamically
  };
  function addQuote() {
    const text = document.getElementById("newQuoteText").value;
    const category = document.getElementById("newQuoteCategory").value;
    if (text && category) {
      quotes.push({ text, category });
      saveQuotes();
      populateCategories()
      document.getElementById("newQuoteText").value = '';
      document.getElementById("newQuoteCategory").value = '';
      alert("Quote added successfully!");
    } else {
      alert("Please fill out both fields.");
    }
  }
document.getElementById("newQuote").addEventListener("click", showRandomQuote);
    // Function to post a new quote to the server
async function postQuoteToServer(quote) {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(quote),
    });

    if (!response.ok) {
      throw new Error("Failed to post the quote to the server.");
    }

    const responseData = await response.json();
    console.log("Quote posted successfully:", responseData);
    alert("Quote successfully posted to the server!");
  } catch (error) {
    console.error(error.message);
    alert("Error posting quote to the server.");
  }
}

// Update the addQuote function to post new quotes to the server
function addQuote() {
  const text = document.getElementById("newQuoteText").value;
  const category = document.getElementById("newQuoteCategory").value;

  if (text && category) {
    const newQuote = { text, category };

    // Add the quote locally
    quotes.push(newQuote);
    saveQuotes();
    populateCategories();

    // Post the quote to the server
    postQuoteToServer(newQuote);

    // Clear input fields
    document.getElementById("newQuoteText").value = '';
    document.getElementById("newQuoteCategory").value = '';
    alert("Quote added successfully!");
  } else {
    alert("Please fill out both fields.");
  }
}
async function syncQuotes() {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts");
    if (!response.ok) {
      throw new Error("Failed to fetch quotes from the server.");
    }

    const serverQuotes = await response.json();

    // Map server data to the quote format
    const mappedQuotes = serverQuotes.map(post => ({
      text: post.title,
      category: "Server",
    }));

    // Merge server quotes with local quotes
    const mergedQuotes = [...mappedQuotes, ...quotes];
    quotes = Array.from(new Set(mergedQuotes.map(q => JSON.stringify(q)))).map(q =>
      JSON.parse(q)
    );

    saveQuotes();
    alert("Quotes successfully synced with the server!");
  } catch (error) {
    console.error(error.message);
    alert("Error syncing quotes with the server.");
  }
}
// Periodically fetch new quotes from the server every 60 seconds
setInterval(syncQuotes, 60000);
function notifyUser(message) {
  const notification = document.createElement("div");
  notification.textContent = message;
  notification.style.position = "fixed";
  notification.style.bottom = "10px";
  notification.style.right = "10px";
  notification.style.backgroundColor = "green";
  notification.style.color = "white";
  notification.style.padding = "10px";
  notification.style.borderRadius = "5px";

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 3000);
}
notifyUser("Quotes synced successfully!");
