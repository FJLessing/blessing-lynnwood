<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit();
}

// Get the POST data
$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON data']);
    exit();
}

// Validate required fields
$required_fields = ['name', 'email', 'message'];
$missing_fields = [];

foreach ($required_fields as $field) {
    if (empty($data[$field]) || trim($data[$field]) === '') {
        $missing_fields[] = $field;
    }
}

if (!empty($missing_fields)) {
    http_response_code(400);
    echo json_encode(['error' => 'Missing required fields: ' . implode(', ', $missing_fields)]);
    exit();
}

// Validate email format
if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email format']);
    exit();
}

// Sanitize input data
$name = htmlspecialchars(strip_tags(trim($data['name'])));
$email = htmlspecialchars(strip_tags(trim($data['email'])));
$phone = htmlspecialchars(strip_tags(trim($data['phone'] ?? '')));
$message = htmlspecialchars(strip_tags(trim($data['message'])));

// Email configuration
$to = 'divl@icon.co.za'; // Replace with actual recipient email
$subject = 'New Contact Form Submission from Blessing Lynnwood';

// Create email body
$emailBody = "You have received a new contact form submission:\n\n";
$emailBody .= "Name: " . $name . "\n";
$emailBody .= "Email: " . $email . "\n";
$emailBody .= "Phone: " . ($phone ? $phone : 'Not provided') . "\n";
$emailBody .= "Message:\n" . $message . "\n";

// Email headers
$headers = [
    'From: ' . $name . ' <' . $email . '>',
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion(),
    'Content-Type: text/plain; charset=UTF-8'
];

// Send email using PHP's mail() function
$mailSent = mail($to, $subject, $emailBody, implode("\r\n", $headers));

if ($mailSent) {
    http_response_code(200);
    echo json_encode(['success' => true, 'message' => 'Email sent successfully']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send email']);
}
?>
