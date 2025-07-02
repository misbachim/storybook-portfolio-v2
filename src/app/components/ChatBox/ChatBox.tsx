import React, { useState, useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import Modal from './Modal';
import TypeWriter from './TypeWriter';
import ChatPortrait from './ChatPortrait';
import ChatButtons from './ChatButtons';
import ModalInput from './ModalInput';
import ModalShowcase from './ModalShowcase';
import { cornerStyles } from './styles';
import { replaceText } from './utils';
import './storybook-font.css';
import { RootState } from '../../lib/store';

export default function ChatBox() {
  const variables = useSelector((state: RootState) => state.story.value.variables)
  const currentNode = useSelector((state: RootState) => state.story.value.currentNode)

  const [isTyping, setIsTyping] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalContent, setModalContent] = useState<React.ReactNode>(null)
  const prevTextRef = useRef('');

  // Reset typing state when current node text changes
  useEffect(() => {
    if ((currentNode?.data?.text ?? '') !== prevTextRef.current) {
      setIsTyping(true);
      prevTextRef.current = currentNode?.data?.text ?? '';
    }
  }, [currentNode?.data?.text]);

  const toggleTypingOff = () => {
    setIsTyping(false)
  }

  const handleSkipTyping = () => {
    setIsTyping(false);
  }

  const openModalForm = () => {
    if (currentNode?.modal_form) {
      setModalContent(<ModalInput modalValue={currentNode.modal_form} setModalOpen={setModalOpen} />);
      setModalOpen(true);
    }
  }
  
  const openModalShowcase = () => {
    if (currentNode?.modal_showcase) {
      setModalContent(<ModalShowcase modalValue={currentNode.modal_showcase} setModalOpen={setModalOpen} />);
      setModalOpen(true);
    }
  }

  return (
    <div className="absolute bottom-[2%] left-[2%] right-[2%] flex flex-row items-end gap-0">
      {modalOpen && <Modal content={modalContent} />}
      
      {/* RPG Chat Box */}
      <div
        className="relative flex-1 p-4 md:p-6 bg-[#f5ecd6] dark:bg-[#2d2320] border-4 border-[#bfa76a] dark:border-[#5a4632] rounded-2xl shadow-2xl min-h-[140px] md:min-h-[200px] flex flex-col justify-between storybook-font overflow-visible"
        style={{ boxShadow: '0 8px 32px 0 rgba(60,40,10,0.25)', cursor: isTyping ? 'pointer' : 'default' }}
        onClick={isTyping ? handleSkipTyping : undefined}
      >
        {/* Portrait */}
        <div className="absolute z-20 bottom-2 left-2 md:bottom-4 md:left-4">
          <ChatPortrait currentNode={currentNode} isTyping={isTyping} />
        </div>
        
        {/* RPG-style corners */}
        <div className={`${cornerStyles} -top-4 -left-4 rounded-tl-2xl`}></div>
        <div className={`${cornerStyles} -top-4 -right-4 rounded-tr-2xl`}></div>
        <div className={`${cornerStyles} -bottom-4 -left-4 rounded-bl-2xl`}></div>
        <div className={`${cornerStyles} -bottom-4 -right-4 rounded-br-2xl`}></div>
        
        {/* Text content */}
        <div className='pt-2 pl-20 md:pl-[7.5rem] text-left'>
          {currentNode?.data && (
            <div className="text-sm md:text-base lg:text-lg">
              <TypeWriter 
                key={currentNode.data.text ?? ''}
                toggleTypingOff={toggleTypingOff} 
                content={replaceText(currentNode.data.text ?? '', variables as Record<string, string | undefined>)} 
                speed={30}
                skip={!isTyping}
              />
            </div>
          )}
        </div>
        
        {/* Buttons */}
        <ChatButtons 
          currentNode={currentNode}
          isTyping={isTyping}
          setIsTyping={setIsTyping}
          openModalForm={openModalForm}
          openModalShowcase={openModalShowcase}
        />
      </div>
    </div>
  )
} 