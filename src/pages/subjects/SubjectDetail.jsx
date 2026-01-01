const progressKey = "progress";

const toggleChapter = (chapter) => {
  const raw = JSON.parse(localStorage.getItem(progressKey)) || {};

  const subjectProgress =
    raw?.[board]?.[classLevel]?.[subjectSlug] || [];

  const updatedChapters = subjectProgress.includes(chapter)
    ? subjectProgress.filter((c) => c !== chapter)
    : [...subjectProgress, chapter];

  const updatedProgress = {
    ...raw,
    [board]: {
      ...raw[board],
      [classLevel]: {
        ...raw?.[board]?.[classLevel],
        [subjectSlug]: updatedChapters,
      },
    },
  };

  localStorage.setItem(progressKey, JSON.stringify(updatedProgress));
};
