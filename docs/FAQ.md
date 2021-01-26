[**◀ Home**](index.md)

# FAQ
General questions and answers that have not found their place within the documentation yet get placed here.

## How to map IDX 3.01 to Swissrets.
It's recommended to use the [Qualipool agreed mapping table](https://docs.google.com/spreadsheets/d/1NKx8oDF16AMF8nMXmaa4OQTC0iu9NdDPB2rN1pCa2vA/edit#gid=1387607905).

## How can I specify an offer "on request"
Simply omit the `<rent>` or `<buy>` tag within `<prices>`.

## How to specify local files
Whenever possible, try to **avoid using local files**. For all the other cases use the [file URI scheme](https://en.wikipedia.org/wiki/File_URI_scheme).

<details>

<summary>Show an example</summary>

As an example for a **export.zip** file containing the following files

```
.
├── property-120080
│   ├── picture1.jpg
│   ├── picture2.jpg
│   └── picture3.jpg
└── export.xml
```

Would result in using the following **export.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<export xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="https://swissrets.ch/v1.0.0/schema.xsd">
  <properties>
    <property id="120080">
      <referenceId>LA-644238</referenceId>
      <availability>active</availability>
      <type>rent</type>
      <address>
        <countryCode>CH</countryCode>
        <locality>Kirchlindach</locality>
        <postalCode>3038</postalCode>
      </address>
      <localizations>
        <localization lang="en">
          <attachments>
            <image>
              <url>file:///property-120080/picture1.jpg</url>
              <title>Picture 1</title>
              <mimeType>image/jpeg</mimeType>
            </image>
            <image>
              <url>file:///property-120080/picture2.jpg</url>
              <title>Picture 2</title>
              <mimeType>image/jpeg</mimeType>
            </image>
            <image>
              <url>file:///property-120080/picture2.jpg</url>
              <title>Picture 2</title>
              <mimeType>image/jpeg</mimeType>
            </image>
          </attachments>
        </localization>
      </localizations>
    </property>
  </properties>
</export>
```

</details>
