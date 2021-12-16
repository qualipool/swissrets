<?php

/**
 * This file is intended for running schema validations.
 * 
 * The directory examples needs to pass and "should-fail" variants should fail.
 * The script will exit with the appropriate code.
 * 
 * php version 8.2.0
 *
 * @category  Test
 * @package   SwissRETS
 * @author    Jens Stalder <jens@stalderstudios.ch>
 * @copyright 2021 Vereinigung Qualipool
 * @license   https://qualipool.ch/ MIT
 * @link      https://github.com/qualipool/swissrets
 */

libxml_use_internal_errors(true);

/**
 * Main run function
 * 
 * @return void
 */
function run(): void
{
    $schemaFile = '../../schema/schema.xsd';

    echo consoleTitle("Checking that Example files are Valid:\n");
    $positiveSuccesses = 0;
    $exampleFilesCount = 0;
    $exampleFiles = scandir('../../examples');
    if ($exampleFiles !== false) {
        foreach ($exampleFiles as $exampleFile) {
            if (strpos($exampleFile, '.xml')) {
                $exampleFilesCount++;
                $success = shouldPass('../../examples/' . $exampleFile, $schemaFile);
                if ($success) {
                    $positiveSuccesses++;
                }
            }
        }
    }
    echo "\n\n";

    echo consoleTitle(
        "Checking that non-valid \"should-fail\" xmls are detected as invalid:\n"
    );
    $positiveFailures = 0;
    $shouldFailFilesCount = 0;
    $shouldFailFiles = scandir('../../scripts/xmllint/should-fail');
    if ($shouldFailFiles !== false) {
        foreach ($shouldFailFiles as $shouldFailFile) {
            if (strpos($shouldFailFile, '.xml')) {
                $shouldFailFilesCount++;
                $success = shouldFail(
                    '../../scripts/xmllint/should-fail/' . $shouldFailFile,
                    $schemaFile
                );
                if ($success) {
                    $positiveFailures++;
                }
            }
        }
    }
    echo "\n\n";
    echo consoleTitle("RESULTS\n");
    echo consoleTitle("=======\n");
    echo "Successes expected: " . $exampleFilesCount . " \n";
    echo "Successes received: " . $positiveSuccesses . " \n";
    echo "Failures expected: " . $shouldFailFilesCount . " \n";
    echo "Failures received: " . $positiveFailures . " \n";

    echo "\n";
    echo consoleTitle("VERDICT\n");
    echo consoleTitle("=======\n");
    if ($exampleFilesCount === $positiveSuccesses
        && $shouldFailFilesCount === $positiveFailures
        && $exampleFilesCount + $shouldFailFilesCount !== 0
    ) {
        echo consoleReallyGood("SUCCESS") . "\n";
        exit(0);
    } else {
        echo consoleReallyBad("FAILED") . "\n";
        exit(1);
    }
}

/**
 * Adds check mark and formatting for console.
 * 
 * @return string
 */
function consoleCheckmark(): string
{
    return consoleReallyGood("✓") . consoleReset();
}

/**
 * Adds X mark and formatting for console.
 * 
 * @return string
 */
function consoleXmark(): string
{
    return consoleReallyBad("𐄂") . consoleReset();
}

/**
 * Adds styling for console.
 * 
 * @param string $str the string that needs to be formatted
 * 
 * @return string
 */
function consoleTitle(string $str): string
{
    return "\e[1m" . $str . consoleReset();
}

/**
 * Adds styling for console.
 * 
 * @param string $str the string that needs to be formatted
 * 
 * @return string
 */
function consoleBad(string $str): string
{
    return "\e[31m" . $str . consoleReset();
}

/**
 * Adds styling for console.
 * 
 * @param string $str the string that needs to be formatted
 * 
 * @return string
 */
function consoleReallyBad(string $str): string
{
    return "\e[30;48;5;1m" . $str . consoleReset();
}

/**
 * Adds styling for console.
 * 
 * @param string $str the string that needs to be formatted
 * 
 * @return string
 */
function consoleReallyGood(string $str): string
{
    return "\e[30;48;5;82m" . $str . consoleReset();
}

/**
 * Adds styling for console.
 * 
 * @return string
 */
function consoleReset(): string
{
    return "\e(B\e[m";
}

/**
 * Tests if xml file is valid with provided schema.
 * prints directly to the console
 * 
 * @param string $xmlFile    path to xml file to test
 * @param string $schemaFile path to schema to test against
 * 
 * @return bool
 */
function shouldPass(string $xmlFile, string $schemaFile): bool
{
    $xml = new DOMDocument();
    $xml->load($xmlFile);
    if (!$xml->schemaValidate($schemaFile)) {
        echo "\n";
        echo consoleXmark() . ' ' . consoleTitle($xmlFile);
        $errors = libxml_get_errors();
        foreach ($errors as $error) {
            echo "\n";
            echo ' | ' . libxmlDisplayError($error);
        }
        libxml_clear_errors();
        return false;
    }
    echo "\n";
    echo consoleCheckmark() . ' ' . consoleTitle($xmlFile);
    
    return true;
}

/**
 * Tests if xml file is failing with provided schema.
 * prints directly to the console
 * 
 * @param string $xmlFile    path to xml file to test
 * @param string $schemaFile path to schema to test against
 * 
 * @return bool
 */
function shouldFail(string $xmlFile, string $schemaFile): bool
{
    $xml = new DOMDocument();
    $xml->load($xmlFile);
    if (!$xml->schemaValidate($schemaFile)) {
        echo "\n";
        echo consoleCheckmark() . ' ' . consoleTitle($xmlFile);
        $errors = libxml_get_errors();
        foreach ($errors as $error) {
            echo "\n";
            echo ' | ' . libxmlDisplayError($error);
        }
        libxml_clear_errors();
        return true;
    }
    echo "\n";
    echo consoleXmark() . ' ' . consoleTitle($xmlFile);
    
    return false;
}

/**
 * Converts a libxml error to a sting (with console formatting)
 * 
 * @param \LibXMLError $error will be formatted to a console string
 * 
 * @return string
 */
function libxmlDisplayError($error): string
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
    $return .= " on line " . consoleBad((string) $error->line);

    return $return;
}
    
run();

