<?php
// Retrieve the updated restaurant details from the AJAX request
$restaurantId = $_POST['restaurantId'];
$streetAddress = $_POST['streetAddress'];
$city = $_POST['city'];
$provinceState = $_POST['provinceState'];
$postalZipCode = $_POST['postalZipCode'];
$summary = $_POST['summary'];
$rating = $_POST['rating'];

// Load the XML file
$iniFile = parse_ini_file("Lab5.ini", true);
$xmlFilePath = $iniFile['Paths']['xmlFilePath'];
$xml = simplexml_load_file($xmlFilePath);

// Search for the restaurant with the matching id
$restaurant = null;
foreach ($xml->restaurant as $item) {
  if ($item->id == $restaurantId) {
    $restaurant = $item;
    break;
  }
}

// Check if the restaurant is found
if ($restaurant !== null) {
  // Update the restaurant details
  $restaurant->address->street = $streetAddress;
  $restaurant->address->city = $city;
  $restaurant->address->province = $provinceState;
  $restaurant->address->postalCode = $postalZipCode;
  $restaurant->summary = $summary;
  $restaurant->rating = $rating;

  // Save the modified XML back to the file
  $xml->asXML($xmlFilePath);

  // Send a success response
  echo "success";
} else {
  // Restaurant not found, send an error response
  echo "error";
}


