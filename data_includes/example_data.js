
PennController.ResetPrefix(null);
// --------------------------------------------------------------------------------------------------------------
// Preamble

// sequence
PennController.Sequence( "instructions1", "info1", "practice", shuffle(randomize("critical"), randomize("filler")) );
//PennController.Sequence( "instructions1", "info1", randomize("items"));


// --------------------------------------------------------------------------------------------------------------
// Consent form / Welcome
PennController( "instructions1" ,
    newHtml("instructions", "instructions.html")
        .print()
    ,
    newButton("consent button", "continue")
        .print()
        .wait()
);

// --------------------------------------------------------------------------------------------------------------
// Demographics

PennController( "info1" ,
    newHtml("info", "info2.html")
       .settings.log()
        .print()
    ,
    newButton("info button", "continue")
        .print()
        .wait( getHtml("info").test.complete())
);

// --------------------------------------------------------------------------------------------------------------
// Practice items


PennController.Template( PennController.GetTable("practice.csv"), // use subset.csv
        row => ["practice",
                 "DashedSentence", {s: [row.bio], display: "in place",blankText: "..."}
               
,
                "DashedSentence", {s: [row.prac1,row.prac2,row.prac3,row.prac4,row.spillover]}
,
                                       
                "PennController", PennController(
            newText("question", "How natural did you find this sentence?")
                     .settings.css("font-size", "30px")
                .print()
            ,
            newScale("natural", 7)
                .settings.before( newText("left", "completely unnatural") )
                .settings.after( newText("right", "perfectly fine") )
                .print()
                .wait()
        )
    ]
);

// --------------------------------------------------------------------------------------------------------------
// Critical items


PennController.Template( PennController.GetTable("subset.csv"), // use subset.csv
        row => ["critical",
                 "DashedSentence", {s: [row.bio], display: "in place",blankText: "..."}
               
,
                "DashedSentence", {s: [row.pronoun,row.verb,row.adj,row.objnp,row.time,row.spillover]}
,
                                       
                "PennController", PennController(
            newText("question", "How natural did you find this sentence?")
                     .settings.css("font-size", "30px")
                .print()
            ,
            newScale("natural", 7)
                .settings.button()
                .settings.before( newText("left", "completely unnatural") )
                .settings.after( newText("right", "perfectly fine") )
                .print()
                .wait()
        )
    ]
);

// --------------------------------------------------------------------------------------------------------------
// Filler items


PennController.Template( PennController.GetTable("fillers.csv"), // use subset.csv
        row => ["filler",
                 "DashedSentence", {s: [row.bio],display: "in place",blankText: "..."}
,
                "DashedSentence", {s: [row.filler1,row.filler2,row.filler2,row.spillover]}

                               
          
           ,

 "PennController", PennController(

            newText("scale_title", "How naturally does this sentence fit the previous context?")
            .settings.css("font-size", "30px")
            .print()
      ,
       newScale("rating", 100)
      .settings.slider()
      .settings.before( newText("left", "completely unnatural") )
      .settings.after( newText("right", "perfectly fine") )
      .print()
      .wait()
   ,
        newButton("finish", "submit")
            .print()
           .wait()
  
       ,   
        getButton("finish")
           .remove()  
       ,      
        getScale("rating")
           .remove() 
    ,      
        getText("scale_title")
           .remove() 
      ,         
        newText("pleasewait2", "Please wait for the next biography.")
          .print()
    ,
        newTimer("wait", 1000)
            .start()
            .wait()
   ,
        getText("pleasewait2")
           .remove()
 ,

        getScale("rating").settings.log("all")
                    

             
                )
                ]
                )
                                            

    
    // --------------------------------------------------------------------------------------------------------------
// Log results
                                          .log( "item" , variable.item_id )
                                          .log( "vital_status" , variable.vital_status )
                                          .log( "name" , variable.name )
                
  
        
    

