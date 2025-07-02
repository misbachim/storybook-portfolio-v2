import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { makeChoice } from '../../features/story/storySlice'
import useDynamicRefs from '../../hooks/useDynamicRefs'
import { cornerStyles } from './styles'

interface ModalInputField {
  placeholder: string;
  variable: string;
}

interface SetCondition {
  variable: string;
  operator: string;
  value: unknown;
}

interface Choice {
  text: string;
  redirects?: { node_name: string }[];
  set_conditions?: SetCondition[];
  next?: string;
}

interface ModalValue {
  inputs: ModalInputField[];
  confirm: Choice;
  cancel: Choice;
}

interface ModalInputProps {
  modalValue: ModalValue;
  setModalOpen: (open: boolean) => void;
}

export default function ModalInput({ modalValue, setModalOpen }: ModalInputProps) {
  const [, setRef] = useDynamicRefs<HTMLInputElement>();
  const dispatch = useDispatch();
  // Track input values in state
  const [inputValues, setInputValues] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    modalValue.inputs.forEach(input => {
      initial[input.variable] = '';
    });
    return initial;
  });

  // Compute if any input is empty
  const isConfirmDisabled = modalValue.inputs.some(input => {
    const value = inputValues[input.variable];
    return !value || value.trim() === '';
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, variable: string) => {
    setInputValues(prev => ({ ...prev, [variable]: e.target.value }));
  };

  const handleModalConfirm = () => {
    if (isConfirmDisabled) return;
    const payload: Choice = {
      ...modalValue.confirm,
      set_conditions: modalValue.confirm.set_conditions?.map(set_condition => {
        if (set_condition.operator !== 'input') {
          return set_condition;
        }
        return {
          variable: set_condition.variable,
          operator: 'input',
          value: inputValues[set_condition.variable]
        };
      }) || []
    };
    dispatch(makeChoice(payload));
    setModalOpen(false);
  };

  const handleModalCancel = () => {
    dispatch(makeChoice(modalValue.cancel));
    setModalOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleModalConfirm();
    }
  };

  return (
    <div className="relative p-4 sm:p-6 md:p-8 bg-gradient-to-br from-amber-100 via-yellow-50 to-amber-200 dark:from-[#2d2320] dark:via-[#3a2c1a] dark:to-[#5a4632] border-4 border-[#bfa76a] dark:border-[#5a4632] rounded-2xl shadow-2xl w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl text-center font-serif text-base sm:text-lg transition-all duration-300 mx-auto" style={{ boxShadow: '0 12px 48px 0 rgba(60,40,10,0.30)' }}>
      {/* RPG-style corners with shadow */}
      <div className={`${cornerStyles} -top-4 -left-4 rounded-tl-2xl shadow-md`}></div>
      <div className={`${cornerStyles} -top-4 -right-4 rounded-tr-2xl shadow-md`}></div>
      <div className={`${cornerStyles} -bottom-4 -left-4 rounded-bl-2xl shadow-md`}></div>
      <div className={`${cornerStyles} -bottom-4 -right-4 rounded-br-2xl shadow-md`}></div>
      
      {modalValue.inputs.map(input => (
        <input 
          key={input.variable} 
          type="text" 
          placeholder={input.placeholder} 
          ref={setRef(input.variable)} 
          required={true} 
          onKeyDown={handleKeyDown} 
          value={inputValues[input.variable]}
          onChange={e => handleInputChange(e, input.variable)}
          className="block w-full my-4 sm:my-6 px-4 sm:px-5 py-2 sm:py-3 rounded-xl border-2 border-amber-400 bg-gradient-to-br from-yellow-50 to-amber-100 dark:from-[#3a2c1a] dark:to-[#2d2320] text-base sm:text-lg font-serif text-amber-900 shadow focus:outline-none focus:ring-4 focus:ring-amber-300 focus:border-amber-600 transition-all duration-200 placeholder:text-amber-400 caret-amber-400" 
        />
      ))}
      <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row justify-center gap-3 sm:gap-6 w-full">
        <button
          className={`w-full sm:w-auto px-6 py-2 rounded-xl font-bold font-serif border-2 border-amber-600 bg-gradient-to-br from-amber-200 to-yellow-100 text-amber-900 shadow-lg hover:shadow-xl hover:border-yellow-500 hover:bg-amber-300 focus:ring-2 focus:ring-amber-400 focus:border-yellow-600 active:shadow-inner transition-all duration-200 text-base sm:text-lg ${isConfirmDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}
          onClick={handleModalConfirm}
          disabled={isConfirmDisabled}
        >
          {modalValue.confirm.text}
        </button>
        <button className="w-full sm:w-auto px-6 py-2 rounded-xl font-bold font-serif border-2 border-amber-600 bg-gradient-to-br from-amber-200 to-yellow-100 text-amber-900 shadow-lg hover:shadow-xl hover:border-yellow-500 hover:bg-amber-300 focus:ring-2 focus:ring-amber-400 focus:border-yellow-600 active:shadow-inner transition-all duration-200 text-base sm:text-lg" onClick={handleModalCancel}>
          {modalValue.cancel.text}
        </button>
      </div>
    </div>
  )
} 