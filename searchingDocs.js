const searchInput = document.getElementById('searchInput');
const resultsContainer = document.getElementById('resultsContainer');
const items = [
  'Dr Ranjeet Kumar',
  'Dr. Steven Olms',
  'Dr. Michael Brown',
  'Dr. Emily Davis',
  'Dr. Mason Moore',
  'Dr. Amelia Lee',
  'Dr. Noah Anderson',
  'Dr. James Wilson',
  'Dr. Alexander Jones',
  'Dr. Isabella Brown',
  'Dr. Charlotte Wilson',
  'Dr. Mia Martinez',
  'Dr. Sophia White',
  'Dr. William Jackson',
  'Dr. Jacob Thomas',
  'Dr. Emma Taylor',
  'Dr. Ethan Garcia',
  'Dr. Ava Harris'
];

// Function to filter items based on search query
function filterItems(query) {
  return items.filter(item => item.toLowerCase().includes(query.toLowerCase()));
}

// Function to display filtered results
function displayResults(results) {
  resultsContainer.innerHTML = '';

  if (results.length === 0) {
    resultsContainer.innerHTML = '<p>No results found</p>';
    return;
  }

  results.forEach(result => {
    const div = document.createElement('div');
    div.classList.add('results-item');
    div.textContent = result;
    resultsContainer.appendChild(div);
  });
}

searchInput.addEventListener('input', () => {
  const query = searchInput.value.trim();
  const filteredResults = filterItems(query);
  displayResults(filteredResults);
});
