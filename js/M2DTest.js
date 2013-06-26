
var Markdown2DCaseTree = require("./Markdown2DCaseTree")
function test() {
    var test = "DCaseName : Sample\n\n*Goal g1 4\nG\n---\nType:Issue\nVisible:true\n---\n*Strategy\nAlternative\n---\nType:Issue\nVisible:true\n---\n*Context\nC\n---\nType:Issue\nVisible:true\n---\n**Goal\nG\n---\nType:Issue\nVisible:true\n---\n**Strategy s1 5\ns\n---\nType:Issue\nVisible:true\n---\n***Goal\nt1\n---\nType:Issue\nVisible:true\n---\n***Goal\nD-Script\n---\nType:Issue\nVisible:true\n---\n***Solution\nx\n---\nType:Issue\nVisible:true\n---\nType:LastUpdate\nVisible:false\nSubject:hogehoge\n---\n**Goal\nt2\n---\nType:Issue\nVisible:true\n---";
    var m2dc = new Markdown2DCaseTree.Converter();
    var root = m2dc.parseMarkdown(test);
    root.dump();
}
test();
