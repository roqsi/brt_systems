/*
 * GET home page.
 */

exports.index = function(db) {
    return function(req, res) {
        var collection = db.get('bugscollection');
        collection.find({},{},function(e,docs){
            res.render('buglist', {
                title: 'BUG LIST',
                buglist : docs
            });
        });
    };
};

exports.newbug = function(req, res) {
      res.render('newbug', { title: 'NEW BUG' });
};

exports.editbug = function(db) {
    return function(req, res) {
        var collection = db.get('bugscollection');
        collection.find({_id: req.params.id},function(e,docs){
            //require("console-trace");
            //console.log(docs.summary);
            res.render('editbug', {
                title: 'EDIT BUG',
                buglist: docs
            });
        });
    }
}

exports.buglist = function(db) {
    return function(req, res) {
        var collection = db.get('bugscollection');
        collection.find({},{},function(e,docs){
            res.render('buglist', {
                title: 'BUG LIST',
                buglist : docs
            });
        });
    };
};

exports.addbug = function(db) {
    return function(req, res) {
        //Get our form values. These rely on the "name" attributes
        var build = req.body.build;
        var summary = req.body.summary;
        var language = req.body.language;
        var device = req.body.device;
        var os = req.body.os;
        var repro = req.body.repro;
        var StepsToReproduce = req.body.StepsToReproduce;
        var ObservedResults = req.body.ObservedResults;
        var ExpectedResults = req.body.ExpectedResults;
        var requirement = req.body.requirement;
        var BugNumber = req.body.BugNumber;
        var status = req.body.status;
        var date = req.body.date;
        var priority = req.body.priority;
        // Set our collection
        var collection = db.get('bugscollection');
        // Submit to the DB
        collection.insert({
		"build": build,
		"summary": summary,
		"language": language,
		"device": device,
		"os": os,
		"repro": repro,
		"StepsToReproduce": StepsToReproduce,
		"ObservedResults": ObservedResults,
		"ExpectedResults": ExpectedResults,
		"requirement": requirement,
		"BugNumber": BugNumber,
		"status": status,
		"date": date,
		"priority": priority
        }, function (err, doc) {
            if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            }
            else {
                // If it worked, set the header so the address bar doesn't still say /adduser
                res.location("buglist");
                // And forward to success page
                res.redirect("buglist");
            }
        });
    }
}

exports.deletebug = function(db) {
    return function(req, res) {
        var collection = db.get('bugscollection');
        collection.remove({_id: req.params.id}, 
            function(err){
                if(err) res.json(err);
                else    res.redirect('/buglist');
            });
    }
}

exports.edit = function(db) {
    return function(req, res) {
        //Get our form values. These rely on the "name" attributes
        var build = req.body.build;
        var summary = req.body.summary;
        var language = req.body.language;
        var device = req.body.device;
        var os = req.body.os;
        var repro = req.body.repro;
        var StepsToReproduce = req.body.StepsToReproduce;
        var ObservedResults = req.body.ObservedResults;
        var ExpectedResults = req.body.ExpectedResults;
        var requirement = req.body.requirement;
        var BugNumber = req.body.BugNumber;
        var status = req.body.status;
        var date = req.body.date;
        var priority = req.body.priority;
        var JiraTemplate = "*Requirement:* {color:red} "+requirement+" \n{color}\n*Build:* "+build+"\n*Device(s):* "+device+"\n*OS:* "+os+"\n*Repro:* "+repro+"\n*Steps to Reproduce:*\n"+StepsToReproduce+"\n*Observed Results:* "+ObservedResults+"\n*Expected Results:* "+ExpectedResults+""
        // Set our collection
        var collection = db.get('bugscollection');
        // Submit to the DB
        collection.update({_id: req.params.id}, {
		"build": build,
		"summary": summary,
		"language": language,
		"device": device,
		"os": os,
		"repro": repro,
		"StepsToReproduce": StepsToReproduce,
		"ObservedResults": ObservedResults,
		"ExpectedResults": ExpectedResults,
		"requirement": requirement,
		"BugNumber": BugNumber,
		"status": status,
		"date": date,
		"priority": priority
        }, function (err, doc) {
            if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            }
            else {
                // If it worked, set the header so the address bar doesn't still say /adduser
                res.location("buglist");
                // And forward to success page
                res.redirect("buglist");
            }
        });
    }
}

exports.getJiraTemplate = function(req, res) {
        //Get our form values. These rely on the "name" attributes
        var build = req.body.build;
        var summary = req.body.summary;
        var language = req.body.language;
        var device = req.body.device;
        var os = req.body.os;
        var repro = req.body.repro;
        var StepsToReproduce = req.body.StepsToReproduce;
        var ObservedResults = req.body.ObservedResults;
        var ExpectedResults = req.body.ExpectedResults;
        var requirement = req.body.requirement;
        var BugNumber = req.body.BugNumber;
        var status = req.body.status;
        var date = req.body.date;
        var priority = req.body.priority;
        var JiraTemplate = "*Requirement:* {color:red} "+requirement+" \n{color}\n*Build:* "+build+"\n*Device(s):* "+device+"\n*OS:* "+os+"\n*Repro:* "+repro+"\n*Steps to Reproduce:*\n"+StepsToReproduce+"\n*Observed Results:* "+ObservedResults+"\n*Expected Results:* "+ExpectedResults+""
        res.send(JiraTemplate)
}
 
exports.getDevTrackTemplate = function(req, res) {
        //Get our form values. These rely on the "name" attributes
        var build = req.body.build;
        var summary = req.body.summary;
        var language = req.body.language;
        var device = req.body.device;
        var os = req.body.os;
        var repro = req.body.repro;
        var StepsToReproduce = req.body.StepsToReproduce;
        var ObservedResults = req.body.ObservedResults;
        var ExpectedResults = req.body.ExpectedResults;
        var requirement = req.body.requirement;
        var BugNumber = req.body.BugNumber;
        var status = req.body.status;
        var date = req.body.date;
        var priority = req.body.priority;
        var DevTrackTemplate = "*Requirement:* {color:red} "+requirement+" \n{color}\n*Build:* "+build+"\n*Device(s):* "+device+"\n*OS:* "+os+"\n*Repro:* "+repro+"\n*Steps to Reproduce:*\n"+StepsToReproduce+"\n*Observed Results:* "+ObservedResults+"\n*Expected Results:* "+ExpectedResults+""
        res.send(DevTrackTemplate)
} 
