const globby = require('globby')
const path = require('path')
const fs = require('fs-extra')
const { exec } = require('../../lib')

const xsddoc = async () => {
  const { CLASSPATH } = process.argv
  const locator = process.platform === 'win32'
    ? 'where'
    : 'which'

  const executable = await exec(`${locator} java`)
  const localClassPath = []

  if (CLASSPATH) {
    localClassPath.push(CLASSPATH)
  }

  const libClasses = await globby('lib/*.jar', { cwd: __dirname })
  localClassPath.push(...libClasses.map(file => path.resolve(__dirname, file)))
  const classpath = localClassPath.join(':')

  const outputDir = path.join(__dirname, '..', '.tmp', 'docs')
  await fs.ensureDir(outputDir)

  const args = [
    '-h "SwissRETS"',
    '-t "SwissRETS"',
    '-v',
    `-o ${outputDir}`,
    path.join(__dirname, '..', '..', '..', 'schema', 'schema.xsd')
  ].join(' ')

  const command = `${executable} -classpath ${classpath} net.sf.xframe.xsddoc.Main ${args}`
  console.log(command)
  return command
}

xsddoc()

module.exports = xsddoc

// if [ -z "$JAVACMD" ] ; then
//   if [ -n "$JAVA_HOME"  ] ; then
//     if [ -x "$JAVA_HOME/jre/sh/java" ] ; then
//       JAVACMD="$JAVA_HOME/jre/sh/java"
//     else
//       JAVACMD="$JAVA_HOME/bin/java"
//     fi
//   else
//     JAVACMD=`which java 2> /dev/null `
//     if [ -z "$JAVACMD" ] ; then
//         JAVACMD=java
//     fi
//   fi
// fi

// if [ ! -x "$JAVACMD" ] ; then
//   echo "Error: JAVA_HOME is not defined correctly."
//   echo "  We cannot execute $JAVACMD"
//   exit 1
// fi

// if [ -n "$CLASSPATH" ] ; then
//   LOCALCLASSPATH="$CLASSPATH"
// fi

// XSDDOC_HOME=`dirname "$0"`
// XSDDOC_HOME=`cd "$XSDDOC_HOME"/.. && pwd`

// for i in $XSDDOC_HOME/lib/*.jar
// do
//   LOCALCLASSPATH=$LOCALCLASSPATH:$i
// done

// if [ -n "$JAVA_HOME" ] ; then
//   if [ -f "$JAVA_HOME/lib/tools.jar" ] ; then
//     LOCALCLASSPATH="$LOCALCLASSPATH:$JAVA_HOME/lib/tools.jar"
//   fi

//   if [ -f "$JAVA_HOME/lib/classes.zip" ] ; then
//     LOCALCLASSPATH="$LOCALCLASSPATH:$JAVA_HOME/lib/classes.zip"
//   fi
// else
//   echo "Warning: JAVA_HOME environment variable is not set (or not exported)."
//   echo "  If build fails because sun.* classes could not be found"
//   echo "  you will need to set the JAVA_HOME environment variable"
//   echo "  to the installation directory of java."
// fi

// "$JAVACMD" -classpath "$LOCALCLASSPATH" net.sf.xframe.xsddoc.Main "$@"
