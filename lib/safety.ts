const crisisPatterns = [
  // Self-harm or suicide language.
  /\b(kill|hurt|harm|cut)\s+(myself|me)\b/i,
  /\b(suicid(?:e|al)|self[- ]?harm|end my life|take my own life|don'?t want to (?:be alive|live)|better off dead)\b/i,
  // Threats or stated intent to harm another person.
  /\b(?:i(?:'m| am)?\s+(?:going to|gonna|planning to|about to|want to)|i will)\s+(?:kill|hurt|harm|shoot|stab|attack)\s+(?:him|her|them|someone|people|my\s+\w+)\b/i,
  /\b(?:kill|shoot|stab)\s+(?:him|her|them|someone|people)\b/i,
  // Abuse and domestic violence disclosures.
  /\b(?:being|am|i'?m)\s+(?:abused|assaulted|beaten|molested)\b/i,
  /\b(?:domestic violence|sexual abuse|physical abuse|emotional abuse|child abuse|elder abuse)\b/i,
  /\b(?:he|she|they|my\s+\w+)\s+(?:hits|beats|abuses|assaults|threatens)\s+me\b/i,
  // Immediate danger or medical emergency language.
  /\b(?:i am|i'?m|we are|we'?re)\s+(?:in immediate danger|in danger|not safe|unsafe right now)\b/i,
  /\b(?:someone is trying to kill me|there is a weapon|active shooter|i overdosed|they overdosed)\b/i
];

export function hasCrisisLanguage(text: string) {
  const normalized = text.normalize("NFKC").slice(0, 5000);
  return crisisPatterns.some((pattern) => pattern.test(normalized));
}
