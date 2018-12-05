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
        StringBuilder validationErrors = new StringBuilder();
        string currentFilename = null;

        [Fact]
        public void be_valid_xml()
        {
            var document = new XmlDocument();
            document.Load(Schema_should.schemaFilename);
        }

        [Fact]
        public void validate_full_file()
        {
            this.validate(@"examples/full.xml", 0);
        }

        [Fact]
        public void validate_minmal_file()
        {
            this.validate(@"examples/minimal.xml", 0);
        }

        #region validate
        void validate (string filename, int expectedErrorCount = 0, string errorPatern = "")
        {
            var schema = new XmlSchemaSet();
            schema.Add("", Schema_should.schemaFilename);
            var rd = XmlReader.Create(filename);
            var doc = XDocument.Load(rd, LoadOptions.PreserveWhitespace | LoadOptions.SetLineInfo);
            this.validationErrors.Clear();
            this.currentFilename = filename;
            doc.Validate(schema, ValidationEventHandler, true);

            if (expectedErrorCount == 0)
            {
              this.validationErrors.Length.Should().Be(0, this.validationErrors.ToString());
              return;
            }
        }
        #endregion

        #region ValidationEventHandler
        void ValidationEventHandler(object sender, ValidationEventArgs e)
        {
            if (e.Severity == XmlSeverityType.Error)
            {
                this.validationErrors.AppendLine($"{this.currentFilename}:{e.Exception.LineNumber}:{e.Exception.LinePosition} {e.Message}\n");
            }
        }
        #endregion
    }
}
