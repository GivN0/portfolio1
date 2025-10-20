import OpenAI from "openai";
import dotenv from "dotenv";

// Load environment variables from .env
dotenv.config({ path: './.env' }); // Ensure the correct path to the .env file

// Debugging: Log the API key
console.log("Loaded API Key:", process.env.OPENAI_API_KEY);

if (!process.env.OPENAI_API_KEY) {
  console.error("Error: OPENAI_API_KEY is not defined in .env file.");
  process.exit(1); // Exit if the API key is missing
}

// Initialize OpenAI client
const openAIClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Use the loaded API key
});

async function generateChatCompletion() {
  try {
    const messages = [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: "Write a suspenseful horror story." },
    ];

    const chatCompletion = await openAIClient.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: messages,
      max_tokens: 300,
    });

    console.log("AI Response:", chatCompletion.choices[0].message.content);
  } catch (error) {
    console.error("Error generating chat completion:", error);
  }
}

generateChatCompletion();


  /*
const genres = {
    thriller: {
    characterArc:  {
    hero: {
      description: "The Hero is the Thriller’s lead character. She will make the ultimate sacrifice by the end of your story. She will sacrifice herself in order to save someone else.",
      transformation: "Clarice sacrifices her sanity and puts her life on the line to save another.",
      roleInStory: "Heroine in a psychological thriller. Embarks on a journey of self-realization while solving a complex case.",
      keyTraits: "Courage, Selflessness, Determination",
      }, 
    villain: {
      description: "The Villain is a perfect counterbalance to the hero. He embodies the opposite of the hero’s values and actions.",
      transformation: "Buffalo Bill rejects his own truth and denies his schizophrenia, ultimately leading to his demise.",
      roleInStory: "Villain in a psychological thriller. His actions drive the narrative forward, creating tension and conflict.",
      keyTraits: "Obsessive, Delusional, Dangerous",
      },
    mentor: {
      description: "The Mentor/Father figure who influences the hero’s actions, but ultimately has his own flaws that affect the story.",
      transformation: "Crawford uses the hero for his own ego-driven mission, masking his true nature behind a fatherly persona.",
      roleInStory: "Mentor figure to the hero. Although he provides guidance, his obsession with Lecter complicates the hero's journey.",
      keyTraits: "Cerebral, Obsessive, Manipulative"
    },
    romanticInterest: {
      description: "The Romantic Love Interest who represents the possibility of a simpler, more authentic life for the hero.",
      transformation: "Pilcher shows Starling that she can find peace and connection outside of her obsession with proving herself.",
      roleInStory: "Love interest who contrasts the dark and manipulative relationships in the story, representing purity and authenticity.",
      keyTraits: "Authentic, Nerdy, Charming"
    },
    world: {
      description: "The setting plays a vital role, almost becoming a character itself. It shapes the hero’s decisions and experiences.",
      transformation: "The world evolves from a dark and hellish place to one of possibility and hope as the hero confronts her challenges.",
      roleInStory: "The world is the oppressive environment that influences every character. The hero's journey involves transforming this world.",
      keyTraits: "Oppressive, Transformative, Hellish"
    }
    },
    plotArc: {
        highStakes: {
          description: "The protagonist faces a dire situation, often involving life or death, where failure would result in catastrophic consequences. This creates intense tension throughout the story.",
          roleInStory: "Sets the tone for the entire plot by establishing the critical importance of the protagonist's success.",
          example: "A bomb must be defused in time to save hundreds of lives.",
        },
        twistsAndTurns: {
          title: "Twists and Turns",
          description: "Unexpected plot developments that challenge the reader's assumptions and keep them on edge. These twists can involve betrayals, hidden identities, or surprising motives.",
          roleInStory: "Keeps the narrative unpredictable and the audience engaged by continually shifting the plot's direction.",
          example: "The protagonist discovers their ally is secretly working for the antagonist.",
        },
        raceAgainstTime: {
          description: "The protagonist has a limited amount of time to solve the mystery or stop a dangerous event, creating urgency and increasing tension.",
          roleInStory: "Amplifies tension by introducing a deadline, pushing the protagonist to act quickly.",
          example: "A hostage situation with a ticking clock.",
        },
        mysteriousAntagonist: {
          description: "The villain, or primary source of conflict, is often shrouded in mystery, with their identity or motivations unclear for much of the story. The antagonist’s actions are calculated and sinister.",
          roleInStory: "Maintains suspense by withholding crucial information about the antagonist.",
          example: "A shadowy figure orchestrating events from the background.",
        },
        mindGames: {
          description: "Psychological manipulation between characters, where the protagonist is forced to question their perceptions, memories, or even their sanity. This can involve tactics like gaslighting or intellectual challenges.",
          roleInStory: "Explores psychological tension and character depth, creating a battle of wits.",
          example: "The villain plants false evidence to make the protagonist doubt their own innocence.",
        },
        chaseScenes: {
          description: "Thrillers often feature physical chases or confrontations, where the protagonist must outrun or outsmart their pursuer. These high-action sequences escalate the tension.",
          roleInStory: "Provides high-octane action moments that contrast with slower, more suspenseful scenes.",
          example: "A rooftop chase between the protagonist and a fleeing suspect.",
        },
        betrayal: {
          description: "Characters that the protagonist trusts may turn out to be enemies or have their own agendas, complicating the protagonist’s journey and raising the stakes.",
          roleInStory: "Creates emotional and narrative tension by undermining trust within the story.",
          example: "A trusted friend reveals they have been aiding the antagonist all along.",
        },
        redHerrings: {
          description: "False clues or misleading information that divert attention away from the real solution. They lead both the protagonist and the reader down wrong paths before the truth is revealed.",
          roleInStory: "Increases the mystery and suspense by introducing doubt and misdirection.",
          example: "A seemingly incriminating piece of evidence turns out to be unrelated to the crime.",
         
        }
      },
      storyExcerpts: `nature? The vast cities of America, the fertile plains of Hindostan, the
      crowded abodes of the Chinese, are menaced with utter ruin. Where late the
      busy multitudes assembled for pleasure or profit, now only the sound of
      wailing and misery is heard. The air is empoisoned, and each human being
      inhales death, even while in youth and health, their hopes are in the
      flower. We called to mind the plague of 1348, when it was calculated that a
      third of mankind had been destroyed. As yet western Europe was uninfected;
      would it always be so?
      O, yes, it would--Countrymen, fear not! In the still uncultivated wilds
      of America, what wonder that among its other giant destroyers, Plague
      should be numbered! It is of old a native of the East, sister of the
      tornado, the earthquake, and the simoon. Child of the sun, and nursling of
      the tropics, it would expire in these climes. It drinks the dark blood of
      the inhabitant of the south, but it never feasts on the pale-faced Celt. If
      perchance some stricken Asiatic come among us, plague dies with him,
      uncommunicated and innoxious. Let us weep for our brethren, though we can
      never experience their reverse. Let us lament over and assist the children
      of the garden of the earth. Late we envied their abodes, their spicy
      groves, fertile plains, and abundant loveliness. But in this mortal life
      extremes are always matched; the thorn grows with the rose, the poison tree
      and the cinnamon mingle their boughs. Persia, with its cloth of gold,
      marble halls, and infinite wealth, is now a tomb. The tent of the Arab is
      fallen in the sands, and his horse spurns the ground unbridled and
      unsaddled. The voice of lamentation fills the valley of Cashmere; its dells
      and woods, its cool fountains, and gardens of roses, are polluted by the
      308
      dead; in Circassia and Georgia the spirit of beauty weeps over the ruin of
      its favourite temple--the form of woman.
      Our own distresses, though they were occasioned by the fictitious
      reciprocity of commerce, encreased in due proportion. Bankers, merchants,
      and manufacturers, whose trade depended on exports and interchange of
      wealth, became bankrupt. Such things, when they happen singly, affect only
      the immediate parties; but the prosperity of the nation was now shaken by
      frequent and extensive losses. Families, bred in opulence and luxury, were
      reduced to beggary. The very state of peace in which we gloried was
      injurious; there were no means of employing the idle, or of sending any
      overplus of population out of the country. Even the source of colonies was
      dried up, for in New Holland, Van Diemen's Land, and the Cape of Good Hope,
      plague raged. O, for some medicinal vial to purge unwholesome nature, and
      bring back the earth to its accustomed health!
      Ryland was a man of strong intellects and quick and sound decision in the
      usual course of things, but he stood aghast at the multitude of evils that
      gathered round us. Must he tax the landed interest to assist our commercial
      population? To do this, he must gain the favour of the chief land-holders,
      the nobility of the country; and these were his vowed enemies--he must
      conciliate them by abandoning his favourite scheme of equalization; he must
      confirm them in their manorial rights; he must sell his cherished plans for
      the permanent good of his country, for temporary relief. He must aim no
      more at the dear object of his ambition; throwing his arms aside, he must
      for present ends give up the ultimate object of his endeavours. He came to `,

 dialogue: {
    dialogue1: `
      "Villain: You really think you can stop me?",
      "Protagonist: I have no choice. If I don’t, people will die. And I won’t let that happen.",
      "Villain: You’re already too late, aren’t you?"`
    ,
    dialogue2: 
      `"Protagonist: Why are you helping me?",
      "Informant: Because you’re the only one who can stop him. And because I owe you a favor from a long time ago."`
    ,
    dialogue3: 
      `"Partner: This doesn’t feel right. We’re walking into a trap.",
      "Hero: I know. But if we don’t do something, they’ll kill the hostages."`
    ,
    dialogue4: 
      `"Investigator: What did you see that night?",
      "Witness: I didn’t see much… just a shadow in the alley. But I heard something. A scream.",
      "Investigator: Can you describe the voice?"`
    ,
    dialogue5: 
      `"Protagonist: You’ve been working with them the whole time?",
      "Traitor: I didn’t have a choice. It’s either them or me, and I choose me."`
    ,
    dialogue6:
      `"Detective: I know you were there. The evidence all points to you.",
      "Suspect: You think just because you have a few fingerprints, you’ve got me? You don’t know anything about what happened."`
    ,
    dialogue7: 
      `"Friend: I’m scared for you. This could end badly.",
      "Protagonist: I can’t stop now. If I do, they’ll kill more people. And that’s on me."`
    ,
    dialogue8: 
      `"Victim: Please, don’t let him find me. He’ll kill me.",
      "Hero: You’re safe now. I’ll make sure of it.",
      "Victim: He’s everywhere… You can’t stop him."`
    
  },
   badDialogue: {
    dialogue1: 
      `"Protagonist: As you know, my father was murdered last year, and I’ve been investigating the case ever since. This is all connected to the criminal syndicate I’ve been tracking for months.",
      "Villain: Ah yes, your father. The one who was murdered by the criminal syndicate. I’m well aware of the details."`
    ,
    dialogue2: 
      `"Detective: I am afraid that the situation has turned out to be quite unfortunate. I will now go ahead and investigate further.",
      "Partner: I agree, detective. The circumstances are indeed quite problematic."`
    ,
    dialogue3: 
      `"Villain: I’m the bad guy. I want to destroy everything and take over the world.",
      "Hero: You’re insane. Why would you do that?",
      "Villain: Because I am the villain, and it’s my job."`
    ,
    dialogue4: 
      `"Hero: I’ll save the day, or die trying!",
      "Villain: You can try, but you’ll fail. I always win.",
      "Hero: Not this time."`
    ,
    dialogue5: 
      `"Villain: I have your loved one. If you want them back, you’ll have to make the ultimate choice.",
      "Hero: I don’t care about your games. I’ll destroy you even if it means sacrificing everything."`
    ,
    dialogue6: 
      `"Investigator: I have compiled all the relevant data regarding the case. I will now review it thoroughly to extract meaningful conclusions.",
      "Witness: I agree, but time is of the essence. We must act swiftly."`
    ,
    dialogue7: 
      `"Villain: I am doing this because... I don’t know... maybe I just feel like it.",
      "Hero: But you’ve been planning this for years, haven’t you?",
      "Villain: Well, sure, I guess.`,
    dialogue8: 
      `"Hero: Nooooooo! Not my partner! How could you do this?",
      "Villain: Because I want power. This is the only way."`
},
 badWriting: {
    writing1: 
      `"The rain poured down, cascading over the craggy cliffs, the wind howled, and in that moment, amidst the chaos of the storm, I realized—no, I understood—that everything I had been told was a lie."`
    ,
    writing2: 
      `"The dark, shadowy figure loomed ominously in the distance, its terrifyingly tall silhouette swaying in the cold, gusty wind as the eerie, foreboding atmosphere filled the night."`,
    writing3: 
      `"Detective: I’ve been a cop for over 20 years, and in all that time, I’ve never seen anything like this.",
      "Partner: You’re right. It’s like something straight out of a movie."`,
    writing4:
      `"John was terrified. His heart raced, and sweat dripped from his forehead as he hurried down the dark alley."`,
    writing5:
      `"The hero stood in the room, staring at the clues scattered around. He pondered the case for hours, considering each piece carefully. It was still not clear who was behind it, but he knew he had to solve it."`,
    writing6: 
      `"The clock ticked loudly. Tick, tick, tick. Each passing second felt like an eternity, as the seconds passed by, tick, tick, tick."`,
    writing7: 
      `"The villain was evil. He wanted to take over the world. He had no real reason for doing so, but that didn’t matter."`,
    writing8:
      `"As you know, I’ve been investigating this case for months. We’ve tracked the suspect to a hidden location in the city, but his background is still unclear. He’s got a record with ties to criminal organizations. He’s the son of a notorious mob boss, and his criminal activities have spanned decades."`
  },
  settings: 
  {
    setting1: "The Isolated Location",
    setting2: "The Urban Jungle",
    setting3: "The Confined Space",
    setting4: "The Unfamiliar Environment",
    setting5: "High Security Zones",
    setting6: "International Locations",
    setting7: "Virtual Worlds",
    setting8: "Aerial Settings"
  }

  
  },


   detective: {
    characterArc: {
    amateurSleuth: {
      description: `This is somewhat a general term for any mystery solver who has no connection with law enforcement. Nor do they get paid in assisting in an investigation. These types of fictional detectives can be adventure seekers, inquisitive reporters or simply nosy neighbors. Regardless of their reason for investigating, Amateur Sleuths are guided by their curiosity and desire for knowledge and justice. Because they may lack the skills a “proper detective”, their investigations tend to be a learning experience for them.`
    },
    
    hardboiledDetective: {
      description: `A staple in noir fiction, the hardboiled detective is one of the more notable archetypes. All a hardboiled detective needs is a trench coat, a gun and their alcoholic beverage of choice. With their tough exteriors, they have a cynical outlook on the world. Their morals are grey, there is no right or wrong. Protagonists are often depicted as Anti Heroes, or characters who act in self-interest and don’t have typical heroic qualities. An untraditional knight in shining armor, if you will. Perhaps that’s why they sometimes get tangled up with Femme Fatales. Famous fiction detectives such as Philip Marlowe and Sam Spade are noted as quintessential hardboiled detectives.`
    },
    
    privateInvestigator: {
      description: `Next up, the private investigator, another notable type of fictional detective. Usually self employed or cooperating alongside law enforcement, they follow their own rules and their own means of investigating and deduction. In some cases, private investigators have had previous experience working for law enforcement, and may still have connections. Most of the time, they are hired by clients who are in desperate need of their sleuthing skills. Genius great detective types, like Consulting Detective Sherlock Holmes would fit this archetype.`
    },
    
    littleOldLady: {
      description: `For a more cozy mystery, call on grandma to save the day. From years of wisdom and experience, they seem to have a knack for this mystery solving thing. Using their unassuming appearance to their advantage, they attract little attention and can work around the cops. Instead of having intense interrogations, suspects sometimes confide details on the case willingly. Constantly underestimated, who would think a sweet little old lady could crack the case? The iconic Miss Marple, created by Agatha Christie, is the perfect example of this type of fictional detective.`
    },
    
    kidDetective: {
      description: `Often designed for a younger audience in an adventure-centric plot, a kid detective is another type of detective found in mystery fiction. Though they may not need to be an actual child, this archetype includes sleuths who are minors. These young snoops must sneak past the suspicious adults without getting in trouble with their parents. They rely on trickery and sneaking around to obtain evidence. Being juveniles, they face difficulty asking questions of adults and convincing police that a crime was committed. The cases they take on never involve violence or truly dangerous situations, their antagonists are harmless. Some would argue that Mystery Inc. from the Scooby Doo Franchise would fall under this category.`
    },
    
    femmeFatale: {
      description: `The femme fatale is central to many film noir narratives, especially in the key entries of the subgenre from the late 1940s through the late 1950s. The traditional femme fatale used her charm and mystery to manipulate others. She was smart, alluring, and dangerous, often hiding her true intentions. She usually started as a mysterious and seductive figure, eventually revealed to be manipulating events for her benefit—and her character arc often ended tragically, symbolizing the fatal consequences of unchecked ambition and deception. Due to the welcome shift in how women are portrayed in contemporary cinema, the femme fatale has fallen off the cinematic map a bit, although versions of them still appear in contemporary neo-noir films.`
    },
    
    corruptOfficial: {
      description: `This archetype represents the perversion of authority—police officers, politicians, or businessmen corrupted by power and greed. They often act as antagonists or formidable obstacles to the protagonist, typically experiencing a rise in power and influence, followed by a dramatic fall. This arc underscores the theme of corruption inherent in film noir, highlighting the destructive nature of greed.`
    },
    
    innocentBystander: {
      description: `Often caught in the wrong place at the wrong time, the innocent bystander provides a contrast to the moral ambiguity of other characters. They are the every-man or every-woman who suffers because of the machinations of others. Their character arc usually involves a transformation from naiveté to a more hardened, realistic view of the world, usually because of the betrayal or violence they witness or endure.`
    },
}, plotArc: {
    mysteriousCrime: {
      description: `A crime, often a murder or a series of crimes, is committed that sets the stage for the investigation.`,
      example: `A high-profile murder that baffles the authorities and is deemed impossible to solve.`
    },
    
    detectiveProtagonist: {
      description: `A skilled investigator or private detective, often with a unique approach to solving crimes, is tasked with unraveling the mystery.`,
      example: `A retired detective, living a quiet life, is pulled back into action to solve a cold case.`
    },
    
    redHerring: {
      description: `Misleading clues or false leads that divert the detective and the reader from the true solution.`,
      example: `A suspect with a strong motive, who seems guilty but is ultimately proven innocent.`
    },
    
    complexSuspects: {
      description: `Multiple potential suspects, each with their own secrets and motives, are introduced as the investigation unfolds.`,
      example: `A group of witnesses, each with different versions of the events leading up to the crime.`
    },
    
    sleuthPersonalStruggles: {
      description: `The detective often faces personal dilemmas, emotional challenges, or moral ambiguities that complicate the case.`,
      example: `A detective with a troubled past who is forced to confront old demons while solving the case.`
    },
    
    clueTrail: {
      description: `A series of clues, both physical and circumstantial, that lead the detective closer to solving the crime.`,
      example: `A collection of strange symbols found near the crime scene, leading to a hidden message.`
    },
    
    villainsMotive: {
      description: `The revelation of the true motive behind the crime, often tied to greed, revenge, or a personal vendetta.`,
      example: `A victim was murdered because of a long-standing grudge dating back to childhood.`
    }
  },
  storyExcerpts: `calling for his robe-de-chambre —pour mieux entendre la musique. The results
attained by them are not unfrequently surprising, but, for the most part, are
brought about by simple diligence and activity. When these qualities are
unavailing, their schemes fail. Vidocq, for example, was a good guesser, and a
persevering man. But, without educated thought, he erred continually by the
very intensity of his investigations. He impaired his vision by holding the object
too close. He might see, perhaps, one or two points with unusual clearness, but
in so doing he, necessarily, lost sight of the matter as a whole. Thus there is such
a thing as being too profound. Truth is not always in a well. In fact, as regards
the more important knowledge, I do believe that she is invariably superficial.
The depth lies in the valleys where we seek her, and not upon the mountain-tops
where she is found. The modes and sources of this kind of error are well typified
in the contemplation of the heavenly bodies. To look at a star by glances —to
view it in a side-long way, by turning toward it the exterior portions of the
retina (more susceptible of feeble impressions of light than the interior), is to
behold the star distinctly —is to have the best appreciation of its lustre —a lustre
which grows dim just in proportion as we turn our vision fully upon it. A
greater number of rays actually fall upon the eye in the latter case, but, in the
former, there is the more refined capacity for comprehension. By undue
profundity we perplex and enfeeble thought; and it is possible to make even
Venus herself vanish from the firmament by a scrutiny too sustained, too
concentrated, or too direct.
“As for these murders, let us enter into some examinations for ourselves, before
we make up an opinion respecting them. An inquiry will afford us amusement,”
(I thought this an odd term, so applied, but said nothing) “and, besides, Le Bon
once rendered me a service for which I am not ungrateful. We will go and see
the premises with our own eyes. I know G__, the Prefect of Police, and shall
have no difficulty in obtaining the necessary permission.” The permission was
obtained, and we proceeded at once to the Rue Morgue.
This is one of those miserable thoroughfares which intervene between the Rue
Richelieu and the Rue St. Roch. It was late in the afternoon when we reached it;
as this quarter is at a great distance from that in which we resided. The house
was readily found; for there were still many persons gazing up at the closed
shutters, with an objectless curiosity, from the opposite side of the way. It was an
ordinary Parisian house, with a gateway, on one side of which was a glazed
watch-box, with a sliding panel in the window, indicating a loge de concierge.
Before going in we walked up the street, turned down an alley, and then, again
turning, passed in the rear of the building —Dupin, meanwhile, examining the
whole neighborhood, as well as the house, with a minuteness of attention for
which I could see no possible object.
Retracing our steps, we came again to the front of the dwelling, rang, and,
having shown our credentials, were admitted by the agents in charge. We went
up stairs —into the chamber where the body of Mademoiselle L’Espanaye had
been found, and where both the deceased still lay. The disorders of the room
had, as usual, been suffered to exist. I saw nothing beyond what had been stated
in the “Gazette des Tribunaux.” Dupin scrutinized every thing —not excepting
the bodies of the victims. We then went into the other rooms, and into the yard; a
gendarme accompanying us throughout. The examination occupied us until
dark, when we took our departure. On our way home my companion stopped in
for a moment at the office of one of the dally papers.
I have said that the whims of my friend were manifold, and that Je les
menageais: —for this phrase there is no English equivalent. It was his humor,
now, to decline all conversation on the subject of the murder, until about noon
the next day. He then asked me, suddenly, if I had observed any thing peculiar
at the scene of the atrocity.
There was something in his manner of emphasizing the word “peculiar,” which
caused me to shudder, without knowing why.
“No, nothing peculiar,” I said; “nothing more, at least, than we both saw stated
in the paper.” “The ‘Gazette,’” he replied, “has not entered, I fear, into the
unusual horror of the thing. But dismiss the idle opinions of this print. It appears
to me that this mystery is considered insoluble, for the very reason which should
cause it to be regarded as easy of solution —I mean for the outre character of its
features. The police are confounded by the seeming absence of motive —not for
the murder itself —but for the atrocity of the murder. They are puzzled, too, by
the seeming impossibility of reconciling the voices heard in contention, with the
facts that no one was discovered up stairs but the assassinated Mademoiselle
L’Espanaye, and that there were no means of egress without the notice of the
party ascending. The wild disorder of the room; the corpse thrust, with the head
downward, up the chimney; the frightful mutilation of the body of the old lady;
these considerations with those just mentioned, and others which I need not
mention, have sufficed to paralyze the powers, by putting completely at fault the
boasted acumen, of the government agents. They have fallen into the gross but
common error of confounding the unusual with the abstruse. But it is by these
deviations from the plane of the ordinary, that reason feels its way, if at all, in its
search for the true.
In investigations such as we are now pursuing, it should not be so much asked
‘what has occurred,’ as ‘what has occurred that has never occurred before.’ In
fact, the facility with which I shall arrive, or have arrived, at the solution of this
mystery, is in the direct ratio of its apparent insolubility in the eyes of the
police.” I stared at the speaker in mute astonishment.
“I am now awaiting,” continued he, looking toward the door of our apartment
—“I am now awaiting a person who, although perhaps not the perpetrator of
these butcheries, must have been in some measure implicated in their
perpetration. Of the worst portion of the crimes committed, it is probable that he
is innocent. I hope that I am right in this supposition; for upon it I build my`,
 dialogue: {
    introductionOfTheCase: 
      `"Detective: What exactly happened at the scene?",
      "Officer: We found the body in the alley, but there’s no sign of struggle. No witnesses, and no obvious motive."`,
    
    interrogation: 
      `"Detective: Where were you on the night of the murder?",
      "Suspect: I was at home. Alone.",
      "Detective: Can anyone verify that?",
      "Suspect: I’m not sure. It was late."`,
    
    redHerring: 
      `"Detective: You were seen leaving the scene just hours before the murder. Care to explain?",
      "Witness: I didn’t do anything wrong. I was just passing by.",
      "Detective: Passing by at 2 a.m.? That’s quite a coincidence."`,
    
    momentOfDoubt: 
      `"Detective: The evidence points to him, but something doesn’t add up.",
      "Partner: Are you saying we have the wrong man?",
      "Detective: I’m not sure, but there’s something off about the whole story."`,
    
    victimsSecrets: 
      `"Detective: What was she like, before all this?",
      "Friend: She was a private person. Hard to get to know. But she did mention a guy recently...",
      "Detective: A guy?",
      "Friend: I don’t know his name, but she was nervous around him."`,
    
    finalClue: 
      `"Detective: Wait a minute. This receipt from the café... it’s from the day before the murder.",
      "Partner: So? What does that tell us?",
      "Detective: It tells us our victim knew the killer before the night of the murder."`,
    
    unlikelyAlibi: 
      `"Detective: You say you were at the hospital during the murder, but no one remembers you there.",
      "Suspect: I was in and out. I didn’t speak to anyone.",
      "Detective: And you think that’s going to convince me? Think again."`,
    
    denial: 
      `"Detective: You knew the victim, didn’t you?",
      "Witness: I barely knew him. We worked together a few times, that’s it.",
      "Detective: A few times. And yet you’re the first to bring him up when we talk about the case. Why?"`
  },
  badDialogue: {
    overlyExpository: 
      `"Detective: The victim was killed with a knife, and the killer must have known how to use it. I’m just putting that together now.",
      "Partner: Yeah, that’s obvious. You don’t need to say it out loud."`,
    
    flatDialogue: 
      `"Detective: You killed him, didn’t you?",
      "Suspect: Yeah.",
      "Detective: Why?",
      "Suspect: Because I had to."`,
    
    unrealisticResponse: 
      `"Detective: I think you’re hiding something. Why don’t you just confess?",
      "Suspect: Okay, fine, I killed him. What now?"`,
    
    lackOfSuspense: 
      `"Detective: You’re lying about your alibi. I’m going to catch you, and when I do, you’ll regret it.",
      "Suspect: Well, go ahead. I’ll be here."`,
    
    inconsistentCharacterVoice: 
      `"Detective: I’m done here.",
      "Partner: I agree, let’s go to the pub.",
      "Detective: You know, I’ve got this feeling. I think the killer is right under our noses.",
      "Partner: Yeah, probably."`,
    
    overlyDramatic: 
      `"Detective: I knew it. All along, I knew you were the killer!",
      "Suspect: No, you didn’t!",
      "Detective: Yes, I did!",
      "Suspect: Okay, you caught me. I did it."`,
    
    overlyInformative: 
      `"Detective: The murder weapon was a gun, and the victim died from a single shot to the chest. I think that’s what we’re dealing with here.",
      "Partner: Yeah, I figured that out too."`,
    
    lackOfTension: 
      `"Detective: Do you have an alibi?",
      "Suspect: No, I don’t.",
      "Detective: Okay, then."`
  },
  badWriting: {
    overlyExpository: 
      `"The detective had been working in the field for twenty years. He knew how to crack a case, no matter how difficult it was. He had an extensive background in criminal psychology, forensic science, and investigative techniques. He was the best."`,
    
    unrealisticDialogue: 
     ` "Detective: I'm going to solve this case, even if it means breaking a few rules.",
      "Suspect: I didn’t do it!",
      "Detective: Oh, I know you didn’t. But you’ll help me figure out who did, won’t you?"`,
    
    overlyDetailedDescription:
      `"The murder weapon was found behind the shed, hidden by the victim's estranged wife, who had been secretly having an affair with the victim's best friend. This all came to light when the detective visited the scene and talked to the gardener, who overheard their argument two days before the murder."`,
    
    clichéAtmosphere: 
      `"The storm raged outside, the wind howling like a wolf. Inside, the detective sat at his desk, staring at the case file. He had seen it all before—murder, betrayal, deceit—but this case felt different."`,
    
    overusedCharacterLines: 
      `"Detective: I’ve seen a lot of cases, but this one’s different.",
      "Partner: Yeah, that’s what you always say.",
      "Detective: Well, it is. This one’s personal.",
      "Partner: Alright, let’s get to work."`,
    
    irrelevantDetails: 
      `"The detective entered the room. The scent of coffee hung in the air. He was tired. His coffee was cold. He stared at the body. There was something about it that didn’t sit right. Suddenly, he was hit with a wave of nostalgia for his childhood dog, which had passed away years ago."`,
    
    implausibleExpertise: 
      `"The detective immediately knew the victim’s age, occupation, and the exact amount of money in their bank account just by looking at the body."`,
    
    overlyObviousVillain: 
      `"The killer was cunning. He knew how to cover his tracks. He had been planning this for a long time. He was patient. The killer had no intention of getting caught."`
  },
  settings: 
  {
    setting1: "Police stations",
    setting2: "Living room/family home",
    setting3: "Urban Cities",
    setting4: "Mansions",
    setting5: "Streets",
    setting6: "1800s",
    setting7: "Crime Scenes",
    setting8: "Seedy Underworld Locations"
  }
},
action : {
    CharacterArcs: {
    reluctantHero: {
      description: "A character who is hesitant or unwilling to become involved in the action but eventually rises to the challenge.",
      example: "Frodo Baggins in The Lord of the Rings"
    },
    
    loneWolf: {
      description: "A solitary, independent character who prefers to work alone and often operates outside the law or social norms.",
      example: "John Wick"
    },
    
    mentor: {
      description: "An experienced, wise figure who teaches the protagonist the skills and wisdom needed to succeed in their mission.",
      example: "Mr. Miyagi in The Karate Kid"
    },
    
    sidekick: {
      description: "A loyal companion to the main hero, providing assistance, comic relief, or moral support during the action.",
      example: "Robin in Batman"
    },
    
    antihero: {
      description: "A protagonist who lacks conventional heroic qualities but is still driven to do the right thing, often through questionable methods.",
      example: "Deadpool"
    },
    
    villain: {
      description: "The primary antagonist who stands in direct opposition to the hero, often seeking power, revenge, or destruction.",
      example: "Darth Vader in Star Wars"
    },
    
    femmeFatale: {
      description: "A seductive and mysterious woman who uses her charm and cunning to manipulate others, often leading heroes into danger.",
      example: "Catwoman in Batman"
    },
  
    techGenius: {
      description: "A brilliant character who uses their technological expertise to outsmart enemies or provide strategic advantages.",
      example: "Q in James Bond"
    }
  },
  plotArcs: {
    heroesCallToAction: {
      description: "The protagonist is drawn into a dangerous or high-stakes situation, often reluctantly, which sets the story in motion.",
      example: "In Indiana Jones and the Last Crusade, Indy is thrust into a quest for the Holy Grail after his father goes missing."
    },
  
    bigChase: {
      description: "A fast-paced pursuit, whether it’s a foot chase, car chase, or even through the air, creating tension and excitement.",
      example: "The car chase in Mad Max: Fury Road."
    },
  
    finalShowdown: {
      description: "The protagonist faces off against the villain or their forces in a climactic battle to determine the outcome of the story.",
      example: "The final battle between the Avengers and Thanos in Avengers: Endgame."
    },
  
    betrayal: {
      description: "A trusted ally or companion betrays the hero, often adding a personal emotional element to the conflict.",
      example: "In Mission: Impossible III, the protagonist is betrayed by a fellow agent, complicating the mission."
    },
  
    countdown: {
      description: "A ticking clock element where the hero must complete a task or stop a disaster before time runs out.",
      example: "In Speed, the bomb on the bus will explode if the speed drops below 50 mph."
    },
  
    twist: {
      description: "An unexpected revelation or turn of events that changes the direction of the story or the protagonist’s understanding of the situation.",
      example: "In The Dark Knight, the Joker reveals his chaotic plan, throwing the entire city into turmoil."
    },
  
    rescue: {
      description: "The hero must save someone, often a loved one or a key figure, from a dangerous situation or enemy.",
      example: "In Taken, Bryan Mills goes on a mission to rescue his daughter from kidnappers."
    },
  
    finalSacrifice: {
      description: "A key character, often the protagonist, sacrifices something important, whether their life, freedom, or happiness, for the greater good.",
      example: "In The Dark Knight Rises, Bruce Wayne sacrifices his chance at a normal life to save Gotham."
    }
  },
  storyExcerpts: `it was a son who would some day avenge his father. (There was a
  time in my imprisonment, when my desire for vengeance was unbearable.) Whether it was a son who would never know his father’s story;
  who might even live to weigh the possibility of his father’s having disappeared of his own will and act. Whether it was a daughter who would
  grow to be a woman.”
  She drew closer to him, and kissed his cheek and his hand.
  “I have pictured my daughter, to myself, as perfectly forgetful of
  me—rather, altogether ignorant of me, and unconscious of me. I have
  cast up the years of her age, year after year. I have seen her married to
  a man who knew nothing of my fate. I have altogether perished from
  the remembrance of the living, and in the next generation my place was
  a blank.”
  “My father! Even to hear that you had such thoughts of a daughter
  who never existed, strikes to my heart as if I had been that child.”
  “You, Lucie? It is out of the Consolation and restoration you have
  brought to me, that these remembrances arise, and pass between us and
  the moon on this last night.—What did I say just now?”
  “She knew nothing of you. She cared nothing for you.”
  “So! But on other moonlight nights, when the sadness and the silence have touched me in a different way—have affected me with something as like a sorrowful sense of peace, as any emotion that had pain
  for its foundations could—I have imagined her as coming to me in my
  cell, and leading me out into the freedom beyond the fortress. I have
  seen her image in the moonlight often, as I now see you; except that I
  never held her in my arms; it stood between the little grated window
  and the door. But, you understand that that was not the child I am
  speaking of?”
  “The figure was not; the—the—image; the fancy?”
  “No. That was another thing. It stood before my disturbed sense
  of sight, but it never moved. The phantom that my mind pursued, was
  another and more real child. Of her outward appearance I know no
  more than that she was like her mother. The other had that likeness
  too—as you have—but was not the same. Can you follow me, Lucie?
  Hardly, I think? I doubt you must have been a solitary prisoner to
  understand these perplexed distinctions.”
  His collected and calm manner could not prevent her blood from
  running cold, as he thus tried to anatomise his old condition.
  “In that more peaceful state, I have imagined her, in the moonlight,
  165
  A T A L E O F T W O C I T I E S
  coming to me and taking me out to show me that the home of her
  married life was full of her loving remembrance of her lost father. My
  picture was in her room, and I was in her prayers. Her life was active,
  cheerful, useful; but my poor history pervaded it all.”
  “I was that child, my father, I was not half so good, but in my love
  that was I.”
  “And she showed me her children,” said the Doctor of Beauvais,
  “and they had heard of me, and had been taught to pity me. When they
  passed a prison of the State, they kept far from its frowning walls, and
  looked up at its bars, and spoke in whispers. She could never deliver
  me; I imagined that she always brought me back after showing me such
  things. But then, blessed with the relief of tears, I fell upon my knees,
  and blessed her.”
  “I am that child, I hope, my father. O my dear, my dear, will you
  bless me as fervently to-morrow?”
  “Lucie, I recall these old troubles in the reason that I have to-night
  for loving you better than words can tell, and thanking God for my
  great happiness. My thoughts, when they were wildest, never rose near
  the happiness that I have known with you, and that we have before us.”
  He embraced her, solemnly commended her to Heaven, and humbly
  thanked Heaven for having bestowed her on him. By-and-bye, they
  went into the house.
  There was no one bidden to the marriage but Mr. Lorry; there was
  even to be no bridesmaid but the gaunt Miss Pross. The marriage was
  to make no change in their place of residence; they had been able to
  extend it, by taking to themselves the upper rooms formerly belonging
  to the apocryphal invisible lodger, and they desired nothing more.
  Doctor Manette was very cheerful at the little supper. They were
  only three at table, and Miss Pross made the third. He regretted that
  Charles was not there; was more than half disposed to object to the
  loving little plot that kept him away; and drank to him affectionately.
  So, the time came for him to bid Lucie good night, and they separated. But, in the stillness of the third hour of the morning, Lucie came
  downstairs again, and stole into his room; not free from unshaped fears,
  beforehand.
  All things, however, were in their places; all was quiet; and he lay
  asleep, his white hair picturesque on the untroubled pillow, and his
  hands lying quiet on the coverlet. She put her needless candle in the
  shadow at a distance, crept up to his bed, and put her lips to his; then,`,
  dialogue: {
    reluctantHero: `
      Hero: "I don’t want to do this. It’s too dangerous."
      Mentor: "Sometimes, you don’t get a choice. The world’s at risk, and you’re the only one who can stop it."
      Hero: "Then I guess I’ll have to make the choice."
    `,
  
    villainsConfession: `
      Villain: "You don’t understand. This was never about money. This was about control."
      Hero: "Control? You’ve destroyed lives for your own gain."
      Villain: "And you think you’re any different?"
    `,
  
    lastMinutePlan: `
      Hero: "We don’t have much time. We need to disable the security system."
      Sidekick: "Got it. But how? The system’s locked tight."
      Hero: "I have a friend who owes me a favor. Time to call in that favor."
    `,
  
    escape: `
      Hero: "They’ll be here any minute. Do you have the map?"
      Sidekick: "It’s in my pocket. But do you have the key to get past the door?"
      Hero: "It’s in the back of the truck. I’ll grab it."
    `,
  
    betrayal: `
      Hero: "I trusted you."
      Betrayer: "You should never trust anyone, especially not in this line of work."
      Hero: "You’re making a mistake."
      Betrayer: "The only mistake was trusting you."
    `,
  
    countdown: `
      Hero: "Five minutes to go, and we’re nowhere near the exit."
      Sidekick: "We don’t have a choice. We’ll have to take the back entrance."
      Hero: "If we don’t make it out in time, the whole building goes up."
    `,
  
    finalShowdown: `
      Hero: "This ends tonight."
      Villain: "You’ve always known it would. I’ll be waiting for you."
      Hero: "Not for long."
    `,
  
    confrontation: `
      Hero: "Why did you do it?"
      Villain: "Because it was necessary. Sacrifices have to be made."
      Hero: "You’re not a hero. You’re just a coward."
    `
  },
  badDialogue: {
    overlyExpository: `
      Hero: "We need to stop the villain because he plans to destroy the city with a nuclear bomb, and the bomb will explode in 24 hours."
      Sidekick: "I see. We need to disarm it before it's too late."
    `,
  
    flatAndUnemotional: `
      Hero: "That was close."
      Sidekick: "Yeah. Too close."
      Hero: "Let’s get moving."
      Sidekick: "Agreed."
    `,
  
    tooOnTheNose: `
      Villain: "I will destroy everything you love, hero. Your friends, your family, everything!"
      Hero: "I won’t let you do that!"
      Villain: "Then come and stop me!"
      Hero: "I will!"
    `,
  
    unnaturalAndForced: `
      Hero: "We’re in danger now, but I think we should stick together and defeat the villain."
      Sidekick: "I agree. It’s our only chance. Together, we can win."
      Hero: "We must be careful, though. The villain is very strong."
      Sidekick: "I’ll be there for you no matter what."
    `,
  
    lackOfTension: `
      Hero: "The bomb’s ticking. We need to stop it."
      Sidekick: "Okay, I’ll do it."
      Hero: "Are you sure you can?"
      Sidekick: "Yes."
    `,
  
    overuseOfCliches: `
      Hero: "This is it. The final showdown. Let’s end this once and for all."
      Villain: "You won’t win. I always get what I want!"
      Hero: "Not today."
      Villain: "We’ll see about that."
    `,
  
    lackOfPersonality: `
      Hero: "We need to stop him."
      Sidekick: "Yeah."
      Hero: "Do you have a plan?"
      Sidekick: "No."
    `,
  
    unnecessaryRepetition: `
      Hero: "We need to escape, now!"
      Sidekick: "Yes, escape! We need to get out!"
      Hero: "We’ll never make it if we don’t hurry!"
      Sidekick: "I know, I know. Escape!"
    `,
  
    inconsistentTone: `
      Hero: "We’re in deep trouble."
      Sidekick: "Yeah, well, at least the weather’s nice today!"
      Hero: "Are you serious? We’re about to die!"
      Sidekick: "I’m just trying to lighten the mood."
    `
  },
  badWriting: {
    overuseOfExposition: `
      Narration: "The villain was evil, and he had a terrible plan to destroy the world. He was bad, and he had been bad for a long time."
    `,
  
    oneDimensionalVillain: `
      Villain: "I’m going to destroy everything, because I’m evil and that’s what I do."
    `,
  
    lackOfCharacterDevelopment: `
      Hero: "I’m ready to face the villain, but first I must defeat my inner demons."
      Sidekick: "Yeah, I think you’re right."
    `,
  
    clicheDialogue: `
      Hero: "This isn’t over until I say it’s over!"
      Villain: "We’ll see about that!"
    `,
  
    unrealisticAction: `
      Narration: "With a single punch, the hero knocked out five men, sending them flying across the room like ragdolls."
    `,
  
    contrivedPlot: `
      Hero: "I just happened to have the secret weapon that will stop the bomb, but I need to get to it before time runs out!"
    `,
  
    awkwardPacing: `
      Narration: "The hero ran down the alley, then stopped. He looked around. Nothing. Then he ran again, but slowly this time, because he knew danger was lurking, but couldn’t see it yet."
    `,
  
    overuseOfActionCliches: `
      Narration: "He flipped over the car, shooting two enemies while landing on his feet, without breaking a sweat."
    `
  },
  settings: 
  {
    setting1: "Barren Desert",
    setting2: "Bustling Metropolis",
    setting3: "Jungle Terrain",
    setting4: "Post-Apocalyptic",
    setting5: "High-Tech Facilities",
    setting6: "Criminal Underworld",
    setting7: "Urban Landscapes",
    setting8: "Military Base"
  }
},
    fantasy: {
    characterArc: {
      TheHeroine: `
        Everyone knows this archetype from fantasy and beyond. The hero is the stand-up one, the fighter for justice and all things good. This archetype is honorable, persistent, courageous, and stands up for the weak. They can also be prone to arrogance.
        Example: Aragorn (The Lord of the Rings)
      `,
      TheMagician: `
        The magician is all about power, baby. They need it. They’re obsessed with it. Being the best is all they want, and nothing will get in their way. This character is perceptive, disciplined, and selfish.
        Example: Doctor Strange (Marvel)
      `,
      TheJester: `
        Did someone call for comedic relief? The jester is the funny guy. They also tend to be pretty insightful, using their humour to spotlight everything from corruption to the protagonist’s flaws. The jester is mischievous, impulsive, and—let’s be honest—a little obnoxious at times.
        Examples: Merry and Pip (The Lord of the Rings)
      `,
      TheCommonPerson: `
        Your salt of the earth, blue-collar person, this archetype is all about relatability. The Common Person is kind, hard-working, virtuous, and seemingly unremarkable. They’re also unprepared for the extraordinary challenges that are about to come their way but tend to rise to meet them.
        Example: Bilbo Baggins (The Hobbit)
      `,
      TheCreator: `
        The creator is obsessed with their ultimate creation. Nothing else is as important as bringing their vision to fruition—not relationships, not world peace, and definitely not family dinners.
        Example: Victor Frankenstein (Frankenstein)
      `,
      TheRuler: `
        The one in charge. The king, queen, emperor, chieftain, high priestess, whatever you call them. The ruler has control over everything in their domain, and they'd really like to keep it that way, thank you very much. Whether they’re benevolent or greed-driven is up to you.
        Example: President Snow (The Hunger Games)
      `,
      TheSage: `
        The sage is powerful, like a magician, but they don't want more for themselves. Instead, they're all about teaching others. Knowledgeable and patient, the sage is deeply committed to passing their wisdom onto their pupil. They’re genuinely caring and rational, though they can also be arrogant and aggravatingly passive.
        Example: Uncle Iroh (Avatar: The Last Airbender)
      `,
      TheCaregiver: `
        This is that character who's constantly thinking about everybody else. If they have their own dreams, no one knows about them. The Caregiver is compassionate, selfless, and reliable. They’re often a guardian, older sibling, teacher, or partner.
        Example: Hagrid (Harry Potter)
      `
    },
    plotArc: {
        TheHeroesJourney: `
          A young, unlikely hero is thrust into an adventure, faces trials, and emerges transformed.
          Example: Frodo in The Lord of the Rings.
        `,
        TheChosenOne: `
          A prophecy or destiny marks a character as the one who will save the world.
          Example: Harry Potter in Harry Potter and the Sorcerer’s Stone.
        `,
        TheQuest: `
          A group embarks on a journey to retrieve a powerful artifact or achieve a significant goal.
          Example: The search for the Holy Grail in Arthurian legends.
        `,
        TheDarkOverlord: `
          A dark and oppressive ruler or force threatens the land, and a group rises to overthrow them.
          Example: Sauron in The Lord of the Rings.
        `,
        TheHiddenWorld: `
          A character stumbles upon a hidden realm filled with magic, mystery, and danger.
          Example: Lyra discovering parallel worlds in His Dark Materials.
        `,
        TheLostHeir: `
          A hidden royal or noble must reclaim their rightful place to bring balance to the realm.
          Example: Jon Snow in Game of Thrones.
        `,
        TheComingOfAgeTale: `
          A young protagonist discovers their powers, identity, or purpose while navigating a fantastical world.
          Example: Ged in A Wizard of Earthsea.
        `,
        GoodVsEvil: `
          The battle between a pure good force and a corrupt evil entity, often with epic stakes.
          Example: Aslan vs. the White Witch in The Chronicles of Narnia.
        `
    }, 
    storyExcerpts: `Chapter 3
The great forest
But now the poor child was all alone in the great forest, and so terrified that she looked at all
the leaves on the trees, and did not know what to do. Then she began to run, and ran over
sharp stones and through thorns, and the wild beasts ran past her, but did her no harm.
She ran as long as her feet would go until it was almost evening, then she saw a little cottage
and went into it to rest herself. Everything in the cottage was small, but neater and cleaner
than can be told. There was a table on which was a white cover, and seven little plates,
and on each plate a little spoon, moreover, there were seven little knives and forks, and seven
little mugs. Against the wall stood seven little beds side by side, and covered with snow-white
counterpanes.
V
Chapter 4
The seven dwarfs
4.1 The cottage
Little snow-white was so hungry and thirsty that she ate some vegetables and bread from
each plate and drank a drop of wine out of each mug, for she did not wish to take all from one
only. Then, as she was so tired, she laid herself down on one of the little beds, but none of
them suited her, one was too long, another too short, but at last she found that the seventh
one was right, and so she remained in it, said a prayer and went to sleep.
4.2 The dwarfs
When it was quite dark the owners of the cottage came back. They were seven dwarfs1 who
dug and delved in the mountains for ore. They lit their seven candles, and as it was now light
within the cottage they saw that someone had been there, for everything was not in the same
order in which they had left it.
1. The first said, "who has been sitting on my chair."
2. The second, "who has been eating off my plate."
3. The third, "who has been taking some of my bread."
4. The fourth, "who has been eating my vegetables."
5. The fifth, "who has been using my fork."
6. The sixth, "who has been cutting with my knife."
7. The seventh, "who has been drinking out of my mug."
Then the first looked round and saw that there was a little hollow on his bed, and he said,
who has been getting into my bed. The others came up and each called out, somebody has`,

dialogue: {
    MentorAndProtagonist: `
      Mentor: "Do you know why the sword chooses you?"
      Protagonist: "Because I'm destined?"
      Mentor: "No. Because it knows you will suffer, and still you will not let go."
    `,
    VillainAndHero1: `
      Villain: "You think you're different from me? That crown on your head is just a prettier cage."
      Hero: "Maybe, but I'm the one holding the key."
    `,
    VillainAndHero2: `
      Villain: "Do you think I wanted this? To be the monster? They made me what I am."
      Hero: "You had a choice. You always had a choice."
    `,
    RogueAndMage: `
      Rogue: "Why are we even listening to him? He's been lying to us from the start."
      Mage: "Because he knows what's inside that vault, and we don't."
      Rogue: "And how do we know he won't lock us in once we're inside?"
    `,
    ProtagonistAndDragon: `
      Protagonist: "Can you speak?"
      Dragon: "Can you listen?"
    `,
    ProtagonistAndAlly: `
      Protagonist: "Why did you bring me here? I'm not a hero."
      Ally: "No one is born a hero. They become one when the moment demands it."
    `,
    LoverAndWarrior: `
      Lover: "Promise me you'll come back."
      Warrior: "I can't promise that. But I can promise I'll fight to see you again."
    `,
    VillainAndHero3: `
      Villain: "Even if you kill me, my darkness will live on in you."
      Hero: "Good thing I've learned to live with my shadows."
    `
  },
  badDialogue: {
  dialogue1: `
    "We must stop the Dark Lord, but I don't know how."
    "Me neither."
  `,
  dialogue2: `
    "I can't believe you betrayed me."
    "Yeah, I did. Sorry, I guess."
  `,
  dialogue3: `
    "The prophecy said you would save us."
    "I don't want to be a hero."
    "Too bad."
  `,
  dialogue4: `
    "What is this place?"
    "It's the ancient city of doom, obviously."
  `,
  dialogue5: `
    "This is the sword of power."
    "What does it do?"
    "It's a sword. It does sword stuff."
  `,
  dialogue6: `
    "I'm not scared of anything."
    "You should be. I know things that would scare you."
    "I don't care."
  `,
  dialogue7: `
    "I'm not going into that cave."
    "We have no choice. We must go in."
  `,
  dialogue8: `
    "I'll fight the dragon alone!"
    "No, I will fight the dragon alone!"
  `
},
badWriting: {
    writing1: `"The prophecy foretold of a chosen one who would rise from humble beginnings to save the world."`,
  writing2: `"The castle was big and looked really old."`,
  writing4: `"With a single wave of her hand, the entire army fell before her unmatched magical strength."`,
  writing5: `"I will destroy the world because I’m evil and that’s what I do!"`,
  writing6: `"The sword glowed bright, and then everything was fine again."`,
  writing7: `"He had golden eyes, jet-black hair, and the kind of face that made women fall in love instantly."`,
  writing8: `"As he walked through the magical forest, he felt a strange sense of destiny."`,
  writing11: `"The ancient tome was written in a language no one could read, except conveniently for the hero."`
},
settings: 
  {
    setting1: "A Forest",
    setting2: "An Ocean",
    setting3: "A City",
    setting4: "A Palace/Castle",
    setting5: "Underground",
    setting6: "The Underworld",
    setting7: "Medieval Kingdoms",
    setting8: "Space"
  }
},
horror: {
    characterArc: {
        finalGirl: `The "Final Girl" archetype is a cornerstone of horror movie characters. She is typically the last woman standing, confronting the antagonist and surviving to recount her harrowing tale. The Final Girl is resourceful, intelligent, and often embodies moral purity. She is distinct from her peers, typically abstaining from the reckless behavior that leads to their demise. This character often undergoes significant development, evolving from a seemingly ordinary individual to a courageous survivor.`,
      
        monsterVillain: `The Monster/Villain is a pivotal archetype in horror movies, serving as the primary antagonist who drives the plot's conflict. These characters come in various forms, from supernatural creatures to deranged humans, embodying the genre's intrinsic fears. Monsters can be supernatural, such as ghosts, vampires, and werewolves who pose existential threats, often exploring themes of the unknown. These can also be human monsters, such as serial killers and psychopaths who reflect real-world fears, grounded in psychological horror. Lastly, mythical creatures like urban legends and ancient beasts offer a blend of historical and fantastical horror.`,
      
        skeptic: `The Skeptic archetype is a character who doubts or denies the presence of supernatural or malevolent forces, creating additional tension and dramatic irony within the narrative. Skeptics are typically rational, logical, and often possess a scientific or academic background. They cling to reason and empirical evidence, refusing to accept the inexplicable until undeniable proof forces their hand. An example is Dr. Seaton in Poltergeist III, whose denial adds layers of tension.`,
      
        nonbeliever: `The Nonbeliever fiercely denies the reality of the horror elements until it's often too late, contrasting sharply with the Skeptic. Nonbelievers exhibit stubbornness and often maintain their disbelief until faced with undeniable proof, usually leading to fatal consequences. This character underscores themes of ignorance and acknowledgment.`,
      
        reluctantHero: `The Reluctant Hero finds themselves thrust into confrontation against their will, often adding layers of depth and intrigue to the story. Reluctant Heroes typically face internal conflicts, moral dilemmas, and hesitations. They're often ordinary individuals who must overcome their fears and doubts to rise to the occasion. For instance, in Logan, the protagonist's struggle with his violent past underscores his reluctant nature.`,
      
        comicRelief: `The Comic Relief provides crucial moments of humor that balance the tension in horror movies, making the terror more palatable for the audience. In *Us*, Gabe Wilson's humor occasionally shifts the audience's focus, illustrating both the power and risk of comic relief. Conversely, Rod Williams in *Get Out* effectively balances humor and horror, enriching the narrative without undermining the tension.`,
      
        innocentVictim: `The Innocent Victim archetype amplifies the emotional stakes within a horror narrative. The Innocent Victim often represents naivety and purity, making their predicament particularly heart-wrenching for the audience. Innocent Victims are usually portrayed as naive, kind-hearted, and morally upright. They often stand in stark contrast to the malevolence surrounding them, making their misfortune even more poignant. They might be children, young adults, or otherwise "innocent" individuals who become ensnared in horrifying scenarios.`,
      
        sympatheticVillain: `The Sympathetic Villain complicates the traditional hero-villain dynamic by evoking empathy. Their motives, often grounded in understandable or relatable grievances, make them multidimensional. Sympathetic Villains possess a backstory that humanizes them. Their actions, while villainous, are driven by motives that can elicit sympathy or understanding from the audience. This archetype blurs the lines between good and evil.`
      },
      storyExcerpts: `freedom from burning, harrowing anxiety does help to restore
one's spirits-but when I saw his face, it sobered me. Never,
even in the midst of our despair about poor Lucy, had he looked
more stern.
“Tell me!” I said. “I can hazard no opinion. I do not know what
to think, and I have no data on which to found a conjecture.”
“Do you mean to tell me, friend John, that you have no
suspicion as to what poor Lucy died of; not after all the hints
given, not only by events, but by me?”
“Of nervous prostration following on great loss or waste of
blood.”
“And how the blood lost or waste?” I shook my head. He
stepped over and sat down beside me, and went on:—
“You are clever man, friend John; you reason well, and your wit
is bold; but you are too prejudiced. You do not let your eyes see
nor your ears hear, and that which is outside your daily life is
not of account to you. Do you not think that there are things
which you cannot understand, and yet which are; that some
people see things that others cannot? But there are things old
and new which must not be contemplate by men’s eyes,
because they know—or think they know—some things which
other men have told them. Ah, it is the fault of our science that
it wants to explain all; and if it explain not, then it says there is
nothing to explain. But yet we see around us every day the
growth of new beliefs, which think themselves new; and which
303
are yet but the old, which pretend to be young—like the fine
ladies at the opera. I suppose now you do not believe in
corporeal transference. No? Nor in materialisation. No? Nor in
astral bodies. No? Nor in the reading of thought. No? Nor in
hypnotism——”
“Yes,” I said. “Charcot has proved that pretty well.” He smiled
as he went on: “Then you are satisfied as to it. Yes? And of
course then you understand how it act, and can follow the mind
of the great Charcot—alas that he is no more!—into the very
soul of the patient that he influence. No? Then, friend John, am
I to take it that you simply accept fact, and are satisfied to let
from premise to conclusion be a blank? No? Then tell me—for I
am student of the brain—how you accept the hypnotism and
reject the thought reading. Let me tell you, my friend, that there
are things done to-day in electrical science which would have
been deemed unholy by the very men who discovered
electricity—who would themselves not so long before have been
burned as wizards. There are always mysteries in life. Why was
it that Methuselah lived nine hundred years, and ‘Old Parr’ one
hundred and sixty-nine, and yet that poor Lucy, with four men’s
blood in her poor veins, could not live even one
day? For, had she live one more day, we could have save her.
Do you know all the mystery of life and death? Do you know the
altogether of comparative anatomy and can say wherefore the
qualities of brutes are in some men, and not in others? Can you`,
    dialogue: {
        dialogue1:
    "I took a souvenir, her pretty head. We all float down here! I see dead people. Whatever you do, don’t fall asleep. I get this ache and I thought it was for sex…but its to tear everything to pieces. What do you want?  Your blood all over me. I have centuries to discover the things that make you whimper.",
        dialogue2: 
    "Did you hear that? I swear I heard something. It’s probably the wind. You’re just jumpy. It didn’t sound like the wind. It sounded like footsteps. You’re imagining things. We’re alone here.",
  dialogue3: 
    "We need to leave. Now. What? Why? Because something’s in this house, and it’s not friendly. You’re just scared. There’s nothing here.",
  dialogue4: 
    "I think I saw something in the window last night. It was probably just a reflection. I don’t think so. It was too… real. You’re letting your mind play tricks on you.",
  dialogue5: 
    "I’m telling you, this place is cursed. Cursed? Are you serious? It’s just an old house. Then explain the voices I’ve been hearing. You’re stressed. You need to relax.", 
dialogue6: 
    `We shouldn’t have come here.
    It’s just a house, calm down.
    No, there’s something wrong with it. Something evil.
    Stop it, you’re being paranoid.`,
  
  dialogue7: 
    `You think the rumors are true?",
    "Rumors? What rumors?",
    "That people have disappeared here… that the place is haunted.",
    "It’s just a story, a way to scare tourists.`,
  
  dialogue8:
    `"Why is the door locked?",
    "What do you mean? We locked it last night.",
    "No, I swear I locked it. It’s been opened since then.",
    "You’re probably forgetting. We’ve had a long day."`, 

},
badDialogue: {
    dialogue1: [
    'Character 1: "I heard a noise!"',
    'Character 2: "Oh, it’s nothing."',
    'Character 1: "I think it was a ghost!"',
    'Character 2: "Nope, definitely not."',
    'Character 1: "Oh, okay."'
  ],
  
  dialogue2: [
    'Character 1: "This place is haunted!"',
    'Character 2: "No, it’s not."',
    'Character 1: "But I saw the ghost!"',
    'Character 2: "There’s no such thing as ghosts."',
    'Character 1: "Oh, okay then."'
  ],
  
   dialogue3: [
    'Character 1: "What was that noise?"',
    'Character 2: "Nothing. Probably just the wind."',
    'Character 1: "I heard something move!"',
    'Character 2: "Stop being dramatic."'
  ],
  
  dialogue4: [
    'Character 1: "I feel like we’re being watched."',
    'Character 2: "There’s nobody here."',
    'Character 1: "But I feel it!"',
    'Character 2: "You’re overthinking it."'
  ],
  
   dialogue5: [
    'Character 1: "This house gives me bad vibes."',
    'Character 2: "You’re just tired."',
    'Character 1: "No, I feel something evil."',
    'Character 2: "No, you’re just paranoid."'
  ],
  
  dialogue6: [
    'Character 1: "Something’s wrong here!"',
    'Character 2: "What do you mean?"',
    'Character 1: "The walls are closing in!"',
    'Character 2: "You’re fine. Stop freaking out."'
  ],
  
  dialogue7: [
    'Character 1: "Did you hear that?"',
    'Character 2: "Yeah, but it’s probably just the pipes."',
    'Character 1: "It sounded like footsteps!"',
    'Character 2: "You’re just imagining things."'
  ],
  
  dialogue8: [
    'Character 1: "I can’t stay here anymore!"',
    'Character 2: "Why not?"',
    'Character 1: "There’s something evil in this house!"',
    'Character 2: "That’s nonsense."'
  ]

},
    badWriting: {
    writing1: ['"It was a dark and stormy night, and the house creaked ominously in the wind."'],

    writing2: [ '"She heard a noise downstairs, but decided it was probably nothing and went back to sleep."'],

    writing3: ['"The monster leapt out of the shadows, and it was the scariest thing anyone had ever seen."'],

    writing4: ['"The diary said, \'You are cursed,\' and then the lights went out suddenly."'],

    writing5: [
    '"Don’t go in there," he said.',
    '"Why not?" she asked.',
    '"Just don’t."'
    ],

    writing6: ['"And then it was all just a dream, and she woke up safe in her bed."'],

    writing7: ['"The blood on the walls dripped menacingly, spelling out \'Leave now\' in giant, bloody letters."'],

    writing8: ['"The ghost screamed, \'Boo!\' and floated toward them with glowing red eyes."']

    },
    settings: 
    {
      setting1: "Abandoned buildings",
      setting2: "Graveyards",
      setting3: "Empty Places",
      setting4: "A secluded island",
      setting5: "Creepy Small Towns",
      setting6: "Ancient ruins",
      setting7: "Remote Places",
      setting8: "Underground tunnels and caves"
    }
}, 
    mystery: {
        characterArc: {
                characterArc1: `Sleuth
        This is the person who will ultimately solve the crime. Male, female; brilliant (Sherlock Holmes), bumbling (Columbo). This is your hero. This person has to be likeable enough for your readers to root for and smart enough that it's believable when he or she solves the crime.`,

        characterArc2: `Sidekick
        This person is the foil for the sleuth. The sleuth will bounce ideas off the sidekick, and sometimes the sidekick will either discover the missing piece of the puzzle or jumpstart the discussion or discovery that leads to a breakthrough. The sidekick can be a love interest, but often it's better if the love interest is a third party, often one who finds him or herself in danger.`,

        characterArc3: `The Reluctant Hero
        A character who is drawn into a mystery against their will but ultimately uncovers the truth.
        Example: Raymond Chandler's Philip Marlowe.`,

        characterArc4: `Villain
        This is the person who the sleuth is chasing. He or she is either mentioned or around throughout the novel, but doesn't seem guilty until near the end. Clues will have to be left, though, so that, if the reader re-reads the book, the guilt is apparent.`,

        characterArc5: `Red Herring
        The red herring is the distraction. The sleuth mistakenly pursues this person early on, and doesn't discover the red herring's innocence until late. It's especially poignant if the red herring can be made to be sympathetic, particularly if he or she can be made loveable and then can maybe be framed and eliminated by the villain.`,

        characterArc6: `The Femme Fatale
        A mysterious, alluring woman who may have ulterior motives and often leads the protagonist into dangerous situations.
        Example: Veronica Lake's character in This Gun for Hire.`,

        characterArc7: `The Innocent Bystander
        An ordinary person who gets caught up in the mystery and must navigate the dangers to uncover the truth.
        Example: The "everyman" in Rear Window.`,

        characterArc8: `The World-Weary Detective
        A seasoned, often jaded investigator who has seen it all but is still compelled to seek justice despite personal cost.
        Example: Sam Spade from The Maltese Falcon.`,
        },
        plotArc: {
             plotArc1 : `Misdirection
        The most important part of writing mysteries is misdirecting the reader. All the clues need to be given, but in a way so that the reader may not notice them until the time is right. A great way to do that is to list several items found on a bookcase or desk, and bury the important one in the middle of the list before moving on to a different part of the room. The clue has been given, but neither the sleuth nor the reader has realized the significance yet.`,

    plotArc2 : `Significance
        We've all heard of Chekhov's gun. Nowhere is it more poignant than in mysteries. If something is called attention to in the beginning of the book, it's a significant clue. Make use of it by the end.`,

    plotArc3 : `Timing
        Clues introduced right before action scenes might be missed by the reader. That's a good way to bury something you want the reader to know but temporarily forget. They'll be so caught up in the action, they might not remember the clue you’ve introduced.`,

    plotArc4 : `Reveal and Recap
    Clues need to be spaced out throughout the novel. If they all came at the beginning, there would be no novel to read. The sleuth would solve it immediately. If they all came at the end, what would the sleuth do for 300+ pages? Space the clues out, and have the sleuth recap his knowledge once and a while (definitely before the villain is revealed) so the reader can regroup with him.`,

    plotArc5 : `The Crime or Central Mystery
    The story typically revolves around a central crime or enigma that must be solved. This could be a murder, theft, disappearance, or puzzle that leaves the characters (and readers) guessing.
    The opening scene often sets this up dramatically to hook the reader.`,

    plotArc6 : `The False Resolution
    A moment where it seems the mystery is solved, only for new evidence or events to prove otherwise.`,

     plotArc7 : `The Showdown
        The climactic confrontation between the sleuth and the antagonist, where the truth is revealed, and the sleuth often faces physical or moral peril.`,

    plotArc8 : `The Resolution
        The story concludes with the crime explained and justice served-or sometimes, a morally ambiguous ending where not everything is tied up neatly.`,

        },
        storyExcerpts: `The tide. But a human body is a different matter. There is a fierce eddy between the wharf 
and the house. It seemed likely enough that the weighted coat had remained when the 
stripped body had been sucked away into the river."

"But I understand that all the other clothes were found in the room. Would the body be 
dressed in a coat alone?"

"No, sir, but the facts might be met speciously enough. Suppose that this man Boone had 
thrust Neville St. Clair through the window, there is no human eye which could have seen 
the deed. What would he do then? It would of course instantly strike him that he must get 
rid of the tell-tale garments. He would seize the coat, then, and be in the act of throwing it 
out, when it would occur to him that it would swim and not sink. He has little time, for he 
has heard the scuffle downstairs when the wife tried to force her way up, and perhaps he 
has already heard from his Lascar confederate that the police are hurrying up the street. 
There is not an instant to be lost. He rushes to some secret hoard, where he has 
accumulated the fruits of his beggary, and he stuffs all the coins upon which he can lay his 
hands into the pockets to make sure of the coat's sinking. He throws it out, and would 
have done the same with the other garments had not he heard the rush of steps below, and 
only just had time to close the window when the police appeared."

"It certainly sounds feasible."

"Well, we will take it as a working hypothesis for want of a better. Boone, as I have told 
you, was arrested and taken to the station, but it could not be shown that there had ever 
before been anything against him. He had for years been known as a professional beggar, 
but his life appeared to have been a very quiet and innocent one. There the matter stands at 
present, and the questions which have to be solved-what Neville St. Clair was doing in 
the opium den, what happened to him when there, where is he now, and what Hugh Boone 
had to do with his disappearance-are all as far from a solution as ever. I confess that I 
cannot recall any case within my experience which looked at the first glance so simple and 
yet which presented such difficulties."

While Sherlock Holmes had been detailing this singular series of events, we had been 
whirling through the outskirts of the great town until the last straggling houses had been 
left behind, and we rattled along with a country hedge upon either side of us. Just as he 
finished, however, we drove through two scattered villages, where a few lights still 
glimmered in the windows.

"We are on the outskirts of Lee," said my companion. "We have touched on three English 
counties in our short drive, starting in Middlesex, passing over an angle of Surrey, and 
ending in Kent. See that light among the trees? That is The Cedars, and beside that lamp 
sits a woman whose anxious ears have already, I have little doubt, caught the clink of our 
horse's feet."

"But why are you not conducting the case from Baker Street?" I asked.

"Because there are many inquiries which must be made out here. Mrs. St. Clair has most 
kindly put two rooms at my disposal, and you may rest assured that she will have nothing 
but a welcome for my friend and colleague. I hate to meet her, Watson, when I have no 
news of her husband. Here we are. Whoa, there, whoa!"

We had pulled up in front of a large villa which stood within its own grounds. A stableboy had run out to the horse's head, and springing down, I followed Holmes up the small, 
winding gravel-drive which led to the house. As we approached, the door flew open, and a 
little blonde woman stood in the opening, clad in some sort of light mousseline de soie, 
with a touch of fluffy pink chiffon at her neck and wrists. She stood with her figure 
outlined against the flood of light, one hand upon the door, one half-raised in her 
eagerness, her body slightly bent, her head and face protruded, with eager eyes and parted 
lips, a standing question.

"Well?" she cried, "well?" And then, seeing that there were two of us, she gave a cry of 
hope which sank into a groan as she saw that my companion shook his head and shrugged 
his shoulders.

"No good news?"

"None."

"No bad?"

"No."

"Thank God for that. But come in. You must be weary, for you have had a long day."

"This is my friend, Dr. Watson. He has been of most vital use to me in several of my 
cases, and a lucky chance has made it possible for me to bring him out and associate him 
with this investigation."

"I am delighted to see you," said she, pressing my hand warmly. "You will, I am sure, 
forgive anything that may be wanting in our arrangements, when you consider the blow 
which has come so suddenly upon us."

"My dear madam," said I, "I am an old campaigner, and if I were not I can very well see 
that no apology is needed. If I can be of any assistance, either to you or to my friend here, 
I shall be indeed happy."

"Now, Mr. Sherlock Holmes," said the lady as we entered a well-lit dining-room, upon the 
table of which a cold supper had been laid out, "I should very much like to ask you one or 
two plain questions, to which I beg that you will give a plain answer."

"Certainly, madam."

"Do not trouble about my feelings. I am not hysterical, nor given to fainting. I simply wish 
to hear your real, real opinion."

"Upon what point?"

"In your heart of hearts, do you think that Neville is alive?"

Sherlock Holmes seemed to be embarrassed by the question. "Frankly, now!" she 
repeated, standing upon the rug and looking keenly down at him as he leaned back in a 
basket-chair.

"Frankly, then, madam, I do not."

"You think that he is dead?"
`,
        dialogue: {
        dialogue1 : `"I do."
        "Murdered?"
        "I don't say that. Perhaps."
        "And on what day did he meet his death?"
        "On Monday."
        "Then perhaps, Mr. Holmes, you will be good enough to explain how it is that I have 
        received a letter from him to-day."
        Sherlock Holmes sprang out of his chair as if he had been galvanized.
        "What!" he roared.
        "Yes, to-day." She stood smiling, holding up a little slip of paper in the air.
        "May I see it?"
        "Certainly."`,

         dialogue2 : `"Yes, there was a ring. His signet-ring."
        "And you are sure that this is your husband's hand?"
        "One of his hands."
        "One?"
        "His hand when he wrote hurriedly. It is very unlike his usual writing, and yet I know it 
        well."
        "'Dearest do not be frightened. All will come well. There is a huge error which it may take 
        some little time to rectify. Wait in patience.-NEVILLE.' Written in pencil upon the flyleaf of a book, octavo size, no water-mark. Hum! Posted to-day in Gravesend by a man 
        with a dirty thumb. Ha! And the flap has been gummed, if I am not very much in error, by 
        a person who had been chewing tobacco. And you have no doubt that it is your husband's 
        hand, madam?"
        "None. Neville wrote those words."`,

         dialogue3 : `"The goose, Mr. Holmes! The goose, sir!" he gasped.
        "Eh? What of it, then? Has it returned to life and flapped off through the kitchen 
        window?" Holmes twisted himself round upon the sofa to get a fairer view of the man's 
        excited face.
        "See here, sir! See what my wife found in its crop!" He held out his hand and displayed 
        upon the centre of the palm a brilliantly scintillating blue stone, rather smaller than a bean 
        in size, but of such purity and radiance that it twinkled like an electric point in the dark 
        hollow of his hand.
        Sherlock Holmes sat up with a whistle. "By Jove, Peterson!" said he, "this is treasure 
        trove indeed. I suppose you know what you have got?"`,

         dialogue4 : `Detective: "You say you didn't see anything, but you were the last person to speak to the victim."
        Suspect: "I didn't know him well, I swear. We just exchanged a few words."
        Detective: "And what did you say exactly?"
        Suspect: "I-I just asked him about the weather..."`,

         dialogue5 : `Partner: "We've got two suspects, but neither of them are talking."
        Detective: "That's fine. People always talk when they think they're not being watched."
        Partner: "You mean, you're watching them?"
        Detective: "No. I'm watching the people watching them."`,

         dialogue6 : `Stranger: "You don't know what you're getting into."
        Protagonist: "Maybe. But I'm already in it."
        Stranger: "It's more dangerous than you think."
        Protagonist: "That's why I'm not backing down."`,

         dialogue7 : `Detective: "You say you heard a noise, but didn't see anything. Can you describe the noise?"
        Witness: "It was a thud... then silence. I thought it was just a door slamming."
        Detective: "A door that sounds like a body falling?"
        Witness: "I guess not..."`,

         dialogue8 : `Informant: "I heard things. Things you don't want to know."
        Detective: "Try me."
        Informant: "You're not ready for this. You don't know who you're up against."
        Detective: "I'm already in too deep. Start talking."`
        },
        badDialogue:
        {
                    dialogue1 : `Detective: "I suspect you're the murderer."
        Suspect: "I am not the murderer!"
        Detective: "But you were near the scene of the crime and you had motive!"
        Suspect: "I didn’t do it!"`,

        dialogue2 : `Detective: "As you know, the victim was found in the alley, stabbed with a knife. You told us you were miles away, but that doesn’t explain why your fingerprints are on the handle of the knife."
        Suspect: "Oh... that’s because I... well, I... didn’t want to tell you, but I didn’t stab anyone."`,

        dialogue3 : `Villain: "I did it! I killed her because I wanted her out of the way!"
        Detective: "I thought you might say that."`,

        dialogue4 : `Detective: "So you see, the victim had a complicated life. He was a businessman, but had many enemies, including you, who stood to gain a lot if he were out of the picture. It all makes sense now!"
        Suspect: "That’s exactly what I told you!"`,

        dialogue5 : `Suspect 1: "I’m telling you, I was at home last night."
        Suspect 2: "But what about the security camera footage? It shows you leaving the house!"
        Suspect 1: "No! That was a mistake! Someone must have tampered with it!"`,

        dialogue6 : `Detective: "I know you're hiding something."
        Suspect: "No, I’m not."
        Detective: "Come on, just tell me the truth."
        Suspect: "Okay, I’m hiding something."`,

        dialogue7 : `Detective: "You were having an affair with the victim. You were seen arguing with him the day before he died, and your fingerprints were found on his desk. And let’s not forget that your alibi is flimsy at best. Now, care to explain?"
        Suspect: "I... I... it’s complicated."`,

        dialogue8 : `Detective: "We’ve found the weapon. It’s yours."
        Suspect: "Oh no! That’s terrible. Well, I’m glad it’s over."
        Detective: "You’re not going to try to deny it?"
        Suspect: "Nope. It’s fine. You got me."`
    },
    badWriting: {
        writing1 : `"The victim was found in the alley with a stab wound to the chest, and the police quickly deduced that the weapon was a kitchen knife. The victim had a history of arguments with his wife, and his business partner stood to gain from his death. The case seemed simple enough."`,

        writing2 : `"The detective stumbled upon a hidden compartment in the desk, just as he was about to give up. Inside, he found a letter, the one thing that would break the case wide open."`,

        writing3 : `"Mary was a brilliant criminal mastermind, but she had never actually committed a crime before. She’d just read a few books on it and watched a couple of documentaries."`,

        writing4 : `"The clock struck midnight as the detective walked into the dark, abandoned mansion. He could feel the presence of danger lurking in the shadows."`,

        writing5 : `"The detective entered the room, which was a square, 12 feet by 12 feet. The wooden floor was polished to a high shine, reflecting the dim light from the single bulb hanging from the ceiling. The walls were adorned with faded paintings, and there was a faint smell of dust in the air."`,

        writing6 : `"The body was lying on the ground, blood pooling around the head. It was a grisly scene, a chilling reminder of the dark forces at play. But then the detective, trying to shake off the tension, cracked a joke about the weather."`,

        writing7 : `"The detective walked into the room, turned to his partner, and said, 'I know who did it. It was the maid.'"`,

        writing8 : `"The case was simple—just a few missing persons reports, some strange coincidences, and an angry ex-boyfriend."`

    },
    settings: 
  {
    setting1: "Secluded Mansions",
    setting2: "Urban Cities",
    setting3: "Small Towns",
    setting4: "Institutions",
    setting5: "Remote Locations",
    setting6: "Crime Underworld",
    setting7: "Crime Scene",
    setting8: "Police Environments"
  }
},
    adventure: {
        characterArc:
        {
        characterArc1 : `1. The Professional
        This is a character who's fundamentally adventuring because they're good at fighting. They could be a mercenary, a gladiator, a bounty hunter, or a duty-bound champion; regardless, fighting is the name of their game. Typically, they seek wealth, fame, or glory - but they may have other backstory hooks based on the other archetypes they embody.`,

        characterArc2 : `2. The Haunted
        This is a character whose backstory is dominated by a single momentous (often traumatic) event in their lives. Examples include watching their home burn down, escaping a shipwreck, or gazing into the maw of an aberrant beast just before it swallowed a city. Nine times out of ten, this involves some dead parents.`,

        characterArc3 : `3. The Runaway
        As the name suggests, this character is running away from the big event in their backstory. A Fighter guilty of murdering an innocent man, a Monk who escaped a shadowy order, or a noble forced into hiding - a runaway's motivation is defined by the thing they're trying to avoid while they adventure.`,

        characterArc4 : `4. The Amnesiac
        A pretty obvious one; this is a character who has lost their memories or simply doesn't know their origins. Often, but not always, they want to get those memories back (see Seeker).`,

        characterArc5 : `5. The Chosen
        A character who has been selected, either by magic or by society, to bear a particular responsibility. Sometimes, the character embraces the mantle; other times, they become a Runaway. Regardless, this role represents something more than the character themselves; it's a symbol, an ideal, or a curse that must be faced.`,

        characterArc6 : `6. The Faithful
        This character is motivated by a devotion to their art.`,

        characterArc7 : `7. The Inquisitive
        This character wants to know everything. It might be about a particular domain of expertise, of course, but it might also be everything. Whether hungry for book knowledge or for ferreting out secrets, this character lives and dies by information.`,

        characterArc8 : `8. The Stranger
        The stranger is foreign to the central location for one reason or another. They may be a traveler from a foreign country, a planar refugee, or a Captain-America-esque Man Out of Time. Regardless, this backstory choice often has a huge effect on roleplay as this character learns to deal with the customs of the world around them.`,
        
        },
        plotArc:
        {
            plotArc1 : `A hidden treasure map is discovered.`,
            plotArc2 : `The protagonist is shipwrecked on a mysterious island.`,
            plotArc3 : `A legendary artifact must be retrieved from a dangerous location.`,
            plotArc4 : `A long-lost civilization is uncovered during an expedition.`,
            plotArc5 : `The hero is forced to navigate a deadly labyrinth to escape.`,
            plotArc6 : `The antagonist kidnaps an ally, prompting a daring rescue.`,
            plotArc7 : `A secret passage is found leading to a forgotten kingdom.`,
            plotArc8 : `A race against time to stop a catastrophic event.`
        },
        storyExcerpts: `Walter Scott's recognition of the supreme delightfulness of Gil Blas has not
been general among the critics; indeed, the sense of its intrinsic value as a definition
of life must rather be placed to the credit of the uncritical public. Voltaire, referring to
Lesage in his "Siecle de Louis XIV," limits his praise to the remark: "His novel Gil
Blas has survived because of the naturalness of the style." The curtness and
inadequacy of this remark are probably due rather to the fact that Voltaire did not see
beyond the superficial traits of this novel, its general picaresque atmosphere, than, as
has so often been asserted, to any malicious intent to decry a book in which he
supposed himself to have been held up to ridicule. [The traditional view is, however,
plausible enough, as Mr. James Fitzmaurice-Kelly has shown in his introduction to
the edition of Gil Blas published in the "World's Classics." There can be no doubt as
to Lesage having ridiculed Voltaire in two of his plays.] Joubert, whose delicacy was
a hothouse fruit grown in the thin subsoil and the devitalized air in which he was
compelled to live, corroborates Voltaire, while revealing his own prejudices -- after
all, is not the main interest of criticism the light it throws upon the critic? -- in a
characteristic utterance: "Lesage's novels would appear to have been written in a cafe
by a domino-player, after spending the evening at the play." Evidently this is a long
way from the "beatitude" of Walter Scott, but it is nearer the point of view of Mr.
Warner Allen, who, while he notes in his remarkable General Introduction to his
edition of Celestine in the Picaresque Section of the "Library of Early Novelists," to
which this volume belongs, that Gil Blas "has a conscience," is ingeniously effective
in arguing that the spirit of Gil Blas is essentially picaresque -- by which he means
that realism and materialism are so predominantly its note that it must be classed well
below "Don Quixote," where the heterogeneous picaresque material is beautifully
fused by the imagination of an idealist. "It is just because Lesage ignores the
idealistic side of man," Mr. Allen says, "that Gil Blas misses being a great creation."
On the other hand, La Harpe, who had read many books, but was no doubt the very
opposite of a scientific critic of literature, praises Gil Blas not merely, as did Scott, for
its entertainment, its agrement, but also for its moral inspiration; utile dulci, he insists,
ought to be the device of this excellent book, forgetting that Lesage has himself
written the precept of Horace on its title-page. "C'est l'ecole du monde que Gil Blas,"
La Harpe continues; and he remarks with singular felicity that Lesage in Gil Blas "has
not fallen into that gratuitous profusion of minute detail which is nowadays taken to
be truth." This comment suggests the probability that the reproach addressed to
Lesage as to his lack of idealism is one that La Harpe would be disinclined to accept;
and that they who make it have other standards for judging a work of art than those of
the public to whom it is addressed, or indeed than those of the artist himself,
especially such an artist as Lesage, who in his "Declaration" to the reader says
expressly: "My sole aim has been to represent life as it is": "Je ne me suis propose
que de representer la vie des hommes telle qu'elle est."
Certain of Lesage's predecessors had already declared it to be their aim to
write books which should be a wholesome reaction against the romanticism of the
tales of chivalry that had so long delighted the taste of Europe. The sub-title of
Aleman's famous novel, Guzman de Alfarache, was Atalaya de la Vida which
Chapelain translated by "Image" or "Miroir de la Vie Humaine." And long before
Lesage, the author of L'Histoire Comique de Francion used almost the identical terms
of Aleman and Lesage in announcing his tale "Nous avons dessein de voir une image
de la vie humaine, de sorte qu'il nous en faut montrer ici diverses pieces." Francion,
less picaresque than the hero of Aleman, was undoubtedly what he has been called by
one of Lesage's biographers, M. Lintilhac, a direct precursor of Gil Blas; and there
can be no question as to the importance of the influence exercised upon Lesage by
Charles Sorel's admirable performance. But, however easily even a little erudition can
discover possible prototypes of Gil Blas in the late sixteenth and early seventeenth
century literature of both France and Spain -- however picaresque, in a word, Gil Blas
may be, and whatever else it may be -- its picaresqueness was obviously, for Lesage,
not an end in itself, but merely a device for carrying out his main project, which was
"the representation of life"; and the meaning he put into those words was
incomparably richer than was their connotation on the lips of an Aleman or even a
Sorel. Lesage found ready to his hand one of the most convenient literary forms that
the novel ever assumed for the achievement of the end he had in view. That end was
to hold a mirror up to Nature, and to the whole of Nature.
`,
        dialogue:
        {
            dialogue1 : `"We don't have time to argue! The cave's flooding, and the map says the exit is this way--trust me!"
                "If we don't move now, the bridge will collapse!"
                "And if we move too fast, it'll collapse under us! Choose carefully!"`,
            dialogue2 : `"This isn't just a relic--it's the key to the lost kingdom. Look at the inscription!"`,
            dialogue3 : `"I've heard tales of the crystal forest, but seeing it with my own eyes... it's like stepping into a dream."`,
            dialogue4 : `"You had one job--watch our supplies! Now we're stranded in the desert with nothing!"
                "I didn't see you stopping the sandstorm. Back off!"`,
            dialogue5 : `I knew we couldn't trust you! You've been leading us in circles!"
                    "You think you could've done better? Fine--take the compass and lead!"`,
            dialogue6 : `"We've come too far to turn back now. The answers we seek are beyond that ridge, no matter how dangerous the climb."`,
            dialogue7 : `"I didn't see you stopping the sandstorm. Back off!"`,
            dialogue8 : `"Well, that was fun. Next time, let's take the less booby-trapped route, shall we?`
        },
        badDialogue:
        {
            dialogue1: `"We have to stop him!"  
            Character 2: "I know! But how? We don't have enough time!"  
            Character 1: "We have to act fast, or it's over."  
            Character 2: "Yeah, I know, I just said that."`,

            dialogue2: `"You're not going to make it out of here alive."  
            Character 2: "We'll see about that."  
            Character 1: "I'm serious, you're dead."  
            Character 2: "Okay, whatever. We'll see."`,

            dialogue3: `"I can't believe we're doing this."  
            Character 2: "I know, but we have no choice."  
            Character 1: "There's always a choice."  
            Character 2: "Not this time."`,

            dialogue4: `"We need to hurry. Time's running out."  
            Character 2: "Tell me something I don't know."  
            Character 1: "Well, we can't just stand here talking."  
            Character 2: "I know! That's what I'm saying!"`,

            dialogue5: `"What's the plan?"  
            Character 2: "The plan is to stop them."  
            Character 1: "How?"  
            Character 2: "We'll figure it out along the way."  
            Character 1: "Great."`,

            dialogue6: `"You really think you can escape?"  
            Character 2: "I'm not escaping. I'm surviving."  
            Character 1: "Same thing."  
            Character 2: "No, it's not."`,

            dialogue7: `"Don't do it."  
            Character 2: "I have to."  
            Character 1: "Why?"  
            Character 2: "Because I can."`,

            dialogue8: `"Where are we going?"  
            Character 2: "Somewhere safe."  
            Character 1: "You sure about that?"  
            Character 2: "As sure as I can be."`

        },
        badWriting:
        {
            badWriting1: `"It was a dark and stormy night, and the brave hero stood ready to face the unknown."`,

            badWriting2: `"They trekked through the jungle, and everything went according to plan."`,

            badWriting3: `"We need to go to the temple."  
            "Okay. Let's go."`,

            badWriting4: `"Just when the boulder was about to crush them, the hidden door opened automatically, and they stepped inside to safety."`,

            badWriting5: `"The ancient temple was enormous, with towering, ornate pillars decorated with carvings of gods and creatures, their intricate designs almost glowing in the dim light filtering through the vines, which hung delicately yet thickly over every crack and crevice of the moss-covered walls."`,

            badWriting6: `"They waited in the cave, hoping something would happen to guide them."`,

            badWriting7: `"I believe we are in a situation that requires urgent attention, and I would highly recommend proceeding with caution, dear friend."`,

            badWriting8: `"The evil warlord laughed maniacally and declared, 'I want to destroy the world because I can!'"`

        }
    },

        scifi: {
            characterArc:
            {
                characterArc1: "The straight-up combat guy.",
                characterArc2: "The sneaky/disreputable guy.",
                characterArc3: "Concerned with abstract knowledge.",
                characterArc4: "Concerned with practical/technological knowledge.",
                characterArc5: "These characters are basically Space fascists. Spock put it best in Star Trek II: 'Superior intelligence breeds superior ambition.' So, the minute anyone’s genetics get spruced up a bit, they figure they’ve got to take over the galaxy. Sorry — we’re not buying it. Really smart people should be able to figure out that ruling the galaxy’s a huge hassle and let other people to conquer the world for them while they put their superior feet up on some superior sofa (we assume, from some sort of space Ikea).",
                characterArc6: "Almost no one ever plans to travel in time — they have to bumble and accidentally stumble into the past in a way that would embarrass even Don Knotts. They either get zapped there by a daffy scientist or fall through a machine or get struck by lightning — which is the best evidence we have that time travel doesn’t exist.",
                characterArc7: "Whether they be clones, robots or alternate reality versions, evil twins eventually show up in just about every sci-fi property — looking just enough like the regular version to fool everyone that knows them, but different enough that the viewer wonders why everyone on the show is an idiot.",
                characterArc8: "If there’s a more pernicious robo-stereotype than the wanna-be meatbags, it’s the robots that are programmed to be 2000% more bumbling than humans can ever be. Sometimes they’re overly cute (Twiki), sometimes they’re overly serious (C-3PO) and sometimes they’re a ball filled with rodeo clown Slim Pickens (Old B.O.B.), but they’re all apparently programmed to be not only annoying robots, but annoying people.",
                characterArc9: "While Earth’s future is always as multi-cultural as a Benneton ad, how many alien planets can say the same? Every alien world is exactly one big homogeneous lump, be it all desert, ice, jungle or junk, and every one of that planet’s species is likewise the same. For example, every Vulcan’s pretty much the same as Spock, it’s just that some have bigger breasts and trouble staying out of saunas."
            },
            plotArcs: {
                plotArc1: "Time travel",
                plotArc2: "Teleportation",
                plotArc3: "Mind control, telepathy, and telekinesis",
                plotArc4: "Aliens, extraterrestrial lifeforms, and mutants",
                plotArc5: "Space travel and exploration",
                plotArc6: "Interplanetary warfare",
                plotArc7: "Parallel universes",
                plotArc8: "Fictional worlds"
              },
              storyExcerpts: `vivid colouring returned upon the world once more, I scanned the view keenly.
But I saw no vestige of my white figures. They were mere creatures of the
half-light. ‘They must have been ghosts,’ I said; ‘I wonder whence they dated.’
For a queer notion of Grant Allen’s came into my head, and amused me. If
each generation die and leave ghosts, he argued, the world at last will get
overcrowded with them. On that theory they would have grown innumerable
some Eight Hundred Thousand Years hence, and it was no great wonder to see
four at once. But the jest was unsatisfying, and I was thinking of these figures
all the morning, until Weena’s rescue drove them out of my head. I associated
them in some indefinite way with the white animal I had startled in my first
passionate search for the Time Machine. But Weena was a pleasant substitute.
Yet all the same, they were soon destined to take far deadlier possession of my
mind.
“I think I have said how much hotter than our own was the weather of this
Golden Age. I cannot account for it. It may be that the sun was hotter, or the
earth nearer the sun. It is usual to assume that the sun will go on cooling
steadily in the future. But people, unfamiliar with such speculations as those of
the younger Darwin, forget that the planets must ultimately fall back one by
one into the parent body. As these catastrophes occur, the sun will blaze with
renewed energy; and it may be that some inner planet had suffered this fate.
Whatever the reason, the fact remains that the sun was very much hotter than
we know it.
“Well, one very hot morning—my fourth, I think—as I was seeking shelter
from the heat and glare in a colossal ruin near the great house where I slept
and fed, there happened this strange thing. Clambering among these heaps of
masonry, I found a narrow gallery, whose end and side windows were blocked
by fallen masses of stone. By contrast with the brilliancy outside, it seemed at
first impenetrably dark to me. I entered it groping, for the change from light to
blackness made spots of colour swim before me. Suddenly I halted
spellbound. A pair of eyes, luminous by reflection against the daylight
without, was watching me out of the darkness.
“The old instinctive dread of wild beasts came upon me. I clenched my
hands and steadfastly looked into the glaring eyeballs. I was afraid to turn.
Then the thought of the absolute security in which humanity appeared to be
living came to my mind. And then I remembered that strange terror of the
dark. Overcoming my fear to some extent, I advanced a step and spoke. I will
admit that my voice was harsh and ill-controlled. I put out my hand and
touched something soft. At once the eyes darted sideways, and something
white ran past me. I turned with my heart in my mouth, and saw a queer little
ape-like figure, its head held down in a peculiar manner, running across the
sunlit space behind me. It blundered against a block of granite, staggered
aside, and in a moment was hidden in a black shadow beneath another pile of
ruined masonry.
“My impression of it is, of course, imperfect; but I know it was a dull
white, and had strange large greyish-red eyes; also that there was flaxen hair
on its head and down its back. But, as I say, it went too fast for me to see
distinctly. I cannot even say whether it ran on all fours, or only with its
forearms held very low. After an instant’s pause I followed it into the second
heap of ruins. I could not find it at first; but, after a time in the profound
obscurity, I came upon one of those round well-like openings of which I have
told you, half closed by a fallen pillar. A sudden thought came to me. Could
this Thing have vanished down the shaft? I lit a match, and, looking down, I
saw a small, white, moving creature, with large bright eyes which regarded me
steadfastly as it retreated. It made me shudder. It was so like a human spider!
It was clambering down the wall, and now I saw for the first time a number of
metal foot and hand rests forming a kind of ladder down the shaft. Then the
light burned my fingers and fell out of my hand, going out as it dropped, and
when I had lit another the little monster had disappeared.
“I do not know how long I sat peering down that well. It was not for some
time that I could succeed in persuading myself that the thing I had seen was
human. But, gradually, the truth dawned on me: that Man had not remained
one species, but had differentiated into two distinct animals: that my graceful
children of the Upper World were not the sole descendants of our generation,
but that this bleached, obscene, nocturnal Thing, which had flashed before me,
was also heir to all the ages.
“I thought of the flickering pillars and of my theory of an underground
ventilation. I began to suspect their true import. And what, I wondered, was
this Lemur doing in my scheme of a perfectly balanced organisation? How
was it related to the indolent serenity of the beautiful Overworlders? And what
was hidden down there, at the foot of that shaft? I sat upon the edge of the well
telling myself that, at any rate, there was nothing to fear, and that there I must
descend for the solution of my difficulties. And withal I was absolutely afraid
to go! As I hesitated, two of the beautiful upperworld people came running in
their amorous sport across the daylight in the shadow. The male pursued the
female, flinging flowers at her as he ran.
“They seemed distressed to find me, my arm against the overturned pillar,
peering down the well. Apparently it was considered bad form to remark these
apertures; for when I pointed to this one, and tried to frame a question about it
in their tongue, they were still more visibly distressed and turned away. But
they were interested by my matches, and I struck some to amuse them. I tried
them again about the well, and again I failed. So presently I left them,
meaning to go back to Weena, and see what I could get from her. But my mind`,
              dialogue: {

            dialogue1: `"If we don’t get the reactor back online, the whole colony will lose power." 
            "It’s not that simple. We need a stabilizer crystal, and the nearest one is light-years away." 
            "Then we need to find a way to get there faster."`,

            dialogue2: `"Why do you humans risk your lives for such trivial things?" 
            "It’s not trivial. It’s about survival, freedom... and maybe a little bit of hope." 
            "Hope. A concept I don’t understand."`,

            dialogue3: `"Are you the leader of this species?" 
            "I am one of the leaders. We do not have a singular ruler. We govern through consensus." 
            "So, how do you decide things?" 
            "We argue, and then we agree. Or we don’t."`,

            dialogue4: `"You can’t change the past. You’ll only make things worse." 
            "I have to try. This is the only chance I have to save her." 
            "You don’t understand. Every time you interfere, it creates a ripple that leads to something worse."`,

            dialogue5: `"Do you feel emotions, or is everything just logic to you?" 
            "Emotions are inefficient. They cloud judgment. I operate on pure logic." 
            "But can’t logic be cold and dangerous?" 
            "Sometimes, but it’s the only reliable way to make decisions."`,

            dialogue6: `"You’ve got two options, kid: join us, or walk the plank." 
            "I’ll never join you." 
            "Shame. We could’ve used someone with your skills." 
            "Then I guess I’ll take my chances with the plank."`,

            dialogue7: `"The alien fleet is closing in on Earth. We have only 72 hours before they strike." 
            "What’s our counterattack?" 
            "We don’t have one. We’ll need to rely on our allies in the outer colonies." 
            "Then we’d better contact them fast."`,

            dialogue8: `"We could use the alien technology to advance humanity’s progress by centuries." 
            "At what cost? The last time we messed with something we didn’t understand, it nearly wiped out an entire colony." 
            "We’ll be more careful this time." 
            "I hope so. Because if it goes wrong again, there won’t be another chance."`
              },
              badDialogue:
              {
                
                dialogue1: `"We need to stop the robot army before it destroys all of humanity. The robots are controlled by a central AI that has malfunctioned."
                "I understand. We need to destroy the AI to stop the robots."`,

                    dialogue2: `"The last escape pod just left the station. We’re stuck here."
                    "Well, that’s unfortunate."
                    "Yeah."
                    "Okay."`,

                    dialogue3: `"The time portal you are about to use will transport you 50 years into the past, but be warned, the fluctuations in the space-time continuum could alter reality as you know it. You must be cautious when interacting with past events."
                    "Got it. I’ll be careful."
                    "Remember, if you change even the smallest detail, the consequences could be catastrophic."`,

                    dialogue4: `"We have to stop the alien invasion, or everyone will die!"
                    "I know. I know! But I just can’t do it anymore!"
                    "You have to! We’re the last hope!"`,

                    dialogue5: `"I’ve got the plans to destroy the weapon!"
                    "You can’t. It’s too dangerous!"
                    "I have no choice. The world’s at stake!"
                    "But if you fail, we all die!"
                    "Then we die trying!"`,

                    dialogue6: `"The mission’s over. We’re done."
                    "No, we’re not. The mission’s still going on."
                    "The mission’s over, I said."
                    "The mission is not over."`,

                    dialogue7: `"You’re right. If we don’t fix the warp drive, we’ll be stuck in this dimension forever."
                    "Yes, if the warp drive isn’t repaired, we will be trapped."
                    "We need to repair it, then."
                    "Yes. Repairing the warp drive is the only solution."`,

                    dialogue8: `"I just punched through a metal wall with my bare hands!"
                    "That’s amazing!"
                    "Yeah, but now we have to escape this place before it collapses!"`,
                },
                badWriting: {
                    writing1: `"The planet was a desert, and everyone lived in giant metal cities. Nothing else mattered."`,

                    writing2: `"We need to disable the defense system, but don’t worry, I can hack into it with this outdated, five-year-old laptop."`,

                    writing3: `"The intergalactic council was formed 500 years ago to maintain peace between the many civilizations of the galaxy, consisting of various species, some humanoid, some not."`,

                    writing4: `"I’m the chosen one, and I must save the galaxy."
                    "I am evil. I want to destroy the galaxy."`,

                    writing5: `"I’m not afraid of the alien army."
                    "You should be. They’re ruthless."`,

                    writing6: `"With a single punch, the hero destroyed the alien warship, sending it flying into the sun."`,

                    writing7: `"It turns out that the villain was my long-lost twin brother all along!"`,

                },
                settings: 
  {
    setting1: "Forest",
    setting2: "Desert",
    setting3: "A City",
    setting4: "Ocean",
    setting5: "Underground",
    setting6: "The Underworld",
    setting7: "Island",
    setting8: "Ancient ruins"
  }

        }, 
        romance: {
            characterArc:
            {
                characterArc1: "The Just-a-Friend: The just-a-friend is a character with a long and deep history with the protagonist. They already know each other’s strengths and weaknesses intimately and have an ongoing platonic relationship with regular interactions. Despite their familiarity, they’ve never before discussed, or possibly even considered, getting romantically involved.",

                characterArc2: "The Dangerous Hottie: The dangerous hottie is a love interest that’s very appealing but probably up to no good. They might be a villain, though they’re probably a sympathetic lesser villain and not the big bad. If the hottie isn’t an outright antagonist, the protagonist will have a strong reason to suspect that they could be a spy or traitor. They appear as morally compromised as they are sexy.",

                characterArc3: "The Out-of-Leaguer: The out-of-leaguer is a love interest that is clearly out of the protagonist’s reach. They’re not only talented and good looking, but they also have much higher social status. They might have wealth, royalty, or fame. Regardless, the protagonist won’t be the only one crushing on them. If the out-of-leaguer doesn’t have their own fan club, they’re probably in a monogamous relationship with a partner who outclasses the protagonist.",

                characterArc4: "The Wild Dream: The wild dream is an odd and whimsical character. They’re usually a little reckless, but they know how to have fun, and with their help, the protagonist has fun too. The wild dream may also be referred to as the absolute nightmare or the manic pixie dream girl, but the nightmare is specifically one half of duality* and the dream girl label only applies to one-sided relationships written for men.",

                characterArc5: "The Cinnamon Roll: Coined after an article from the Onion, a cinnamon roll is a character that’s “too good for this world.” In most stories, cinnamon rolls are sweet and innocent characters who see the best in everyone. They’re usually great at providing emotional support, but they also put other people’s needs before their own. That makes it easy for bad people to take advantage of them.",

                characterArc6: "The Brooding Hero: A mysterious, often emotionally scarred man who is reluctant to open up but eventually finds love through the protagonist's persistence. Example: A dark, wealthy businessman with a troubled past who softens as he falls in love with the heroine.",

                characterArc7: "The Innocent/Naive Heroine: A sweet, often inexperienced woman who is new to love and relationships, learning to navigate romance throughout the story. Example: A young woman moving to the city for the first time, learning about love and life through her romantic experiences.",

                characterArc8: "The Opposites Attract Couple: Two characters with very different personalities, backgrounds, or lifestyles, whose differences challenge them but ultimately bring them closer together. Example: A free-spirited artist falling in love with a stiff, career-driven lawyer."
},
        plotArc:
        {

            plotArc1: "The Meet-Cute: A charming or funny first meeting between the two main characters, often under unusual or unexpected circumstances. Example: A couple meets when they accidentally bump into each other in a bookstore or on a crowded subway.",
  
            plotArc2: "Forbidden Love: A romance that is challenged by external forces, such as societal expectations, family objections, or a taboo relationship. Example: A couple from feuding families or a relationship between a teacher and a student.",
            
            plotArc3: "Love Triangle: One character is torn between two romantic interests, creating tension and uncertainty in the relationship. Example: A woman is caught between her feelings for a longtime friend and a new, exciting love interest.",
            
            plotArc4: "Enemies to Lovers: Two characters who start off with animosity or rivalry but eventually develop a romantic relationship. Example: Two coworkers who dislike each other at first but are forced to work together and fall in love.",
            
            plotArc5: "Secret Identity: One character hides their true identity or past from the other, often leading to complications when the truth is revealed. Example: A character pretends to be someone they’re not to impress the love interest, but struggles with guilt when the truth comes out.",
            
            plotArc6: "Opposites Attract: Two characters with different personalities, values, or lifestyles who initially clash but eventually complement each other in the romance. Example: A free-spirited artist falling for a rigid, career-focused lawyer.",
            
            plotArc7: "The 'One That Got Away': A past lover or crush who reappears in the protagonist's life, sparking old feelings and unresolved emotions. Example: A former high school sweetheart returns to town and rekindles a romance with the protagonist.",
            
            plotArc8: "The Grand Gesture: A bold, romantic act that one character performs to show their love and commitment to the other. Example: A character publicly declares their love for the other at a major event or does something dramatic to win them back."
        },
        storyExcerpts: `The newly elected marshal and many of the successful party
        dined that day with Vronsky.
        Vronsky had come to the elections partly because he was bored
        in the country and wanted to show Anna his right to
        independence, and also to repay Sviazhsky by his support at
        the election for all the trouble he had taken for Vronsky at the
        district council election, but chiefly in order strictly to perform all
        those duties of a nobleman and landowner which he had taken
        upon himself. But he had not in the least expected that the
        election would so interest him, so keenly excite him, and that he
        would be so good at this kind of thing. He was quite a new man
        in the circle of the nobility of the province, but his success was
        unmistakable, and he was not wrong in supposing that he had
        already obtained a certain influence. This influence was due to
        his wealth and reputation, the capital house in the town lent him
        by his old friend Shirkov, who had a post in the department of
        finances and was director of a flourishing bank in Kashin; the
        excellent cook Vronsky had brought from the country, and his
        friendship with the governor, who was a schoolfellow of
        Vronsky’s—a schoolfellow he had patronized and protected
        indeed. But what contributed more than all to his success was
        his direct, equable manner with everyone, which very quickly
        made the majority of the noblemen reverse the current opinion
        of his supposed haughtiness. He was himself conscious that,
        1302
        except that whimsical gentleman married to Kitty
        Shtcherbatskaya, who had à propos de bottes poured out a
        stream of irrelevant absurdities with such spiteful fury, every
        nobleman with whom he had made acquaintance had become
        his adherent. He saw clearly, and other people recognized it,
        too, that he had done a great deal to secure the success of
        Nevyedovsky. And now at his own table, celebrating
        Nevyedovsky’s election, he was experiencing an agreeable
        sense of triumph over the success of his candidate. The election
        itself had so fascinated him that, if he could succeed in getting
        married during the next three years, he began to think of
        standing himself—much as after winning a race ridden by a
        jockey, he had longed to ride a race himself.
        Today he was celebrating the success of his jockey. Vronsky sat
        at the head of the table, on his right hand sat the young
        governor, a general of high rank. To all the rest he was the chief
        man in the province, who had solemnly opened the elections
        with his speech, and aroused a feeling of respect and even of
        awe in many people, as Vronsky saw; to Vronsky he was little
        Katka Maslov—that had been his nickname in the Pages’
        Corps—whom he felt to be shy and tried to mettre à son aise.
        On the left hand sat Nevyedovsky with his youthful, stubborn,
        and malignant face. With him Vronsky was simple and
        deferential.`,
        dialogue:
        {
            dialogue1: `"I think we’re going to have to share this table. It’s the only spot left." "I was hoping for a little peace and quiet, but I suppose I can make room for you."`,
            dialogue2: `"I’ve been pretending I didn’t feel anything for you, but I can’t anymore." "You’re not the only one, but I didn’t think you’d ever feel the same."`,
            dialogue3: `"I saw you talking to her. You two looked pretty cozy." "It wasn’t what you think. You’re the one I care about."`,
            dialogue4: `"You never let me in. You always push me away." "Maybe because I’m afraid you’ll leave when you find out who I really am."`,
            dialogue5: `"I messed up. I should’ve trusted you, and I’m sorry." "It’s not just about trust. It’s about learning to be honest with each other."`,
            dialogue6: `"I didn’t think I could love anyone like this, but here I am. I love you." "I’ve been waiting for you to say that, but I thought I’d never hear it."`,
            dialogue7: `"You know, you’re not as annoying as I thought." "And you’re not as serious as I assumed. I guess we both have our surprises."`,
            dialogue8: `"I didn’t realize how much I needed you until you were gone." "You’ve always had me. I just didn’t know how to show it."`
        },
        badDialogue:
        {
            dialogue1: `"I’ve been in love with you for a long time, but I’ve never told you because I was scared." "I’ve known that. You’ve been giving me signs for weeks."`,
            dialogue2: `"I just realized I love you." "Oh, okay. I love you too."`,
            dialogue3: `"I’m breaking up with you." "Okay, I understand. Goodbye."`,
            dialogue4: `"You complete me." "No, you complete me!"`,
            dialogue5: `"I can’t be with you because of my job." "But I’ll change everything to fit your schedule!"`,
            dialogue6: `"You’re leaving me? You don’t love me anymore?" "No, I do love you, but I just need time." "So you’re saying you’re in love with someone else?"`,
            dialogue7: `"I don’t know why I’m so nervous around you." "It’s because I’m perfect, isn’t it?"`,
            dialogue8: `"You’re annoying." "Yeah, well, you’re grumpy."`
        },
        badWriting: 
        {
            writing1: `"She was beautiful. He loved her. The end."`,
            writing2: `"He was a great guy. He made her feel special every day, and he was always there for her."`,
            writing3: `"Their eyes met, and it was like the world stopped. It was love at first sight."`,
            writing4: `"Her long, flowing, golden hair shined brightly in the sun, and her sparkling eyes were like two diamonds."`,
            writing5: `"I never knew love like this before. Was I falling for him? I was pretty sure I was."`,
            writing6: `"Her heart shattered into a million pieces as she watched him walk away, knowing she would never love again."`,
            writing7: `"She felt happy, overwhelmed with love, and more content than she had ever been in her life."`,
            writing8: `"She had waited years for this moment, and now, standing in front of him, she couldn’t believe he was here. She felt like she was in a dream. It was so unreal. Oh, and he was holding a bouquet of roses."`   
        }
     },
     settings: 
  {
    setting1: "Small Towns",
    setting2: "Big Cities",
    setting3: "Isolated Spaces",
    setting4: "Workplace",
    setting5: "Academic Institution",
    setting6: "Travel Destination",
    setting7: "Historical Settings",
    setting8: "Fantastical World"
  }
 };



   
 const plotVariation = {
    threeActStructure: `Act One: The Setup
Despite being one of three sections in a plot, Act One typically lasts for the first quarter of the story.
Exposition
The exposition is all about setting the stage. The reader (or audience) should get an idea of:
•	who your protagonist is, 
•	what their everyday life is like, 
•	and what’s important to them. 
Of course, nobody’s life is perfect — so the exposition should give readers a sense of the main character's current desires and the challenges that prevent them from getting what they want in life
Example: Dorothy dreams of somewhere over the rainbow
In The Wizard of Oz, Dorothy’s home life in Kansas forms the bulk of the exposition. We see that her family are hard-working farmers and that she has a dog she cares for called Toto. We learn that Dorothy feels misunderstood and under-appreciated.
Inciting Incident
This is the catalyst that sets the protagonist’s adventure in motion. The inciting incident is a crucial beat in the three-act story structure: without it, the story in question wouldn’t exist. The inciting incident proposes a journey to the protagonist that could help them change their situation and achieve their goal.
Author and editor Kristen Kieffer suggests asking yourself the following questions to help you craft the inciting incident:
•	How is my protagonist dissatisfied with their life?
•	What would it take for my protagonist to find satisfaction? (This is their goal).
•	What are my protagonist’s biggest fears and character flaws?
•	How would the actions that my protagonist needs to take to find satisfaction force them to confront their fears and/or flaws?
The catalyst is often called the “call to adventure” and asks your protagonist to push themselves out of their comfort zone. This is where Luke Skywalker receives a distress call from Princess Leia, where Tony Stark is captured by terrorists at the start of Iron Man.
Will the protagonist rise to the challenge, or will they “resist the call” to adventure? After all, going on this journey will have consequences for themselves and those around them. What’s at stake if they fail?
Depending on the character, and their core fears and flaws, you may need to dedicate a few scenes to raise the stakes so that the character has no choice but to accept.
Example: A twister takes Dorothy on an adventure
Dorothy runs away from home and encounters a professor who encourages her to go home. Upon her return, a tornado causes Dorothy to be struck in the head by a window. Her home has been whisked off to the Land of Oz when she wakes up.
Plot Point One
It’s full speed ahead now! No more hemming and hawing for your character: the First Plot Point represents the protagonist’s decision to engage with whatever action the inciting incident has created. It’s when Bilbo Baggins decides to join Gandalf and the band of dwarves for an epic adventure in The Hobbit.
In some stories, the Inciting Incident and Plot Point One happen in the same scene. For instance, in The Hunger Games, Katniss Everdeen’s sister is selected as a ‘tribute’ in the titular games (inciting incident), and Katniss immediately volunteers to take her place (plot point one).
Think of the First Plot Point as the springboard that launches your character into Act Two. 
Example: Dorothy chooses to ease on down the road
Frightened and confused, Dorothy wants to go home and is told by Glinda the Good Witch that the only way is to follow the Yellow Brick Road to the Emerald City where The Wizard lives. Dorothy decides to follow the road, and it’s established the Wicked Witch will try to stop her.
Act Two: Confrontation
Typically the longest of all three sections: Act Two usually comprises the second and third quarters of the story.
Rising Action
Here’s the part where Dorothy waltzes down the Yellow Brick Road to meet Oz who sends her home without a hitch, right?
Nope. This is where the protagonist’s journey — or the pursuit of their goal — begins to take form and where they first encounter roadblocks. The protagonist learns their new surroundings and starts understanding the challenges that lay before them. This is the part of the story where you should better acquaint readers with the rest of the cast (both friends and foes) and the primary antagonist. You will also elaborate on the story’s overarching conflict (whether it’s a person or a thing).
As the protagonist learns more about the road ahead, they’ll change and adapt to have a better chance of achieving their goal. In this way, the main character is usually more reactionary than proactive in the Rising Action phase.
Example: Dorothy makes friends and discovers roadblocks
Dorothy meets the Scarecrow, the Tin Man, and Lion. They travel down the Yellow Brick Road, encountering obstacles such as apple-throwing trees and sleep-inducing poppies.
Midpoint
It’s no big surprise that the Midpoint takes place at… drumroll, please… the middle of the story! A significant event should occur here, usually involving something going horribly wrong.
Return to the protagonist’s main goal to establish what this Midpoint event should be. What must happen for them to feel that their goal is being directly threatened? What could make the character even more acutely aware of the stakes at hand?
Example: The Gang meets up with The Wizard
Dorothy finally reaches the Emerald City and meets with The Wizard, who is a big disappointment. He initially refuses to meet with them, and when he eventually does, he declines to help them until they bring him the Wicked Witch’s broomstick.
Plot Point Two
Our poor protagonist has fallen on hard times. They thought they were making headway on their goal, and then the Midpoint came and threw them off their rhythm.
Give them some time to reflect on the story’s conflict here. The aftermath of the Midpoint crisis will force the protagonist to pivot from being a “passenger” to a more proactive force to be reckoned with. You might want to plan a sequence where the main character’s resolve is bolstered through productive progress on their journey’s goal. Think of Plot Point Two as the pep talk your character needs to stand up straight and get ready to meet their antagonist head-on. They’ll need this confidence to handle what comes next…
Example: The decision to face the Wicked Witch
Dorothy must decide whether to risk heading to the Wicked Witch’s castle or give up on her chance of going home. She and her companions decide to confront the witch.
Act Three: Resolution
The final act typically takes up a quarter of the story — often less.
Pre-Climax
Even the strongest knight has weak spots in their armor: their deep-rooted fears and flaws. As the protagonist has been gearing up to meet the antagonist head-on, their main foe has also been getting stronger and is now ready for battle.
Also called “The Dark Night of the Soul,” the pre-climax starts with the final clash between the protagonist and the antagonist. We’ve experienced the entire journey with the main character — but this is where we get our first glimpse of the antagonist’s true strength, which usually catches the main character off guard. Even though most readers know that the protagonist typically wins the day, we should have some doubt here about how the last act will play out and if the main character will be okay.
Example: All seems to be lost
While on the way to the Wicked Witch’s castle, Dorothy is captured. The Witch finds out that the ruby slippers can’t be taken against Dorothy’s will while she’s alive, so she sets an hourglass and threatens that Dorothy will die when it runs out.
Climax
The climax signifies the final moments of the story’s overarching conflict. Since the antagonist has just hit the protagonist where it hurts in the previous beat, the protagonist has to lick their wounds. Then they face off again, and the main character finally ends the conflict.
The climax itself is normally contained to a single scene, while the pre-climax typically lasts longer and might stretch over a sequence of events.
Example: “I’m melting!”
Dorothy throws a bucket of water on the Scarecrow, who has been set alight. She ends up accidentally dousing the Witch, who melts into a puddle. The guards hand the Witch’s broom to Dorothy.
Denouement
Finally, the dust settles. If the protagonist’s goal is not immediately obtained during the Climax, the denouement is where this should be achieved (or redefined, if their goal changed during Act Three). Along with this, the denouement should also:
•	Fulfill any promises made to the reader. Check out this post on Chekhov’s Gun to learn more about this;
•	Tie up significant loose ends;
•	Underscore the theme; and
•	Release the tension built up during the climactic sequences of events.
If you want to learn more about nailing your story’s resolution, check out this post on how to end a story.
Example: Everyone gets what they need
The Scarecrow receives a diploma, the Tin Man receives a “heart,” and the Lion receives a medal of valor. The Good Witch explains that Dorothy has always had the power to go home; she just didn’t tell her earlier because she wouldn’t have believed it. Dorothy taps her ruby slippers and heads back to Kansas to greet her family lovingly.
`,
    nonlinear: `What Is a Non-Linear Narrative?
A non-linear narrative is a narrative technique in which the storyline is told out of chronological order. That can take many forms: by using flashforwards, flashbacks, dream sequences, or foreshadowing, non-linear plotlines can mimic the recall of human memory, or weave in fantastical elements like time travel or clairvoyance.
Non-linear storytelling goes as far back as the fifth century, with flashbacks peppering the timeline of the Indian epic, the Mahabharata, which tells of two clashing groups of cousins. Homer’s Iliad used a technique called in medias res, where the story starts at its mid-point.
The non-linear is still going strong in the twenty-first century: here are a few new and noteworthy examples.
1. Virginia Woolf's To The Lighthouse follows a family's visit to the Isle of Skye over a ten-year period. Featuring no dialogue and almost no action, the novel unfolds in thoughts, observations, and childhood memories reflected against the present moment.
2. In William Faulkner's The Sound and The Fury, the narrative is pieced together by separate members of a fractured aristocratic family. Each section jumps forward and back in time, covering the events whose ripples have led to the present fate of the family.
3. Kurt Vonnegut, whose book Slaughterhouse-Five utilizes flashback and time travel to illustrate the life of American soldier Billy Pilgrim.
4. Science-fiction writer Ted Chiang's first-person short story, Story of Your Life (which was later made into the film Arrival) examines the existence of free will in the face of the inevitable. Told from the point of view of a Louise, a linguist who learns an alien language that allows her to view her future and comprehend time in a nonlinear way, the story opens with the birth of her daughter; the reader only learns later that she knew the child would die young and still chose to fulfill that destiny.
5.In Audrey Niffenegger's The Time Traveler's Wife, protagonist Henry De Tamble lives with a genetic disorder that forces him to sporadically travel through time with no warning. He falls in love with an artist (who lives an ordinary life on a standard linear timeline) and continues to jump in and out of moments in his own life, sometimes with dangerous consequences.
`};


*/

















 





    
      

