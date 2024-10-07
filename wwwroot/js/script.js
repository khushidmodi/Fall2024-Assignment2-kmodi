function apiSearch(isLucky = false) {
    var params = {
        'q': $('#query').val(),
        'count': 50,
        'offset': 0,
        'mkt': 'en-us'
    };

    $.ajax({
        url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params), 
        type: 'GET',
        headers: {
            'Ocp-Apim-Subscription-Key': 'cf615005b87e4b53a0dc6020d86da910' 
        }
    })
    .done(function (data) {
        if (data.webPages && data.webPages.value.length > 0) {
            var firstResultUrl = data.webPages.value[0].url;

            if (isLucky) {
                // Redirect to the first result if the "I'm Feeling Lucky" button was clicked
                window.location.href = firstResultUrl;
                return;
            }

            // Otherwise, display the results
            var len = data.webPages.value.length;
            var results = '';
            for (i = 0; i < len; i++) {
                results += `<p><a href="${data.webPages.value[i].url}">${data.webPages.value[i].name}</a>: ${data.webPages.value[i].snippet}</p>`;
            }

            $('#searchResults').html(results);
            $('#searchResults').css('visibility', 'visible');
            $('#searchResults').dialog({
                modal: true,
                title: 'Search Results',
                width: 600,
                buttons: {
                    Close: function () {
                        $(this).dialog('close');
                    }
                }
            });
        } else {
            alert("No results found.");
        }
    })
    .fail(function () {
        alert('Error fetching search results.');
    });
}


// Function to change the background image of the site
function changeBackgroundImage() {
    // Define an array of the 3 image options
    var images = [
        'url("/Users/kush_1000/Classes/CS 330/Project2/Fall2024-Assignment2-kmodi/wwwroot/css/images/image1.jpg")',  // Replace with the actual path to image1
        'url("/Users/kush_1000/Classes/CS 330/Project2/Fall2024-Assignment2-kmodi/wwwroot/css/images/image2.jpg")',  // Replace with the actual path to image2
        'url("/Users/kush_1000/Classes/CS 330/Project2/Fall2024-Assignment2-kmodi/wwwroot/css/images/image3.jpg")'   // Replace with the actual path to image3
    ];

    // Pick a random image from the array
    var randomImage = images[Math.floor(Math.random() * images.length)];

    // Change the background image of the body
    document.body.style.backgroundImage = randomImage;
}

// Function to get the current time and display it in a jQuery UI dialog
function displayTime() {
    var currentTime = new Date();
    var formattedTime = currentTime.getHours().toString().padStart(2, '0') + ':' + currentTime.getMinutes().toString().padStart(2, '0');

    // Display the time in the time div
    $('#time').text(`Current Time: ${formattedTime}`);
    $('#time').css('visibility', 'visible'); // Make sure the div is visible

    // Show the time in a jQuery UI dialog
    $('#time').dialog({
        modal: true,
        title: 'Current Time',
        width: 400,
        buttons: {
            Close: function () {
                $(this).dialog('close');
            }
        }
    });
}

// Attach event listeners to the respective elements
$(document).ready(function () {
    // When the search button is clicked, trigger the search
    $("#Search").click(function () {
        apiSearch();
    });

    // Event listener for the "I'm Feeling Lucky" button
    $("#luckyButton").click(function () {
        apiSearch(true);  // Perform a search and redirect to the first result
    });

    // When the search engine name (header) is clicked, change the background image
    $('h1').click(function () {
        changeBackgroundImage();
    });

    // When the Display Time button is clicked, show the current time
    $("#CurrentTime").click(function () {
        displayTime();
    });
});
