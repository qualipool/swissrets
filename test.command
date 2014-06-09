cd "$(dirname "$BASH_SOURCE")" || {
    echo "Error getting script directory" >&2
    exit 1
}
xmllint --noout --schema schema/schema_6.xsd docs/suggestion_6.xml