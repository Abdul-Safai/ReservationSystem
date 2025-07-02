<?php
// reserve.php
require_once("database.php");

// Get POST input
$customerName = filter_input(INPUT_POST, 'customerName');
$reservationDate = filter_input(INPUT_POST, 'reservationDate');
$reservationTime = filter_input(INPUT_POST, 'reservationTime');
$partySize = filter_input(INPUT_POST, 'partySize', FILTER_VALIDATE_INT);

if (!$customerName || !$reservationDate || !$reservationTime || !$partySize) {
  echo json_encode(["success" => false, "message" => "Missing input data."]);
  exit();
}

// Check how many spots already booked for same date/time
$query = "SELECT total_spots, SUM(spots_booked) AS total_booked 
          FROM reservations 
          WHERE reservationDate = :reservationDate AND reservationTime = :reservationTime";
$statement = $db->prepare($query);
$statement->bindValue(':reservationDate', $reservationDate);
$statement->bindValue(':reservationTime', $reservationTime);
$statement->execute();
$result = $statement->fetch();
$statement->closeCursor();

$total_spots = $result['total_spots'] ?: 3; // default if none yet
$total_booked = $result['total_booked'] ?: 0;

if ($total_booked < $total_spots) {
  // Insert new reservation row with 1 spot booked
  $insert = "INSERT INTO reservations (customerName, reservationDate, reservationTime, partySize, total_spots, spots_booked)
             VALUES (:customerName, :reservationDate, :reservationTime, :partySize, :total_spots, :spots_booked)";
  $statement = $db->prepare($insert);
  $statement->bindValue(':customerName', $customerName);
  $statement->bindValue(':reservationDate', $reservationDate);
  $statement->bindValue(':reservationTime', $reservationTime);
  $statement->bindValue(':partySize', $partySize);
  $statement->bindValue(':total_spots', $total_spots);
  $statement->bindValue(':spots_booked', 1);
  $statement->execute();
  $statement->closeCursor();

  $spots_left = $total_spots - ($total_booked + 1);

  echo json_encode([
    "success" => true,
    "message" => "Reservation created.",
    "spots_left" => $spots_left
  ]);
} else {
  echo json_encode([
    "success" => false,
    "message" => "No spots left for this time slot!"
  ]);
}
?>
