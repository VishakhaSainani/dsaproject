function findShortestPath() {console.log("g");
    // Retrieve origin and destination values
    var origin = document.getElementById("origin").value;
    var destination = document.getElementById("destination").value;
    console.log("DS");
    // Send a Fetch request to the server
    fetch(`/calculate_path?origin=${origin}&destination=${destination}`)
      .then(response => response.json())
      .then(shortestPath => {
        if (shortestPath && shortestPath.length > 0) {
          // Valid shortest path exists
          var shortestPathList = document.getElementById("shortestPathList");
          shortestPathList.innerHTML = ""; // Clear previous content
  
          // Iterate over the shortest path and create list items
          shortestPath.forEach(node => {
            var listItem = document.createElement("li");
            listItem.textContent = node;
            shortestPathList.appendChild(listItem);
          });
        } else {
          // No valid path found
          var errorMessage = document.getElementById("errorMessage");
          errorMessage.textContent = "No path exists from origin to destination.";
        }
      })
      .catch(error => {
        console.error(error);
        // Handle error if the request fails
      });
  }
  