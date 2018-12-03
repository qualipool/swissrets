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
        StringBuilder validationErrors = new StringBuilder();

        [Fact]
        public void be_valid_xml()
        {
            var document = new XmlDocument();
            document.Load("Schema/schema.xsd");
        }

        [Fact]
        public void validate_full_file()
        {
            var schema = new XmlSchemaSet();
            schema.Add("", @"Schema/schema.xsd");
            var rd = XmlReader.Create(@"TestData/full.xml");
            var doc = XDocument.Load(rd, LoadOptions.PreserveWhitespace | LoadOptions.SetLineInfo);
            this.validationErrors.Clear();
            doc.Validate(schema, ValidationEventHandler, true);
            this.validationErrors.ToString().Should().BeNullOrEmpty(this.validationErrors.ToString());
        }

        [Fact]
        public void validate_minmal_file()
        {
            var schema = new XmlSchemaSet();
            schema.Add("", @"Schema/schema.xsd");
            var rd = XmlReader.Create(@"TestData/minimal.xml");
            var doc = XDocument.Load(rd, LoadOptions.PreserveWhitespace | LoadOptions.SetLineInfo);
            this.validationErrors.Clear();
            doc.Validate(schema, ValidationEventHandler, true);
            this.validationErrors.ToString().Should().BeNullOrEmpty(this.validationErrors.ToString());
        }

        #region ValidationEventHandler
        void ValidationEventHandler(object sender, ValidationEventArgs e)
        {
            if (e.Severity == XmlSeverityType.Error)
            {
                this.validationErrors.AppendLine($"\n\n>> {e.Message}\n-> XML line {e.Exception.LineNumber} position {e.Exception.LinePosition}");
            }
        }
        #endregion
    }
}
