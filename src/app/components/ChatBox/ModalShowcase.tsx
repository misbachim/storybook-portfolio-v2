import React, { useState } from 'react'
import Image from 'next/image'
import { useDispatch } from 'react-redux'
import { makeChoice } from '../../features/story/storySlice'
import { cornerStyles, buttonStyles } from './styles'

interface Choice {
  text: string;
  redirects?: { node_name: string }[];
  set_conditions?: { variable: string; operator: string; value: unknown }[];
  next?: string;
}

interface ModalShowcaseValue {
  text: string;
  pictures: string[];
  good: Choice;
  bad: Choice;
  link: string;
}

interface ModalShowcaseProps {
  modalValue: ModalShowcaseValue;
  setModalOpen: (open: boolean) => void;
}

export default function ModalShowcase({ modalValue, setModalOpen }: ModalShowcaseProps) {
  const dispatch = useDispatch()
  const [currentIndex, setCurrentIndex] = useState(0)
  const pictures = modalValue.pictures || []

  const handleModalGood = () => {
    dispatch(makeChoice(modalValue.good))
    setModalOpen(false)
  }
  
  const handleModalBad = () => {
    dispatch(makeChoice(modalValue.bad))
    setModalOpen(false)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev === 0 ? pictures.length - 1 : prev - 1))
  }
  const nextImage = () => {
    setCurrentIndex((prev) => (prev === pictures.length - 1 ? 0 : prev + 1))
  }
  
  return (
    <div className="relative p-4 sm:p-8 md:p-12 xl:p-16 bg-gradient-to-br from-amber-100 via-yellow-50 to-amber-200 dark:from-[#2d2320] dark:via-[#3a2c1a] dark:to-[#5a4632] border-4 border-[#bfa76a] dark:border-[#5a4632] rounded-2xl shadow-2xl max-w-full sm:max-w-2xl md:max-w-4xl xl:max-w-6xl w-full text-center font-serif text-lg transition-all duration-300" style={{ boxShadow: '0 12px 48px 0 rgba(60,40,10,0.30)' }}>
      {/* RPG-style corners */}
      <div className={`${cornerStyles} -top-4 -left-4 rounded-tl-2xl shadow-md`}></div>
      <div className={`${cornerStyles} -top-4 -right-4 rounded-tr-2xl shadow-md`}></div>
      <div className={`${cornerStyles} -bottom-4 -left-4 rounded-bl-2xl shadow-md`}></div>
      <div className={`${cornerStyles} -bottom-4 -right-4 rounded-br-2xl shadow-md`}></div>
      
      <div className="flex flex-col items-center py-4">
        <div className="relative flex items-center justify-center w-full max-w-full sm:max-w-2xl md:max-w-4xl xl:max-w-6xl rounded-lg">
          <button
            className="absolute left-0 z-10 px-3 py-2 rounded-xl font-bold font-serif border-2 border-amber-600 bg-gradient-to-br from-amber-100 to-yellow-50 text-amber-900 shadow hover:bg-amber-200 hover:border-yellow-500 focus:ring-2 focus:ring-amber-400 focus:border-yellow-600 active:shadow-inner transition-all duration-200"
            onClick={prevImage}
            aria-label="Previous image"
            style={{ top: '50%', transform: 'translateY(-50%)' }}
          >
            &#8592;
          </button>
          {pictures.length > 0 && (
            <Image
              src={'/showcase' + pictures[currentIndex]}
              className="w-full max-h-[80vh] object-contain rounded-lg border-2 border-yellow-400 shadow bg-white"
              alt={`Showcase ${currentIndex + 1}`}
              width={600}
              height={400}
              style={{ background: 'inherit' }}
              priority
            />
          )}
          <button
            className="absolute right-0 z-10 px-3 py-2 rounded-xl font-bold font-serif border-2 border-amber-600 bg-gradient-to-br from-amber-100 to-yellow-50 text-amber-900 shadow hover:bg-amber-200 hover:border-yellow-500 focus:ring-2 focus:ring-amber-400 focus:border-yellow-600 active:shadow-inner transition-all duration-200"
            onClick={nextImage}
            aria-label="Next image"
            style={{ top: '50%', transform: 'translateY(-50%)' }}
          >
            &#8594;
          </button>
        </div>
        <div className="mt-4 text-sm text-amber-700 dark:text-amber-200 font-bold drop-shadow-sm font-serif">
          {pictures.length > 0 ? `${currentIndex + 1} / ${pictures.length}` : null}
        </div>
      </div>
      
      <div className="mt-8 flex flex-col sm:flex-row justify-center gap-3 sm:gap-6">
        <button className={`${buttonStyles} group bg-amber-200 border-amber-600 text-amber-900 font-serif hover:bg-amber-300 hover:border-amber-700 text-sm sm:text-base py-2 sm:py-1.5`} onClick={handleModalGood}>{modalValue.good.text}</button>
        <button className={`${buttonStyles} group bg-amber-200 border-amber-600 text-amber-900 font-serif hover:bg-amber-300 hover:border-amber-700 text-sm sm:text-base py-2 sm:py-1.5`} onClick={() => window.open(modalValue.link, "_blank") }>{"Check it out"}</button>
        <button className={`${buttonStyles} group bg-amber-200 border-amber-600 text-amber-900 font-serif hover:bg-amber-300 hover:border-amber-700 text-sm sm:text-base py-2 sm:py-1.5`} onClick={handleModalBad}>{modalValue.bad.text}</button>
      </div>
    </div>
  )
} 