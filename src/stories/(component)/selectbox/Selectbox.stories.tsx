import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"
import Selectbox from "."
import { useState } from "react"

const meta = {
    title: "Example/Selectbox",
    component: Selectbox,
    parameters: {
        layout: "padded",
        docs: {
            story: {
                inline: false,
                iframeHeight: 300, // 미리보기 창 높이 조절
            },
        },
    },
    tags: ["autodocs"],
    argTypes: {},
    args: { onSelect: fn() },
} satisfies Meta<typeof Selectbox>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {
        style: { height: 180 },
        items: [
            { id: "id_1", name: "Option 1" },
            { id: "id_2", name: "Option 2" },
            { id: "id_3", name: "Option 3" },
            { id: "id_4", name: "Option 4" },
            { id: "id_5", name: "Option 5" },
            { id: "id_6", name: "Option 6" },
            { id: "id_7", name: "Option 7" },
            { id: "id_8", name: "Option 8" },
            { id: "id_9", name: "Option 9" },
        ],
    },
    render: function Render(args) {
        const [selectedId, setSelectedId] = useState<string>()
        return <Selectbox {...args} selectedId={selectedId} onSelect={item => setSelectedId(item.id)} />
    },
}
