// Utility functions for ChatBox components
export const replaceText = (text: string, variables: Record<string, string | undefined>) => {
  let newText = text
  const myRegexp = /\${([^}]*)}+/g
  let match = myRegexp.exec(text);
  while (match != null) {
    newText = newText.replace(match[0], variables[match[1]] ?? '')
    match = myRegexp.exec(text);
  }
  return newText
} 