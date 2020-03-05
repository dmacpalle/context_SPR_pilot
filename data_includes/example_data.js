PennController.ResetPrefix(null);

// PennController.DebugOff() // use for the final version

// --------------------------------------------------------------------------------------------------------------
// Preamble

// sequence
PennController.Sequence( "welcome-consent", "demographics", "instructions1", "practice", "instructions2", shuffle(randomize("critical"), randomize("filler")), "send", "final");

// --------------------------------------------------------------------------------------------------------------
// Consent form / Welcome
PennController( "welcome-consent" ,
                newHtml("instructions", "welcome-consent.html")
                .print()
                ,
                newButton("consent button", "Continue")
                .print()
                .wait()
               );

// --------------------------------------------------------------------------------------------------------------
// Demographics

PennController("demographics",
               newTextInput("px", "")
               .settings.before( newText("pxRequest", "Please enter your Prolific ID:") )
               //.log()
               .print()
               ,
               newButton("validate", "Validate")
               .print()
               .wait()
               .remove()
               ,
               getTextInput("px")
               ,
               
               /*
               newDropDown("L1", "")
               .settings.add("English only", "mostly English", "not English")
               //.select( "English only" )  
               ,
               newDropDown("age", "")
               .settings.add("under 18", "18-30", "over 30")
               //.select( "English only" )
               ,
               newDropDown("L2", "")
               .settings.add("no", "yes")
               .select( "English only" )
               , 
               newDropDown("L2age", "")
               .settings.add("aged 6 or under", "aged 6 - 12", "aged 12 or older")
               .select( "English only" )
               , 
               newText("demo","Before you continue to the instructions, please answer the following questions honestly.<br><br>")
               .print()
               ,
               getText("demo")
               ,
               newText("What language do your parents speak to you in?")
               .print()
               .settings.after( getDropDown("L1") )
               //.wait()
               ,
               newText("<br>What age group do you belong to?<br>")
               .print()
               .settings.after( getDropDown("age") )
               //.wait()
               ,
               newText("<br>Do you speak any language fluently other than English?<br>")
               .print()
               .settings.after( getDropDown("L2") 
               .print()
               .wait()
               .test.selected( "yes" )
               .success(newText("When did you start learning this language?")
               .settings.after(getDropDown("L2age")
               .print()
              )
               .print()
              )
              ) 
               ,
               newButton("consent button", "Continue")
               .print()
               .wait()
               ,
               getDropDown("age").settings.log(),
               getDropDown("L1").settings.log(),
               getDropDown("L2").settings.log(),
               getDropDown("L2age").settings.log(),
               
               
               ,
               //getTextInput("px").settings.log(),
               //.log("px",getTextInput(px)
               // ,
               //getScale("L1").settings.log(),
               //getScale("age").settings.log() */
              );
               
               // --------------------------------------------------------------------------------------------------------------
               // Instructions
               PennController("instructions1",
               newHtml("instructions", "instructions1.html")
    .print()
    ,
    newButton("consent button", "Continue")
    .print()
    .wait()
    );

// --------------------------------------------------------------------------------------------------------------
// Practice items


PennController.Template(PennController.GetTable("fictional-practice.csv"),
                        variable => ["practice",
                                     "DashedSentence", {s: [variable.bio], display: "in place",blankText: "..."}
                                     ,
                                     "DashedSentence", {s: [variable.prac1,variable.prac2,variable.prac3,variable.prac4,variable.spillover]}
                                     ,
                                     "PennController", PennController(
                                         newText("scale_title", "How natural did you find this sentence?")
                                         //.settings.css("font-size", "30px")
                                         .print()
                                         ,
                                         newScale("rating", 7)
                                         .settings.before( newText("left", "definitely wrong") )
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
                                         getScale("rating").settings.log() 
                                         
                                     )
                                     .log( "ParticipantID", PennController.GetURLParameter("id") )
                                     .log( "item" , variable.item_id ) 
                                     .log( "vital_status" , variable.vital_status )
                                     .log( "name" , variable.name )  
                                     .log("list", variable.list)
                                    ]
                       );

// --------------------------------------------------------------------------------------------------------------
// Instructions
PennController("instructions2",
               newHtml("instructions", "instructions2.html")
               .print()
               ,
               newButton("consent button", "Continue")
               .print()
               .wait()
              );

// --------------------------------------------------------------------------------------------------------------
// Critical items

PennController.Template( PennController.GetTable("fictional.csv"), // use subset.csv for celebrity names
                         variable => ["critical",
                                      "DashedSentence", {s: [variable.bio], display: "in place",blankText: "..."}
                                      ,
                                      "DashedSentence", {s: [variable.pronoun,variable.verb,variable.adj,variable.objnp,variable.time,variable.spillover]}
                                      ,
                                      "PennController", PennController(
                                          newText("scale_title", "How natural did you find this sentence?")
                                          //.settings.css("font-size", "30px")
                                          .print()
                                          ,
                                          newScale("rating", 7)
                                          .settings.before( newText("left", "definitely wrong") )
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
                                          getScale("rating").settings.log(),
                                      )
                                          .log( "ParticipantID", PennController.GetURLParameter("id") )
                                      .log( "item" , variable.item_id )
                                      .log( "vital_status" , variable.vital_status )
                                      .log( "name" , variable.name )  
                                      .log( "tense" , variable.tense ) 
                                      .log("list", variable.list)
                                     ]
                        );

// --------------------------------------------------------------------------------------------------------------
// Filler items

PennController.Template( PennController.GetTable("fillers.csv"),
                         variable => ["filler",
                                      "DashedSentence", {s: [variable.bio], display: "in place",blankText: "..."}
                                      ,
                                      "DashedSentence", {s: [variable.filler1,variable.filler2,variable.filler3,variable.spillover]}
                                      ,
                                      "PennController", PennController(
                                          newText("scale_title", "How natural did you find this sentence?")
                                           //.settings.css("font-size", "30px")
                                          .print()
                                          ,
                                          newScale("rating", 7)
                                          .settings.before( newText("left", "definitely wrong") )
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
                                          getScale("rating").settings.log(),
                                      )
                                          .log( "ParticipantID", PennController.GetURLParameter("id") )
                                      .log( "item" , variable.item_id )
                                      .log( "vital_status" , variable.vital_status )
                                      .log( "name" , variable.name )  
                                      .log( "tense" , variable.tense ) 
                                      .log("list", variable.list)
                                     ]
                        );

// --------------------------------------------------------------------------------------------------------------
// 3. Send results

PennController.SendResults( "send" ); // important!!! Sends all results to the server


// --------------------------------------------------------------------------------------------------------------
// 4. Thank you screen

PennController( "final" ,
                newText("<p>Thank you for your participation!</p>")
                .print()
                ,
                newText("<p><a href='https://www.put.your/platform/confirmation/link.here'>Click here to validate your participation.</a></p>") // confirmation link (e.g., for payment)
                .print()
                ,
                newButton("void") // this creates a 'void' button that must be clicked to continue. This is because we don't want them to be able to continue beyond this screen
                .wait() // so basically this is the end and there's no way to go any further
               );
