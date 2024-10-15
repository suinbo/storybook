import useClickOutside from "@/hooks/useClickOutside"
import { useCallback, useEffect, useRef, useState } from "react"
import "./selectbox.css"

export type SelectboxItem = {
    id: string
    name: string
}

export default function Selectbox({
    items = [],
    selectedId,
    innerElement,
    onSelect,
    style,
    disabledIds = [],
    disabledOpener = false,
    isConvertOpener,
}: {
    items: SelectboxItem[]
    selectedId?: string
    innerElement?: React.ReactNode
    onSelect: (selectedItem: SelectboxItem) => void
    style?: React.CSSProperties
    disabledIds?: string[]
    disabledOpener?: boolean
    isConvertOpener?: boolean
}) {
    const selectBoxRef = useRef<HTMLDivElement>(null)
    const [active, setActive] = useState<boolean>(false)
    const [, setSelectedItem] = useState<SelectboxItem>()
    const [{ top, width }, setPosition] = useState<{ top: number; width: number }>({ top: 0, width: 0 })

    useClickOutside(
        selectBoxRef,
        () => {
            setActive(false)
        },
        disabledIds
    )

    const controlPosition = useCallback(() => {
        if (selectBoxRef.current && selectBoxRef.current.offsetParent) {
            const { top, width, height } = selectBoxRef.current.getBoundingClientRect()
            const parentRect = selectBoxRef.current.offsetParent.getBoundingClientRect()

            const openerTop = isConvertOpener
                ? top - parentRect.top - height - 10 - 224
                : top - parentRect.top + height + 10

            const position = { top: openerTop, width }
            setPosition(position)
        }
    }, [selectBoxRef.current])

    // 최상단 부모 노드 찾기
    const findScrollParent = (node: HTMLElement | null) => {
        if (!node) return null
        if (node.scrollHeight > node.clientHeight) {
            return node
        }
        return findScrollParent(node.parentElement)
    }

    useEffect(() => {
        controlPosition()

        const scrollParent = findScrollParent(selectBoxRef.current)

        if (scrollParent) {
            scrollParent.addEventListener("scroll", controlPosition)

            return () => {
                scrollParent.removeEventListener("scroll", controlPosition)
            }
        }
    }, [])

    const NavIcon = ({ className, fill }: { className: string; fill: string }) => (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={10}
            height={10}
            viewBox="0 0 11 7"
            fill={fill}
            className={className}>
            <path
                d="M10.7579 0.267679C10.6028 0.0962844 10.3925 -5.31105e-08 10.1732 -7.2281e-08C9.95392 -9.14514e-08 9.74361 0.0962843 9.58853 0.267679L5.49501 4.7932L1.40148 0.267678C1.24551 0.101141 1.03662 0.00898958 0.819789 0.0110726C0.602959 0.0131556 0.395543 0.109306 0.242215 0.278815C0.0888874 0.448324 0.00191633 0.677628 3.21115e-05 0.917341C-0.0018521 1.15705 0.0815022 1.38799 0.232142 1.56042L4.91034 6.73232C5.06542 6.90372 5.27572 7 5.49501 7C5.71429 7 5.9246 6.90372 6.07968 6.73232L10.7579 1.56042C10.9129 1.38898 11 1.15648 11 0.914052C11 0.671626 10.9129 0.439126 10.7579 0.267679Z"
                fill={fill}
            />
        </svg>
    )

    const SelectboxList = () => (
        <div className="fixed z-10 w-[full] p-4 rounded-2xl bg-white shadow-md" style={{ top, width }}>
            <ul className="custom-scrollbar" style={style}>
                {items.map(item => (
                    <li
                        id={item.id}
                        key={item.id}
                        className={`p-1 text-left ${
                            disabledIds.includes(item.id) ? "text-gray-400 cursor-default" : "cursor-pointer"
                        }`}
                        onClick={() => {
                            if (disabledIds.includes(item.id) || selectedId == item.id) return
                            setSelectedItem(item)
                            onSelect(item)
                            setActive(false)
                        }}>
                        {item.name}
                    </li>
                ))}
            </ul>
        </div>
    )

    return (
        <div className="w-[full]">
            <div
                className={`flex justify-between items-center gap-5 border-b ${
                    innerElement ? "border-none" : active ? "border-blue-800" : "border-gray-300"
                } ${disabledOpener ? "bg-gray-200 cursor-default" : "cursor-pointer"}`}
                ref={selectBoxRef}
                onClick={() => !disabledOpener && setActive(!active)}>
                {innerElement ?? (
                    <div className="whitespace-nowrap overflow-hidden text-ellipsis pb-1">
                        {selectedId ? items.find(item => item.id == selectedId)?.name : "-"}
                    </div>
                )}
                <NavIcon
                    className={`transform ${active ? "rotate-180" : "rotate-0"}`}
                    fill={disabledOpener ? "#cacaca" : ""}
                />
            </div>
            {active && <SelectboxList />}
        </div>
    )
}
