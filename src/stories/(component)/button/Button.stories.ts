import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"
import Button from "."

const meta = {
    title: "Example/Button",
    component: Button,
    parameters: {
        layout: "centered",
    },
    tags: ["autodocs"],
    argTypes: {
        backgroundColor: { control: "color" },
    },
    args: { onClick: fn() },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
    args: {
        primary: true,
        label: "Button",
    },
}

export const Secondary: Story = {
    args: {
        ...Primary.args,
        primary: false,
    },
}

export const Large: Story = {
    args: {
        ...Primary.args,
        size: "large",
    },
}

export const Small: Story = {
    args: {
        ...Primary.args,
        size: "small",
    },
}
