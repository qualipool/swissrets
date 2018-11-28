[![GitHub package version](https://img.shields.io/github/package-json/v/qualipool/swissrets.svg)](https://github.com/qualipool/swissrets/releases)
[![Build Status](https://travis-ci.com/qualipool/swissrets.svg?branch=master)](https://travis-ci.com/qualipool/swissrets)
[![GitHub](https://img.shields.io/github/license/qualipool/swissrets.svg)](https://github.com/qualipool/swissrets/blob/master/LICENSE.md)

SwissRETS
=========
SwissRETS is a swiss real estate transaction standard. It aims to solve data exchange between real estate software and platforms. It's meant to be a replacement for old and static formats like the widely used [IDX](https://en.wikipedia.org/wiki/Internet_Data_Exchange) in Switzerland. Check out the [documentation](https://swissrets.ch).


TODO: this is incomplete
```
export
  0..1 exportInformation
      0..1 software
      0..1 softwareVersion
      0..1 exportDate
      0..1 exportIteration
  0..1 projects
    0..n projects
      1..1 referenceId
      1..1 units
        1..1 referenceId
        1..1 properties
          1..n propertyRef
  0..1 properties
      0..n property
        1..1 softwareInformation
        0..1 zoneTypes
        0..1 parcelNumbers
        1..1 referenceId
        0..1 visualReferenceId
        1..1 type
        0..1 availability
        0..1 start
        0..1 prices
        1..1 address
        0..1 heating
          0..1 generation
          0..1 distribution
        0..1 characteristics
        0..1 categories
          1..* category
        0..1 utilizations
          1..3 utilization
        1..1 localizations
          1..* localization
            1..1 name
            0..1 excerpt
            0..1 description
            0..1 location
            0..1 equipment
            0..1 attachments
              1..* attachment
                0..* image
                0..* logo
                0..* document
                0..* plan
                0..* linkDirect
                0..* link
                0..* linkVirtualTour
                0..* linkYoutube
            0..1 visitInformation
            0..1 tags
            0..1 urls
            0..1 descriptions
            0..1 attachments
            0..1 events
        1..1 seller
          1..1 organization
            1..1 address
          1..1 viewPerson
          1..1 visitPerson
          1..1 inquiryPerson
        0..1 publishers
          0..1 options
            1..* option
```
