import { createSlice } from '@reduxjs/toolkit'
import dialogueScript from '../../data/dialogueScript.json'

// Types for dialogueScript
interface DialogueNode {
  data?: {
    text?: string;
    portrait?: string;
    response_text?: string;
    response_next?: string;
  };
  modal_form?: {
    text: string;
    inputs: { placeholder: string; variable: string }[];
    confirm: Choice;
    cancel: Choice;
  };
  modal_showcase?: {
    text: string;
    pictures: string[];
    good: Choice;
    bad: Choice;
    link: string;
  };
  choices?: Choice[];
  redirects?: { node_name: string; conditions?: { variable: string; operator: string; value: unknown }[] }[];
}

interface Choice {
  text: string;
  redirects?: { node_name: string; conditions?: { variable: string; operator: string; value: unknown }[] }[];
  set_conditions?: { variable: string; operator: string; value: unknown }[];
  next?: string;
}

interface DialogueNodes {
  [key: string]: DialogueNode;
}

interface DialogueVariables {
  [key: string]: unknown;
}

const initialState = {
  value: {
    currentNode: (dialogueScript.nodes as DialogueNodes)[dialogueScript.start as string],
    variables: { ...(dialogueScript.variables as DialogueVariables) }
  }
}

function getNodeByName(name: string): DialogueNode {
  const node = (dialogueScript.nodes as DialogueNodes)[name];
  if (!node) {
    console.warn(`Dialogue node '${name}' not found. Falling back to start node.`);
    return (dialogueScript.nodes as DialogueNodes)[dialogueScript.start as string];
  }
  return node;
}

export const storySlice = createSlice({
  name: 'story',
  initialState,
  reducers: {
    makeChoice: (state, action) => {
      const choice = action.payload as Choice;
      // Update variables if set_conditions exist
      if (choice.set_conditions) {
        choice.set_conditions.forEach((condition) => {
          (state.value.variables as DialogueVariables)[condition.variable] = condition.value;
        });
      }
      // Robustly handle all possible node structures
      let nextNodeName = null;
      if (choice.redirects && choice.redirects.length > 0) {
        nextNodeName = choice.redirects[0].node_name;
      } else if (choice.next) {
        nextNodeName = choice.next;
      }
      if (nextNodeName) {
        const nextNode = getNodeByName(nextNodeName);
        console.log('Advancing to node:', nextNodeName, nextNode);
        state.value.currentNode = nextNode;
      } else {
        console.warn('No next node found for choice:', choice);
      }
    },
    response: (state, action) => {
      const currentNode = action.payload as DialogueNode;
      let nextNodeName = null;
      if (currentNode.data && currentNode.data.response_next) {
        nextNodeName = currentNode.data.response_next;
      } else if (currentNode.redirects && currentNode.redirects.length > 0) {
        nextNodeName = currentNode.redirects[0].node_name;
      }
      if (nextNodeName) {
        const nextNode = getNodeByName(nextNodeName);
        console.log('Advancing to node (response):', nextNodeName, nextNode);
        state.value.currentNode = nextNode;
      } else {
        console.warn('No next node found for response:', currentNode);
      }
    }
  },
})

export const { makeChoice, response } = storySlice.actions

export default storySlice.reducer 