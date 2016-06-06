CasaXML
========
CasaXML is a swiss real estate standard that aims to solve the age old data-tranfer between reale state softwares and respective online services.

Although CasaXML is currently within the suggestion stage, there will like be very little changes post suggestion version 7.

#Structure

The XML should always contain the full representation of a companies portfolio.

The XML may contain `<projects>` and/or `<properties>`. The omission of these tags indicate that the information is **NOT SPECIFIED** and should thereby be **ignored**. A empty (but present) `<projects>` of `<properties>` tag indicates that there are no projects/properties available and any existing properties/projects should therefore be **DELETED**.

##Relational map (Projects)
```
projects 
	< details 
		< descriptions
	< units 
		- property
		< details 
		    < descriptions
		< properties

```

##Example XML structure (Projects)

```xml
<export>
	<projects>
		<project id="project1">
			<referenceId>projectRef1</referenceId>
			<details>
				<detail lang="de">
					<name>Neubaubrojekt</name>
					<descriptions>
						<description title="Beschreibung"></description>
						<description title="Lage"></description>
					</descriptions>
					<!-- attachments -->

				</detail>
			</details>
			<units>
				<unit>
					<referenceId>unitRef1</referenceId>
					<property xlink:type="resource" xlink:href="#456" />
					<details>
						<detail lang="de">
							<name>Gebäude 1</name>
							<descriptions>
								<description title="Beschreibung"></description>
								<description title="Lage"></description>
							</descriptions>
						</detail>
					</details>
					<properties>
						<property xlink:type="resource" xlink:href="#123" />
						<property xlink:type="resource" xlink:href="#234" />
						<property xlink:type="resource" xlink:href="#345" />
					</properties>
				</unit>
			</units>
		</project>
	</projects>
</export>
```

##Relational map (Properties)

```
properties 
	< extraCosts
	< integratedOffers
	– address
	– softwareInformation
	< features
	< numericValues
	< categories
	< utilities
	< relations
	– seller
		– organization
			– address
		– viewPerson
		– visitPerson
		– inquiryPerson
	< offers
		< tags
		< urls
		< publishers
			< options
			< channels
		< descriptions
		< attachments
		< events
```

##Example XML structure (Properties)

```xml
<export>
	<properties>
		<property id="property123">
			<referenceId>propertyRef123</referenceId>
			<visualReferenceId>visualRef123</visualReferenceId>
			<bfs>
				<egid>abc123</egid>
				<ewid>bcd234</ewid>
			</bfs>
			<availability>available</availability>
			<type>rent</type>
			<netPrice>1200</netPrice>
			<grossPrice>1450</grossPrice>
			<features>
				<feature>has-nice-view</feature>
                <feature>has-cabletv</feature>
                <feature>has-parking</feature>
				<!-- ... -->
			</features>
			<numericValues>
				<value key="number_of_apartments">3</value>
                <value key="volume_gva">3432</value>
                <value key="area_sia_gsf">4350</value>
				<!-- ... -->
			</numericValues>
			<categories>
				<category>penthouse</category>
			</categories>
			<utilities>
				<utility>residential</utility>
			</utilities>
			<seller />
			<!-- ... -->
			<offers>
				<offer id="offer123de" lang="de">
					<name></name>
					<excerpt></excerpt>
					<urls />
					<descriptions />
					<attachments />
					<!-- ... -->
				</offer>
				<offer id="offer123fr" lang="fr"><!-- ... --></offer>
				<offer id="offer123it" lang="it"><!-- ... --></offer>
			</offers>
		</property>
		<property id="property234">
			<referenceId>propertyRef234</referenceId>
			<!-- ... -->
			<offers>
				<offer id="offer234de" lang="de"><!-- ... --></offer>
				<offer id="offer234fr" lang="fr"><!-- ... --></offer>
				<offer id="offer234it" lang="it"><!-- ... --></offer>
			</offers>
		</property>
		<property id="property345">
			<referenceId>propertyRef345</referenceId>
			<!-- ... -->
			<offers>
				<offer id="offer345de" lang="de"></offer>
				<offer id="offer345fr" lang="fr"></offer>
				<offer id="offer345it" lang="it"></offer>
			</offers>
		</property>
	</properties>
</export>


#Resful JSON representation (HAL)
Will not be defined by this standard to date, but the representation would/could* be as follows.


## offer response
## offer response
```
{
  "count": 1,
  "total": 1,
  "collectionTotal": 46,
  "_links": {
    "self": {
      "href": "{API_URL}/offer?provider={customer_id}&page=1"
    },
    "first": {
      "href": "{API_URL}/offer?provider={customer_id}"
    },
    "last": {
      "href": "{API_URL}/offer?provider={customer_id}&page=1"
    }
  },
  "_embedded": {
    "offer": [
      {
        "id": 1,
        "contentChanged": null,
        "status": "active",
        "excerpt": "Excerpt description",
        "name": "Name of offer",
        "lang": "de",
        "urls": {},
        "_embedded": {
          "property": {PROPERTY RESPONSE}
          "offer_medias": [
            {
              "id": 1,
              "alt": "alternate text",
              "title": "",
              "caption": "",
              "description": "",
              "type": "image",
              "flagged": null,
              "rank": 1,
              "_embedded": {
                "media": {
                  "id": 1,
                  "file": null,
                  "size": "188368",
                  "mimeType": "image/jpeg",
                  "sq": "/media-thumb/provider-1006/property-1/0000974-72x72_C.png", //example of rendered resultset from API provider
                  "xl": "/media-thumb/provider-1006/property-1/0000974-1300x800_F.jpg",
                  "lg": "/media-thumb/provider-1006/property-1/0000974-1024x768_F.jpg",
                  "md": "/media-thumb/provider-1006/property-1/0000974-500x375_C.jpg",
                  "sm": "/media-thumb/provider-1006/property-1/0000974-240x180_C.png",
                  "xs": "/media-thumb/provider-1006/property-1/0000974-100x72_C.png",
                  "updated": {
                    "date": "2016-03-04 13:57:20.000000",
                    "timezone_type": 3,
                    "timezone": "Europe/Zurich"
                  },
                  "flags": {},
                  "_links": []
                }
              },
              "_links": []
            },
          ],
          "featuredImage": {
            "id": 1,
            "file": null,
            "size": "188368",
            "mimeType": "image/jpeg",
            "sq": "/media-thumb/provider-1006/property-1/0000974-72x72_C.png",
            "xl": "/media-thumb/provider-1006/property-1/0000974-1300x800_F.jpg",
            "lg": "/media-thumb/provider-1006/property-1/0000974-1024x768_F.jpg",
            "md": "/media-thumb/provider-1006/property-1/0000974-500x375_C.jpg",
            "sm": "/media-thumb/provider-1006/property-1/0000974-240x180_C.png",
            "xs": "/media-thumb/provider-1006/property-1/0000974-100x72_C.png",
            "updated": {
              "date": "2016-03-04 13:57:20.000000",
              "timezone_type": 3,
              "timezone": "Europe/Zurich"
            },
            "flags": {},
            "_links": []
          },
          "descriptions": [
            {
              "id": 1,
              "text": "Beschribung in plain text\n\n\n",
              "html": "<p>Beschreibung in html</p>", //Example content sanitation
              "title": "Beschreibung"
            }
          ]
        },
        "_links": []
      }
    ]
  },
  "page_count": 1,
  "page_size": 15,
  "total_items": 1,
  "page": 1
}
```

