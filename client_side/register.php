<?php

header("Content-Type:application/json;charset=utf-8");

$conn = new PDO('mysql:host=localhost;dbname=db;charset=utf8', 'root', '', [PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_OBJ, PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION]);

if($_SERVER['REQUEST_METHOD'] == 'POST'){
	$name = $_POST['name'] ?? null;
	$time = $_POST['time'] ?? null;
	$steps = $_POST['steps'] ?? null;
	$difficulty = $_POST['difficulty'] ?? null;

	if (empty($name)) {
		echo json_encode(['error' => 'Name field cannot be blank.']);
		return;
	}

	if (empty($time) && $time != '0') {
		echo json_encode(['error' => 'Time field cannot be blank.']);
		return;
	}

	if (empty($steps) && $steps != '0') {
		echo json_encode(['error' => 'Steps field cannot be blank.']);
		return;
	}

	if (empty($difficulty)) {
		echo json_encode(['error' => 'Difficulty field cannot be blank.']);
		return;
	}

	if (!ctype_digit($time)) {
		echo json_encode(['error' => 'Time field must be an integer.']);
		return;
	}

	if (!ctype_digit($steps)) {
		echo json_encode(['error' => 'Steps field must be an integer.']);
		return;
	}

	$stmtInsert = $conn->prepare('INSERT INTO ranking (name, time, steps, difficulty) VALUES (?, ?, ?, ?)');
	$stmtInsert->execute([$name, $time, $steps, $difficulty]);
}


$stmtSelect = $conn->query('SELECT * FROM ranking');
$ranking = $stmtSelect->fetchAll();
echo json_encode($ranking);