<?php

function main() {
    $startTime = microtime(true); // Start time in seconds with microseconds

    for ($i = 0; $i < 1000000; $i++) {
        echo "hello\n";
    }

    $endTime = microtime(true); // End time in seconds with microseconds

    $duration = ($endTime - $startTime) * 1000; // Calculate duration in milliseconds
    echo "PHP took " . $duration . " milliseconds to print hello 1000000 times.\n";
}

main();
?>