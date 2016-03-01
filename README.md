CasaXML
========
CasaXML is a swiss real estate standard that aims to solve the age old data-tranfer between reale state softwares and respective online services.

Although CasaXML is currently within the suggestion stage, there will like be very little changes post suggestion version 7.

#Structure
```
Relational map (Projects)
=========================
projects 
	< details 
		< descriptions
	< units 
		< details 
		< properties
-->
```
```
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
					<!-- attachments? -->

				</detail>
			</details>
			<units>
				<unit>
					<referenceId>unitRef1</referenceId>
					<details>
						<detail lang="de">
							<name>Gebäude 1</name>
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

```
Relational map (Properties)
===========================
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
```
<export>
	<properties>
		<property id="123">
			<referenceId>propertyRef123</referenceId>
			<!-- ... -->
			<offers>
				<offer id="123de" lang="de"><!-- ... --></offer>
				<offer id="123fr" lang="fr"><!-- ... --></offer>
				<offer id="123it" lang="it"><!-- ... --></offer>
			</offers>
		</property>
		<property id="234">
			<referenceId>propertyRef234</referenceId>
			<!-- ... -->
			<offers>
				<offer id="234de" lang="de"><!-- ... --></offer>
				<offer id="234fr" lang="fr"><!-- ... --></offer>
				<offer id="234it" lang="it"><!-- ... --></offer>
			</offers>
		</property>
		<property id="345">
			<referenceId>propertyRef345</referenceId>
			<!-- ... -->
			<offers>
				<offer id="345de" lang="de"></offer>
				<offer id="345fr" lang="fr"></offer>
				<offer id="345it" lang="it"></offer>
			</offers>
		</property>
	</properties>
</export>
```