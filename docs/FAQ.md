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
<p>
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
</p>
</details>

## When importing how should I determine if something has changed within a property?
It is tempting to use the `<modified>` field to push the responsibility of checking for changes to the sender (or feed provider). But this is discouraged. This field is only meant for presentational purposes, such as within a PDF, to tell the reader that this is the date the real estate agent last changed something within the listing. Instead, we suggest you create a hash from the extracted property shape data before you persist it to your database (or other storage means) and add that hash for future, efficient change detection. That way, you can determine changes specific to your system and whatever data you support, which can differ from vendor to vendor. There are also other ways of determining changes without having to cross-compare the data within your datastore. Just make sure you use something more reliable than expecting the `<modified>` date to do the work for you ;-).

### Some reasons why you should not trust the `<modified>` field.

* Systems storing property listings can look vastly different, and SwissRETS might only be converting a subset of the actual dataset that the sender is storing. That is why the "modified" can then lead to false positive.
* The sending party can suddenly break your cashing mechanism by simply adding the current timestamp to every `<modified>` field, making the field useless, and your system unhappy.

## How do I specify machine parsable email addresses for inquiries?

The industry tends to use industry-standard formats for inquiries that are sent to a specified email address that you define. This makes it possible for some applications to, more reliably, parse contacts. For example, standards such as "OpenImmo Feedback" require websites to include a file within the emails. Others require you to format the plain text of the email in a CSV-like format, such as RemCat. SwissRETS does not currently provide a field for this specifically. Instead, currently, the industry relies on other indicators. First, make sure you are sending the email Address within `<inquiryPerson><email>`. Portals will then do one of the following. Either they configure that the special format needs to be sent with every inquiry that is sent to the address, or the email contains special strings (such as "remcat") which allow them to "introspect" in what form the inquiry should be sent as. This does not necessarily need to be within an email since a couple of standards will instead send the inquiry via HTTP for Example. 
