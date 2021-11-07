import * as rs from "text-readability";

export function getNumberOfSyllables(text: string): number {
  return rs.syllableCount(text);
}

export function getLexiconCount(text: string): number {
  return rs.lexiconCount(text);
}

export function getNumberOfSentences(text: string): number {
  return rs.sentenceCount(text);
}

export function getComplexityLabel(text: string): string {
  const readabilityScore = rs.fleschReadingEase(text);

  if (readabilityScore >= 90) {
    return "Very easy to read";
  } else if (readabilityScore >= 80) {
    return "Easy to read";
  } else if (readabilityScore >= 70) {
    return "Fairly easy to read";
  } else if (readabilityScore >= 60) {
    return "Plain English";
  } else if (readabilityScore >= 50) {
    return "Fairly difficult to read";
  } else if (readabilityScore >= 40) {
    return "Difficult to read";
  } else if (readabilityScore >= 30) {
    return "Very difficult to read";
  } else {
    return "Extremely difficult to read";
  }
}

export function getComplexityDetails(text: string): string {
  return `
    Number of syllables: ${rs.syllableCount(text)}\n
    Number of words: ${rs.lexiconCount(text)}\n
    Number of sentences: ${rs.sentenceCount(text)}\n
    Grade formula level: ${rs.fleschKincaidGrade(text)}\n
    Readability consensus: ${rs.textStandard(text)}
  `;
}