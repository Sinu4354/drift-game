export const days = [
  {
    id: 1,
    date: "Day 1",
    wakeText: "Someone left coffee on your desk. It is still warm.",
    rooms: {
      bedroom: {
        name: "Your Room",
        description: "A small room. Posters on the wall you don't remember choosing. A desk with a notebook open to a blank page.",
        objects: [
          { id: "notebook", name: "Notebook", examine: "The last entry is dated three weeks ago. It just says: don't forget the blue door." },
          { id: "photo", name: "Photo on desk", examine: "You and someone else. You don't recognize them but they're laughing like they know you well." },
          { id: "mirror", name: "Mirror", examine: "You look tired. There's a scar on your left hand you don't remember getting." }
        ],
        npcs: [],
        exits: ["hallway"]
      },
      hallway: {
        name: "Hallway",
        description: "Long and narrow. A blue door at the end. Someone is standing near the window.",
        objects: [
          { id: "bluedoor", name: "Blue Door", examine: "Locked. There's a keyhole but no key anywhere nearby." }
        ],
        npcs: [
          { id: "stranger", name: "Person by window", dialogue: ["You are up early, they say without turning around.", "Did you sleep okay?", "They know your name. You don't know theirs."] }
        ],
        exits: ["bedroom", "kitchen"]
      },
      kitchen: {
        name: "Kitchen",
        description: "Coffee is brewing. A jacket hangs on the chair that isn't yours, or maybe it is.",
        objects: [
          { id: "jacket", name: "Jacket", examine: "Inside pocket: a key. Small, brass, old." },
          { id: "coffee", name: "Coffee mug", examine: "Initials on the bottom: M.R. Not yours. Or are they?" }
        ],
        npcs: [],
        exits: ["hallway"]
      }
    },
    deductions: [
      { id: "d1", text: "The blue door matters" },
      { id: "d2", text: "Someone lives here with me" },
      { id: "d3", text: "I've been here before" }
    ],
    endText: "You found the key. You stood at the blue door for a long time. You didn't open it. Tomorrow you might remember why."
  },
  {
    id: 2,
    date: "Day 2",
    wakeText: "The blue door is open. You don't remember opening it.",
    rooms: {
      bedroom: {
        name: "Your Room",
        description: "Something is different. The photo on the desk is face down. You didn't do that.",
        objects: [
          { id: "photodown", name: "Face-down photo", examine: "You turn it over. It's the same photo but the other person has been scratched out." },
          { id: "drawer", name: "Drawer", examine: "A bus ticket. Dated six months ago. Destination: somewhere you don't recognize." },
          { id: "window", name: "Window", examine: "Someone is standing in the street below, looking up. By the time you blink they are gone." }
        ],
        npcs: [],
        exits: ["hallway"]
      },
      hallway: {
        name: "Hallway",
        description: "The blue door is wide open. Beyond it: another hallway, identical to this one.",
        objects: [
          { id: "bluedooropen", name: "Blue Door", examine: "Open now. The hinges look old. This door has been opened many times before." },
          { id: "mirrorwall", name: "Wall mirror", examine: "Your reflection moves a half second after you do. You decide not to think about that." }
        ],
        npcs: [
          { id: "mr", name: "M.R.", dialogue: ["They are standing in the doorway of the blue door.", "You recognize the initials from the mug.", "They say: you remembered. I wasn't sure you would.", "They step back into the other hallway and wait."] }
        ],
        exits: ["bedroom", "kitchen", "beyonddoor"]
      },
      kitchen: {
        name: "Kitchen",
        description: "The coffee mug is gone. In its place: a folded note.",
        objects: [
          { id: "note", name: "Folded note", examine: "It says: the ticket is real. You bought it. You just don't remember why yet." },
          { id: "calendar", name: "Calendar", examine: "Every day for the past month is crossed out except today." }
        ],
        npcs: [],
        exits: ["hallway"]
      },
      beyonddoor: {
        name: "Beyond the Door",
        description: "Another hallway. Same as yours but everything is slightly wrong. The light is warmer. The air smells like somewhere else.",
        objects: [
          { id: "door2", name: "Door at the end", examine: "Unlocked. You feel like you have been here before in a dream." },
          { id: "photo2", name: "Photo on the wall", examine: "You and M.R. You are both smiling. This one hasn't been scratched." }
        ],
        npcs: [],
        exits: ["hallway"]
      }
    },
    deductions: [
      { id: "d4", text: "M.R. knows who I was" },
      { id: "d5", text: "I went somewhere six months ago" },
      { id: "d6", text: "Someone is trying to remind me" }
    ],
    endText: "You stood in the other hallway for a long time. M.R. didn't speak. You didn't ask. Some things come back not as memories but as feelings. Today felt like one of those."
  },
  {
    id: 3,
    date: "Day 3",
    wakeText: "You remember a name this morning. Just one. You write it down before it fades.",
    rooms: {
      bedroom: {
        name: "Your Room",
        description: "The notebook is open. In your own handwriting: a name you don't fully recognize but almost do.",
        objects: [
          { id: "namewritten", name: "Name in notebook", examine: "It says: Mara. Below it, in smaller letters: she knew first." },
          { id: "jacket2", name: "Your jacket", examine: "In the pocket: the bus ticket from the drawer. You don't remember moving it." },
          { id: "plant", name: "Plant on windowsill", examine: "New. You didn't put it there. It's been watered recently." }
        ],
        npcs: [],
        exits: ["hallway"]
      },
      hallway: {
        name: "Hallway",
        description: "The blue door is closed again. But it doesn't feel locked. The mirror has a post-it on it.",
        objects: [
          { id: "postit", name: "Post-it on mirror", examine: "It says: you always forget in the same order. Start with the ticket." },
          { id: "bluedoor3", name: "Blue Door", examine: "Closed but the handle turns. You're not sure you're ready." }
        ],
        npcs: [
          { id: "mara", name: "Mara", dialogue: ["She is sitting on the floor with her back against the wall.", "She looks up and says: you wrote my name down.", "Good. That means it's coming back.", "She hands you a photograph. It's the one from your desk, unscratched, whole."] }
        ],
        exits: ["bedroom", "kitchen", "beyonddoor"]
      },
      kitchen: {
        name: "Kitchen",
        description: "Two mugs this time. Both warm. Like someone knew you'd both be here.",
        objects: [
          { id: "twomug", name: "Two mugs", examine: "Both say M.R. on the bottom. You realize M.R. might be both of you." },
          { id: "map", name: "Map on table", examine: "A route. Highlighted. It ends at a place called Edlen. The bus ticket destination." }
        ],
        npcs: [],
        exits: ["hallway"]
      },
      beyonddoor: {
        name: "Beyond the Door",
        description: "Familiar now. The warm light. The different air. You think you might have lived here once.",
        objects: [
          { id: "bed2", name: "Bed", examine: "Made. Pillow has an indent. Someone sleeps here regularly. Maybe you." },
          { id: "window2", name: "Window", examine: "You can see your building from here. This is across the street. You've been able to see your own window this whole time." }
        ],
        npcs: [],
        exits: ["hallway"]
      }
    },
    deductions: [
      { id: "d7", text: "Mara is M.R." },
      { id: "d8", text: "Edlen is where this started" },
      { id: "d9", text: "I might have two homes" }
    ],
    endText: "You didn't take the bus. Not yet. But you held the ticket for a long time. Mara sat beside you. Neither of you said anything. That felt like enough for today."
  }
];
