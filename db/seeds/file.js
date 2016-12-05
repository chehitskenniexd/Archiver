var textract = require('textract');
const db = require('../index.js');
var File = require('../models/file.js');
const blobFiles = require('./blob_file.js');

const files = [
  {
    file_name: 'Independence Day',
    file_contents: `Dean Devlin & Roland Emmerich



         AN AMERICAN FLAG

         Oddly still, posted in gray dusty sand.

         WIDEN TO REVEAL:

         EXT. LUNAR SURFACE - THE MOON`
  },
  {
    file_name: 'Independence Day',
    file_contents: `     AN AMERICAN FLAG

     Oddly still, posted in gray dusty sand.

     WIDEN TO REVEAL:

     EXT. LUNAR SURFACE - THE MOON

     One small step for man, one large pile of garbage for moon-
     kind.  Untouched for years, the flag stands next to the
     castoff remains of the Apollo mission.  Slowly the discarded
     equipment begins to RATTLE and SHAKE.

     AN ENORMOUS SHADOW creeps towards us blotting out the horizon,
     a loud RUMBLE is heard.

     Suddenly we are covered in DARKNESS as the SHADOW engulfs us.
     Only the lonely image of our EARTH hangs in the air, until a
     huge silhouetted OBJECT suddenly blocks our view.

                                   CUT TO:

     EXT. NEW MEXICO - RADIO TELESCOPE VALLEY - NIGHT

     A field of large satellite dishes scan the skies.

     Super up: S.E.T.I. INSTITUTE, NEW MEXICO

     INT. INSTITUTE - MONITORING CONTROL CENTER - SAME

     A lone TECHNICIAN works on his putting skills.  Behind him,
     wall to wall technical equipment quietly sifts through data.
     A RED LIGHT begins to flash.

     The Technician turns and slowly walks towards the source.  One
     by one a series of LIGHTS turn on.  The Technician (TECH ONE)
     grabs a pair of headphones.  His eyes widen.`
  },
  {
    file_name: 'Independence Day',
    file_contents: `                                   CUT TO:

     EXT. NEW MEXICO - RADIO TELESCOPE VALLEY - NIGHT

     A field of large satellite dishes scan the skies.

     Super up: S.E.T.I. INSTITUTE, NEW MEXICO

     INT. INSTITUTE - MONITORING CONTROL CENTER - SAME

     A lone TECHNICIAN works on his putting skills.  Behind him,
     wall to wall technical equipment quietly sifts through data.
     A RED LIGHT begins to flash.

     The Technician turns and slowly walks towards the source.  One
     by one a series of LIGHTS turn on.  The Technician (TECH ONE)
     grabs a pair of headphones.  His eyes widen.

     INT. SLEEPING QUARTERS - SAME

     Sleepily a SUPERVISOR picks up the phone.

                    SUPERVISOR
          If this isn't an insanely
          beautiful woman, I'm hanging up.

     INT. CONTROL CENTER - SAME

                    TECH ONE
          Shut up and listen.`
  },
  {
    file_name: 'Independence Day',
    file_contents: `     He holds the phone up to a speaker, increases the volume.  A
     strange FLUCTUATING TONE plays out in sequential patterns.

     INT. SLEEPING QUARTERS - SAME

     HEARING it, the Supervisor BOLTS UP, banging his head on the
     bunk above him.

     INT. CONTROL CENTER - MOMENTS LATER

     A pajama party on acid.  Five other technicians, in various
     states of undress, hover anxiously around the main console.
     The Supervisor enters, tying his robe.

                    SUPERVISOR
          God, I hope it's not just another
          damned Russian spy job.

                    TECH THREE
               (overlapping)
          Negative.  Computer affirms the
          signal is unidentified.

                    TECH TWO
               (hanging up the phone)
          The boy from Air Res Traffic say the
          skies are clear.  No terrestrial
          launches.`
  },
  {
    file_name: 'Independence Day',
    file_contents: `                    SUPERVISOR
          God, I hope it's not just another
          damned Russian spy job.

                    TECH THREE
               (overlapping)
          Negative.  Computer affirms the
          signal is unidentified.

                    TECH TWO
               (hanging up the phone)
          The boy from Air Res Traffic say the
          skies are clear.  No terrestrial
          launches.

                    TECH ONE
          It's the real thing.  A radio
          signal from another world.

     The room becomes quiet as they realize that after years of
     searching the heavens, they might have finally found
     something.

                    SUPERVISOR
          Let's not jump the gun.  Run a
          trajectory source computation.

     Tech Three slides over to another computer.

                    SUPERVISOR (cont'd)
          I want to know exactly where it's
          coming from.

                    TECH THREE
          This can't be right.

     Tech Three just stares at his screen in disbelief.

                    SUPERVISOR
          What's wrong?

                    TECH THREE
          Calculated distance from source is
          at three hundred and eight five
          thousand kilometers.
               (turning to Supervisor)
          It's coming from the moon.

     The Supervisor reaches over and turns up the volume on the
     speaker.  As they listen to the strange TONES we...

                                   CUT TO:

     INT. HALLWAY - PENTAGON - SAME

     Elevator doors OPENS revealing four star GENERAL GREY,
     Commander in Chief U.S. Space Command.  Understandably
     nervous, the COMMANDING OFFICER escorts him down the hall.

                    GENERAL GREY
          Who else knows about this?

                    COMMANDING OFFICER
          S.E.T.I. in New Mexico identified a
          signal but they're even more
          confused than we are.

     The General shoots him a disapproving glance.

                    COMMANDING OFFICER
          Excuse me, Sir.

     He slides his security card through the lock and the doors fly
     open.

     INT. SPACE COMMAND - THE PENTAGON - CONTINUOUS

     Banks of computers, Technicians and assistants working
     feverishly through the night.  The Officers cross the room.

     Super: SPACE COMMAND - THE PENTAGON

                    COMMANDING OFFICER
          Satellite reception has been
          impaired but we were able to get
          these.

     They arrive at a glass table.  The surrounding officers snap
     to attention as a SECOND OFFICER quickly brings over a large
     transparency.  We SEE a grainy image of a large vague OBJECT.

                    GENERAL GREY
          Looks like a big turd.

     The two Officers exchange a glance.

                    COMMANDING OFFICER
          We estimate it has a diameter of
          over five hundred and fifty
          kilometers and a mass roughly one
          fourth the size of our moon.

     The General turns to the Second Officer, concerned.

                    GENERAL GREY
          A meteor?`
  },
  {
    file_name: 'Independence Day',
    file_contents: `                    SECOND OFFICER
          No Sir.  Definitely not.

                    GENERAL GREY
          How do you know?

                    SECOND OFFICER
          Well, er... it's slowing down.

                    GENERAL GREY
          It's doing what?

                    SECOND OFFICER
          It's... slowing down, Sir.

     The General walks over to a phone, picks it up.

                    GENERAL GREY
          Get me the Secretary of Defense.
               (pause)
          Then wake him up.`
  },
  {
    file_name: 'Independence Day',
    file_contents:  `Dean Devlin & Roland Emmerich



     AN AMERICAN FLAG

     Oddly still, posted in gray dusty sand.

     WIDEN TO REVEAL:

     EXT. LUNAR SURFACE - THE MOON

     One small step for man, one large pile of garbage for moon-
     kind.  Untouched for years, the flag stands next to the
     castoff remains of the Apollo mission.  Slowly the discarded
     equipment begins to RATTLE and SHAKE.

     AN ENORMOUS SHADOW creeps towards us blotting out the horizon,
     a loud RUMBLE is heard.

     Suddenly we are covered in DARKNESS as the SHADOW engulfs us.
     Only the lonely image of our EARTH hangs in the air, until a
     huge silhouetted OBJECT suddenly blocks our view.

                                   CUT TO:

     EXT. NEW MEXICO - RADIO TELESCOPE VALLEY - NIGHT

     A field of large satellite dishes scan the skies.

     Super up: S.E.T.I. INSTITUTE, NEW MEXICO

     INT. INSTITUTE - MONITORING CONTROL CENTER - SAME

     A lone TECHNICIAN works on his putting skills.  Behind him,
     wall to wall technical equipment quietly sifts through data.
     A RED LIGHT begins to flash.

     The Technician turns and slowly walks towards the source.  One
     by one a series of LIGHTS turn on.  The Technician (TECH ONE)
     grabs a pair of headphones.  His eyes widen.

     INT. SLEEPING QUARTERS - SAME

     Sleepily a SUPERVISOR picks up the phone.

                    SUPERVISOR
          If this isn't an insanely
          beautiful woman, I'm hanging up.

     INT. CONTROL CENTER - SAME

                    TECH ONE
          Shut up and listen.

     He holds the phone up to a speaker, increases the volume.  A
     strange FLUCTUATING TONE plays out in sequential patterns.

     INT. SLEEPING QUARTERS - SAME

     HEARING it, the Supervisor BOLTS UP, banging his head on the
     bunk above him.

     INT. CONTROL CENTER - MOMENTS LATER

     A pajama party on acid.  Five other technicians, in various
     states of undress, hover anxiously around the main console.
     The Supervisor enters, tying his robe.

                    SUPERVISOR
          God, I hope it's not just another
          damned Russian spy job.

                    TECH THREE
               (overlapping)
          Negative.  Computer affirms the
          signal is unidentified.

                    TECH TWO
               (hanging up the phone)
          The boy from Air Res Traffic say the
          skies are clear.  No terrestrial
          launches.

                    TECH ONE
          It's the real thing.  A radio
          signal from another world.

     The room becomes quiet as they realize that after years of
     searching the heavens, they might have finally found
     something.

                    SUPERVISOR
          Let's not jump the gun.  Run a
          trajectory source computation.

     Tech Three slides over to another computer.

                    SUPERVISOR (cont'd)
          I want to know exactly where it's
          coming from.

                    TECH THREE
          This can't be right.

     Tech Three just stares at his screen in disbelief.

                    SUPERVISOR
          What's wrong?

                    TECH THREE
          Calculated distance from source is
          at three hundred and eight five
          thousand kilometers.
               (turning to Supervisor)
          It's coming from the moon.

     The Supervisor reaches over and turns up the volume on the
     speaker.  As they listen to the strange TONES we...

                                   CUT TO:

     INT. HALLWAY - PENTAGON - SAME

     Elevator doors OPENS revealing four star GENERAL GREY,
     Commander in Chief U.S. Space Command.  Understandably
     nervous, the COMMANDING OFFICER escorts him down the hall.

                    GENERAL GREY
          Who else knows about this?

                    COMMANDING OFFICER
          S.E.T.I. in New Mexico identified a
          signal but they're even more
          confused than we are.

     The General shoots him a disapproving glance.`
  },
  {
    file_name: 'The Nightmare Before Christmas',
    file_contents: `
                                   Story
                                     by
                                 Tim Burton
                              Michael McDowell
                             Caroline Thompson

                                   Lyrics
                                     by
                                Danny Elfman

                                 Screenplay
                                     by
                             Caroline Thompson










                                                         First Draft
                                                       August 5, 1991
`
  },
  {
    file_name: 'The Nightmare Before Christmas',
    file_contents: `     FADE IN:



     PROLOGUE

     CLOSE ON:

     AN OLD-FASHIONED CALENDAR,

     the kind that used to hang in offices in the forties.  Each day
     is a tear-off page.  The dates are printed in bold black
     lettering.

     The pages of days of the year zip off -- at a rate faster than
     the eye can really register.  The impression should be of time
     whizzing by...

     Over this, SANTA CLAUS narrates....

                                 SANTA (V.O.)
               'Twas a long time ago, quite a bit to be fair
                 In a place that I'm sure you are quite unaware.

               For our story that you are about to be told
                 Began in the holiday worlds of old.

               Without holidays, goodness, how dull life would be
                 Without their distraction and pleasure and glee.

     The calendar makes a SUDDEN STOP AT`
  },
  {
    file_name: 'The Nightmare Before Christmas',
    file_contents: `     FADE IN:



     PROLOGUE

     CLOSE ON:

     AN OLD-FASHIONED CALENDAR,

     the kind that used to hang in offices in the forties.  Each day
     is a tear-off page.  The dates are printed in bold black
     lettering.

     The pages of days of the year zip off -- at a rate faster than
     the eye can really register.  The impression should be of time
     whizzing by...

     Over this, SANTA CLAUS narrates....

                                 SANTA (V.O.)
               'Twas a long time ago, quite a bit to be fair
                 In a place that I'm sure you are quite unaware.

               For our story that you are about to be told
                 Began in the holiday worlds of old.

               Without holidays, goodness, how dull life would be
                 Without their distraction and pleasure and glee.

     The calendar makes a SUDDEN STOP AT

     CHRISTMAS.

     The calendar page peels back to reveal the first hint of color in
     the black and white of the year.  Smoke curls up from the chimney
     of a snow-covered cottage in a clearing of a snow-covered pine
     forest.  THE STOP IS ONLY FOR A BEAT.

     Then the calendar speeds on.

                                 SANTA (V.O.) (CONT'D)
               But our holidays are the result of much fuss
               And hard work for the worlds that must make them for us

     The calendar STOPS again.  This time at

     VALENTINE'S DAY.

     This stop is short, but longer than the last -- as each
     subsequent stop will be.

     In Valentine-ville, FAT CUPIDS shoot arrows at distant chocolate-
     dripping hearts: target practice.

                                 SANTA (V.O.) (CONT'D)
               See, each holiday town works all year to create
                 Twenty-four special hours, fantastically great.

     Soon the calendar whirls on.  Next STOP is

     EASTER`
  },
  {
    file_name: 'The Nightmare Before Christmas',
    file_contents: `     EASTER

     where it is spring.  CACKLING HENS sit side-by-side on their long
     row of nests.  In unison, choreographed like some ballet, they
     lay their pre-decorated eggs.

     The eggs then drop down a chute and land on a conveyor belt which
     carries them out ot the henhouse and into waiting Easter baskets.

                                 SANTA (V.O.) (CONT'D)
               Fleeting twenty-four hours take long to prepare,
                 A full year of planning and plenty of care.

               But now getting back to the story at hand
                 I should mention THIS POINT about holiday lands --

     The calendar flips to the

     FOURTH OF JULY.

     FIREWORKS.

     -- ABE LINCOLN fires a cannon.  The cannonball explodes mid-air,
     showering down the word, "HAPPY."

     -- BETSY ROSS uses a SPARKLER to write the word, "FOURTH."

     -- PAUL REVERE sets off the first of six rockets.  Rocket #1
     erupts into an "O."  #2 traces an "F" -- together they read "OF."
     Rocket #3 won't light.  Neither will #4, #5, or #6.  Paul Revere
     panicks.

     But PAUL REVERE'S HORSE saves the day.  He kicks off his
     horseshoes -- shooting them at the side of a wooden fence.  As
     they hit the boards each becomes a letter: "J," "U," "L," "Y."

                                 SANTA (V.O.) (CONT'D)
               For each one, way back when, was alas unaware
               Of the others' existence, now I've said it -- so there!

     The calendar pages tear on, slowing at October 29, slowing more
     at, and stopping at the 31st.

                                 SANTA (V.O.) (CONT'D)
               But once there occurred a calamity SO GREAT!
                 When two of the worlds did collide by mistake...

     The october 31st page peels back to... nothing.  To BLACK.  We
     fall in, or perhaps it should feel more like we're swallowed up.
`
  },
  {
    file_name: 'The Nightmare Before Christmas',
    file_contents: `     TITLE SEQUENCE.

     Carved JACK O'LANTERNS come at us in the long tunnel of darkness.
     Collision seems inevitable, but in the instant before we would
     slam into them, the jack o'lanterns veer off, turning to display
     the various credits on their uncarved backsides.

     When the last jack o'lantern zooms toward us, it doesn't veer
     off.  It keeps coming and fast.  Rather than collide with it
     though -- we fall straight into one of the PUMPKINHEAD'S CARVED-
     OUT, TRIANGULAR EYES into the further black there and out...

     A CRYPT DOOR

     which opens onto the

     EXT. HALLOWEENLAND CEMETERY. NIGHT.
`
  },
  {
    file_name: 'The Nightmare Before Christmas',
    file_contents: `     >>>>> THIS IS HALLOWEEN

                                 PUMPKINHEAD
                      Boys and Girls of every age
                      Wouldn't you like to see something strange?
                      Come with us and you will see...
                      This our town of Halloween!

     Pumpkinhead has reached the

     PUMPKIN PATCH

     where he drops down among his fellow pumpkins -- who all wake up
     at once -- sudden jack o'lantern mouths and eyes glowing wide for
     the chorus...

                                 PUMPKIN PATCH CHORUS
                      This is Halloween, this is Halloween!
                        Pumpkins scream in the dead of night --
                      This is Halloween, everybody make a scene
                        Trick or treat 'til the neighbors gonna die of fright!

     EXT. HALLOWEEN TOWN. NIGHT/CONTINUOUS TIME.

     Beyond the graveyard lies the little city of odd expressionist
     angles and the morbid extravaganza of Gothic manses.

                                 PUMPKIN PATCH CHORUS (V.O.) (CONT'D)
                      It's our town.  Everybody scream.
                        In this town of Halloween...

     We swoop down the street, through the creaky iron gate of a...

     EXT. DESERTED GOTHIC MANSE. NIGHT/CONTINUOUS TIME.

     We enter THROUGH A BROKEN, COBWEB-CLOGGED WINDOW into...

     INT. DESERTED GOTHIC MANSE. NIGHT/CONTINUOUS TIME.

     Many CREATURES hide in the shadows of this creepy house.  The
     camera finds them...

                                 CREATURE #1
                      I am the one hiding under your bed,
                        Teeth ground sharp and eyes glowing red.

                                 CREATURE #2
                      I am the one hiding under your stairs
                        Fingers like snakes and spiders in my hair.

     IN THE MANSE'S DECAYED PARLOR,

     every item of furniture that could conceivably serve as a coffin
     springs open -- the grandfather clock, the window seat, the sofa,
     the chaise longe, the hearth rug (covering a trap door), the
     drawers of a sideboard and out pop

     CORPSES.

     The Corpses sit bolt upright and heartily sing:

                                 CHORUS OF CORPSES
                      This is Halloween, this is Halloween,
                        Halloween...(etc)

     THE MANSE'S FALLING DOWN FRONT HALL

     is tenuously illuminated by a tarantula chandelier which clings
     to the ceiling overhead and lowers and rises according to the
     whims of its web.

     FOUR BIG VAMPIRES

     lumber in from the dark, slanty hallways that fan off the
     entrance hall.  They march in and, in formation, march OUT THE
     FRONT DOOR onto the ruins of--

     EXT. WORM-ROTTED FRONT PORCH. NIGHT/CONTINUOUS TIME

     The Vampires' bodies are huge, but their heads are small like
     insect heads and the voices that come out of heads are little,
     squeaky and high.

                                 VAMPIRES
                      In this town, we call home,
                        Everyone hail to the pumpkin song!

     As they sing they march down the rickety steps.  Out on the--

     EXT. STREET. NIGHT/CONTINUOUS TIME.

     A HEARSE passes the Manse.  Riding on top is the corpulent MAYOR
     of Halloweenland.  Not surprisingly, he's a TWO-FACED SORT OF
     GUY, revealed as each of his faces sings a line:

                                 MAYOR
                      In this town, don't we love it now
                        Everybody's waiting for the next surprise.

     While the hearse turns a

     CORNER

     and glides past an ALLEY we hear a GRAVELLY VOICE:

                                 GRAVELLY VOICE
                      'Round that corner, man,
                        Hiding in a trashcan
                      Something's waiting now to pounce and how you'll--

     The lid flies off of a trashcan and out pops the GRAVELLY-VOICED
     TRASHCAN-DWELLING MONSTER.  He's fat and slimy and grotesque.

                                 GRAVELLY-VOICED
                                 TRASHCAN-DWELLING MONSTER
                      -- Scream!  This is Halloween,
                         Red 'n black, slimy green...
                      Aren't you scared?  Well, that's just fine!

     WITCHES speed toward us on their brooms -- zipping out of the alley.

                                 WITCHES
                      Say it once, say it twice,
                        Take the chance and roll the dice
                      Ride with the moon in the dead of night (oh)

     At the street, the witches fan out and swoop past the

     HANGING TREE,

     a gigantic oak with SEVERAL HANGED MEN dangling from its broad,
     outspread branches.

     The hanging tree itself sings:

                                 HANGING TREE
                      Everybody scream, everybody scream
                        In our town of Halloween.

     The hanged men suddenly revive:

                                 HANGED MEN
                      This is Halloween, This is Halloween...

     EXT. ANOTHER STREET. NIGHT.

     A LUMPEN-LOOKING LONG-HAIRED WOMAN IN HEELS hurries away down a
     tortuously windy street.  This is SALLY.  For now, we see only
     her backside, her waist-length hair.

     Behind her, and closer to us, a GHOUL tips into view to
     demonstrate his particular talent:

                                 GHOUL
                      I am the guy with the tearaway face...

     Sally hesitates, listening.

                                 GHOUL (CONT'D)
                      Here in a flash and gone without a trace.

     Sally is about to turn around, but as the ghoul vanishes, she
     continues on her way.  We follow her.

     In a moment, a SECOND GHOUL sets upon her -- this one more
     gruesome than the last.

                                 SECOND GHOUL
                      I am the who when you call --

     This ghoul is closer, louder and Sally does turn around now --
     revealing that she's a crudely stitched together Bride Of
     Frankenstein Rag Doll.  Her balance is precarious.  Her arms
     flop.  Her mouth is a tragic slash.  She has a quavering, little
     voice:

                                 SALLY
                                              -- Who's there?

     But the second ghoul has disappeared before she sees him.  Only
     his voice remains...

                                 SECOND GHOUL'S VOICE
                      I am the wind blowing through your hair.

     Invisible fingers lift Sally's long hair.  It is with pathetic
     eagerness that she looks around for whomever is responsible for
     this.

     A THIRD GHOUL

     springs into view, then bounces skyward.  With a very
     disappointed Sally (she's sorry he's leaving), we watch him go up
     into...

     EXT. SKY. NIGHT/CONTINUOUS TIME.

     The Third Ghoul seems to reach the moon.

                                 THIRD GHOUL
                      I am the shadow on the moon at night,
                        filling your dreams to the brim with fright.

     As the Third Ghoul passes the orange disk of the moon,

     BATS`
  },
  {
    file_name: 'Pulp Fiction',
    file_contents: `
"PULP FICTION"

By

Quentin Tarantino & Roger Avary



PULP [pulp] n.

1. A soft, moist, shapeless mass or matter.

2. A magazine or book containing lurid subject matter and
being characteristically printed on rough, unfinished paper.

American Heritage Dictionary: New College Edition

INT. COFFEE SHOP � MORNING
`
  },
  {
    file_name: 'Pulp Fiction',
    file_contents: `A normal Denny's, Spires-like coffee shop in Los Angeles.
It's about 9:00 in the morning. While the place isn't jammed,
there's a healthy number of people drinking coffee, munching
on bacon and eating eggs.

Two of these people are a YOUNG MAN and a YOUNG WOMAN. The
Young Man has a slight working-class English accent and,
like his fellow countryman, smokes cigarettes like they're
going out of style.

It is impossible to tell where the Young Woman is from or
how old she is; everything she does contradicts something
she did. The boy and girl sit in a booth. Their dialogue is
to be said in a rapid pace "HIS GIRL FRIDAY" fashion.

YOUNG MAN
No, forget it, it's too risky. I'm
through doin' that shit.

YOUNG WOMAN
You always say that, the same thing
every time: never again, I'm through,
too dangerous.

YOUNG MAN
I know that's what I always say. I'm
always right too, but `
  },
  {
    file_name: 'Pulp Fiction',
    file_contents: `YOUNG WOMAN
� but you forget about it in a day
or two -

YOUNG MAN
� yeah, well, the days of me
forgittin' are over, and the days of
me rememberin' have just begun.

YOUNG WOMAN
When you go on like this, you know
what you sound like?

YOUNG MAN
I sound like a sensible fucking man,
is what I sound like.

YOUNG WOMAN
You sound like a duck.
(imitates a duck)
Quack, quack, quack, quack, quack,
quack, quack...

YOUNG MAN
Well take heart, 'cause you're never
gonna hafta hear it again. Because
since I'm never gonna do it again,
you're never gonna hafta hear me
quack about how I'm never gonna do
it again.

YOUNG WOMAN
After tonight.

The boy and girl laugh, their laughter putting a pause in
there, back and forth.

YOUNG MAN
(with a smile)
Correct. I got all tonight to quack.

A WAITRESS comes by with a pot of coffee.

WAITRESS
Can I get anybody anymore coffee?

YOUNG WOMAN
Oh yes, thank you.

The Waitress pours the Young Woman's coffee. The Young Man
lights up another cigarette.

YOUNG MAN
I'm doin' fine.

The Waitress leaves. The Young Man takes a drag off of his
smoke.

The Young Woman pours a ton of cream and sugar into her
coffee.

The Young Man goes right back into it.

YOUNG MAN
I mean the way it is now, you're
takin' the same fuckin' risk as when
you rob a bank. You take more of a
risk. Banks are easier! Federal
banks aren't supposed to stop you
anyway, during a robbery. They're
insured, why should they care? You
don't even need a gun in a federal
bank. I heard about this guy, walked
into a federal bank with a portable
phone, handed the phone to the teller,
the guy on the other end of the phone
said: "We got this guy's little girl,
and if you don't give him all your
money, we're gonna kill 'er."
`
  },
  {
    file_name: 'Pulp Fiction',
    file_contents: `YOUNG WOMAN
Did it work?

YOUNG MAN
Fuckin' A it worked, that's what I'm
talkin' about! Knucklehead walks in
a bank with a telephone, not a pistol,
not a shotgun, but a fuckin' phone,
cleans the place out, and they don't
lift a fuckin' finger.

YOUNG WOMAN
Did they hurt the little girl?

YOUNG MAN
I don't know. There probably never
was a little girl � the point of the
story isn't the little girl. The
point of the story is they robbed
the bank with a telephone. `
  },
  {
    file_name: 'Raiders of the Lost Ark',
    file_contents: `RAIDERS OF THE LOST ARK
Screenplay by
Lawrence Kasdan
Story by
George Lucas
REVISED THIRD DRAFT AUGUST 1979`
  },
  {
    file_name: 'Raiders of the Lost Ark',
    file_contents:  `This screenplay is the property of
MEDWAY PRODUCTIONS, INC.
And is intended solely for company
Personnel. Distribution to any
Unauthorized persons is prohibited.
MEDWAY PRODUCTIONS, INC.
P.O. BOX 8669
Universal City, CA. 95608
(213) 760-3800`
  },
  {
    file_name: 'Raiders of the Lost Ark',
    file_contents: `FADE IN:
1 EXT. PERU - HIGH JUNGLE - DAY 1
The dense, lush rain forests of the eastern slopes of the
Andes, the place known as “The Eyebrow of the Jungle”.
Ragged, jutting canyon walls are half-hidden by the thick
mists.
The MAIN TITLE is followed by this:
PERU
1936
A narrow trail across the green face of the canyon. A group
of men make their way along it. At the head of the party is
an American, INDIANA JONES. He wears a short leather jacket,
a flapped holster, and a brimmed felt hat with a weird
feather stuck in the band. Behind him come two Spanish
Peruvians, SATIPO and BARRANCA. Bringing up the rear are five
Yagua INDIANS. They act as porters and are wrangling the two
heavily-packed llamas. The Indians become increasingly
nervous. They speak to each other in bursts of Quechua. The
American, who is known to his friends as Indy, glances back
at them.
BARRANCA
(irritated)
They’re talking about the Curse
again!
He turns and yells at the Indians in Quechua, his anger
giving an indication of his own fears. The party reaches a
break in the canyon wall and takes the trail through it.
When they emerge, their destination is revealed to them in
the distance. Beyond a thick stand of trees is the vegetationenshrouded
TEMPLE OF THE CHACHAPOYAN WARRIORS, 2000 years
old.
The entire party is struck by the sight. The Indians,
terrified now, chatter away. Suddenly the three at the back
turn and run, dropping their packs as they go. Barranca yells
at the fleeing Indians and pulls his pistol out. He starts to
raise his arm to aim but Indy restrains it in a muscular `
  },
  {
    file_name: 'Raiders of the Lost Ark',
    file_contents: `INDY
No.
Barranca looks evilly at Indy’s hand upon him. Indy releases
him and smiles in a friendly way.
2.
INDY
We don’t need them.
Satipo watches this confrontation with some concern.
BARRANCA
I do not carry supplies.
INDY
We’ll leave them. Once we’ve got
it, we’ll be able to reach the
plane by dusk.
He turns back to the trail. Satipo gets the `
  },
  {
    file_name: 'Raiders of the Lost Ark',
    file_contents: `He turns back to the trail. Satipo gets the two remaining
Indians moving behind Indy. Satipo and Barranca then have a
fast, silent communication: Barranca indicates his desire to
slit Indy’s throat; Satipo gives him a look that says “Be
patient, you idiot”
2 THE APPROACH TO THE TEMPLE 2
The party fans out to fight their way through the entwined
trees that guard the temple. Visibility is cut to five feet
in the heavy mist. Satipo extracts a short, native dart from
a tree and examines the point gingerly.`
  },
  {
    file_name: 'Raiders of the Lost Ark',
    file_contents: `SATIPO
(showing Indy)
The Hovitos are near. The poison is
still fresh...three days. They’re
following us, I tell you.
INDY
If they knew we were here, they
would have killed us already.
The two Indians jabber in Quechua, near hysteria. Barranca is
sweating profusely, eyes darting. He yells at the Indians in
Quechua to “shut up”.
In the undergrowth, there is slithering movement.
Indian #1 draws aside a branch and is face with a horrific
stone sculpture of a Chachapoyan demon. The Indian is so
frightened no sound comes out when he screams. He turns and
runs silently away.
Indian #2 calls to his friend. Getting no response, he steps
in that direction. A huge macaw, flushed from the
undergrowth, screams and flies away. Indian #2 does exactly
the same thing, never to be seen again.`
  },
  {
    file_name: 'Raiders of the Lost Ark',
    file_contents: `Indy, Satipo and Barranca, just clearing the trees, look back
in that direction. They all turn to face the Temple.
It is dark and awesome. Vegatation curls from every crevice,
over each elaborate frieze. The entrance - round, open and
black - has been designed to look like open jaws.
INDY
So this is where Forrestal cashed
in.
SATIPO
A friend of yours?
INDY
Competitor. He was good, very good.
BARRANCA
(nervous)
No one has ever come out of there
alive. Why`
  },
  {
    file_name: 'Jaws',
    file_contents: `J A W S

Final Draft Screenplay

by

PETER BENCHLEY

PROD. #02074                                 PRODUCERS:
RICHARD ZANUCK
                                           DAVID BROWN
`
  },
  {
    file_name: 'Jaws',
    file_contents: ` JAWS

1    OVER BLACK
     1

     Sounds of the innerspaces rushing forward.

     Then a splinter of blue light in the center of the picture.
     It breaks wide, showing the top and bottom a silhouetted
     curtain of razor sharp teeth suggesting that we are inside
     of a tremendous gullet, looking out at the onrushing under-
     sea world at night.  HEAR a symphony of underwater sounds:
     landslide, metabolic sounds, the rare and secret noises that
     certain undersea species share with each other.

                                   CUT TO

2    EXT. LIGHTHOUSE - NIGHT
     2

     Caught in its blinding flash, the light moves on, fingering
     the fog.  A lone buoy dongs somewhere out at sea.

3    EXT. AMITY MAINSTREET - NIGHT
     3

     The quaint little resort town is quiet in the middle of the
     night.  A ground fog rounds a corner and begins spreading
     toward us.  It fills over sidewalks and streets like some
     Biblical plague.

4    EXT. THE SOUTH SHORE OF LONG ISLAND - NIGHT
     4

     It is a pleasant, moonlit, windless night in mid-June.  We see
     a long straight stretch of white beach.  Behind the low dunes
     are the dark shapes of large expensive houses.  The fog that
     has reached Amity proper is seen only as a low-hanging cloud
     that is pushing in from the sea.  HEAR a number of voices sing-
     ing.  It sounds like an Eastern University's Alma Mater.

5    ANOTHER ANGLE - BEACH                             `
  },
  {
    file_name: 'Jaws',
    file_contents: `5    ANOTHER ANGLE - BEACH
     5

     A bonfire is blazing.  Gathered around it are about a dozen
     young men and women who are merrily trading fight songs from
     their respective universities.  Two young people break away
     from the circle, Chrissie almost pulling a drunk and disorderly
     Tom Cassidy behind her.

6    CLOSEUP - CASSIDY
     6

     makes a clumsy try at kissing Christina but she laughs and
     ducks away.

7    ANOTHER PART OF THE BEACH
     7

     The fire, now one hundred yards in the b.g., silhouettes
     Chrissie running up a steep dune.  Once there, she pauses to
     look at the ocean that we can only hear.  Cassidy plods up
     the dune behind her, grossly out of shape.

     Chrissie runs down a few steps, leaving Tom Cassidy reeling
     on the summit.  Chrissie's dress, bra and panties fly toward
     Tom, who can't make a fist to catch them.  The dress drapes
     over one half of his head.  Soggily aroused, Cassidy struggles
     to get his shoe off.

     But Chrissie is already in full flight toward the shore.  In
     she goes, a delicate splash, surfacing in a cold ocean that is
     unusually placid.  Chrissie pulls with her arms, drawing
     herself into deeper water.

     That's when we see it.  A gentle bulge in the water, a ripple
     that passes her a dozen feet away.  A wave of pressure lifts
     her up and eases her down again.  Her face shows the beginning
     of fear.  Maybe it's Tom.  She smiles and looks around for him,
     then her eyes go to the beach where Tom -- too drunk to stand
     -- one pantleg off, is struggling with his other shoe.  Chrissie
     turns and starts for shore.`
   },
  {
    file_name: 'Jaws',
    file_contents: `8    CLOSE - CHRISSIE
     8

     Her expression freezes.  The water-lump is racing for her.
     It bolts her upright, out of the water to her hips, then slams
     her hard, whipping her in an upward arc of eight feet before
     she is jerked down to her open mouth.  Another jolt to her
     floating hair.  One hand claws the air, fingers trying to
     breathe, then it, too, is sucked below in a final and terrible
     jerking motion.  HOLD on the churning froth of a baby whirl-
     pool until we are sure it is over.

9    ANGLE - CASSIDY
     9

     in his undershorts, laughing, turning in slow stoned circles,
     a prisoner in his orange windbreaker that seems to have him
     in a full Nelson.  He stumbles to his knees.

10   INTERIOR - MARTIN BRODY'S BEDROOM - DAWN
     10

     ALARM CLOCK-RADIO

     giving weather bulletin:  marina weather, westerly winds,
     light chop, etc.

     A pair of bumps under the bedsheets.  There is a rustling
     and two stockinged feet swing up and settle heavily on the
     floor.  Follow them as the pad along from hardwood floor
     to bathroom tile.  A light pops on and the feet arrive at a
     scale, board it.

11   INSERT - SCALE DIAL
     11

     In a blur it goes to 191.  Then, as if by magic, the numbers
     float backward to 160.

12   ANGLE
     12

     Martin Brody at forty-two, stands rigid, lifting himself
     from the sink counter-top with both hands.  Satisfied, he
     turns toward the mirror, squinting in the light, measuring
     himself up and down.  Advancing waistline, receding hairline.
     Gray around the ears.  Martin Brody makes another silent
     promise to get his act together -- tomorrow.

     He reaches for the sliding mirror and opens the medicine
     cabinet.  There is a travel brochure of Arizona attached
     to the shelf.  Brody shakes his head and removes it.  He
     closes the mirror which now reflects his wife, Ellen Brody,
     pert and poised off to one side.`
   },
  {
    file_name: 'Jaws',
    file_contents: `     Brody hears a SCREAM from the water.  He cranes his neck past
     Max's wife in order to see.

38   BRODY'S POINT OF VIEW
     38

     A young lady is being pulled underwater to her hair.  Instantly,
     she is jerked up again -- sitting on her boyfriend's shoulders,
     laughing hysterically.

                       BRODY
             What?

                       MAX
             What?

                       BRODY
             Did you say something?

                       MAX
             No -- yeah, I was wondering if it's
             true.  That you sit in your car
             the whole while over on the
             mainland ferry.

39   BRODY'S POINT OF VIEW
     39

     His son Michael along with sever other boys rush headlong
     into the gentle surf with their inflatable rubber rafts.
     Another youngster, Alex Kintner gathers up his Day-Glow yellow
     raft, but his mother takes issue and a tug-of-war ensues.

     Overlapping dialogue:

             MAX'S WIFE               ALEX
     What a terrible thing to say. Please let me take my
                         raft, Mom!
             MAX
     C'mon Penny, I'm not ashamed          MOTHER
     to admit that when I fly, my  Let me see your fingertips.
     feet sweat right through my       (he holds them out)
     socks.                   They're beginning to prune.
                         Ten more minutes.

40   BRODY'S POINT OF VIEW
     40

     The fat woman is going out too far.

                       ALEX' VOICE
             Fifteen!

     We stay on the fat woman, almost hypnotically.

                       DENHERDER'S VOICE
             I can't believe it!  Brody!`
  },
  {
    file_name: 'Jaws',
    file_contents: `85   ANGLE - HARRY'S BOAT
     85

     Three men are aboard, one holding a rod which holds a fast
     arc.  A few yards off stern we see a triangular dorsal fin
     crossing back and forth, struggling, jerking, the mighty tail
     threshing.  One man is screaming success, the other two slapping
     the angler on the back.

86   CLOSE - PRATT AND FELIX
     86

     They spot it and sour.

                       PRATT
             Well, get over there! He ain't
             caught it yet!

     The owner of Pratt's boat throws it forward and Pratt removes
     a .45 automatic from the holster of his belt.  He tests it,
     firing once in the air.  As they near the scene of the struggle,
     eleven other boats begin converging, until ---

87   HARRY'S BOAT
     87
`
  },
  {
    file_name: 'Jaws',
    file_contents: `     Everyone wants to get into the act.  They are attacking the
     threshing beast with all they've got.  Pratt uses his auto-
     matic, another blasts point blank with a shotgun.  There are
     occasional water ricochets and the bounty hunters duck from
     time to time as bullets skip by.  Finally, the shark stops
     threshing.

88   FELIX AND PRATT
     88

     Their boat has moved close to the shark, closer than Harry's.

                       PRATT
                  (exultant)
             Hand me that pole!  Quick!

     One of his party in the over-filled boat grabs a gaff and
     leans out to grab the moribund shark.  But Harry won't give
     up the line, still reeling in.

                       HARRY
             Beat it!  I hooked him!

                       PRATT
             How's the family, Harry?
                  (to the man with gaff)
             Go on and do it!

                       MAN WITH GAFF
             We split down the middle?

     Pratt nods reluctantly.  The man swings, lodges the gaff and
     hauls the shark up onto the gunwale.  A paroxysm of cheers
     from the surrounding boats.  Smoke flares are fired into
     the air.`
  },
  {
    file_name: 'Dawn of the Dead',
    file_contents: `DAWN OF
THE DEAD
(The working draft 1977)
by George A. Romero


1    We see the face of a young woman. She is asleep. It is very
     quiet at first, as credits appear. The woman's face begins to
     twitch, as though she is having a bad dream. She moans slightly
     and her expression grows more desperate.

     A mix of subtle sounds begin to fade in. As they get louder, we
     can discern what sounds like a busy office area. It is actually
     a frantic television studio with the hum of panic in a national
     emergency.

     The woman's moans get louder and more desperate as the
     background sounds reach full volume and the credits stop. The
     woman sits up, snapping awake.

2    She lurches forwards into the arms of a strong young man. She is
     Francine, twenty three years old and very attractive, although
     she is gritty with dirt. Her hair is hanging, dishevelled and
     sweaty. Her jeans and blouse have been worn for several days.

     She is sitting on the floor, where she has slept the last
     several hours, covered by an old overcoat.

     Tony:     YOU OK?

     Fran stares at the young man. She is shaking. She doesn't speak.

     Tony:     THE SHIT'S REALLY HITTING THE FAN.

     The girl tries to clear her head as the young man moves on to
     where others sleep on the floor. He wakes them up one at a time.
     We begin to hear voices over the busy hum of the studio. They
     have an electronic tinniness, as broadcast over a monitor. Fran
     looks about. She is still shaken from her dream.

3    We see the television studio. Reporters buzz about madly.
     Everybody looks dishevelled and exhausted. Technicians man
     monitors, and we see people on the little screens, arguing
     emotionally.`
  },
  {
    file_name: 'Dawn of the Dead',
    file_contents: `4    Voice:    WHAT'S MAKING IT HAPPEN? WHAT THE HELL
               DIFFERENCE DOES IT MAKE, WHAT'S MAKING IT
               HAPPEN.

     Voice:    YES, BUT THAT'S...

     Voice:    THAT'S A WHOLE OTHER STUDY. THEY'RE TRYING...

     Voice:    BUT IF WE KNEW THAT, WE COULD...

     Voice:    WE DON'T KNOW THAT! WE DON'T KNOW THAT!
               WE'VE GOTTA OPERATE ON WHAT WE DO KNOW!

5    The room is pandemonium. People run in with wire copy; others
     organise the stacks of bulletins as they arrive. Others trip
     over cables and generally get in each other's way.

6    Francine stares at the madness, still trying to clear her head.

     Man's voice: I'M STILL DREAMING.

     Fran turns her head. Another young man sits next to her on the
     floor. He is one of the ones Tony awakened.`
  },
  {
    file_name: 'Dawn of the Dead',
    file_contents: `     Fran:     NO YOU'RE NOT.

     Woman:    MY TURN WITH THE COAT.

     Fran looks up. A young woman is offering her coffee in a paper
     cup. She is next in line for the overcoat and a few hours sleep.
     Fran takes the coffee and struggles to her feet.

     Woman:    THE GUYS ON THE CREW ARE GETTING CRAZY.
               A BUNCH OF 'EM FLEW THE COOP ALREADY.
               I DON'T KNOW HOW MUCH LONGER WE'LL BE ABLE
               TO STAY ON AIR.

7    Fran staggers over to the control consoles. The technicians are
     at the end of their ropes.

     Technicians: (all at once)
               WATCH CAMERA TWO...WHO THE HELL'S ON CAMERA
               TWO, A BLIND MAN...
               WATCH THE FRAME...WATCH THE FRAME...
               ROLL THE RESCUE STATIONS AGAIN.

     Technicians: WE GOT A REPORT THAT HALF THOSE RESCUE
               STATIONS HAVE BEEN KNOCKED OUT.
               SO GET ME A NEW LIST.
               SURE, I'LL PULL IT OUTA MY ASS.

     Fran focuses on the monitors. She is incredulous... stunned by
     the madness which surrounds her. She realises the hopelessness
     of the situation as she zeroes in on the televised conversation.

8    We begin to listen over the din of the news room.

     TV Man 1:    I DON'T BELIEVE THAT, DOCTOR, AND I DON'T
               BELIEVE...

     TV Man 2:    DO YOU BELIEVE THE DEAD ARE RETURNING TO
               LIFE?

     TV Man 1:    I'M NOT SO...

     TV Man 2:    DO YOU BELIEVE THE DEAD ARE RETURNING TO
               LIFE AND ATTACKING THE LIVING?

     TV Man 1:    I'M NOT SO SURE WHAT TO BELIEVE DOCTOR!

9    Suddenly we cut into the studio, and we see the argument as it
     is being shot.`
  },
  {
    file_name: 'Dawn of the Dead',
    file_contents: `     TV Man 1:    (con't)
               ALL WE GET IS WHAT YOU PEOPLE TELL US.
               AND IT'S HARD ENOUGH TO BELIEVE...

     TV Man 2:    IT'S FACT... IT'S FACT...

     TV Man 1:    IT'S HARD ENOUGH TO BELIEVE WITHOUT YOU
               COMING IN HERE AND TELLING US WE HAVE TO
               FORGET ALL HUMAN DIGNITY AND...

     TV Man 2:    HUMAN DIG... YOU CAN'T...

     TV Man 1:    ...FORGET ALL HUMAN DIGNITY...

     TV Man 2:    YOU'RE NOT RUNNING A TALK SHOW HERE, MR.
               BERMAN...YOU CAN FORGET PITCHING AN AUDIENCE
               THE MORAL BULL SHIT THEY WANT TO HEAR!

     TV Man 1:    YOU'RE TALKING ABOUT ABANDONING EVERY HUMAN
               CODE OF BEHAVIOUR, AND THERE'S A LOT OF US
               WHO AREN'T READY FOR THAT DOCTOR FOSTER...
`
  },
  {
    file_name: 'Dawn of the Dead',
    file_contents: `10    A great cry of assent goes up from the studio floor. Doctor
     Foster is flustered and frustrated. The stage hands and
     cameramen are all screaming at him, swearing and ridiculing. We
     notice Police guards, armed, at the studio doors. They control
     the traffic in and out of the big room.

11    Back at the control panel. Fran stares at the screens. Confusion
     still reigns.

     Man:  FRANNIE, GET ON THE NEW LIST OF RESCUE STATIONS.
               CHARLIE'S RECEIVING ON THE EMERGENCIES...

     Fran pulls herself away from the monitors as the argument rages
     on screen.

12    She fights through the heavy traffic and reaches Charlie, a
     harassed typist who holds the receiver of an emergency radio
     unit under his chin...

     Charlie:  (into receiver)
               SAY AGAIN...CAN'T HEAR YOU...

     Fran:     RESCUE STATIONS?`
  },
  {
    file_name: 'Dawn of the Dead',
    file_contents: `     Fran leafs through sheets of paper on Charlie's desk. He writes
     notes as he listens on the receiver, and he speaks to the woman.

     Charlie:  HALF THOSE ARE INOPERATIVE ANY MORE.
               I'M TRYIN' TO FIND OUT AT LEAST ABOUT THE
               IMMEDIATE AREA. WE'VE HAD OLD INFORMATION
               ON THE AIR FOR THE LAST TWELVE HOURS.

     Fran:     THESE ARE RESCUE STATIONS. WE CAN'T SEND
               PEOPLE TO INOPERATIVE...

     Charlie:  (into receiver)
               SAY AGAIN, NEW HOPE...

     Charlie makes more notes and hands them to Fran. Still listening
     on the receiver, he speaks to the woman again.

     Charlie:  I'M DOIN' WHAT I CAN. THESE ARE DEFINITE
               AS OF NOW. SKIP AND DUSTY ARE ON THE RADIO,
               TOO. GOOD LUCK.

     Fran snatches up the sheets and moves across the room.

13    She stops at the consoles...

     Fran:     I'M GONNA KNOCK OFF THE OLD RESCUE STATIONS.
               I'LL HAVE THE NEW ONES READY AS SOON AS I CAN.

     Technician:  WE'RE SENDING PEOPLE TO PLACES THAT HAVE
               CLOSED DOWN. I'M GONNA KILL THE OLD LIST.

14    Fran moves toward another control room. An armed officer stops
     her. A young man rushing through with copy intercedes.

     Man:  HEY, SHE'S ALRIGHT.
`
  },
  {
    file_name: 'Dawn of the Dead',
    file_contents: `     Officer:  WHERE'S YOUR BADGE?

     Fran reaches instinctively for the lapel of her blouse. Her
     badge is missing.

     Fran:     JESUS!

     Man:  SHE'S ALRIGHT.

     Fran:     I HAD IT...I WAS ASLEEP OVER THERE...

     She makes a move toward the corner where she was asleep.

     Man:  SOMEBODY STOLE IT. THERE'S A LOT OF 'EM
               MISSING.
               (to officer)
               SHE'S ALRIGHT. LET HER THROUGH.

     The officer reluctantly steps aside.

15    The young man and Fan move down a crowded hall and into a small
     camera room. The foot traffic is solid. They talk as they walk.

     Fran:     I DON'T BELIEVE IT.

     Man:  ONE OF THOSE LITTLE BADGES CAN OPEN A LOT
               OF DOORS...YOU AVOID A LOT OF HASSLES IF
               YOU GOT A BADGE...ANY KIND OF BADGE...

     Fran:     IT'S REALLY GOING CRAZY.

16    They reach a small camera installation. The camera is aimed at a
     machine which rolls out a list of rescue stations. The list is
     superimposed over the live broadcast as it goes out.

     Cameraman:   YOU GOT NEW ONES?

     Fran:     I GOTTA TYPE 'EM UP. KILL THE OLD ONES.

     Cameraman:   GIVENS WANT 'EM...

     Fran:     KILL 'EM, DICK. TELL GIVENS TO SEE ME!

     The man clicks off his camera. Fran moves toward the studio.

17    On the monitors, we see the rescue stations blink off over shots
     of the two men who still argue on the air.

     TV Man 1:    WELL I DON'T BELIEVE IN GHOSTS, DOCTOR.

     TV Man 2:    THESE ARE NOT GHOSTS. NOR ARE THESE HUMANS!
               THESE ARE DEAD CORPSES. ANY UN-BURIED HUMAN
               CORPSE WITH ITS BRAIN INTACT WILL IN FACT
               RE-ACTIVATE. AND IT'S PRECISELY BECAUSE OF
               INCITEMENT BY IRRESPONSIBLE PUBLIC FIGURES
               LIKE YOURSELF THAT THIS SITUATION IS BEING
               DEALT WITH IRRESPONSIBLY BY THE PUBLIC AT
               LARGE!

18    Another outraged cry goes up from the stagehands and observers.
     Doctor Foster tries to out-scream the cries...

     TV Man 2:    YOU HAVE NOT LISTENED...YOU HAVE NOT LISTENED...
               FOR THE LAST THREE WEEKS...WHAT DOES IT TAKE...
               WHAT DOES IT TAKE TO MAKE PEOPLE SEE?

19    Fran moves into the large studio area where the broadcasters
     argue. The commotion is maddening. Fran stares for a moment.

20    TV Man 2:    (now distraught...almost pleading)
               THIS SITUATION IS CONTROLLABLE. PEOPLE
               MUST COME TO GRIPS WITH THIS CONCEPT.
               IT'S EXTREMELY DIFFICULT...WITH FRIENDS...
               WITH FAMILY...BUT A DEAD BODY MUST BE DE-
               ACTIVATED BY EITHER DESTROYING THE BRAIN
               OR SEVERING THE BRAIN FROM THE REST OF THE
               BODY.`
  },
  {
    file_name: 'Dawn of the Dead',
    file_contents: `
     Another outburst in the studio.

     TV Man 2:    THE SITUATION MUST BE CONTROLLED...BEFORE IT'S
               TOO LATE...THEY ARE MULTIPLYING TOO RAPIDLY...

21    Fran moves through the crowded room of emotional people and
     finally reaches another emergency radio installation. Skip and
     Dusty are trying to listen to their receivers. They jot notes.

     Fran:     OPERATIVE RESCUE STATIONS?

     Dusty:    THEY'RE DROPPIN' LIKE FLIES. HERE'S A FEW.
               YOU KNOW, I THINK FOSTER'S RIGHT. I THINK
               WE'RE LOSIN' THIS WAR.

     Fran:     YEAH, BUT NOT TO THE ENEMY.
               WE'RE BLOWIN' IT OURSELVES.

     She gives the rest of her coffee to the two men.

     Fran:     NOT MUCH LEFT, BUT HAVE A BALL.

     The two men each slug eagerly from the paper cup. Fran rushes
     off toward a large teleprompter typing machine.

22    The broadcasters still argue emotionally.

     TV Man 1:    PEOPLE AREN'T WILLING TO ACCEPT YOUR SOLUTIONS,
               DOCTOR, AND I, FOR ONE, DON'T BLAME THEM.

     TV Man 2:    EVERY DEAD BODY THAT IS NOT EXTERMINATED
               BECOMES ONE OF THEM! IT GETS UP AND KILLS!
               THE PEOPLE IT KILLS GET UP AND KILL!

23    Handing the list of active rescue stations to the teleprompter
     typist, Fran rushes back toward the control room.

24    Around the monitor consoles, the commotion has been made even
     more frantic by an angered Dan Givens, obviously one of the
     station managers.`
  },
  {
    file_name: 'Dawn of the Dead',
    file_contents: `     Givens:    NOBODY HAS THE AUTHORITY TO DO THAT, I WANT...

     Givens spots Fran as she moves into the room.

     Givens:    GARRET, WHO TOLD YOU TO KILL THE SUPERS?

     Fran:     NOBODY. I KILLED 'EM. THEY'RE OUT OF DATE.

     Givens:    I WANT THOSE SUPERS ON THE AIR ALL THE TIME.

     Fran:     ARE YOU WILLING TO MURDER PEOPLE BY SENDING THEM
               OUT TO STATIONS THAT HAVE CLOSED DOWN?

     Givens:    WITHOUT THOSE RESCUE STATIONS ON SCREEN EVERY
               MINUTE PEOPLE WON'T WATCH US. THEY'LL TUNE OUT.

     Fran stares at the red faced man in disbelief.

     Givens:    I WANT THAT LIST UP ON THE SCREEN EVERY MINUTE THAT
               WE'RE ON THE AIR.

     Fran is about to say something in anger, but before she can, one
     of the technicians, having overheard Givens, gets up from the
     control panel and starts to walk away.

     Givens:    LUCAS...LUCAS, WHAT THE HELL ARE YOU DOING...
               GET ON THAT CONSOLE...LUCAS...WE'RE ON THE AIR!

     Lucas:    ANYBODY NEED A RIDE!

25    Two other men from various positions in the room snatch up
     personal effects and follow the technician toward the door. The
     door is guarded by a nervous Officer.`
  }
];

module.exports = files;
