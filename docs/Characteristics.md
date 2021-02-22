[**◀ Home**](index.md)

# Characteristics

The cold facts, to represent the property or offer. These tend to be dictated by the chosen utilization and to some extent the categories as well. Based on the provided utilizations certain characteristics only are applicable accordingly.

Every characteristic has a implicit SI-unit such as `m²` or `Kg` associated to it, unless it represents a simple count, at which point it does not have a `unit`.

Descriptions for characteristics are in the [xsd documentation](https://swissrets.ch/docs/noNamespace/complexType/characteristics.html).

## Type applicable
Applicable can have three states, `unknown` must be treated as default.

state | meaning
:--- | :---
`applies` | The characteristic applies, is present or is available.
`does-not-apply` | The characteristic does explicitly not apply, like "no balcony" is `hasBalcony=does-not-apply`.
`unknown` | _default_ There is no information about the characteristic.

## All characteristics

key | description | type
:--- | :--- | :---
areaBwf | Living area in m² | positiveDecimal
areaNwf | Net livin area in m² | positiveDecimal
areaPropertyLand | Property land area in m² | positiveDecimal
areaSiaAff | SIA-AFF area in m² | positiveDecimal
areaSiaAgf | SIA-AGF area in m² | positiveDecimal
areaSiaAkf | SIA-AKF area in m² | positiveDecimal
areaSiaAkfn | SIA-AKFN area in m² | positiveDecimal
areaSiaAkft | SIA-AKFT area in m² | positiveDecimal
areaSiaAnf | SIA-ANF area in m² | positiveDecimal
areaSiaAngf | SIA-ANGF area in m² | positiveDecimal
areaSiaAvf | SIA-AVF area in m² | positiveDecimal
areaSiaBuf | SIA-BUF area in m² | positiveDecimal
areaSiaFf | SIA-FF area in m² | positiveDecimal
areaSiaGf | SIA-GF area in m² | positiveDecimal
areaSiaGgf | SIA-GGF area in m² | positiveDecimal
areaSiaGsf | SIA-GSF area in m² | positiveDecimal
areaSiaHnf | SIA-HNF area in m² | positiveDecimal
areaSiaKf | SIA-KF area in m² | positiveDecimal
areaSiaKfn | SIA-KFN area in m² | positiveDecimal
areaSiaKft | SIA-KFT area in m² | positiveDecimal
areaSiaNf | SIA-NF area in m² | positiveDecimal
areaSiaNgf | SIA-NGF area in m² | positiveDecimal
areaSiaNnf | SIA-NNF area in m² | positiveDecimal
areaSiaUf | SIA-UF area in m² | positiveDecimal
areaSiaUuf | SIA-UUF area in m² | positiveDecimal
areaSiaVf | SIA-VF area in m² | positiveDecimal
arePetsAllowed | Pets are allowed or not tolerated. | [applicable](#type-applicable)
ceilingHeight | Height of the rooms in m. | positiveDecimal
craneCapacity | Carrying capacity for crane in kg. | positiveDecimal
elevatorLoad | Maximum elevator load in kg. | positiveDecimal
floor | Floor number, ground floor is 0, basement floors are negative. | integer
floorLoad | Maximum floor load in kg/m² | positiveDecimal
grossPremium | A gross premium is the total premium of an insurance contract before brokerage or | percent discounts have been deducted, in percent.
hallHeight | Hall height in m, usually for commercial properties. | positiveDecimal
hasAttic | Has an attic. | [applicable](#type-applicable)
hasBalcony | Balcony available. | [applicable](#type-applicable)
hasBuildingLawRestrictions | Restrictions for modifications apply, like monument protection and similar. | [applicable](#type-applicable)
hasCableTv | Availability of cable tv. | [applicable](#type-applicable)
hasCarPort | A covered structure used to offer limited protection from rain and snow, for one car. | [applicable](#type-applicable)
hasCarPortDouble | A covered structure used to offer limited protection from rain and snow, for two cars. | [applicable](#type-applicable)
hasCellar | Availability of a cellar. | [applicable](#type-applicable)
hasChargingStation | Whether or not a charging station for e-Cars is provided. | [applicable](#type-applicable)
hasConnectedBuildingLand | States if the land is fully developed and ready being built on it. | [applicable](#type-applicable)
hasDemolitionProperty | Used for building land, states if there is some demolition property on it (or pieces of it). | [applicable](#type-applicable)
hasDishwasher | Availability of a dishwasher. | [applicable](#type-applicable)
hasElevator | Availability of an elevator. | [applicable](#type-applicable)
hasFireplace | Includes a framed opening to hold an open fire, indoors. | [applicable](#type-applicable)
hasFlatSharingCommunity | Whether or not there is a residential community, sharing the living space. | [applicable](#type-applicable)
hasForeignQuota | Widely used to control the amount of foreigners buying holiday flats in popular regions. | [applicable](#type-applicable)
hasGarage | A shelter for one car. | [applicable](#type-applicable)
hasGarageDouble | A shelter for two cars. | [applicable](#type-applicable)
hasGarageUnderground | Subterranean garage for cars. | [applicable](#type-applicable)
hasGardenShed | A small building for storing garden tools, bicycles, and other equipment. | [applicable](#type-applicable)
hasLakeView | Direct visibility of a lake. | [applicable](#type-applicable)
hasLiftingPlatform | Provides vertical transportation between building floors, levels or decks, and are commonly found in offices, public buildings and other types of multi-story accommodation. | [applicable](#type-applicable)
hasMountainView | Direct visibility of mountains. | [applicable](#type-applicable)
hasNiceView | Has a lovely view, usually from the balcony or the living room. | [applicable](#type-applicable)
hasParking | An uncovered space for one car or more cars. | [applicable](#type-applicable)
hasPhotovoltaic | Whether or not a photovoltaic system is provided. | [applicable](#type-applicable)
hasPlayground | Has a playground for children nearby. | [applicable](#type-applicable)
hasRamp | A sloping floor, walk, or roadway leading from one level to another, usually to make a place accessible for wheels. | [applicable](#type-applicable)
hasSteamer | Has a steamer. | [applicable](#type-applicable)
hasStoreRoom | Storeroom, stowage room. | [applicable](#type-applicable)
hasSupplyGas | Availability of a gas connection, usually for heating and cooking. | [applicable](#type-applicable)
hasSupplyPower | A connection to the public electric grid. | [applicable](#type-applicable)
hasSupplySewage | A connection to the public waste water system. | [applicable](#type-applicable)
hasSupplyWater | A connection to the public water supply. | [applicable](#type-applicable)
hasSwimmingPool | Personal swimming pool. | [applicable](#type-applicable)
hasThermalSolarCollector | Whether or not a thermal solar collector system is provided. | [applicable](#type-applicable)
hasTiledStove | A masonry heater or ceramic stove, is a device for warming an interior space usually fed with wood. | [applicable](#type-applicable)
hasTumbleDryer | Dryer for clothes after washing them. | [applicable](#type-applicable)
hasWashingMachine | For washing clothes and other cloth. | [applicable](#type-applicable)
hasRemoteViewings | Indicates that prospects can visit the property virtually (e.g. with a video-call or guided virtual-tour hosted by the real estate agent). | [applicable](#type-applicable)
isChildFriendly | Suitable for families. | [applicable](#type-applicable)
isCornerHouse | A house situated on the corner of two streets. | [applicable](#type-applicable)
isDemolitionProperty | If it's a tear-down property or a site of demolished structures. | [applicable](#type-applicable)
isDilapidated | Old and in poor condition, in a state of decay. | [applicable](#type-applicable)
isFirstOccupancy | No one used the flat or the building before, since it was built or heavily renovated from ground up. | [applicable](#type-applicable)
isGroundFloor | Nearly on a level with the ground. | [applicable](#type-applicable)
isGroundFloorRaised | Half of a stair elevated story, in a building. | [applicable](#type-applicable)
isGutted | Preparation for demolition or a part-demolition, all contaminants, doors, windows, floors and non-loadbearing walls were removed. | [applicable](#type-applicable)
isInNeedOfRenovation | Needs to be renewed in order to be fully usable again. | [applicable](#type-applicable)
isInNeedOfRenovationPartially | Needs to be renewed partially in order to be fully usable again. | [applicable](#type-applicable)
isLikeNew | Used, but as good as new. | [applicable](#type-applicable)
isMiddleHouse | Situated between two other houses or buildings. | [applicable](#type-applicable)
isModernized | Modernized means improved, thins like a better insulated roof and walls, modern heating system and similar improvements. | [applicable](#type-applicable)
isNewConstruction | Newly built house or building. | [applicable](#type-applicable)
isOldBuilding | Refers to the construction method used until 60-80 years ago. | [applicable](#type-applicable)
isProjection | Planned for the future. | [applicable](#type-applicable)
isQuiet | Part of a quiet surrounding or neighbourhood. | [applicable](#type-applicable)
isRefurbished | Fully renovated, neat, clean and restored. | [applicable](#type-applicable)
isRefurbishedPartially | Partially renovated or restored. | [applicable](#type-applicable)
isSecondaryResidenceAllowed | Where a person lives part time or less than the majority of the calendar year, typically a holiday flat, some laws and landlords do not allow this. | [applicable](#type-applicable)
isShellConstruction | Intentionally missing interior finish in order to allow customization. | [applicable](#type-applicable)
isSmokingAllowed | Smoking allowed inside. | [applicable](#type-applicable)
isSunny | Sunny surroundings, nor trees, mountains or other buildings do shadow. | [applicable](#type-applicable)
isUnderRoof | Mainly used for parking slots. | [applicable](#type-applicable)
isWellTended | Properly looked after. | [applicable](#type-applicable)
isWheelchairAccessible | All aspects are accessible for wheelchair users. | [applicable](#type-applicable)
numberOfApartements | Number of apartments contained. | positiveInteger
numberOfBathrooms | Number of bathrooms. | positiveInteger
numberOfFloors | Total amount of floors. | positiveInteger
numberOfParcels | Number of parcels. | positiveInteger
numberOfRooms | Total number of rooms. | positiveDecimal
numberOfShowers | The number of showers | positiveInteger
numberOfToilets | The number of toilets | positiveInteger
numberOfToiletsGuest | The number of guest and additional toilets | positiveInteger
onEvenGround | Built on even grounds. | [applicable](#type-applicable)
onHillside | Built on a sloping hillside. | [applicable](#type-applicable)
onHillsideSouth | Built on a sloping hillside towards the south. | [applicable](#type-applicable)
utilizationRatio | Plot area built on, the ratio between plot area and gross floor area. | utilizationRatio
utilizationRatioConstruction | Plot area to be built on, the ratio between plot area and gross floor | utilizationRatioarea.
volumeGva | Building volume in m³ | positiveDecimal
volumeSia | Volume SIA in m³ | positiveDecimal
volumeSiaAfv | Volume SIA-AFV in m³ | positiveDecimal
volumeSiaAkv | Volume SIA-AKV in m³ | positiveDecimal
volumeSiaAngv | Volume SIA-ANGV in m³ | positiveDecimal
volumeSiaAnv | Volume SIA-ANV in m³ | positiveDecimal
volumeSiaAvv | Volume SIA-AVV in m³ | positiveDecimal
volumeSiaGv | Volume SIA-GV in m³ | positiveDecimal
yearBuilt | Year of construction, in four digits. | year
yearLastRenovated | Year of last renovation, in four digits. | year
rentalIncomeNet | Current annual income excluding extra costs. | positiveInteger
rentalIncomeNetMaxPotential | Max potential annual rental income if completely rented out excluding extra costs. | positiveInteger