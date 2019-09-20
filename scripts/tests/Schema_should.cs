using System;
using System.Collections;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Xml;
using System.Xml.Linq;
using System.Xml.Schema;
using Xunit;
using FluentAssertions;

namespace SwissRETS.Tests
{
    public class Schema_should
    {
        const string schemaFilename = @"schema/schema.xsd";
        List<string> validationErrors = new List<string>();
        string currentFilename = null;

        [Fact]
        public void schema()
        {
            var document = new XmlDocument();
            document.Load(Schema_should.schemaFilename);
        }

        [Fact]
        public void should_pass()
        {
            this.validate(@"full.xml", 0);
            this.validate(@"minimal.xml", 0);
            this.validate(@"multiple.xml", 0);
        }

        [Fact]
        public void should_fail()
        {
          this.validate(
            @"availability-missing.xml", 1,
            "The element 'property' has incomplete content."
          );
          this.validate(
            @"categories-empty.xml", 1,
            "The element 'categories' has incomplete content."
          );
          this.validate(
            @"localization-lang-missing.xml", 1,
            "The required attribute 'lang' is missing."
          );
          this.validate(
            @"localization-name-missing.xml", 1,
            "The element 'localization' has incomplete content."
          );
          this.validate(
            @"localization-phone-malformated-1.xml", 1,
            "The element 'localization' has invalid child element 'phone'."
          );
          this.validate(
            @"localization-phone-malformated-2.xml", 1,
            "The element 'localization' has invalid child element 'phone'."
          );
          this.validate(
            @"localization-phone-malformated-3.xml", 1,
            "The element 'localization' has invalid child element 'phone'."
          );
          this.validate(
            @"localizations-empty.xml", 1,
            "The element 'localizations' has incomplete content."
          );
          this.validate(
            @"localizations-missing.xml", 1,
            "The element 'property' has incomplete content."
          );
          this.validate(
            @"property-id-missing.xml", 1,
            "The required attribute 'id' is missing."
          );
          this.validate(
            @"property-reference-id-missing.xml", 1,
            "The element 'property' has incomplete content."
          );
          this.validate(
            @"publishers-empty.xml", 1,
            "The element 'publishers' has incomplete content."
          );
          this.validate(
            @"utilizations-empty.xml", 1,
            "The element 'utilizations' has incomplete content."
          );
          this.validate(
            @"image-mimeType-invalid.xml", 2,
            "The 'mimeType' element is invalid - The value 'image/svg+xml' is invalid according to its datatype 'String' - The Enumeration constraint failed."
          );
        }

        #region validate
        void validate (string filename, int expectedErrorCount = 0, string errorPattern = "")
        {
            var schema = new XmlSchemaSet();
            schema.Add("", Schema_should.schemaFilename);
            var reader = XmlReader.Create(
              $"{(expectedErrorCount == 0 ? "should-pass" : "should-fail")}/{filename}"
            );
            var document = XDocument.Load(
              reader,
              LoadOptions.PreserveWhitespace | LoadOptions.SetLineInfo
            );
            this.validationErrors.Clear();
            this.currentFilename = filename;
            document.Validate(schema, ValidationEventHandler, true);
            var allErrors = String.Join("\n", this.validationErrors);
            if (expectedErrorCount != this.validationErrors.Count) {
              Console.WriteLine("\n\n------------");
              Console.WriteLine(allErrors);
              Console.WriteLine("------------\n\n");
            }

            // make sure the right amount of errors occured
            this.validationErrors.Count.Should().Be(
              expectedErrorCount,
              $"{filename} is {(expectedErrorCount == 0 ? "" : "not ")}well formated"
            );

            // uncomment for descovering new should fail messages
            // Console.WriteLine("");
            // Console.WriteLine(allErrors);

            // abort if no pattern supplied
            if (errorPattern == "" || errorPattern == null)
            {
              expectedErrorCount.Should().Be(0,
                $"errorPattern can't be empty if validation errors are expected for {filename}"
              );
              return;
            }

            // also make sure, it is the correct validation error
            allErrors.Should().Contain(errorPattern, errorPattern);

        }
        #endregion

        #region ValidationEventHandler
        void ValidationEventHandler(object sender, ValidationEventArgs e)
        {
            if (e.Severity == XmlSeverityType.Error)
            {
                this.validationErrors.Add(
                  $"{e.Message} {this.currentFilename}:{e.Exception.LineNumber}:{e.Exception.LinePosition}"
                );
            }
        }
        #endregion
    }
}
