<?php
// TODO: Replace '*' with final domain (e.g., 'https://myblessing.co.za') for better security.
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Content-Type: text/calendar; charset=utf-8");

$ical_url = 'https://ical.booking.com/v1/export?t=bce33ae3-cf7b-41a8-85aa-36334991ad1b';
$cache_file = 'booking_cache.ics'; // The file where we save the data locally
$cache_time = 3600; // Cache duration in seconds (3600 = 1 hour)

// 3. Check if we have a valid cache file
if (file_exists($cache_file) && (time() - filemtime($cache_file) < $cache_time)) {
    // Cache is valid (less than 1 hour old). Serve the local file.
    readfile($cache_file);
    exit;
}

// 4. If cache is expired or missing, fetch fresh data from Booking.com
// We use cURL because some hosting providers disable 'file_get_contents' for external URLs.
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $ical_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_FOLLOWLOCATION, 1);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false); // Optional: Fixes some SSL issues on cheap hosting
curl_setopt($ch, CURLOPT_USERAGENT, 'GuesthouseWebsite/1.0'); // Identifying your script
$data = curl_exec($ch);
$http_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// 5. Check if the fetch was successful
if ($http_code == 200 && $data) {
    // Save the fresh data to the cache file
    file_put_contents($cache_file, $data);
    // Output the data
    echo $data;
} else {
    // If Booking.com fails, try to serve the old cache if it exists as a fallback
    if (file_exists($cache_file)) {
        readfile($cache_file);
    } else {
        // Total failure
        http_response_code(500);
        echo "Error fetching calendar data.";
    }
}
?>
