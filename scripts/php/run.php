<?php

    exec('vendor/bin/xmllint ../../examples', $output, $result_code);
    if($result_code === 0) {
        // success
        exit(0);
    } else {
        throw new \Exception("Errors: " . implode("\n", $output), 1);
        exit(1);
    }