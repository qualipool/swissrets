<?php

libxml_use_internal_errors(true);

function run()
{
    $schemaFile = 'schema/schema.xsd';

    print consoleTitle("Checking that Example files are Valid:\n");
    $positiveSuccesses = 0;
    $exampleFilesCount = 0;
    $exampleFiles = scandir('examples');
    foreach ($exampleFiles as $exampleFile) {
        if(strpos($exampleFile, '.xml')) {
            $exampleFilesCount++;
            $success = shouldPass('examples/' . $exampleFile, $schemaFile);
            if ($success) {
                $positiveSuccesses++;
            }
        }
    }
    print "\n\n";

    print consoleTitle("Checking that non-valid \"should-fail\" xmls are detected as invalid:\n");
    $positiveFailures = 0;
    $shouldFailFilesCount = 0;
    $shouldFailFiles = scandir('scripts/xmllint/should-fail');
    foreach ($shouldFailFiles as $shouldFailFile) {
        if(strpos($shouldFailFile, '.xml')) {
            $shouldFailFilesCount++;
            $success = shouldFail('scripts/xmllint/should-fail/' . $shouldFailFile, $schemaFile);
            if ($success) {
                $positiveFailures++;
            }
        }
    }
    print "\n\n";
    print consoleTitle("RESULTS\n");
    print consoleTitle("=======\n");
    print "Successes expected: " . $exampleFilesCount . " \n";
    print "Successes received: " . $positiveSuccesses . " \n";
    print "Failures expected: " . $shouldFailFilesCount . " \n";
    print "Failures received: " . $positiveFailures . " \n";

    print "\n";
    print consoleTitle("VERDICT\n");
    print consoleTitle("=======\n");
    if ($exampleFilesCount === $positiveSuccesses
        && $shouldFailFilesCount === $positiveFailures
    ) {
        print consoleReallyGood("SUCCESS") . "\n";
        exit(0);
    } else {
        print consoleReallyBad("FAILED") . "\n";
        exit(1);
    }
}

function consoleCheckmark()
{
    return consoleReallyGood("✓") . consoleReset();
}

function consoleXmark()
{
    return consoleReallyBad("𐄂") . consoleReset();
}

function consoleTitle($str)
{
    return "\e[1m" . $str . consoleReset();
}

function consoleBad($str)
{
    return "\e[31m" . $str . consoleReset();
}

function consoleReallyBad($str)
{
    return "\e[30;48;5;1m" . $str . consoleReset();
}

function consoleReallyGood($str)
{
    return "\e[30;48;5;82m" . $str . consoleReset();
}

function consoleReset()
{
    return "\e(B\e[m";
}

function shouldPass(string $xmlFile, string $schemaFile)
{
    $xml = new DOMDocument();
    $xml->load($xmlFile);
    if (!$xml->schemaValidate($schemaFile)) {
        print "\n";
        print consoleXmark() . ' ' . consoleTitle($xmlFile);"\n";  
        $errors = libxml_get_errors();
        foreach ($errors as $error) {
            print "\n";
            print ' | ' . libxml_display_error($error);
        }
        libxml_clear_errors();
        return false;
    }
    print "\n";
    print consoleCheckmark() . ' ' . consoleTitle($xmlFile);"\n";  
    
    return true;
}

function shouldFail(string $xmlFile, string $schemaFile)
{
    $xml = new DOMDocument();
    $xml->load($xmlFile);
    if (!$xml->schemaValidate($schemaFile)) {
        print "\n";
        print consoleCheckmark() . ' ' . consoleTitle($xmlFile);"\n";  
        $errors = libxml_get_errors();
        foreach ($errors as $error) {
            print "\n";
            print ' | ' . libxml_display_error($error);
        }
        libxml_clear_errors();
        return true;
    }
    print "\n";
    print consoleXmark() . ' ' . consoleTitle($xmlFile);"\n";  
    
    return false;
}

function libxml_display_error($error)
{
    $return = '';
    switch ($error->level) {
    case LIBXML_ERR_WARNING:
        $return .= consoleBad("Warning") . ' ' . $error->code . ": ";
        break;
    case LIBXML_ERR_ERROR:
        $return .= consoleBad("Error") . ' ' . $error->code . ": ";
        break;
    case LIBXML_ERR_FATAL:
        $return .= consoleBad("Fatal Error") . ' ' . $error->code . ": ";
        break;
    }
    $return .= trim($error->message);
    if ($error->file) {
        $return .= consoleBad(" " . $error->file);
    }
    $return .= " on line " . consoleBad($error->line);

    return $return;
}
    
run();

