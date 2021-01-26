[![GitHub package version](https://img.shields.io/github/release/qualipool/swissrets.svg)](https://github.com/qualipool/swissrets/releases)
[![Build Status](https://travis-ci.com/qualipool/swissrets.svg?branch=master)](https://travis-ci.com/qualipool/swissrets)
[![GitHub](https://img.shields.io/github/license/qualipool/swissrets.svg)](https://github.com/qualipool/swissrets/blob/master/LICENSE.md)

# SwissRETS

SwissRETS is a swiss real estate transaction standard. The main goal ist to standardise data exchange between real estate software and platforms. It's meant to be a replacement for old and static formats like the widely used [IDX 3.01](https://en.wikipedia.org/wiki/Internet_Data_Exchange) in Switzerland.

## Using SwissRETS

### XML
Schema location declaration for validation.
```xml
<?xml version="1.0" encoding="utf-8"?>
<export
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:noNamespaceSchemaLocation="https://swissrets.ch/dist/v2.1.0/schema.xsd"
  >
  <!-- ... -->
</export>
```

### Documentation
1. [XSD docs](https://swissrets.ch/docs/noNamespace/) generated from the schema
1. Details
   - [Attachments](./Attachments.md) - images, documents, links
   - [Availability](Availability.md) - lifecycle states
   - [Categories](Categories.md) - categorization
   - [Characteristics](./Characteristics.md) - facts and features
      - [Applicables](./Characteristics.md#type-applicable)
      - [Generic-areas](./Generic-areas.md) - definitions for the non-sia and more simple set of areas.
      - [SIA-areas](./SIA-areas.md) - area definitions according to [SIA 416](http://www.svkg.ch/)
   - [Usage FAQ](FAQ)
   - [Utilizations](Utilizations.md) - usage groups
   - [Heating generation and distribution](./Heating.md)
1. [Example](https://github.com/qualipool/swissrets/tree/master/examples) files
1. [Changelog](https://github.com/qualipool/swissrets/releases)
   Complete release history and migration paths for braking changes

## Submitting a change request or an idea
1. Make sure you fill only a **single topic** per issue
1. Please write in English
1. Go to the [new issue page](https://github.com/qualipool/swissrets/issues/new/choose)

## Contributing
Developers please check our [contribution guide](https://github.com/qualipool/swissrets/blob/master/CONTRIBUTING.md)
