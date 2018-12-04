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
        string schemaFilename = @"Schema/schema.xsd";
        string currentFilename = null;
        StringBuilder validationErrors = new StringBuilder();

        [Fact]
        public void be_valid_xml()
        {
            var document = new XmlDocument();
            document.Load(this.schemaFilename);
        }

        [Fact]
        public void validate_full_file()
        {
            this.validate(@"TestData/full.xml");
        }

        [Fact]
        public void validate_minmal_file()
        {
            this.validate(@"TestData/minimal.xml");
        }

        #region validate
        void validate (string filename)
        {
            var schema = new XmlSchemaSet();
            schema.Add("", this.schemaFilename);
            var rd = XmlReader.Create(filename);
            var doc = XDocument.Load(rd, LoadOptions.PreserveWhitespace | LoadOptions.SetLineInfo);
            this.validationErrors.Clear();
            this.currentFilename = filename;
            doc.Validate(schema, ValidationEventHandler, true);
            this.validationErrors.ToString().Should().BeNullOrEmpty(this.validationErrors.ToString());
        }
        #endregion

        #region ValidationEventHandler
        void ValidationEventHandler(object sender, ValidationEventArgs e)
        {
            if (e.Severity == XmlSeverityType.Error)
            {
                this.validationErrors.AppendLine($"\n{this.currentFilename}:{e.Exception.LineNumber}:{e.Exception.LinePosition}\n> {e.Message}");
            }
        }
        #endregion
    }
}
