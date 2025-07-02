import React, { useCallback, useRef } from 'react'

export default function useDynamicRefs<T extends HTMLElement = HTMLElement>() {
  const refs = useRef(new Map<string, React.RefObject<T | null>>())

  const setRef = useCallback((key: string) => {
    if (!refs.current.has(key)) {
      refs.current.set(key, React.createRef<T>())
    }
    return refs.current.get(key)
  }, [])

  const getRef = useCallback((key: string) => {
    return refs.current.get(key)
  }, [])

  return [getRef, setRef]
} 