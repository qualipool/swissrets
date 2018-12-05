==============================================================================
This file is part of the xframe software package
hosted at http://xframe.sourceforge.net

Copyright (c) 2003 Kurt Riede.

This library is free software; you can redistribute it and/or
modify it under the terms of the GNU Lesser General Public
License as published by the Free Software Foundation; either
version 2.1 of the License, or (at your option) any later version.

This library is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
Lesser General Public License for more details.

You should have received a copy of the GNU Lesser General Public
License along with this library; if not, write to the Free Software
Foundation, Inc., 59 Temple Place, Suite 330, Boston, MA 02111-1307 USA
==============================================================================

1. Download

This release of xsddoc is available in two version:
If you already have Apache Xalan and Xerces on your classpath, the standard
distribution should be your choice. Otherwise download the full distribution
to have all required libraries. Both distributions are available once in ZIP
format for Win32 users and once as tar.gz for Unix/Linux users.

here you can download xframe - xsddoc:

http://sourceforge.net/project/showfiles.php?group_id=48863


==============================================================================

2. Installation of xsddoc as command line tool

2.1. extract the xsddoc distribution file to a folder of your choice.

2.2. declare an environment variable XSDDOC_HOME and set it to the folder
where you have extracted xsddoc.

2.3. add the bin folder of xsddoc to your systems path.

Example on UNIX (bash):

  > export XSDDOC_HOME=/usr/local/xsddoc
  > export PATH=${XSDDOC_HOME}/bin: ${PATH}

Example on UNIX (csh):

  > setenv XSDDOC_HOME /usr/local/xsddoc
  > set path=( $XSDDOC_HOME/bin $path )

Example on Win32:

  > set XSDDOC_HOME=C:\Programs\xframe\xsddoc
  > set PATH=%XSDDOC_HOME%;%PATH%

2.4. try to build the sample that comes with xsddoc:

Example with the command line tool

  > cd samples/XMLSchema
  > mkdir doc
  > xsddoc -t "XML Schema for XML Schema" -o doc -verbose XMLSchema.xsd

Example with Apache Ant

  > cd samples
  > ant

==============================================================================

3. Installation of xsddoc for Apache Ant

All you have to do is to copy the file xsddoc.jar to the lib folder of your ant installation.


==============================================================================

4. Command line usage

Usage: xsddoc [-option] schema
             (to document a schema)
where options include:
    -o -out <folder>      Set the output folder
    -t -doctitle <title>  Set the documentation title
    -h -header <header>   Set the documentation header
    -f -footer <footer>   Set the documentation footer
    -b -bottom <bottom>   Set the documentation bottom
    -s -hideSubTypes      hide sub types references
    -l -hideSubLocalUsage hide show local usage references
    -p -hideTypes         hide types in overview pages
    -g -hideGroups        hide groups in overview pages
    -a -hideAttributes    hide attributes in overview pages
    -xml                  output as XML instead of HTML
    -version              Only output version of xsddoc
    -v -verbose           Output messages about what xsddoc is doing
    -q -quiet             Be quiet about what xsddoc is doing
    -d -debug             Output debug messages
    -? -help              Print this help message


==============================================================================

5. Usage with Apache Ant

5.1. ensure that the file xsddoc.jar is on your clathpath when starting ant.
One easy way to do this is to copy it to the lib folder of your ant installation.

5.2. Task definition
Add the following XML fragment to your build file:

    <taskdef name="xsddoc" classname="net.sf.xframe.xsddoc.Task"/>

5.3. Task usage, Example

    <xsddoc file="myschema.xsd"
             out="doc/schema/myschema"
           title="Title of my schema"
         verbose="true"/>

5.4. Attributes of xsddoc task:

  file            path to location of schema
  dir             folder of schemas
  out             optional, path to output folder (default: .)
  doctitle        optional, descriptibe title of schema
  header          Include header text for each page (html-code) (default: no)
  footer          Include footer text for each page (html-code) (default: no)
  bottom          Include bottom text for each page (html-code) (default: no)
  failonerror     Log a warning message, but do not stop the build,
                  when the file to copy does not exist or one of the
                  nested filesets points to a directory that doesn't
                  exist or an error occurs while copying. (default: no)
  verbose         optional boolean, verbose output (default: true)
  quiet           optional boolean, quiet output (default: false)
  debug           optional boolean, debug output (default: false)
  xml             optional boolean, if XML should be generated
                  insteadof html for schema components (default: false)
  hideSubTypes    optional boolean, if sub types reference should be hidden (default: false)
  hideLocalUsage  optional boolean, if local usage reference should be hidden (default: false)
  hideTypes       hide types in overview pages (default: false)
  hideGroups      hide groups in overview pages (default: false)
  hideAttributes  hide attributes in overview pages (default: false)

5.5. nested tags

  fileset         fileset of schemas (see ant documentation for details)
  doctitle        Same as the doctitle attribute, but you can nest text inside the element this way.
  header          Similar to <doctitle>.
  footer          Similar to <doctitle>.
  bottom          Similar to <doctitle>

==============================================================================
6. Support, Community

If you have questions or problems with xsddoc, you can get support in several ways:

- check out the information on our homepage at http://xframe.sourceforge.net/xsddoc/index.html

- subscribe to our mailing list at http://sourceforge.net/mail/?group_id=48863

- search for help in our xsddoc forum at http://sourceforge.net/forum/forum.php?forum_id=318508

- ask a question to the xframe team in our xsddoc forum at http://sourceforge.net/forum/forum.php?forum_id=318508
