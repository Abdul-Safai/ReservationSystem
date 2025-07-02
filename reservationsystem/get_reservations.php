<?php
// get_reservations.php
require_once("database.php");

// Get all reservations showing spots booked and total spots
$query = "SELECT ID, customerName, reservationDate, reservationTime, partySize, total_spots, spots_booked FROM reservations";
$statement = $db->prepare($query);
$statement->execute();
$reservations = $statement->fetchAll();
$statement->closeCursor();

// Return JSON response
echo json_encode($reservations);
?>
