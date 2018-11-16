[![GitHub package version](https://img.shields.io/github/package-json/v/qualipool/swissrets.svg)](https://github.com/qualipool/swissrets/releases)
[![Build Status](https://travis-ci.com/qualipool/swissrets.svg?branch=master)](https://travis-ci.com/qualipool/swissrets)
[![GitHub](https://img.shields.io/github/license/qualipool/swissrets.svg)](https://github.com/qualipool/swissrets/blob/master/LICENSE.md)

SwissRETS
=========
SwissRETS is a swiss real estate transaction standard that aims to solve the age old data transfer between real estate software and respective online services.

SwissRETS is currently within the suggestion stage.

Documentation
-------------

https://qualipool.github.io/swissrets/


------


Structure
---------

The XML should always contain the full representation of a companies portfolio.

The XML may contain `<projects>` and/or `<properties>`. The omission of these tags indicate that the information is **NOT SPECIFIED** and should thereby be **ignored**. A empty (but present) `<projects>` of `<properties>` tag indicates that there are no projects/properties available and any existing properties/projects should therefore be **DELETED**.

Relational map (Properties)
---------

```
export
  0,1 exportInformation
      0,1 software
      0,1 softwareVersion
      0,1 software
      0,1 software
  0,1 projects
    0,n projects
      1,1 referenceId
      1,1 units
        1,1 referenceId
        1,1 properties
          1.n propertyRef
  0,1 properties
      0,n property
        0,1 zoneTypes
        0,1 parcelNumbers
        1,1 referenceId
        0,1 visualReferenceId
        1,1 type
        0,1 availability
        0,1 start
        0,1 prices
        1,1 address
        1,1 softwareInformation
        0,1 characteristics
        0,1 categories
        0,1 utilities
        1,1 seller
          1,1 organization
            1,1 address
          1,1 viewPerson
          1,1 visitPerson
          1,1 inquiryPerson
        1,1 localizations
          0,1 tags
          0,1 urls
          0,1 publishers
            0,1 options
            0,1 channels
          0,1 descriptions
          0,1 attachments
          0,1 events
```

Relational map (Projects)
---------

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

Example XML structure (Projects)
---------

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
						<propertyRef>property_123</propertyRef>
						<propertyRef>property_234</propertyRef>
						<propertyRef>property_345</propertyRef>
					</properties>
				</unit>
			</units>
		</project>
	</projects>
</export>
```


Restful JSON representation
=============

Will not be defined by this standard to date, but the representation would/could* be as follows.

Example offer GET COLLECTION response (HAL)
--------------------------------------------

```GET {API_URL}/offer?param1=foo&param2=bar```

```json
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
          "property": { ... property response truncated for readability (see property response example) ... },
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

Example property response GET (HAL)
------------------------------------

```GET {API_URL}/property/1```

```json
{
  "id": 1,
  "modified": {
    "date": "2015-05-20 13:47:55.000000",
    "timezone_type": 3,
    "timezone": "Europe/Zurich"
  },
  "status": "active",
  "type": "buy",
  "availability": "active",
  "start": {
    "date": "2015-09-01 00:00:00.000000",
    "timezone_type": 3,
    "timezone": "Europe/Zurich"
  },
  "price_currency": "CHF",
  "price": 2380000,
  "price_property_segment": "all",
  "net_price": null,
  "net_price_time_segment": "infinite",
  "net_price_property_segment": "all",
  "gross_price": null,
  "gross_price_time_segment": "infinite",
  "gross_price_property_segment": "all",
  "visual_reference_id": null,
  "last_import_hash": "a2ddc556a5fc9c472f8c18169aa374df",
  "features": ["has-cabletv","has-elevator", "has-parking"],
  "property_utilities": { ... Abreviated ...},
  "extracosts": { ... Abreviated ...},
  "_embedded": {
    "address": {
      "id": 2,
      "country": "CH",
      "locality": "Kilchberg ZH",
      "region": "ZH",
      "postal_code": 8802,
      "post_office_box_number": null,
      "street": "",
      "street_number": null,
      "street_addition": null,
      "subunit": null,
      "lat": "47.3198115",
      "lng": "8.5414899",
    },
    "property_categories": [
      {
        "id": 1,
        "category_id": "apartment"
      }
    ],
    "numeric_values": [
      {
        "id": 1,
        "key": "number_of_rooms",
        "value": 4.5,
      },
      {
        "id": 2,
        "key": "area_nwf",
        "value": 161,
      },
      {
        "id": 3,
        "key": "year_built",
        "value": 2014,
      }
    ],
    "offers": [ ... abreviated for readability (see offer response example) ... ],
    "organization": {
      "id": 1071,
      "slug": "immo-ag",
      "displayName": "Immo AG",
      "addition": "",
      "lang": null,
      "email": "email@domain.ch",
      "phone": "+00 00 000 00 00",
      "mobile": "+00 00 000 00 00",
      "fax": "",
      "website_url": "",
      "website_label": "",
      "website_title": "",
      "note": null,
      "_embedded": {
        "postalAddress": {
          "id": 1,
          "country": "CH",
          "locality": "Zürich",
          "region": null,
          "postal_code": 8038,
          "post_office_box_number": null,
          "street": "Seestrasse 455b",
          "street_number": null,
          "street_addition": null,
          "subunit": null,
          "lat": "47.340223",
          "lng": "8.537714",
        }
      },
    },
    "visitPerson": {
      "id": 1070,
      "slug": null,
      "displayName": "Max Muster",
      "addition": null,
      "firstName": "Max",
      "lastName": "Muster",
      "gender": "",
      "lang": null,
      "email": "",
      "phone": "+00 00 000 00 00",
      "mobile": "",
      "fax": "",
      "DOB": null,
      "website_url": null,
      "website_label": null,
      "website_title": null,
      "function": "",
      "note": "Für allfällige Fragen stehen wir Ihnen gerne zur Verfügung.",
      "postalAddress": null,
    },
    "inquiryPerson": {
      "id": 1069,
      "type": "person",
      "slug": null,
      "displayName": "Jane Muster",
      "addition": null,
      "firstName": "Frau",
      "lastName": "Constancia",
      "gender": 2,
      "lang": null,
      "email": "person@domain.ch",
      "phone": "",
      "mobile": "",
      "fax": "",
      "DOB": null,
      "website_url": null,
      "website_label": null,
      "website_title": null,
      "function": "",
      "note": "",
      "postalAddress": null,
    },
    "viewPerson": {
      "id": 1188,
      "type": "person",
      "slug": null,
      "displayName": "Another Person",
      "addition": null,
      "firstName": "Another",
      "lastName": "Person",
      "gender": "",
      "lang": null,
      "email": "another.person@domain.ch",
      "phone": "+00 00 000 00 00",
      "mobile": "+00 00 000 00 00",
      "fax": "",
      "DOB": null,
      "website_url": null,
      "website_label": null,
      "website_title": null,
      "function": "",
      "note": "",
      "postalAddress": null,
    }
  },
}
```
