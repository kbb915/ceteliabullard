(function () {
  "use strict";

  var content = window.ENCOURAGEMENT_CONTENT || { config: {}, entries: [] };
  var root = document.getElementById("encouragement-app");
  if (!root) return;

  var type = root.dataset.entryType === "thanks" ? "thanks" : "truth";
  var pageCopy = {
    truth: {
      kicker: "What I see in you",
      title: "What's True About Cetelia",
      introduction: "A growing collection of reminders about who you are, what is true about you, and what I see in you.",
      emptyTitle: "No truths have been added yet.",
      emptyText: "New reminders will appear here when they are ready."
    },
    thanks: {
      kicker: "With gratitude",
      title: "What I Am Grateful For",
      introduction: "A growing collection of things I notice, appreciate, and never want to take for granted.",
      emptyTitle: "No gratitude entries have been added yet.",
      emptyText: "New reflections will appear here when they are ready."
    }
  };

  var state = {
    query: "",
    category: "all",
    visibleCount: Number(content.config.entriesPerPage) || 6
  };

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function formatDate(value) {
    var date = new Date(value + "T00:00:00");
    if (Number.isNaN(date.getTime())) return value;
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    });
  }

  function publishedEntries() {
    return content.entries
      .filter(function (entry) { return entry.isPublished && entry.type === type; })
      .slice()
      .sort(function (a, b) {
        return b.date.localeCompare(a.date) || b.id.localeCompare(a.id);
      });
  }

  function availableCategories(entries) {
    return Array.from(new Set(entries.map(function (entry) { return entry.category; }).filter(Boolean)))
      .sort(function (a, b) { return a.localeCompare(b); });
  }

  function filteredEntries(entries) {
    var query = state.query.trim().toLowerCase();
    return entries.filter(function (entry) {
      var matchesCategory = state.category === "all" || entry.category === state.category;
      var searchable = [entry.statement, entry.note].filter(Boolean).join(" ").toLowerCase();
      return matchesCategory && (!query || searchable.includes(query));
    });
  }

  function pageIntroduction(copy) {
    return '<header class="page-introduction">' +
      '<p class="page-kicker">' + escapeHtml(copy.kicker) + '</p>' +
      '<h1>' + escapeHtml(copy.title) + '</h1>' +
      '<p class="intro-copy">' + escapeHtml(copy.introduction) + '</p>' +
      '</header>';
  }

  function bibleGatewayUrl(reference) {
    var parts = String(reference).split(",");
    var passage = parts.shift().trim();
    var version = parts.join(",").trim();
    return "https://www.biblegateway.com/passage/?search=" + encodeURIComponent(passage) +
      (version ? "&version=" + encodeURIComponent(version) : "");
  }

  function searchField() {
    return '<label><span class="field-label">Search this collection</span>' +
      '<input class="search-input" id="entry-search" type="search" placeholder="Search statements and notes" autocomplete="off"></label>';
  }

  function categoryFilter(categories) {
    if (!categories.length) return "";
    return '<label><span class="field-label">Category</span>' +
      '<select class="category-select" id="category-filter">' +
      '<option value="all">All categories</option>' +
      categories.map(function (category) {
        return '<option value="' + escapeHtml(category) + '">' + escapeHtml(category) + '</option>';
      }).join("") +
      '</select></label>';
  }

  function emptyState(copy, isFiltered) {
    return '<section class="empty-state" aria-live="polite">' +
      '<h2>' + escapeHtml(isFiltered ? "No matching entries." : copy.emptyTitle) + '</h2>' +
      '<p>' + escapeHtml(isFiltered ? "Try another search or category." : copy.emptyText) + '</p>' +
      '</section>';
  }

  function entryCard(entry) {
    var meta = ['<span>' + escapeHtml(formatDate(entry.date)) + '</span>'];
    if (entry.category) meta.push('<span>Category: ' + escapeHtml(entry.category) + '</span>');
    var scriptureLink = entry.scriptureReference
      ? '<p class="entry-scripture">Scripture: <a href="' + escapeHtml(bibleGatewayUrl(entry.scriptureReference)) + '" target="_blank" rel="noopener noreferrer">' + escapeHtml(entry.scriptureReference) + '</a></p>'
      : '';

    return '<article class="entry-card">' +
      (entry.id.indexOf("sample-") === 0 ? '<span class="sample-label">Sample entry</span>' : '') +
      '<h2 class="entry-statement">' + escapeHtml(entry.statement) + '</h2>' +
      '<div class="entry-meta">' + meta.join("") + '</div>' +
      scriptureLink +
      (entry.note ? '<p class="entry-note">' + escapeHtml(entry.note) + '</p>' : '') +
      '</article>';
  }

  function entryList(entries, copy) {
    if (!entries.length) return emptyState(copy, Boolean(state.query || state.category !== "all"));
    var visible = entries.slice(0, state.visibleCount);
    return '<div class="entry-list">' + visible.map(entryCard).join("") + '</div>' +
      (entries.length > visible.length
        ? '<div class="load-more-wrap"><button class="load-more" id="load-more" type="button">Load More</button></div>'
        : '');
  }

  function renderEntries() {
    var entries = filteredEntries(publishedEntries());
    var list = document.getElementById("entry-results");
    var summary = document.getElementById("results-summary");
    list.innerHTML = entryList(entries, pageCopy[type]);
    summary.textContent = entries.length + (entries.length === 1 ? " entry" : " entries");

    var loadMore = document.getElementById("load-more");
    if (loadMore) {
      loadMore.addEventListener("click", function () {
        state.visibleCount += Number(content.config.entriesPerPage) || 6;
        renderEntries();
      });
    }
  }

  function renderPage() {
    var entries = publishedEntries();
    var categories = availableCategories(entries);
    var copy = pageCopy[type];
    var otherType = type === "truth" ? "thanks" : "truth";

    root.innerHTML = '<main class="page-shell">' +
      '<div class="utility-nav">' +
      '<a class="home-link" href="/">← Main website</a>' +
      '<nav class="collection-nav" aria-label="Collections">' +
      '<a href="/truth/"' + (type === "truth" ? ' aria-current="page"' : '') + '>What Is True</a>' +
      '<a href="/thanks/"' + (type === "thanks" ? ' aria-current="page"' : '') + '>What I Am Grateful For</a>' +
      '</nav></div>' +
      pageIntroduction(copy) +
      '<section class="controls' + (categories.length ? ' has-categories' : '') + '" aria-label="Find entries">' +
      searchField() + categoryFilter(categories) +
      '</section>' +
      '<p class="results-summary" id="results-summary" aria-live="polite"></p>' +
      '<section id="entry-results" aria-label="' + escapeHtml(otherType === "truth" ? "Gratitude entries" : "Truth entries") + '"></section>' +
      '</main>';

    document.getElementById("entry-search").addEventListener("input", function (event) {
      state.query = event.target.value;
      state.visibleCount = Number(content.config.entriesPerPage) || 6;
      renderEntries();
    });

    var filter = document.getElementById("category-filter");
    if (filter) {
      filter.addEventListener("change", function (event) {
        state.category = event.target.value;
        state.visibleCount = Number(content.config.entriesPerPage) || 6;
        renderEntries();
      });
    }

    renderEntries();
  }

  renderPage();
}());
