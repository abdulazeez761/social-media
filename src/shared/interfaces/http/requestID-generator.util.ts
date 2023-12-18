export function requestIdGenerator(time: String, token: string) {
  let key = '';
  let tokenIndex = 0;

  for (let i = 0; i < time.length && tokenIndex < token.length; i += 2) {
    key += token[tokenIndex++];
    key += time[i + 1];
  }

  return key;
}
