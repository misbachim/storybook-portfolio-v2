import React from 'react'
import { useDispatch } from 'react-redux'
import { makeChoice, response } from '../../features/story/storySlice'
import { buttonStyles } from './styles'

// --- Types ---
interface Choice {
  text: string;
  redirects?: { node_name: string }[];
  next?: string;
  set_conditions?: { variable: string; operator: string; value: unknown }[];
}

interface ModalForm {
  text: string;
  inputs: { placeholder: string; variable: string }[];
  confirm: Choice;
  cancel: Choice;
}

interface ModalShowcase {
  text: string;
  pictures: string[];
  good: Choice;
  bad: Choice;
  link: string;
}

interface NodeData {
  text?: string;
  portrait?: string;
  response_text?: string;
  response_next?: string;
}

interface DialogueNode {
  data?: NodeData;
  modal_form?: ModalForm;
  modal_showcase?: ModalShowcase;
  choices?: Choice[];
  redirects?: { node_name: string }[];
}

interface ChatButtonsProps {
  currentNode: DialogueNode | null;
  isTyping: boolean;
  setIsTyping: (typing: boolean) => void;
  openModalForm: () => void;
  openModalShowcase: () => void;
}

export default function ChatButtons({ 
  currentNode, 
  isTyping, 
  setIsTyping, 
  openModalForm, 
  openModalShowcase 
}: ChatButtonsProps) {
  const dispatch = useDispatch();

  if (isTyping || !currentNode) return null;

  return (
    <div className="flex flex-wrap justify-center gap-2 mt-4 pt-2 pl-20 md:pl-[7.5rem]">
      {currentNode.modal_form && (
        <button className={`${buttonStyles} group bg-amber-200 border-amber-600 text-amber-900 font-serif hover:bg-amber-300 hover:border-amber-700`} onClick={openModalForm}>
          {currentNode.modal_form.text}
        </button>
      )}
      {currentNode.modal_showcase && (
        <button className={`${buttonStyles} group bg-amber-200 border-amber-600 text-amber-900 font-serif hover:bg-amber-300 hover:border-amber-700`} onClick={openModalShowcase}>
          {currentNode.modal_showcase.text}
        </button>
      )}
      {currentNode.choices?.map((choice, index) => (
        <button 
          key={index} 
          className={`${buttonStyles} group bg-amber-200 border-amber-600 text-amber-900 font-serif hover:bg-amber-300 hover:border-amber-700`} 
          onClick={() => {
            setIsTyping(true);
            dispatch(makeChoice(choice));
          }}
        >
          {choice.text}
        </button>
      ))}
      {currentNode.data?.response_text && (
        <button 
          className={`${buttonStyles} group bg-amber-200 border-amber-600 text-amber-900 font-serif hover:bg-amber-300 hover:border-amber-700`} 
          onClick={() => {
            setIsTyping(true);
            dispatch(response(currentNode));
          }}
        >
          {currentNode.data.response_text}
        </button>
      )}
    </div>
  )
} 