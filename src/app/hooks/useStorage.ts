import { useCallback, useState, useEffect } from "react"

export function useLocalStorage<T>(key: string, defaultValue: T | (() => T)): [T | undefined, (value: T | undefined) => void, () => void] {
  return useStorage(key, defaultValue, typeof window !== 'undefined' ? window.localStorage : null)
}

export function useSessionStorage<T>(key: string, defaultValue: T | (() => T)): [T | undefined, (value: T | undefined) => void, () => void] {
  return useStorage(key, defaultValue, typeof window !== 'undefined' ? window.sessionStorage : null)
}

function useStorage<T>(key: string, defaultValue: T | (() => T), storageObject: Storage | null): [T | undefined, (value: T | undefined) => void, () => void] {
  const [value, setValue] = useState<T | undefined>(() => {
    if (!storageObject) return typeof defaultValue === "function" ? (defaultValue as () => T)() : defaultValue
    
    const jsonValue = storageObject.getItem(key)
    if (jsonValue != null) return JSON.parse(jsonValue)

    if (typeof defaultValue === "function") {
      return (defaultValue as () => T)()
    } else {
      return defaultValue
    }
  })

  useEffect(() => {
    if (!storageObject) return
    if (value === undefined) return storageObject.removeItem(key)
    storageObject.setItem(key, JSON.stringify(value))
  }, [key, value, storageObject])

  const remove = useCallback(() => {
    setValue(undefined)
  }, [])

  return [value, setValue, remove]
} 