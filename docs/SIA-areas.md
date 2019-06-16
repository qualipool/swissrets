[**◀ Home**](./)

# SIA aras

All children in `<characteristics>`s that start with `<areaSia***>` correspond with the general swiss SIA-Norm 416. Below is a generalization in german.

## Flächen:

```
┌───────────────────────────────────────────────┐
│                       GF                      │ Geschossfläche
├───────────────────────────────┰───────────────┧
│              NGF              ┃       KF      ┃ Nettogeschossfläche + Konstruktionsfläche
├───────────────┬───────┬───────╂───────┬───────┨
│       NF      │  VF   │  FF   ┃  KFT  │  KFN  ┃ (Nutzfläche + Verkehrsfläche + Funktionsfläche) (FK tragend + KF nicht-tragend)
├───────┬───────┼───────┴───────┺━━━━━━━┷━━━━━━━┛
│  NNF  │  HNF  │ Neben + Hauptnutzfläche
└───────┴───────┘
```

## Ausenflächen

```
┌───────────────────────────────────────────────┐
│                      AGF                      │ Aussen-Geschossfläche
├───────────────────────────────┰───────────────┧
│             ANGF              ┃      AKF      ┃ Aussen-Nettogeschossfläche + Aussen-Konstruktionsfläche
├───────────────┬───────┬───────╂───────┬───────┨
│      ANF      │  AVF  │  AFF  ┃  AKFT │ AKFN  ┃ Aussen-* (Nutzfläche + Verkehrsfläche + Funktionsfläche) (FK tragend + KF nicht-tragend)
└───────────────┴───────┴───────┺━━━━━━━┷━━━━━━━┛
```

## Volumen

```
┌───────────────────────────────────────────────┐
│                      GV                       │ Gebäudevolumen
├───────────────────────────────┬───────────────┤
│             ANGV              │      AKV      │ Nettogebäudevolumen + Konstruktions-Volumen
├───────────────┬───────┬───────┼───────────────┘
│      ANV      │  AVV  │  AFV  │   Nutzvolumen + Verkehrsvolumen + Funktionsvolumen
└───────────────┴───────┴───────┘
```

## Grundstückfläche

```
┌───────────────────────────────────────────────┐
│                      GSF                      │ Grundstückfläche
├───────────────────────────────┬───────────────┤
│               UF              │      GGF      │ Umgebungsfläche + Gebäudegrundfläche
├───────────────┬───────────────┼───────────────┘
│      BUF      │      UUF      │ Bearbeitete Umgebungsfläche + Unbearbeitete Umgebungsfläche
└───────────────┴───────────────┘
```
