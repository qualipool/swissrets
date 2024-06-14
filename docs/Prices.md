[**◀ Home**](index.md)

# Prices

This provides an overview and documentation for the [prices](https://swissrets.ch/docs/noNamespace/complexType/prices.html) tag.

## Explanation

Prices defined in a property are essential. Because of it's inherit complexity and to make sure the values are understood correctly please refer to this guide as to what actually means what.

## Fixed price (buy)

Property for sale with a fixed price.
* **extra**: TODO: Good question? Is this similar to yearlyOperationAndMaintenanceCosts?
* **wirPercentage**: The percententage of the gross price which has to paid in WIR Franc electronic currency.

```xml
<property>
    <availability start="2018-12-13T12:12:12" expiration="2019-12-13T12:12:12">active</availability>
    <prices currency="CHF">
        <buy referring="all">
            <price>850000</price>
            <extra>25000</extra>
            <wirPercentage>5</wirPercentage>
        </buy>
    </prices>
</property>
```

## Auction

Property for sale within an auction. Bidders can consequently increase the current standing of the auction price. The last bidder usually wins.

The element `<auction>` has the following distinctions:

* **start:**: The time the property is up for auction and for sale.
* **expiration:**: The time when the property can not be auctioned any longer and gets disabled.
* **minimalIncrease:**: To a amount that is required for each bid to increase.
* **value:**: The starting price

```xml
<property>
    <availability start="2018-12-13T12:12:12" expiration="2019-12-13T12:12:12">active</availability>
    <prices currency="CHF">
        <auction start="2012-12-13T12:12:12" expiration="2012-12-13T12:12:13" minimalIncrease="20000">745</auction>
    </prices>
</property>
```

## Bidding process

Property for sale within a bidding war. Here anyone can bid a sum that is larger or equal to the asking price. The bidder with the largest commitment usually wins.

The element `<bidding>` has the following distinctions:

* **start:**: The time that bidding can commence.
* **bindingStart**: The start where offers become legally binding.
* **expiration:**: The time when the property gets removed from the bidding War.
* **value:**: The minimal asking price

```xml
<property>
    <availability start="2018-12-13T12:12:12" expiration="2019-12-13T12:12:12">active</availability>
    <prices currency="CHF">
        <bidding start="2012-12-13T12:12:12" bindingStart="2012-12-14T12:12:12" expiration="2012-12-15T12:12:13">745</bidding>
    </prices>
</property>
```

## Property for rent.

* **gross**: The total price (net + extra)
* **net**: The cost minus extra costs (gross - extra)
* **extra**: the difference between gross and net (gross - net)

Usually only two are required and the third can be calculated based on the other two. But the XML generator can choose to provide all three.

```xml
<property>
    <availability start="2018-12-13T12:12:12" expiration="2019-12-13T12:12:12">active</availability>
    <prices currency="CHF">
        <rent referring="all" interval="monthly">
                <gross>8500</gross>
                <net>7500</net>
                <extra>1000</extra>
        </rent>
    </prices>
</property>
```
