
var Markdown2DCaseTreeConverter = require("./Markdown2DCaseTreeConverter")
var test = "#Goal g1 4\nG\n\nsubject:G\nhoge\n#Strategy\nAlternative\n\nsubject:Alternative\nhoge\n##Goal\nG\n\nsubject:G\nhogehoge\n#Strategy s1 5\ns\n\nsubject:s\nfugafuga\n###Goal\nt1\n\nsubject:t1\nhogehogehoge\n###Goal\nD-Script\n\nsubject:D-script\nfugafugafuga\n#Solution\nx\n\nsubject:x\nhogehogehogehoge\n##Goal\nt2\n\nsubject:t2\nfugafugafugafuga";
var m2dc = new Markdown2DCaseTreeConverter.Converter();
var root = m2dc.parseMarkdown(test);
root.dump();
