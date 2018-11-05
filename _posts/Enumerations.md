To avoid creating an overcomplex XML by defining hundreds of elements, SwissRETS ops to use certain enumeration groups to simplify the export/import process.

However, these definitions need to be listed and explained in more detail outside of the realm of the xsd, to make clear what these Settings actually mean and which `slug`s can be parsed.

## Categories

Categories should answer the question _«How is this listing built?»_ or _«What structure does it have?»_. This should not be confused with utilities.

```xml
<export>
  <properties>
    <property id="#">
      <categories>
        <category>house</category>
        <category>penthouse</category>
```

[Term list & Translations](https://casasoft.ch/swissrets/index.html#/enums/categories)

## Utilities

Utilities represent the possible utilization of a property. It should answer questions such as:

*  Can I live here? (residential)
*  Is it to perform services? (commercial)
*  Can I grow crops there? (agricultural)

```xml
<export>
  <properties>
    <property id="#">
      <utilities>
        <utility>residential</utility>
        <utility>commercial</utility>
```

[Term list & Translations](https://casasoft.ch/swissrets/index.html#/enums/utilities)

## Features

Features are boolean type values that simply imply if a propery `has-` `is-` or is `on-` something.

```xml
<export>
  <properties>
    <property id="#">
      <features>
        <feature>has-elevator</feature>
        <feature>is-animal-friendly</feature>
```

[Term list & Translations](https://casasoft.ch/swissrets/index.html#/enums/features)

## Numeric Values

Numeric values is a collection of data points that can be represented as float or integer values.

Every `slug` has a imlicit `unit` such as `m²` or `Kg` associated to it, unless it represents a simple count, at which point it does not have a `unit`. These almost always correspond with SI entities.

```xml
<export>
  <properties>
    <property id="#">
      <numericValues>
        <value key="number_of_rooms">2.5</value>
        <value key="area_bwf">200</value>
```

[Term list & Translations](https://casasoft.ch/swissrets/index.html#/enums/numvals)