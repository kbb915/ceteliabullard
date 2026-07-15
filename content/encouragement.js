/*
  ADD ENTRY
  ---------
  Copy one of these examples into the entries array below. Keep the date in
  YYYY-MM-DD format. Category, scriptureReference, and note are optional.

  Truth:
  {
    id: "truth-unique-id",
    type: "truth",
    statement: "You are deeply loved.",
    date: "2026-07-15",
    category: "Identity",
    scriptureReference: "Ephesians 3:18–19",
    note: "Optional longer note.",
    isPublished: true
  },

  Thanks:
  {
    id: "thanks-unique-id",
    type: "thanks",
    statement: "I am grateful for your patience.",
    date: "2026-07-15",
    category: "Marriage",
    note: "Optional longer note.",
    isPublished: true
  },
*/

window.ENCOURAGEMENT_CONTENT = {
  config: {
    showInPublicNavigation: false,
    entriesPerPage: 6
  },

  entries: [
    // TRUTH ENTRIES
    {
      id: "truth-2026-07-15-not-abandoned",
      type: "truth",
      statement: "I am not abandoned. The Father is With me.",
      date: "2026-07-15",
      category: "Belonging",
      scriptureReference: "John 16:32, MSG",
      isPublished: true
    }
  ]
};
