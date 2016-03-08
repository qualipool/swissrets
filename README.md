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
		<property id="123">
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
				<offer id="123de" lang="de">
					<name></name>
					<excerpt></excerpt>
					<urls />
					<descriptions />
					<attachments />
					<!-- ... -->
				</offer>
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
