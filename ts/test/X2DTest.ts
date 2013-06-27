import DCaseTree = module("../DCaseTreeConverter/DCaseTree");
import Xml2DCaseTree = module("../DCaseTreeConverter/Xml2DCaseTree");

function test() : void {
	var test : string =
		"<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n"
		+ "<dcase:Argument xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\" xmlns:dcase=\"http://www.dependable-os.net/2010/03/dcase/\" id=\"_6A0EENScEeKCdP-goLYu9g\">\n"
		+ "  <rootBasicNode xsi:type=\"dcase:Goal\" id=\"_AgdoENSdEeKCdP-goLYu9g\" name=\"G_1\"/>\n"
		+ "  <rootBasicNode xsi:type=\"dcase:Strategy\" id=\"_Gs7KUNSdEeKCdP-goLYu9g\" name=\"S_1\" desc=\"this  is  the  first strategy \"/>\n"
		+ "  <rootBasicNode xsi:type=\"dcase:Evidence\" id=\"_4e3eQNSeEeKCdP-goLYu9g\" name=\"E_1\" desc=\"Evidence to show G_2 is correct\"/>\n"
		+ "  <rootBasicNode xsi:type=\"dcase:Goal\" id=\"_G_9TsNSgEeKCdP-goLYu9g\" name=\"G_2\" desc=\"Second Goal \"/>\n"
		+ "  <rootBasicNode xsi:type=\"dcase:Goal\" id=\"_eyfUwNSgEeKCdP-goLYu9g\" name=\"G_3\" desc=\"Third Goal\"/>\n"
		+ "  <rootBasicLink xsi:type=\"dcase:DcaseLink003\" id=\"_1E1AUNSeEeKCdP-goLYu9g\" source=\"#_Gs7KUNSdEeKCdP-goLYu9g\" target=\"#_AgdoENSdEeKCdP-goLYu9g\" name=\"LINK_1\"/>\n"
		+ "  <rootBasicLink xsi:type=\"dcase:DcaseLink003\" id=\"_LDZ7ANSgEeKCdP-goLYu9g\" source=\"#_G_9TsNSgEeKCdP-goLYu9g\" target=\"#_4e3eQNSeEeKCdP-goLYu9g\" name=\"LINK_2\"/>\n"
		+ "  <rootBasicLink xsi:type=\"dcase:DcaseLink003\" id=\"_NqvwsNSgEeKCdP-goLYu9g\" source=\"#_G_9TsNSgEeKCdP-goLYu9g\" target=\"#_Gs7KUNSdEeKCdP-goLYu9g\" name=\"LINK_3\"/>\n"
		+ "  <rootBasicLink xsi:type=\"dcase:DcaseLink003\" id=\"_i2-d4NSgEeKCdP-goLYu9g\" source=\"#_eyfUwNSgEeKCdP-goLYu9g\" target=\"#_Gs7KUNSdEeKCdP-goLYu9g\" name=\"LINK_4\"/>\n"
		+ "</dcase:Argument>";

	var x2dc : Xml2DCaseTree.Converter = new Xml2DCaseTree.Converter();
	var root : DCaseTree.TopGoalNode = x2dc.parseXml(test);
	root.dump();
}
test();
