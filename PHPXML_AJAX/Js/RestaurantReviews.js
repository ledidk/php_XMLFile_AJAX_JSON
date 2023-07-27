$(document).ready(function() {
    
  var resultMsg = $("#lblConfirmation");
  resultMsg.hide();
    
  // Fetching the restaurant options and populate the select dropdown
  $.ajax({
    url: "php/RestaurantReviews.php",
    dataType: "json",
    success: function(data) {
      if (data.length > 0) {
        var id = -1;
        var select = "Select ...";
        var selectOptions = "<option value='" + id + "'>" + select + "</option>";
        data.forEach(function(restaurant) {
          selectOptions += "<option value='" + restaurant.id + "'>" + restaurant.name + "</option>";
        });
        $('#drpRestaurant').html(selectOptions);
      }
    },
    error: function() {
      alert("Error occurred while fetching restaurant data.");
    }
  });

  // Handling the change event of the restaurant select dropdown
  $('#drpRestaurant').on('change', function() {
    resultMsg.hide();
    var restaurantId = $(this).val();
    if (restaurantId !== "-1") {
      // Make an AJAX request to retrieve the restaurant details
      $.ajax({
        url: "php/RestaurantDetails.php",
        method: "POST",
        data: { restaurantId: restaurantId },
        dataType: "json",
        success: function(restaurantDetails) {
          // Update the UI with the retrieved data
          $('#txtStreetAddress').val(restaurantDetails.streetAddress);
          $('#txtCity').val(restaurantDetails.city);
          $('#txtProvinceState').val(restaurantDetails.provinceState);
          $('#txtPostalZipCode').val(restaurantDetails.postalZipCode);
          $('#txtSummary').val(restaurantDetails.summary);
          //$('#drpRating').val(restaurantDetails.rating);
          
        // Set the selected option in the rating dropdown
        var rate = parseInt(restaurantDetails.rating);
        var selectRatingOption = "<option value='1'>1</option>";
        selectRatingOption += "<option value='2'>2</option>";
        selectRatingOption += "<option value='3'>3</option>";
        selectRatingOption += "<option value='4'>4</option>";
        selectRatingOption += "<option value='5'>5</option>";

        $("#drpRating").html(selectRatingOption);
        $("#drpRating").val(rate);

          // Check the corresponding option in the rating dropdown
          //$('#drpRating option[value="' + restaurantDetails.rating + '"]').prop('selected', true);
        },
        error: function() {
          alert("Error occurred while retrieving restaurant details.");
        }
      });
    } else {
      // Clear the restaurant details when no restaurant is selected
      $('#txtStreetAddress').val('');
      $('#txtCity').val('');
      $('#txtProvinceState').val('');
      $('#txtPostalZipCode').val('');
      $('#txtSummary').val('');
      $('#drpRating').val('');
      
    }
  });

  // Saving after the button click event
  $('#btnSave').on('click', function() {
    // Prepare the data to be saved
    var updatedRestaurantDetails = {
      restaurantId: $('#drpRestaurant').val(),
      streetAddress: $('#txtStreetAddress').val(),
      city: $('#txtCity').val(),
      provinceState: $('#txtProvinceState').val(),
      postalZipCode: $('#txtPostalZipCode').val(),
      summary: $('#txtSummary').val(),
      rating: $('#drpRating').val()
    };

    // Make an AJAX request to save the updated details
    $.ajax({
      url: "php/SaveRestaurantDetails.php",
      method: "POST",
      data: updatedRestaurantDetails,
      success: function(response) {
        resultMsg.text(result).show();
        var confirmationLabel = document.getElementById("lblConfirmation");  
        if (response === "success") {
            
          var result = "Revised Restaurant has been saved to: Data/restaurant_review.xml";
          confirmationLabel.textContent = "Revised Restaurant has been saved to: Data/restaurant_review.xml";
          confirmationLabel.style.color = "#00573F";
          
          //alert(result);
        } else {
          confirmationLabel.textContent = "Try to select a restaurant from the dropdown list to save changes.";
          confirmationLabel.style.color = "red";
          //alert("Failed to save restaurant details.");
        }
      },
      error: function() {
        alert("An error occurred while saving restaurant details.");
      }
    });
  });
});
