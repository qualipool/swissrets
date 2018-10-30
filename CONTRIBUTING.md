# _Draft_

------

Thank you for contributing SwissRETS
====================================

## Submiting a change request or an idea
1. Go to the [new issue page](https://github.com/qualipool/swissrets/issues/new/choose)
1. Choose your template
1. Please write in english
1. submit

## Pull request process
1. Ensure all your changes follow the principles and rules of this document.
2. Update the documentation (Wiki) with details of changes, if needed.
3. Increase the version number according to [semver](http://semver.org/) using `npm version patch|minor|major`
4. A maintainer will then take care about merging the pull request.

## Developing
You're very welcome to fork the project and send pull requests.

### Before you start
- Use an editor that supports [Editorconfig](https://editorconfig.org/) or install the plugin
- Install [Node >8](https://nodejs.org/en/download/)
- Install xmllint
  - [on Windows](http://flowingmotion.jojordan.org/2011/10/08/3-steps-to-download-xmllint/)
  - on OSX with homebrew: `brew install xmlstarlet`
  - on Linux (Debian/Ubuntu): `sudo apt-get install libxml2-utils`
- Forkthe project
  - Hit the **Fork** button on [qualipool/swissrets](https://github.com/qualipool/swissrets) - top right corner
  - Clone it locally

### Coding priciples
_Mainly targeting the ./schema/schema.xsd_  

----
1. **Consistency**
2. **Cleanness**
3. **Ease of use**
----

While we strive for all three, if we have conflicts, this list acts as priorities.

#### Consistency
SwissRETS should be predictable. To achieve this, we follow this list
- Solve the same things the same way
- Have clear naming rules (TODO: add link)
- Take time to refactor inconsistencies

#### Cleanness
SwissRETS should be tidy and clean
- Use real english words to name things
- No abbrevations
- Proper indentation (4 spaces)
- Use syntax checks

#### Ease of use
SwissRETS should be easy to use
- We try to have as little documentation as necessary
- Try to write selfspeaking code, to avoid documentation

