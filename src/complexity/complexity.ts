import * as rs from "text-readability";

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