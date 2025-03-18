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
