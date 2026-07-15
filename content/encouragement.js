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
    // TRUTH ENTRIES — entries with sample- IDs are samples.
    {
      id: "truth-2026-07-15-not-abandoned",
      type: "truth",
      statement: "I am not abandoned. The Father is With me.",
      date: "2026-07-15",
      scriptureReference: "John 16:32, MSG",
      isPublished: true
    },
    {
      id: "sample-truth-2",
      type: "truth",
      statement: "Your presence brings warmth and steadiness to the people around you.",
      date: "2026-07-14",
      note: "You make room for people to feel known, welcomed, and cared for.",
      isPublished: true
    },

    // SAMPLE THANKS ENTRIES — delete or replace these when ready.
    {
      id: "sample-thanks-1",
      type: "thanks",
      statement: "I am grateful for the care you give our family, even when you are tired.",
      date: "2026-07-15",
      category: "Family",
      note: "The love behind the small things you do is never small to me.",
      isPublished: true
    },
    {
      id: "sample-thanks-2",
      type: "thanks",
      statement: "I am grateful for the way your smile changes the feeling in a room.",
      date: "2026-07-14",
      isPublished: true
    }
  ]
};
