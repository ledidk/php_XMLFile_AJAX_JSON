<?php
// Retrieving the selected restaurantId from the AJAX request
//$restaurantId = 2034;
$restaurantId = $_POST['restaurantId'];

// Loading the XML file
$iniFile = parse_ini_file("Lab5.ini", true);
$xmlFilePath = $iniFile['Paths']['xmlFilePath'];
$xml = simplexml_load_file($xmlFilePath);

// Searching for the restaurant with the matching id
$restaurant = $xml->xpath("/root/restaurant[@id='$restaurantId']");

$restaurantDetails = null;

foreach ($xml->restaurant as $restaurant) {
  if ((string)$restaurant->id == $restaurantId) {
    $restaurantDetails = [
      "streetAddress" => (string)$restaurant->address->street,
      "city" => (string)$restaurant->address->city,
      "provinceState" => (string)$restaurant->address->province,
      "postalZipCode" => (string)$restaurant->address->postalCode,
      "summary" => (string)$restaurant->summary,
      "rating" => (string)$restaurant->rating,
      "id" => (string)$restaurant->id
    ];
    break; // Exiting the loop 
  }
}

if ($restaurantDetails) {
  // Restaurant details found
  echo json_encode($restaurantDetails);
} else {
  // Restaurant not found
  echo json_encode(null);
}
