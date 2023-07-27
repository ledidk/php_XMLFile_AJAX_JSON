<?php
    $iniFile = parse_ini_file("Lab5.ini", true);
    $xmlFilePath = $iniFile['Paths']['xmlFilePath'];
    $xml = simplexml_load_file($xmlFilePath);

    $restaurantOptions = [];

    foreach ($xml->restaurant as $restaurant) {
      $restaurantOptions[] = [
        'id' => (string)$restaurant->id,
        'name' => (string)$restaurant->name
      ];
    }

    echo json_encode($restaurantOptions);
