cd "$(dirname "$BASH_SOURCE")" || {
    echo "Error getting script directory" >&2
    exit 1
}
xmllint --noout --schema schema/schema_7.xsd examples/example_7.xml