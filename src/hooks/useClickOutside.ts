import { RefObject, useEffect } from "react"

/** 외부 영역 클릭 */
const useClickOutside = (ref: RefObject<HTMLElement>, callback: () => void, disabledIds?: string[]) => {
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            const target = e.target as Element
            if (ref.current && !ref.current.contains(target) && !disabledIds?.includes(target.id)) {
                callback()
            }
        }

        window.addEventListener("click", handleClickOutside)

        return () => {
            window.removeEventListener("click", handleClickOutside)
        }
    }, [ref, callback])
}

export default useClickOutside
