import React from 'react'
import Image from 'next/image'
import { portraitStyles } from './styles'

interface NodeData {
  portrait?: string;
}

interface DialogueNode {
  data?: NodeData;
}

interface ChatPortraitProps {
  currentNode: DialogueNode | null;
  isTyping: boolean;
}

export default function ChatPortrait({ currentNode, isTyping }: ChatPortraitProps) {
  const portraitSrc = currentNode?.data?.portrait 
    ? `/gif/${currentNode.data.portrait}.gif`
    : `/gif/${isTyping ? 'peepoTalk' : 'peepoNotTalk'}.gif`
  
  return (
    <Image 
      className={portraitStyles}
      src={portraitSrc}
      alt="character"
      width={64}
      height={64}
      style={{ boxShadow: '0 8px 32px 0 rgba(60,40,10,0.25)' }}
      priority
    />
  )
} 