import DCaseTree = module("DCaseTree");
import Markdown2DCaseTreeConverter = module("Markdown2DCaseTreeConverter");

var test : string = "#Goal g1 4\nG\n\nsubject:G\nhoge\n#Strategy\nAlternative\n\nsubject:Alternative\nhoge\n##Goal\nG\n\nsubject:G\nhogehoge\n#Strategy s1 5\ns\n\nsubject:s\nfugafuga\n###Goal\nt1\n\nsubject:t1\nhogehogehoge\n###Goal\nD-Script\n\nsubject:D-script\nfugafugafuga\n#Solution\nx\n\nsubject:x\nhogehogehogehoge\n##Goal\nt2\n\nsubject:t2\nfugafugafugafuga";

var m2dc : Markdown2DCaseTreeConverter.Converter = new Markdown2DCaseTreeConverter.Converter();
var root : DCaseTree.DCaseNode = m2dc.parseMarkdown(test);
console.log(root.dump());
